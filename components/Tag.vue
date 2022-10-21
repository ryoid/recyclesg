<template>
  <div :class="[
  'inline-flex capitalize items-center', 
  {
    'text-xs rounded-lg px-1.5': size === 'xs',
    'text-sm rounded-lg py-0.5 px-1.5': size === 'sm',
    'text-md rounded-lg py-0.5 px-1.5': size === 'md',
  },
  {
    'bg-blue-50 text-blue-500': color === 'blue',
    'bg-gray-50 text-gray-500': color === 'gray',
    'bg-green-50 text-green-500': color === 'green',
    'bg-red-50 text-red-500': color === 'red',
    'bg-yellow-50 text-yellow-500': color === 'yellow',
    'bg-purple-50 text-purple-500': color === 'purple',
    'bg-indigo-50 text-indigo-500': color === 'indigo',
  }
  ]">
    {{ name }}
  </div>
</template>

<script setup lang="ts">
export type Props = {
  name: string
  size?: "xs" | "sm" | "md"
  color?: 'blue' | 'gray' | 'green' | 'red' | 'yellow' | 'purple' | 'indigo'
}

const props = withDefaults(defineProps<Props>(), {
  color: 'blue',
  size: 'xs'
})
</script>