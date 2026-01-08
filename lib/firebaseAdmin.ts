import admin from "firebase-admin";

const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } =
  process.env;

if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) {
  throw new Error(
    "Missing Firebase Admin credentials. Ensure FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY are set.",
  );
}

const globalForFirebaseAdmin = globalThis as typeof globalThis & {
  firebaseAdmin?: typeof admin;
};

const firebaseAdmin =
  globalForFirebaseAdmin.firebaseAdmin ??
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: FIREBASE_PROJECT_ID,
      clientEmail: FIREBASE_CLIENT_EMAIL,
      privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });

globalForFirebaseAdmin.firebaseAdmin = firebaseAdmin;

export const auth = firebaseAdmin.auth();
export const db = firebaseAdmin.firestore();
export default firebaseAdmin;
