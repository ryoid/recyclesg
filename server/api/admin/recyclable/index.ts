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
  if (event.req.method === "GET") {
    console.log("log get root");
  }
  return getRecyclableData();
});
