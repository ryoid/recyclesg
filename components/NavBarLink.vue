<template>
  <NuxtLink :href="props.link">
    
    <li 
    :class="['py-4 px-4 cursor-pointer hover:bg-slate-200']" >
    <i :class="[icon, 'pr-1']" style="font-size: 1rem"></i>
      {{ props.label }}
    </li>
  </NuxtLink>
</template>


<script setup lang="ts">
export type Props = {
  link: string
  label: string
  name: string
  icon: string
}

const props = defineProps<Props>()

const route = useRoute()
</script>