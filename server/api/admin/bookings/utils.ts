import { CollectionBooking } from "~~/server/types";

export const TABLE_NAME = "bookings";

export const normalizeBookings = (
  data: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>
) => {
  const _data = data.data();
  return {
    ..._data,
    id: data.id,
    pickupDate: _data.pickupDate.toDate().toISOString(),
  } as CollectionBooking;
};
