<template>

  <div>
    <div class="container mx-auto">

      <!-- <Image v-if="!itemSearched" link="../assets/img/illustration/logo.jpg" /> -->
      <img src="../assets/img/illustration/logo.jpg" class="mx-auto w-64 sm:w-64 md:w-96 lg:w-128" v-if="!itemSearched">

      <div class="max-w-3xl mx-auto">
        <!-- Show search results once item is selected from the dropdown -->
        <NewSearchBar @item-select="displaySearchResults" @uploaded="onUploaded" />

        <!-- shown only after image is uploaded and labels gotten back from cloud api -->
        <div class="mt-20" v-if="annotations">
          <div class="my-3">
            <div class="mb-4">
              <h1 class="text-2xl">Detected Items</h1>
              <p class="text-gray-800">Select which best describes your item</p>
            </div>
            <div class="flex flex-col gap-2">
              <div v-for="anno in annotations.sort((a, b) => b.score - a.score).slice(0, 10)"
                class="border rounded  flex gap-4 px-4 py-4 shadow-sm cursor-pointer"
                @click="toggleAnnotation(anno.description)">
                <div class="h-6 w-6 bg-gray-200 rounded-full overflow-hidden p-0.5">
                  <div class="bg-teal-500 h-full w-full rounded-full" v-if="selectedItems.includes(anno.description)" />
                </div>{{ anno.description }}
              </div>
            </div>
          </div>

          <div class="flex justify-end mb-8">
            <Button label="Check items" class="p-button-raised" @click="searchSelectedAnnotations()" />
          </div>


          <!-- Sending of Recycle Request if "Others" tag was selected -->
          <div v-if="submitted" class="bg-teal-500/10 rounded p-4">
            <h3 class="font-semibold">We have received your request</h3>
            <div>We will get back to you within 2 working days</div>
          </div>
          <div v-else class="text-justify border-solid border-2 m-2 p-2">
            <h3 class="font-semibold">Can't find an appropriate item?</h3>
            <p>With your help, we will review your item and let you know if it
              is recyclable</p>
            <h3 class="font-normal">Please describe the item so that we can assist you in labelling the item</h3>

            <Textarea v-model="optDes" :autoResize="true" rows="5" cols="40"
              placeholder="Tell us what you think this is; e.g. Plastic light with metal wire" />

            <h3 class="mt-3">Email</h3>
            <p>You will be notified once we have labelled the item</p>
            <div class="p-inputgroup p-2">
              <span class="p-inputgroup-addon">
                <i class="pi pi-user"></i>
              </span>
              <InputText placeholder="Email address" v-model="email" />
            </div>
            <!-- on click, submit request case into database -->
            <Button label="Submit Request" @click="createRecycleRequest" />
          </div>
        </div>

        <div class="container my-4" v-if="displayResults.length > 0">
          <p class="text-slate-900 font-bold">Your Results</p>
          <ResultAccordion v-for="(item, idx) of displayResults" :key="idx" :item="item" :item_id="item.id + ''" />
        </div>

      </div>

    </div>
  </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Recyclable, Annotation } from '~~/server/types';
import { v4 as uuidv4 } from "uuid";

const user = useFirebaseUser()


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

function displaySearchResults(res: Recyclable) {
  router.push(`/search?q=${res.name}`);
}

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
