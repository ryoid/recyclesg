import { Recyclable } from "~~/server/types";
import { firestore } from "~~/server/utils/firebase";

export default defineEventHandler(async (event) => {
  const table = firestore.collection(`recyclable`);
  const snapshot = await table.get();
  return snapshot.docs.map((value) => {
    return { ...value.data(), id: value.id } as Recyclable;
  });
});
