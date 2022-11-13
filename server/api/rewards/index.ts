import { Reward } from "~~/server/types";
import { firestore } from "~~/server/utils/firebase";

export default defineEventHandler(async () => {
  const table = firestore.collection("rewards");
  const snapshot = await table.get();
  return snapshot.docs.map((d) => {
    return {
      ...d.data(),
      id: d.id,
    };
  }) as Reward[];
});
