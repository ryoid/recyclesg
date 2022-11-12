<template>
  <div>
    <AdminHeader title="Bookings" subtitle="Recycle collection bookings" />


    <div>
      <div class="shadow-lg">
        <ClientOnly>
          <AdminBookingsTable />
        </ClientOnly>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
});
</script>