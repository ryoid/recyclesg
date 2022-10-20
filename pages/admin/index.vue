<template>
  <AdminHeader title="Dashboard" subtitle="Your overview" />

  <div class="grid grid-cols-2 gap-2 lg:gap-4">
    <AdminDashboardCard title="Top 10 searches today" class="col-span-2">
      Chart
    </AdminDashboardCard>

    <AdminDashboardCard title="Pending Requests">
      Cards
    </AdminDashboardCard>

    <AdminDashboardCard title="Completed Requests">
      Cards
    </AdminDashboardCard>
  </div>
</template>

<script>
definePageMeta({
  layout: "admin",
});
</script>