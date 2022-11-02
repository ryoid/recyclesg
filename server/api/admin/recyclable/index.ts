import { Recyclable } from "~~/server/types";
import jsonData from "./data.json";

function getRecyclableData(): Recyclable[] {
  const ids = new Map<any, boolean>();
  return jsonData
    .map((d) => ({
      ...d,
      tags: ["test", "two"],
      createdAt: new Date().toISOString(),
    }))
    .filter((d) => {
      if (ids.get(d.id)) return false;
      ids.set(d.id, true);
      return true;
    });
}

export default defineEventHandler((event) => {
  return getRecyclableData();
});
