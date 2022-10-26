<template>
  <div>
    <h1 class="text-3xl font-bold underline">
      Admin / Requests / [{{ id }}] detail
    </h1>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
});

const route = useRoute()
const id = route.params.id

</script>