import { firestore } from "~~/server/utils/firebase";

// Return current user from cookie middleware
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { binId, uid } = body;

  const snapshot = await firestore.collection("recyclebins").doc(binId).get();

  if (!snapshot.exists) throw new Error("Failed to find recyclebin");

  const table = firestore.collection("users");
  const uSnapshot = await table.where("uid", "==", uid).get();
  const profile = uSnapshot.docs[0].data();
  if (!profile.points) profile.points = 0;

  const newPoints = Number(profile.points) + Math.abs(Number(150));

  const ref = table.doc(uSnapshot.docs[0].id);
  await ref.update({
    points: newPoints,
  });
  return profile;
});
