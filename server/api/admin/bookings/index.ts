import { firestore } from "~~/server/utils/firebase";
import { normalizeBookings, TABLE_NAME } from "./utils";

export default defineEventHandler(async () => {
  const table = firestore.collection(TABLE_NAME);
  const snapshot = await table.get();
  return snapshot.docs.map(normalizeBookings);
});
