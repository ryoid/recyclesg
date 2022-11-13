import { firestore } from "~~/server/utils/firebase";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { ev, data } = body;
  const table = firestore.collection(ev);
  await table.add({
    ...data,
    createdAt: new Date(),
  });
  return {};
});
