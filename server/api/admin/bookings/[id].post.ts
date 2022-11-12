import { firestore } from "~~/server/utils/firebase";
import { Timestamp } from "firebase-admin/firestore";
import { TABLE_NAME } from "./utils";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const table = firestore.collection(TABLE_NAME);
  const ref = table.doc(event.context.params.id);

  if (body.pickupDate) {
    body.pickupDate = Timestamp.fromDate(new Date(body.pickupDate));
  }
  return ref.update(body);
});
