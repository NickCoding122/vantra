import admin from "firebase-admin";

const { FIREBASE_SERVICE_ACCOUNT_JSON } = process.env;

if (!FIREBASE_SERVICE_ACCOUNT_JSON) {
  throw new Error(
    "Missing Firebase Admin credentials. Ensure FIREBASE_SERVICE_ACCOUNT_JSON is set."
  );
}

let serviceAccount: admin.ServiceAccount;
type ServiceAccountWithLegacyKey = admin.ServiceAccount & {
  private_key?: string;
  project_id?: string;
};

try {
  const parsedServiceAccount =
    JSON.parse(FIREBASE_SERVICE_ACCOUNT_JSON) as ServiceAccountWithLegacyKey;
  if (typeof parsedServiceAccount.private_key === "string" && !parsedServiceAccount.privateKey) {
    parsedServiceAccount.privateKey = parsedServiceAccount.private_key;
  }
  if (typeof parsedServiceAccount.project_id === "string" && !parsedServiceAccount.projectId) {
    parsedServiceAccount.projectId = parsedServiceAccount.project_id;
  }
  serviceAccount = parsedServiceAccount;
} catch (error) {
  const message = error instanceof Error ? error.message : "Unknown JSON parse error";
  throw new Error(
    `Invalid FIREBASE_SERVICE_ACCOUNT_JSON value. Unable to parse JSON. ${message}`
  );
}

if (typeof serviceAccount.privateKey === "string") {
  serviceAccount.privateKey = serviceAccount.privateKey.replace(/\\n/g, "\n");
}

const globalForFirebaseAdmin = globalThis as typeof globalThis & {
  firebaseAdminApp?: admin.app.App;
};

let firebaseAdminApp = globalForFirebaseAdmin.firebaseAdminApp;
let didInitialize = false;

if (!firebaseAdminApp) {
  firebaseAdminApp = admin.apps.length
    ? admin.app()
    : admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
  didInitialize = true;
}


globalForFirebaseAdmin.firebaseAdminApp = firebaseAdminApp;

if (didInitialize) {
  console.info("firebase.admin.initialized", {
    projectId: serviceAccount.projectId,
  });
}

export const auth = firebaseAdminApp.auth();
export const db = firebaseAdminApp.firestore();
export const storage = firebaseAdminApp.storage();
export const serverTimestamp = admin.firestore.FieldValue.serverTimestamp;
export default firebaseAdminApp;
