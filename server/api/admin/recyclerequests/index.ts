import { firestore } from "~~/server/utils/firebase";

export default defineEventHandler(async (event) => {
  const ref = firestore.doc(`recyclerequests`);
  const snapshot = await ref.get();
  const data = snapshot.data();
  return data;
});
