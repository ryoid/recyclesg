<template>
  <div>
    <AdminHeader title="Requests" subtitle="Recyclable Requests" />


    <div>
      <DataTable :value="data" scrollable scrollHeight="400px">
        <Column field="id" header="Id" style="min-width: '200px'"></Column>
        <Column field="image" header="Image" style="min-width: '200px'"></Column>
        <Column field="title" header="Title" style="min-width: '200px'"></Column>
        <Column field="description" header="Description" style="min-width: '200px'"></Column>
        <Column field="status" header="Status" style="min-width: '200px'"></Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
});

const route = useRoute()
console.log(route.query)

const { data, pending, refresh, error } = await useFetch('/api/admin/recyclerequests', {
})

onMounted(() => {
  window.setInterval(() => {
    refresh()
  }, 2000)
})
</script>