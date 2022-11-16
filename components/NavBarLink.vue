<template>
  <NuxtLink :href="props.link">
    <li 
    :class="['flex py-2 md:py-4 pr-4 pl-3 rounded', {
      'bg-teal-700 md:bg-transparent text-white md:text-teal-700': route.name.toString().startsWith(props.name),
      'text-gray-700 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-teal-700': !route.name.toString().startsWith(props.name)
    }]" >
    <i :class="['', 'pr-1']" style="font-size: 1rem"></i>
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