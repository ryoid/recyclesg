<template>
  <div>

    <div class="flex items-center">
      <input :id="id" type="radio" :value="value"
        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 rounded-full">
      <label :for="id" class="ml-2 text-sm font-medium text-gray-900 ">{{ label }}</label>
    </div>

  </div>
</template>

<script setup lang="ts">
export type Props = {
  id?: string
  label: string
  value: string
  size?: "xs" | "sm" | "md"
  color?: 'blue' | 'gray' | 'green' | 'red' | 'yellow' | 'purple' | 'indigo'
}

const props = withDefaults(defineProps<Props>(), {
  color: 'blue',
  size: 'xs'
})
</script>