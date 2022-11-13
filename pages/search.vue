<template>
  <div>
    <div>
      <div
        class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none border focus-within:ring-2 focus-within:ring-teal-700  ">
        <input class="w-full border-none py-4  pl-3 pr-10 leading-5 text-gray-900 focus:ring-0 outline-none"
          :value="route.query.tags ?? route.query.q" disabled />

        <div class="absolute inset-y-0 right-0 flex items-center pr-2">
          <MagnifyingGlassIcon class="h-6 w-6 text-gray-400 mr-2" />
        </div>
      </div>
      <div class="mt-2 text-gray-500">
        Search for a different item. <NuxtLink to="/"><span class="text-teal-600 font-medium">Return to search.</span>
        </NuxtLink>
      </div>

    </div>

    <div v-if="user.user"
      class="flex bg-teal-500/20 text-teal-800 p-4 rounded-lg justify-between items-center mt-6 mb-2">
      <div>
        <div class="text-2xl">
          Scan to redeem points
        </div>
        <div class="text-sm">
          Scan the barcode on the blue recycle bins to redeem points.
        </div>
      </div>
      <div>
        <button :disabled="hasScanned" :class="['text-white focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-4 text-center mr-3 md:mr-0 w-full', {
          'bg-teal-600': hasScanned,
          'bg-teal-700 hover:bg-teal-800': !hasScanned
        }]" @click="startScanner">{{ hasScanned ? 'You have earned 150 points' : 'Scan Recycle Bin QR Code'
}}</button>
      </div>
    </div>

    <div v-if="hasScanned">
      <div class="bg-yellow-500/50 text-yellow-800 text-center p-4 rounded-lg justify-between items-center mt-6 mb-2">
        You just earned 150 points
      </div>
    </div>

    <div v-if="!hasScanned" id="qr-code-full-region"></div>

    <h1 class="text-2xl font-semibold py-4">Search results</h1>
    <div v-if="search.data.value.length < 1">
      <p class="text-gray-500">No results found.</p>
    </div>
    <div v-else-if="mainResult">
      <ResultAccordion :key="mainResult.id" :item="mainResult" />
    </div>
    <div v-if="mainResult && alternativeResults.length > 0">
      <h2 class="text-lg py-4">Alternative Results</h2>
    </div>
    <div class="flex flex-col gap-2">
      <ResultAccordion v-for="item of alternativeResults" :key="item.id" :item="item" />
    </div>
  </div>

</template>

<script setup lang="ts">
import { Recyclable } from '~~/server/types';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import { Html5QrcodeScanner } from 'html5-qrcode';

const user = useFirebaseUser()
const { $firebaseApp } = useNuxtApp()
const route = useRoute()
const hasScanned = ref()

let search = await useFetch<Recyclable[]>(route.query.tags ? `/api/admin/recyclable/tags` : `/api/admin/recyclable/search`, {
  query: route.query.tags ? { tags: route.query.tags } : { q: route.query.q },
  key: JSON.stringify(route.query),
})

const mainResult = search.data.value.find((item) => {
  return item.name.toLowerCase() === (route.query.tags ?? route.query.q).toString().toLowerCase()
})

const alternativeResults = search.data.value.filter((item) => {
  return item.name.toLowerCase() !== (route.query.tags ?? route.query.q).toString().toLowerCase()
})

onMounted(async () => {
  await search.refresh()
  await $fetch('/api/events', {
    method: 'POST',
    body: JSON.stringify({
      ev: 'view_search_results',
      data: {
        search_term: route.query.tags ?? route.query.q,
        number_of_results: search.data.value.length,
      },
    }),
  })
})

let scannerFetch;
function startScanner() {
  console.log('start scanner');
  const config: any = {
    fps: 10,
    qrbox: 250,
  };
  const html5QrcodeScanner = new Html5QrcodeScanner('qr-code-full-region', config, false);
  html5QrcodeScanner.render(async (decodedText, decodedResult) => {
    if (scannerFetch) return
    scannerFetch = $fetch(`/api/user/reward`, {
      method: 'POST',
      body: JSON.stringify({
        binId: decodedText,
        uid: user.value.user?.uid,
      }),
    })
    const res = await scannerFetch
    hasScanned.value = res + '|' + route.query.tags ?? route.query.q
    scannerFetch = null
  }, (err) => {
    console.log('Error scanning', err);
  });
}



</script>
