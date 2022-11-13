<template>
  <div class="relative">
    <div class="absolute inset-x-0 bg-white z-20 shadow-lg rounded-xl border" v-if="uploaderVisible">
      <div class="text-center text-lg py-3">
        Upload your photo
      </div>
      <div class="absolute top-2 right-0 flex items-center pr-2">
        <button class="hover:bg-gray-200 bg-gray-100 p-2 rounded-xl" title="Upload image"
          @click="event => uploaderVisible = false">
          <div class="h-5 w-5 text-gray-600 pi pi-times" aria-hidden="true" />
        </button>
      </div>

      <div ref="uploadInput">
        <NewImageUploader
          @uploaded="(annotations, url) => { uploaderVisible = false; $emit('uploaded', annotations, url) }" />
      </div>
    </div>
    <Combobox v-model="selected" @update:modelValue="value => $emit('item-select', value)">
      <div class="relative mt-1">
        <div
          class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none border focus-within:ring-2 focus-within:ring-teal-700 hover:focus-within:ring-teal-700 hover:focus-within:ring-2 hover:ring-1 hover:ring-teal-700/50">
          <ComboboxInput ref="searchInput"
            class="w-full border-none py-4  pl-3 pr-10 leading-5 text-gray-900 focus:ring-0 outline-none"
            @change="searchResults" placeholder="Paper, Plastic Bag" />

          <div class="absolute inset-y-0 right-0 flex items-center pr-2">
            <button class="bg-teal-700 p-2 rounded-xl" title="Upload image" @click="showUploader">
              <div class="h-5 w-5 text-white pi pi-camera" aria-hidden="true" />
            </button>
          </div>
        </div>
        <transition enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-out" leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0">
          <ComboboxOptions class="z-10 absolute mt-1 max-h-60 w-full overflow-auto bg-white shadow-lg rounded-lg py-2">
            <div v-if="query.length > 0 && query !== ''">
              <ComboboxOption v-for="recyclable in suggestions" as="template" :key="recyclable.id" :value="recyclable"
                v-slot="{ selected, active }">
                <li class="relative cursor-default select-none py-2 pl-4 pr-4 flex items-center gap-2" :class="{
                  'bg-teal-600 text-white': active,
                  'text-gray-900': !active,
                }">
                  <MagnifyingGlassIcon class="h-4 w-4 text-gray-400" />
                  <span class="block truncate" :class="{ 'font-medium': selected, 'font-normal': !selected }">
                    {{ recyclable.name }}
                  </span>
                </li>
              </ComboboxOption>
            </div>
          </ComboboxOptions>
        </transition>
      </div>
    </Combobox>
    <div class="my-2 flex flex-col gap-2">
      <div class="flex">
        <div class="mx-3 text-gray-400 rounded-lg text-sm">Popular Searches</div>
      </div>
      <div class="flex gap-2 px-2 flex-wrap">
        <NuxtLink v-for="r in topSearches.data.value" :href="`/search?q=${r.term}`"
          class="px-4 py-2 bg-gray-100  rounded-lg hover:bg-gray-200 text-gray-500 cursor-pointer text-sm">
          {{ r.term }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Recyclable } from '~~/server/types';
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
} from '@headlessui/vue'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'

let debounceTimeout: NodeJS.Timeout;
const searchInput = ref(null)
const selected = ref<any>(null)
const loading = ref<boolean>(false)
const query = ref<string>('')
const suggestions = ref<Recyclable[]>([])

const uploaderVisible = ref<boolean>(false)
const uploadInput = ref(null)

const topSearches = await useFetch('/api/admin/popular-searches')

async function searchResults(event) {
  query.value = event.target.value
  if (event.target.value.length < 1) {
    suggestions.value = []
    return
  }

  suggestions.value = [{
    id: 'temp',
    name: event.target.value,
    material: '', tags: [],
    description: '', recyclable: false
  }]

  if (debounceTimeout) clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(async () => {
    loading.value = true
    try {
      const results = (await $fetch(`/api/admin/recyclable/search?q=${event.target.value}`)) as Recyclable[]
      suggestions.value = [{
        id: 'temp',
        name: event.target.value,
        material: '', tags: [],
        description: '', recyclable: false
      }, ...results]
      await $fetch('/api/events', {
        method: 'POST',
        body: JSON.stringify({
          ev: 'search',
          data: {
            search_term: event.target.value,
            number_of_results: results.length,
          },
        }),
      })
    } catch (err) {
      console.log(err);
    } finally {
      loading.value = false
    }
  }, 150);
}


function showUploader(event) {
  uploaderVisible.value = true
}

</script>

