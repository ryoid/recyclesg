<template>
  <div class="pb-6 pt-12">
    <h1 class="text-4xl font-bold">{{ title }}</h1>
    <p class="text-neutral-600" v-if="!!subtitle">{{ subtitle }}</p>
    <slot />
  </div>
</template>

<script setup lang="ts">
export type Props = {
  title: string
  subtitle?: string
}

const props = defineProps<Props>()
</script>