import { getRecycleRequestData } from "./data";

export default defineEventHandler((event) => {
  return getRecycleRequestData().reduce(
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
