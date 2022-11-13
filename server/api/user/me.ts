import { firestore } from "~~/server/utils/firebase";

// Return current user from cookie middleware
export default defineEventHandler(async (event) => {
  // @ts-ignore
  const user = event.req.user;

  const table = firestore.collection("users");
  const snapshot = await table.where("uid", "==", user.uid).get();

  if (snapshot.empty) throw new Error("Failed to find user");

  const profile = snapshot.docs[0].data();
  if (!profile.points) profile.points = 0;
  return profile;
});
