<template>
  <NuxtLink :href="props.link">
    <li
      :class="['py-4 px-3 cursor-pointer peer relative', { 'border-black border-b-[3px]': props.name === route.name.toString() }]">
      <div class="bg-gray-500 h-full w-full" />
      {{ props.label }}
    </li>
  </NuxtLink>
</template>


<script setup lang="ts">
export type Props = {
  link: string
  label: string
  name: string
}

const props = defineProps<Props>()

const route = useRoute()
</script>