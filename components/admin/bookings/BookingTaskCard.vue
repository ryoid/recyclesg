<template>
  <NuxtLink :href="`/admin/bookings/${booking.id}`">
    <div
      class="h-24 flex px-3 py-3 gap-3 cursor-pointer rounded-lg transition hover:bg-neutral-100 group saturate-[0.8] hover:saturate-100">
      <div class="relative h-full aspect-square bg-neutral-50 rounded-lg ">
        <img class="absolute inset-0 aspect-square object-cover rounded-lg" :src="booking.image" />
      </div>
      <div class="w-full flex flex-col justify-between">
        <div>
          <div class="inline-flex gap-1.5 w-full md:justify-between lg:justify-start">
          {{ booking.name }}
          <!-- <div class="">
            <Tag :name="booking.status" :color="getStatusColor(booking.status)" />
          </div> -->
        </div>
        <div class="text-sm text-neutral-400">
          {{ booking.address }}, {{ booking.postalCode}}
        </div>
        </div>

        <div class="flex justify-between text-sm text-neutral-700">
          <div>Pickup {{ formatDateDistance(booking.pickupDate) }}</div>
          <div>{{ formatDate(booking.pickupDate) }}</div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { formatDistanceToNow, format } from 'date-fns';
import { CollectionBooking } from '~~/server';
import { getStatusColor } from '@/components/utils';

export type Props = {
  booking: CollectionBooking
}

const props = defineProps<Props>()

  const formatDateDistance = (date: string) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}
const formatDate = (date: string) => {
  return format(new Date(date),  'd MMM hh:mm a')
}
</script>