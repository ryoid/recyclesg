import { firestore } from "~~/server/utils/firebase";
import { normalizeRecyclable, TABLE_NAME } from "./utils";

export default defineEventHandler(async (event) => {
  const ref = firestore.collection(TABLE_NAME).offset(10).limit(5);
  const snapshot = await ref.get();
  return snapshot.docs.map(normalizeRecyclable);
});
