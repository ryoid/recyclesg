<template>
  <div class="item-checkbox">
    <Checkbox :inputId="itemIdx"  />
  </div>
  

</template>

<script lang="ts" setup>
import { ref } from 'vue';

export type Props = {
  itemIdx: any;
  itemName: String;
}

const props = defineProps<Props>()




</script>