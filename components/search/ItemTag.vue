<template>

</template>

<script setup lang="ts">
// Get itemArray passed in from search index page each item as props

export type Props = {
  selectedItem: string
}


const props = withDefaults(defineProps<Props>(), {
})
</script>
