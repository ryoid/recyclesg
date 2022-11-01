<template>
  <n-collapse>
    <div :class="[recyclable ? 'bg-lime-400' : 'bg-rose-400', 'w-fit', 'rounded-lg', 'm-10', 'p-2', 'bg-slate-300']">
      <n-collapse-item :title="item_name" :name="id">
        <div :class="['bg-slate-50', 'p-2']">
          <p v-if="recyclable">Recyclable</p>
          <p v-else>Not recyclable</p>
          <p>{{ recycling_instruction }}</p>
        </div>
        
      </n-collapse-item>
    </div>

  </n-collapse>
</template>

<script>
import { NCollapse, NCollapseItem } from 'naive-ui'
export default {
  name: "ResultCollapse",
  components: {
    NCollapse,
    NCollapseItem,
  },
  props: {
    recyclable: Boolean,
    id: Number,
    item_name: String,
    recycling_instruction: String,
  }
}
</script>

