import { firestore } from "~~/server/utils/firebase";
import { TABLE_NAME } from "./utils";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const table = firestore.collection(TABLE_NAME);
  const ref = table.doc(event.context.params.id);

  return ref.update(body);
});
