import { firestore } from "~~/server/utils/firebase";
import { normalizeRecyclable, TABLE_NAME } from "./utils";

export default defineEventHandler(async (event) => {
  const ref = firestore.collection(TABLE_NAME).doc(event.context.params.id);
  const snapshot = await ref.get();
  return normalizeRecyclable(snapshot);
});
