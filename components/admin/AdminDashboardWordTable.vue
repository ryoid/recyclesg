<template>
  <table class="table-auto">
    <thead>
      <tr>
        <th class="border-b font-medium p-2 pl-8 pt-0 pb-3 text-gray-400 text-xs text-left">
          Word</th>
        <th class="border-b font-medium p-2 pl-8 pt-0 pb-3 text-gray-400 text-xs text-left">
          Count</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index)  in data.words">
        <td :class="['border-gray-100 p-2 pl-8 text-gray-500', {
          'border-b': (index < (data.words.length - 1)),
        }]">{{
        item.word }}</td>
        <td :class="['border-gray-100 p-2 pr-8 text-gray-500', {
          'border-b': (index < (data.words.length - 1)),
        }]">{{ item.count }}</td>
      </tr>
    </tbody>
  </table>
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