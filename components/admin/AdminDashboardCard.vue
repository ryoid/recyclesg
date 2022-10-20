import { AccentLine } from '../../.nuxt/components';
<template>
  <div
    class="bg-white rounded-lg p-6 transition shadow-[0_1px_3px_rgba(15,23,42,0.03),0_1px_2px_rgba(15,23,42,0.06)] ring-1 ring-slate-600/[0.04] group relative flex flex-col overflow-hidden"
    :style="{ height: height ? `${height}px` : 'auto' }">
    <component v-if="!!accentLine" :is="accentLine == 'line' ? AccentLine : AccentGlow" />
    <NuxtLink v-if="link" :class="['pb-3', {
      'cursor-pointer': !!link,
    }]" :href="link">
      <div class="flex justify-between">
        <h2 class="text-neutral-800 font-semibold text-lg">{{ title }}</h2>
        <div v-if="link" class="transition opacity-0 group-hover:opacity-100">
          <Tag name="View all" size="sm" />
        </div>
      </div>
      <p class="text-neutral-600 text-xs" v-if="!!subtitle">{{ subtitle }}</p>
    </NuxtLink>
    <div v-else :class="['pb-3', {
      'cursor-pointer': !!link,
    }]">
      <div class="flex justify-between">
        <h2 class="text-neutral-800 font-semibold text-lg">{{ title }}</h2>
        <div v-if="link" class="transition opacity-0 group-hover:opacity-100">
          <Tag name="View all" size="sm" />
        </div>
      </div>
      <p class="text-neutral-600 text-xs" v-if="!!subtitle">{{ subtitle }}</p>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import AccentLine from '@/components/AccentLine.vue';
import AccentGlow from '@/components/AccentGlow.vue';

export type Props = {
  title: string
  subtitle?: string
  accentLine?: string
  height?: number
  link?: string
}

const props = withDefaults(defineProps<Props>(), {
})
</script>