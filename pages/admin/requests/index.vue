<template>
  <div>
    <AdminHeader title="Requests" subtitle="Recyclable Requests" />

    <div class="flex flex-col gap-4" v-auto-animate="{ duration: 500 }">
      <AdminDashboardCard title="Uncompleted Requests">
        <div class="bg-gray-100 rounded p-2 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
          <RecycleRequestTaskCard v-for="request in data.pending" :request="request" :key="request.id"
            class="bg-white rounded border border-gray-200 hover:border-gray-300" />
        </div>
      </AdminDashboardCard>

      <AdminDashboardCard title="Completed Requests">
        <div class="bg-gray-100 rounded p-2 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
          <RecycleRequestTaskCard v-for="request in data.completed" :request="request" :key="request.id"
            class="bg-white rounded border border-gray-200 hover:border-gray-300" />

          <hr v-if="data.rejected.length > 0" class="md:col-span-2 xl:col-span-3" />

          <RecycleRequestTaskCard v-for="request in data.rejected" :request="request" :key="request.id"
            class="bg-white rounded border border-gray-200 hover:border-gray-300" />
        </div>
      </AdminDashboardCard>

    </div>
  </div>
</template>

<script setup lang="ts">
import RecycleRequestTaskCard from '~~/components/admin/requests/RecycleRequestTaskCard.vue';

definePageMeta({
  layout: "admin",
});

const route = useRoute()

const { data, pending, refresh, error } = await useFetch('/api/admin/recyclerequests/filtered', {
})

onMounted(() => {
  window.setInterval(() => {
    refresh()
  }, 3000)
})
</script>