<template>
  <div 
    :class="['p-4', (item.recyclable ? 'recyclable' : 'non-recyclable'), { 'not-found': item.recyclable == null }, 'rounded-lg', 'my-4']"
    :onclick="expand"
    >
    <p class="font-bold" style="color: #fffff8">
      <i class="pi pi-chevron-down mr-1" v-if="expanded" ></i>
      <i class="pi pi-chevron-right" v-else ></i>
      {{ item.name }}
    </p>

    <div style="background-color: white;" class="rounded p-3 m-2 panel" :id="item_id">
      <small>Material Type:</small>
      <p>{{ item.material }}</p>
      <!-- if score percentage is < 50%, add "we are not able to confidently identify this item and nuxt link back to home page" -->
      <hr>
      <small>Recycling Status:</small>
      <p class="font-semibold" v-if="item.recyclable == null">Not Found. We do not have this item in our records
        currently</p>
      <p class="font-semibold" v-else>{{ item.recyclable ? 'Recyclable' : 'Non-Recyclable' }}</p>

      <hr>
      <small>Description:</small>
      <p><span v-html="item.description"></span></p>
    </div>
    
  </div>
</template>

<script lang="ts" setup>
import { Recyclable } from '~~/server/types';
export type Props = {
  item: Recyclable
  item_id: string
}

const props = defineProps<Props>();
let expanded = ref(false); // flag to check if accordion is expanded

function expand() {
  let panel = document.getElementById(props.item_id);
  if (expanded.value) {
    panel.style.maxHeight = null;
    panel.style.display = "none";
    expanded.value = false;
  } else {
    panel.style.display = "block";
    panel.style.maxHeight = panel.scrollHeight + 'px';
    expanded.value = true;
  }
}

</script>

<style>
.panel {
  max-height: 0;
  display: none;
  overflow: hidden;
  transition: max-height 0.2s ease-out;
}

</style>