import { RecycleRequest } from "~~/server/types";
import { RECYCLE_REQUESTS_DATA, updateRecycleRequestData } from "./data";
import fs from "fs";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body.status) throw new Error("Missing 'status' field");

  if (["completed", "rejected", "pending"].indexOf(body.status) === -1)
    throw new Error("Invalid 'status' value");

  const req = await updateRecycleRequestData({
    id: event.context.params.id,
    status: body.status,
  });

  return req;
});
