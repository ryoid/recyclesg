import { RecycleRequest } from "~~/server/types";

export const TABLE_NAME = "recyclerequests";

export const normalizeRecycleRequest = (
  data: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>
) => {
  return {
    ...data.data(),
    id: data.id,
    createdAt: data.createTime.toDate().toISOString(),
    updatedAt: data.updateTime.toDate().toISOString(),
  } as RecycleRequest;
};
