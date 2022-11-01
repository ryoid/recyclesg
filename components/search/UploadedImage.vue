<template>
  <img :src="source" alt="uploaded image">
</template>

<script setup lang="ts">
export type Props = {
  source: string
}

const props = withDefaults(defineProps<Props>(), {
})
</script>