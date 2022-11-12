import { query, where } from "firebase/firestore";
import { firestore } from "~~/server/utils/firebase";

export default defineEventHandler(async (event) => {
  const { user } = await readBody(event);
  const table = firestore.collection("users");
  const snapshot = await table
    .select("role")
    .where("uid", "==", user.uid)
    .get();

  if (snapshot.empty) {
    await table.add({
      uid: user.uid,
      role: "user",
    });
  }

  const role = !snapshot.empty ? snapshot.docs[0].data().role : "user";

  // @ts-ignore
  event.req.user = user;

  return { updated: true, role };
});
