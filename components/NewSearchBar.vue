<template>
  <div class="mx-auto">
    <div class="p-inputgroup">
      <AutoComplete class="p-autocomplete" v-model="search" :suggestions="suggestions" @complete="showResults($event)" @item-select="$emit('item-select', $event.value)"
        optionLabel="name" placeholder="Flyer, magazine, packaging" />
      <span class="p-inputgroup-addon">
        <i class="pi pi-search my-auto"></i>
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Recyclable } from '~~/server/types';

let search = ref<string>()
let suggestions = ref<Recyclable[]>([])

async function showResults(event) {
  suggestions.value = await $fetch(`/api/admin/recyclable/search?q=${search.value}`);
}


</script>

