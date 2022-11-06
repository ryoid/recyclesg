import { Recyclable } from "~~/server/types";
import { firestore } from "~~/server/utils/firebase";

export default defineEventHandler(async (event) => {
  const ref = firestore.collection(`recyclable`).doc(event.context.params.id);
  const snapshot = await ref.get();
  return {
    ...snapshot.data(),
    id: snapshot.id,
  } as Recyclable;
});
