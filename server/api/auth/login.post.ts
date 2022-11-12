import { firestore } from "~~/server/utils/firebase";

export default defineEventHandler(async (event) => {
  const { user } = await readBody(event);

  // @ts-ignore
  event.req.user = user;

  return { updated: true };
});
