import { AccentLine } from '../../.nuxt/components';
<template>
  <div
    class="bg-white rounded-lg p-6 transition shadow-[0_1px_3px_rgba(15,23,42,0.03),0_1px_2px_rgba(15,23,42,0.06)] ring-1 ring-slate-600/[0.04] group relative"
    :style="{ height: height + 'px' }">
    <component v-if="!!accentLine" :is="accentLine == 'line' ? AccentLine : AccentGlow" />
    <h2 class="text-neutral-800 font-semibold">{{ title }}</h2>
    <div>
      <slot />
    </div>
  </div>
</template>

<script setup>
import AccentLine from '@/components/AccentLine.vue';
import AccentGlow from '@/components/AccentGlow.vue';
defineProps({
  title: String,
  accentLine: {
    type: String,
    default: ""
  },
  height: {
    type: Number,
    default: 300,
  },
});
</script>