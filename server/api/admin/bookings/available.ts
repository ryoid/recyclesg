import { firestore } from "~~/server/utils/firebase";
import {
  addDays,
  addHours,
  eachDayOfInterval,
  eachHourOfInterval,
} from "date-fns";
import { normalizeBookings, TABLE_NAME } from "./utils";

export default defineEventHandler(async () => {
  const start = new Date();
  const end = addDays(new Date(), 14);

  const table = firestore.collection(TABLE_NAME);
  // Filter >= start <= end
  const snapshot = await table.get();
  const bookings = snapshot.docs.map(normalizeBookings);

  const availableDays = eachDayOfInterval({ start, end });

  const unavailableSlots: Date[] = [];
  const availableSlots = availableDays.map((d) => {
    // Start 9 am
    d.setHours(9);
    d.setMinutes(0);
    d.setSeconds(0);
    d.setMilliseconds(0);

    // End 9 hours later - 6pm
    const endOfDay = addHours(d, 9);

    return eachHourOfInterval({
      start: d,
      end: endOfDay,
    }).map((slot) => {
      const available = !bookings.find(
        (b) => b.pickupDate === slot.toISOString()
      );
      if (!available) {
        unavailableSlots.push(slot);
      }
      return {
        date: slot,
        available,
      };
    });
  });

  return {
    unavailableDays: availableSlots.reduce((acc, day) => {
      let available = false;
      for (let slot of day) {
        if (slot.available) {
          available = true;
          break;
        }
      }
      if (!available) {
        const slot = day[0];
        acc.push(slot?.date);
      }
      return acc;
    }, [] as Date[]),
    unavailableSlots,
    availableSlots,
  };
});
