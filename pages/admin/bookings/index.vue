<template>
  <div>
    <AdminHeader title="Bookings" subtitle="Recycle collection bookings" />


    <div class="flex flex-col gap-4">
      <AdminDashboardCard title="Upcoming Collections">
        <div class="bg-gray-100 rounded p-2 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
          <BookingTaskCard v-for="booking in data" :booking="booking" :key="booking.id"
            class="bg-white rounded border border-gray-200 hover:border-gray-300" />
        </div>
      </AdminDashboardCard>

      <div class="shadow-lg">
        <ClientOnly>
          <AdminBookingsTable />
        </ClientOnly>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import BookingTaskCard from '~~/components/admin/bookings/BookingTaskCard.vue';

definePageMeta({
  layout: "admin",
});

const route = useRoute()

const { data, pending, refresh, error } = await useFetch('/api/admin/bookings/future', {
})

onMounted(() => {
  window.setInterval(() => {
    refresh()
  }, 3000)
})
</script>