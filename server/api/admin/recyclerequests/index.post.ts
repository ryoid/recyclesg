import { firestore } from "~~/server/utils/firebase";
import { normalizeRecycleRequest, TABLE_NAME } from "./utils";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body.description) throw new Error("Missing 'description' field");

  const table = firestore.collection(TABLE_NAME);
  const ref = await table.add(body);
  const snapshot = await ref.get();
  return normalizeRecycleRequest(snapshot);
});
