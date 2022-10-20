<template>
  <AdminHeader title="Dashboard" subtitle="Your overview" />

  <div class="grid grid-cols-1 gap-2 md:grid-cols-2">
    <div class="md:col-span-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
      <AdminDashboardCard title="Top 10 searches today" class="lg:col-span-1" accent-line="glow">
        <AdminDashboardWordTable />
      </AdminDashboardCard>
      <div class="col-span-1 lg:col-span-2 grid grid-rows-2 md:grid-rows-3 gap-2 auto-rows-auto auto-cols-auto">
        <AdminDashboardCard title="Search Activity" class="flex md:hidden lg:flex row-span-2 md:col-span-1"
          accent-line="glow">
          <p v-if="!data.completed_requests && pending">Fetching data...</p>
          <p v-else-if="error">An error occurred :(</p>
          <AdminDashboardActivityChart v-else id="search-activity" :data="searchActivity" />
        </AdminDashboardCard>
        <AdminDashboardCard class="row-span-1 md:row-span-3 lg:row-span-1 flex md:flex-col lg:flex-row flex-wrap"
          accent-line="glow">

          <div class="flex md:flex-col lg:flex-row flex-wrap justify-around h-full w-full">
            <div class="flex flex-col items-center justify-center">
              <div class="font-semibold" style="font-size: 60px">
                {{ data.counts.users }}
              </div>
              <h2 class="font-semibold">Users</h2>
              <p class="text-gray-600">In the past 24 hrs</p>
            </div>
            <div class="flex flex-col items-center justify-center">
              <div class="font-semibold" style="font-size: 60px">
                {{ data.counts.bookings }}
              </div>
              <h2 class="font-semibold">Bookings</h2>
              <p class="text-gray-600">Today</p>
            </div>
            <div class="flex flex-col items-center justify-center">
              <div class="font-semibold" style="font-size: 60px">
                {{ data.counts.otherthing }}
              </div>
              <h2 class="font-semibold">Bookings</h2>
              <p class="text-gray-600">Today</p>
            </div>
          </div>
        </AdminDashboardCard>
      </div>

    </div>

    <AdminDashboardCard title="Search Activity" class="hidden md:flex lg:hidden col-span-2" accent-line="glow">
      <p v-if="!data.completed_requests && pending">Fetching data...</p>
      <p v-else-if="error">An error occurred :(</p>
      <AdminDashboardActivityChart id="search-activity-mobile" :data="searchActivity" />
    </AdminDashboardCard>

    <AdminDashboardCard title="Pending Requests" :subtitle="`There are ${data.pending_requests_count} pending tasks`"
      link="/admin/requests?status=pending" class="col-span-1"
      :accent-line="data.pending_requests.length <= 0 ? undefined : 'line'">
      <div class=" h-full">
        <p v-if="!data.pending_requests && pending">Fetching mountains...</p>
        <p v-else-if="error">An error occurred :(</p>
        <div v-else-if="data.pending_requests.length <= 0"
          class="flex flex-col items-center justify-center h-full md:px-16 py-8">
          <div class="hidden lg:block relative aspect-[8/6] w-full overflow-hidden max-w-[300px]">
            <img src="~/assets/img/illustration/completed_tasks.svg" class="absolute inset-0" />
          </div>
          <p class="text-gray-800 text-center lg:pt-4">You have no pending requests</p>
        </div>
        <ul v-else class="-mx-3">
          <li v-for="request of data.pending_requests">
            <RecycleRequestTaskCard :request="request" />
          </li>
        </ul>
        <NuxtLink v-if="data.pending_requests_count >= 4" href="/admin/requests"
          class="flex justify-center text-blue-500 transition-opacity opacity-70 pt-2 hover:opacity-100">View all
          requests
        </NuxtLink>
      </div>
    </AdminDashboardCard>

    <AdminDashboardCard title="Completed Requests"
      :subtitle="data.completed_requests.length <= 0 ? undefined : `Completed ${data.completed_requests_today_count} tasks today`"
      link="/admin/requests" class="col-span-1">
      <div>
        <p v-if="!data.completed_requests && pending">Fetching mountains...</p>
        <p v-else-if="error">An error occurred :(</p>
        <div v-else-if="data.pending_requests.length <= 0"
          class="flex flex-col items-center justify-center h-full lg:px-16 py-8">
          <div class="hidden lg:block relative aspect-[1/1.05] w-full overflow-hidden max-w-[300px]">
            <img src="~/assets/img/illustration/no_tasks.svg" class="absolute inset-0" />
          </div>
          <p class="text-gray-800 text-center lg:pt-4">You have no recycle requests</p>
        </div>
        <ul v-else class="[&_img]:saturate-50 -mx-3">
          <li v-for="request of data.completed_requests">
            <RecycleRequestTaskCard :request="request" />
          </li>
        </ul>
        <!-- <NuxtLink href="/admin/requests"
          class="flex justify-center text-blue-500 transition-opacity opacity-70 pt-2 hover:opacity-100">View all
          requests
        </NuxtLink> -->
      </div>
    </AdminDashboardCard>
  </div>
</template>

<script setup lang="ts">
import RecycleRequestTaskCard from '~~/components/admin/requests/RecycleRequestTaskCard.vue';
definePageMeta({
  layout: "admin",
});

const { data, pending, refresh, error } = await useFetch('/api/admin/dashboard', {
})


const { data: searchActivity, ...searchActivityFetch } = await useFetch('/api/admin/search-activity', {
})

onMounted(() => {
  window.setInterval(() => {
    refresh()
    searchActivityFetch.refresh()
  }, 2000)
})
</script>