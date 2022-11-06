import { firestore } from "~~/server/utils/firebase";
import { normalizeRecycleRequest, TABLE_NAME } from "./utils";

export default defineEventHandler(async () => {
  const table = firestore.collection(TABLE_NAME);
  const snapshot = await table.get();
  return snapshot.docs.map(normalizeRecycleRequest).reduce(
    (acc, req) => {
      if (req.status === "completed") {
        acc.completed.push(req);
      } else if (req.status === "rejected") {
        acc.rejected.push(req);
      } else {
        acc.pending.push(req);
      }
      return acc;
    },
    { completed: [], rejected: [], pending: [] }
  );
});
