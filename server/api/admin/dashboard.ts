import { isToday } from "date-fns";

import { RECYCLE_REQUESTS_DATA } from "./recyclerequests/data";

export default defineEventHandler((event) => {
  return {
    searches: RECYCLE_REQUESTS_DATA.filter((request) => request.status),
    pending_requests: RECYCLE_REQUESTS_DATA.filter(
      (request) => request.status === "pending"
    ).slice(0, 4),
    pending_requests_count: RECYCLE_REQUESTS_DATA.filter(
      (request) => request.status === "pending"
    ).length,
    completed_requests: RECYCLE_REQUESTS_DATA.filter(
      (request) =>
        request.status === "completed" || request.status === "rejected"
    ).slice(0, 4),
    completed_requests_today_count: RECYCLE_REQUESTS_DATA.filter(
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
