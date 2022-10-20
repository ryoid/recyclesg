<template>
  <div class="pb-6">
    <h1 class="text-4xl font-bold">{{ title }}</h1>
    <p class="text-neutral-600">{{ subtitle }}</p>
    <slot />
  </div>
</template>

<script setup>
defineProps({
  title: String,
  subtitle: String,
});
</script>