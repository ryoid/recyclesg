<template>
  <div>
    <DataTable :value="data.words" class="p-datatable-sm" responsiveLayout="scroll">
      <Column field="word" header="Word"></Column>
      <Column field="count" header="Count"></Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
const { data, pending, refresh, error } = await useFetch('/api/admin/top-words', {
})

onMounted(() => {
  window.setInterval(() => {
    refresh()
  }, 2000)
})
</script>