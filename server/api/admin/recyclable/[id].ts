import { Recyclable } from "~~/server/types";
import jsonData from "./data.json";

function getRecyclableData(): Recyclable[] {
  return jsonData.map((d) => ({
    ...d,
    tags: ["test", "two"],
    createdAt: new Date().toISOString(),
  }));
}

export default defineEventHandler((event) => {
  return getRecyclableData().find((d) => {
    return String(d.id) === String(event.context.params.id);
  });
});
