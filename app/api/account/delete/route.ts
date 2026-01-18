import { NextResponse } from "next/server";
import type { DocumentReference, Firestore } from "firebase-admin/firestore";
import { auth, db, storage } from "../../../../lib/firebaseAdmin";

const AUTH_HEADER_PREFIX = "Bearer ";

async function deleteDocumentWithSubcollections(docRef: DocumentReference) {
  const subcollections = await docRef.listCollections();

  for (const collection of subcollections) {
    const snapshot = await collection.get();
    for (const doc of snapshot.docs) {
      await deleteDocumentWithSubcollections(doc.ref);
    }
  }

  await docRef.delete();
}

const userUploadPrefix = (uid: string) => `users/${uid}/`;

async function deleteUserStorageFiles(uid: string) {
  const bucket = storage.bucket();
  const prefix = userUploadPrefix(uid);

  try {
    const [files] = await bucket.getFiles({ prefix });

    if (!files.length) {
      return;
    }

    await Promise.all(
      files.map(async (file) => {
        await file.delete();
      })
    );
  } catch (error) {
    console.error("account.delete.storage.error", { error, uid, prefix });
  }
}

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.startsWith(AUTH_HEADER_PREFIX)
      ? authHeader.slice(AUTH_HEADER_PREFIX.length)
      : null;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let decodedToken: { uid: string };
    try {
      decodedToken = await auth.verifyIdToken(token);
    } catch {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const uid = decodedToken.uid;

    if (!uid) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userDocRef = db.collection("users").doc(uid);

    if ("recursiveDelete" in db) {
      await (db as Firestore).recursiveDelete(userDocRef);
    } else {
      await deleteDocumentWithSubcollections(userDocRef);
    }

    await auth.deleteUser(uid);
    void deleteUserStorageFiles(uid);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("account.delete.error", { error });
    const message = error instanceof Error ? error.message : "Unknown server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
