<template>
  <div>
    <SearchNewSearchBar @item-select="testing" />
  </div>
</template>

<script lang="ts" setup>

let search = ref<string>()

function testing(e) {
  console.log(e);
}




</script>

