import { Recyclable } from "~~/server/types";

export const TABLE_NAME = "recyclable";

export const normalizeRecyclable = (
  data: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>
): Recyclable => {
  return {
    ...data.data(),
    id: data.id,
  } as Recyclable;
};
