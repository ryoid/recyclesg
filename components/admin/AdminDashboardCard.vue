<template>
  <div class="bg-white border rounded-lg p-6" :style="{ height: height + 'px' }">
    <h2 class="text-neutral-800 font-semibold">{{ title }}</h2>
    <div>
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  height: {
    type: Number,
    default: 300,
  },
});
</script>