import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

import serviceAccount from "../../serviceAccount.json";

export const app = initializeApp({
  credential: cert(serviceAccount as any),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

export const firestore = getFirestore();
