import { firestore } from "~~/server/utils/firebase";
import { normalizeBookings, TABLE_NAME } from "./utils";

export default defineEventHandler(async (event) => {
  const ref = firestore.collection(TABLE_NAME).doc(event.context.params.id);
  const snapshot = await ref.get();
  return normalizeBookings(snapshot);
});
