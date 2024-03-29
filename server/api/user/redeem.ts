import { FieldValue } from "firebase-admin/firestore";
import { firestore } from "~~/server/utils/firebase";

// Return current user from cookie middleware
export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const table = firestore.collection("users");
  const snapshot = await table.where("uid", "==", body.uid).get();

  if (snapshot.empty) throw new Error("Failed to find user");

  const profile = snapshot.docs[0].data();
  if (!profile.points) profile.points = 0;

  const reward = await firestore.collection("rewards").doc(body.rewardId).get();
  const newPoints = Number(profile.points) - Math.abs(Number(reward.data().points));

  const ref = table.doc(snapshot.docs[0].id);
  await ref.update({
    points: newPoints,
    rewards: FieldValue.arrayUnion(reward.data()),
  });
  return profile;
});
