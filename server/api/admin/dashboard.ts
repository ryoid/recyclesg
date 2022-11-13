import {
  addDays,
  eachHourOfInterval,
  endOfDay,
  format,
  isToday,
  startOfDay,
} from "date-fns";
import { firestore } from "~~/server/utils/firebase";
import {
  TABLE_NAME as REQUESTS_TABLE_NAME,
  normalizeRecycleRequest,
} from "./recyclerequests/utils";

export default defineEventHandler(async () => {
  const requestsTable = firestore.collection(REQUESTS_TABLE_NAME);
  const searchEventTable = firestore.collection("view_search_results");
  const [requestsSnap, searchesSnap, usersCount, requestsCount, bookingsCount] =
    await Promise.all([
      requestsTable.get(),
      searchEventTable.where("createdAt", ">", addDays(new Date(), -1)).get(),
      firestore.collection("users").count().get(),
      firestore.collection("recyclerequests").count().get(),
      firestore.collection("bookings").count().get(),
    ]);
  const requests = requestsSnap.docs.map(normalizeRecycleRequest);

  // Hour, count
  const searchActivityCount = {} as Record<string, number>;
  eachHourOfInterval({
    start: startOfDay(new Date()),
    end: new Date(),
  }).forEach((slot) => {
    searchActivityCount[slot.toISOString()] = 0;
    slot.setMinutes(30);
    searchActivityCount[slot.toISOString()] = 0;
  });

  const searchWc = searchesSnap.docs.reduce((acc, d) => {
    const data = d.data();
    const bucket = data.createdAt.toDate();

    if (isToday(bucket)) {
      bucket.setSeconds(0);
      bucket.setMilliseconds(0);
      bucket.setMinutes(bucket.getMinutes() > 30 ? 0 : 30);
      if (bucket.getMinutes() > 30) bucket.setHours(bucket.getHours() + 1);

      const key = bucket.toISOString();
      if (key in searchActivityCount) {
        searchActivityCount[key] += 1;
      } else {
        searchActivityCount[key] = 1;
      }
    }

    if (data.search_term in acc) {
      acc[data.search_term] += 1;
    } else {
      acc[data.search_term] = 1;
    }
    return acc;
  }, {} as Record<string, number>);

  let searches = [];
  for (let key in searchWc) {
    if (searchWc.hasOwnProperty(key)) {
      searches.push({ term: key, count: searchWc[key] });
    }
  }
  searches.sort((a, b) => b.count - a.count);

  let searchActivity = [];
  for (let key in searchActivityCount) {
    if (searchActivityCount.hasOwnProperty(key)) {
      searchActivity.push({ date: key, value: searchActivityCount[key] });
    }
  }
  searchActivity
    .sort((a, b) => b.date - a.date)
    .splice(0, searchActivity.length - 12);

  return {
    // get count of unique search_terms from searchesSnap
    searches: searches.slice(0, 10),
    search_activity: {
      labels: searchActivity.map((d) => format(new Date(d.date), "h:mm a")),
      datasets: [
        {
          label: "Search Activity",
          data: searchActivity.map((a) => a.value),
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    },
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
      users: usersCount.data().count,
      requests: requestsCount.data().count,
      bookings: bookingsCount.data().count,
    },
  };
});
