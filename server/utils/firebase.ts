import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

import serviceAccount from "../../serviceAccount.json";

if (!process.env.FIREBASE_DATABASE_URL)
  throw new Error("Missing env var 'FIREBASE_DATABASE_URL'");
if (!process.env.GOOGLE_APPLICATION_CREDENTIALS)
  throw new Error("Missing env var 'GOOGLE_APPLICATION_CREDENTIALS'");

export const app = initializeApp({
  credential: cert(serviceAccount as any),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

export const firestore = getFirestore();
