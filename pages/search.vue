<template>

  <div>
    <h1 class="text-2xl font-semibold py-4">Search results</h1>
    <div v-if="mainResult">
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
import { ref } from 'vue';
import { Recyclable, Annotation } from '~~/server/types';
import { v4 as uuidv4 } from "uuid";

const user = useFirebaseUser()
const route = useRoute()

let annotations = ref<Annotation[]>(null) // labels returned from cloud api
let imageUrl = ref(null)

let selectedItems = ref<string[]>([]);

let searchResults = ref<Recyclable[]>([]); // list of NEA recyclable items to be obtained from backend
let displayResults = ref<Recyclable[]>([]); // search results (recyclable/non-recyclable/not found) after comparing selectedItems (label annotations) with searchResults

let optDes = ref();
let email = ref();
let itemSearched = ref(false);
let submitted = ref(false);

let router = useRouter();

const search = await useFetch<Recyclable[]>(route.query.tags ? `/api/admin/recyclable/tags?tags=${route.query.tags}` : `/api/admin/recyclable/search?q=${route.query.q}`)

const mainResult = search.data.value.find((item) => {
  return item.name.toLowerCase() === (route.query.tags ?? route.query.q).toString().toLowerCase()
})

const alternativeResults = search.data.value.filter((item) => {
  return item.name.toLowerCase() !== (route.query.tags ?? route.query.q).toString().toLowerCase()
})

async function displayImageResults() {
  displayResults.value = []; // clear displayResults at every submit
  if (selectedItems.value.length == 0) {
    return;
  }
  let searchTags = selectedItems.value.join(",");
  console.log(searchTags);
  searchResults.value = await $fetch(`/api/admin/recyclable/tags?tags=${searchTags}`); // give only unique searchResults
  // console.log('searchResults of searchTags:', searchTags, searchResults.value);

  for (const selectedItem of selectedItems.value) {
    let hasMatch = false;
    for (const item of searchResults.value) {
      let itemName = item.name;
      if (itemName.match(new RegExp(selectedItem, "gi"))) {
        hasMatch = true;
        displayResults.value.push(item);
      }
    }

    if (!hasMatch) {
      displayResults.value.push({
        // null value means to be edited by admin
        "id": uuidv4(),
        "material": null,
        "name": selectedItem,
        "tags": [selectedItem],
        "description": null,
        "recyclable": null
      });
    }
  }
}


function onUploaded(anno, downloadUrl) {
  console.log('uplaoded', anno, downloadUrl);

  annotations.value = anno
  imageUrl.value = downloadUrl
  submitted.value = false
}

async function createRecycleRequest() {
  let res = await $fetch('/api/admin/recyclerequests', {
    method: 'POST',
    body: JSON.stringify({
      // id: string | number;
      title: "test",
      description: optDes.value,
      image: imageUrl.value,
      tags: selectedItems.value,

      status: "pending",

      email: email.value,

      // createdAt: "",
      // updatedAt: "",
      // completedAt?: string;
    })
  })
  submitted.value = true
}


function toggleAnnotation(value: string) {
  if (selectedItems.value.includes(value)) {
    selectedItems.value = selectedItems.value.filter((item) => item !== value);
  } else {
    selectedItems.value.push(value);
  }
}

function searchSelectedAnnotations() {
  router.push('/search?tags=' + selectedItems.value.join(',').toLowerCase());
}

</script>
