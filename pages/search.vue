<template>

  <div>
    <h1 class="text-2xl font-semibold py-4">Search results</h1>
    <div v-if="search.data.value.length < 1">
      <p class="text-gray-500">No results found.</p>
    </div>
    <div v-else-if="mainResult">
      <ResultAccordion :key="mainResult.id" :item="mainResult" />
    </div>
    <div v-if="mainResult && alternativeResults.length > 0">
      <h2 class="text-lg py-4">Alternative Results</h2>
    </div>
    <div class="flex flex-col gap-2">
      <ResultAccordion v-for="item of alternativeResults" :key="item.id" :item="item" />
    </div>
  </div>

</template>

<script setup lang="ts">
import { Recyclable } from '~~/server/types';

const route = useRoute()

const search = await useFetch<Recyclable[]>(route.query.tags ? `/api/admin/recyclable/tags?tags=${route.query.tags}` : `/api/admin/recyclable/search?q=${route.query.q}`)

const mainResult = search.data.value.find((item) => {
  return item.name.toLowerCase() === (route.query.tags ?? route.query.q).toString().toLowerCase()
})

const alternativeResults = search.data.value.filter((item) => {
  return item.name.toLowerCase() !== (route.query.tags ?? route.query.q).toString().toLowerCase()
})

</script>
