<template>
  <div :class="['px-3 pb-3 pt-1 rounded', {
    'bg-orange-700': !props.item.recyclable,
    'bg-teal-700': props.item.recyclable,
  }]">
    <div class="text-white">
      {{ props.item.recyclable ? 'Recyclable' : 'Not Recyclable' }}
    </div>
    <Disclosure v-slot="{ open }">
      <DisclosureButton
        :class="['flex w-full justify-between items-center bg-white p-2', { 'rounded-t': open, 'rounded': !open }]">
        <div class="flex flex-col items-start">
          <div class="uppercase text-sm font-semibold text-gray-600">
            {{ props.item.material }}
          </div>
          <div class="text-2xl">{{ props.item.name }}</div>
        </div>
        <ChevronUpIcon :class="open ? 'rotate-180 transform' : ''" class="h-5 w-5 text-teal-500" />
      </DisclosureButton>
      <transition>
        <DisclosurePanel class="p-2 bg-white rounded-b">
          <div class="uppercase text-sm font-semibold text-gray-500">
            Description
          </div>
          <div class="text-gray-800 prose" v-html="props.item.description">
          </div>
        </DisclosurePanel>
      </transition>
    </Disclosure>
  </div>
</template>

<script lang="ts" setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { ChevronUpIcon } from '@heroicons/vue/24/solid'

import { Recyclable } from '~~/server/types';
export type Props = {
  item: Recyclable
}

const props = defineProps<Props>();
</script>
