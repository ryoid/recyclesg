import { CollectionBooking } from "~~/server/types";

export const TABLE_NAME = "bookings";

export const normalizeBookings = (
  data: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>
) => {
  return {
    ...data.data(),
    id: data.id,
  } as CollectionBooking;
};
