import { firestore } from "~~/server/utils/firebase";
import { Timestamp } from "firebase-admin/firestore";
import { normalizeBookings, TABLE_NAME } from "./utils";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body.name) throw new Error("Missing 'name' field");

  const table = firestore.collection(TABLE_NAME);

  if (body.pickupDate) {
    body.pickupDate = Timestamp.fromDate(new Date(body.pickupDate));
  }
  const ref = await table.add(body);
  const snapshot = await ref.get();
  return normalizeBookings(snapshot);
});
