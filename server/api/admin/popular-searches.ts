import { addDays } from "date-fns";
import { firestore } from "~~/server/utils/firebase";

export default defineEventHandler(async (event) => {
  const searchEvents = await firestore
    .collection("view_search_results")
    .where("createdAt", ">", addDays(new Date(), -7))
    .get();

  const searchWc = searchEvents.docs.reduce((acc, d) => {
    const data = d.data();

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

  return searches.slice(0, 5) ?? [];
});
