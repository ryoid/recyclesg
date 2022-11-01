import { getRecycleRequestData } from "./data";

export default defineEventHandler((event) => {
  return getRecycleRequestData();
});
