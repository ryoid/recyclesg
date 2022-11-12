<template>
    <div class="">
        <img :src="link" class="mx-auto w-64 sm:w-64 md:w-96 lg:w-128">
    </div>
</template>


<script lang="ts" setup>
export type Props = {
  link: string
  
}

const props = defineProps<Props>()
</script>