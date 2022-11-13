import { addDays, isToday } from "date-fns";
import { firestore } from "~~/server/utils/firebase";
import {
  TABLE_NAME as REQUESTS_TABLE_NAME,
  normalizeRecycleRequest,
} from "./recyclerequests/utils";

export default defineEventHandler(async () => {
  const requestsTable = firestore.collection(REQUESTS_TABLE_NAME);
  const searchTable = firestore.collection("view_search_results");
  const [requestsSnap, searchesSnap] = await Promise.all([
    requestsTable.get(),
    searchTable.where("createdAt", ">", addDays(new Date(), -7)).get(),
  ]);
  const requests = requestsSnap.docs.map(normalizeRecycleRequest);

  return {
    searches: searchesSnap.docs.map((d) => {
      return {
        ...d.data(),
        createdAt: d.createTime.toDate(),
      };
    }),
    pending_requests: requests
      .filter((request) => request.status === "pending")
      .slice(0, 4),
    pending_requests_count: requests.filter(
      (request) => request.status === "pending"
    ).length,
    completed_requests: requests
      .filter(
        (request) =>
          request.status === "completed" || request.status === "rejected"
      )
      .slice(0, 4),
    completed_requests_today_count: requests.filter(
      (request) =>
        (request.status === "completed" || request.status === "rejected") &&
        isToday(new Date(request.createdAt))
    ).length,
    counts: {
      users: 12,
      bookings: 6,
      otherthing: 15,
    },
  };
});
