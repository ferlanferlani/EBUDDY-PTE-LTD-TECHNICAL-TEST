import admin from "firebase-admin";
// import dotenv from "dotenv";
import path from "path";

// dotenv.config();

const serviceAccountPath = path.resolve(
  __dirname,
  "firebaseServiceAccount.json"
);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountPath),
});

const db = admin.firestore();
export { db };
