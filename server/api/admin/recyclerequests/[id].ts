import { RecycleRequest } from "~~/server/types";
import { getRecycleRequestData } from "./data";

export default defineEventHandler((event) => {
  return getRecycleRequestData().find((d) => {
    return String(d.id) === String(event.context.params.id);
  });
});
