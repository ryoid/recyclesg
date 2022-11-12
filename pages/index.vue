<template>

  <div>
    <NewNavBar />
    <div class="container mx-auto">

      <!-- <Image v-if="!itemSearched" link="../assets/img/illustration/logo.jpg" /> -->
      <img src="../assets/img/illustration/logo.jpg" class="mx-auto w-64 sm:w-64 md:w-96 lg:w-128" v-if="!itemSearched">

      <!-- Show search results once item is selected from the dropdown -->
      <NewSearchBar @item-select="displaySearchResults" />

      <!-- Returns annotation results from cloud vision API after image is uploaded -->
      <NewImageUploader @uploaded="getAnnotations" />

      <!-- shown only after image is uploaded and labels gotten back from cloud api -->
      <div class="container mt-20" v-if="annotations">
        <div class="my-3">
          <h1>Detected Items</h1>
          <p>Select which best describes your item</p>
          <SelectButton v-model="selectedItems" :options="annotations" option-label="description"
            option-value="description" data-key="description" multiple />

          <div class="bg-gray-100 inline-block rounded-full p-2">
            <Checkbox input-id="others" name="others" v-model="othersChecked" :binary="true" style="margin-top: 0" />
            <label for="others" class="p-2">Others</label>
          </div>

        </div>

        <div class="m-5">
          <Button label="Check" class="p-button-raised " @click="displayImageResults" />
        </div>
      </div>

      <hr>

      <div class="container my-4" v-if="displayResults.length > 0">
        <p class="text-slate-900 font-bold">Your Results</p>
        <ResultAccordion v-for="(item, idx) of displayResults" :key="idx" :item="item" :item_id="item.id + ''" />
      </div>

      <hr>

      <!-- Sending of Recycle Request if "Others" tag was selected -->
      <div class="container text-justify border-solid border-2 m-2 p-2" v-if="othersChecked">
        <h3 class="font-semibold">You selected 'Others'</h3>
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
  </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Recyclable } from '~~/server/types';
import { v4 as uuidv4 } from "uuid";


let annotations = ref(null) // labels returned from cloud api
let imageUrl = ref(null)

let selectedItems = ref<string[]>([]);

let searchResults = ref<Recyclable[]>([]); // list of NEA recyclable items to be obtained from backend
let displayResults = ref<Recyclable[]>([]); // search results (recyclable/non-recyclable/not found) after comparing selectedItems (label annotations) with searchResults

let othersChecked = ref();
let optDes = ref();
let email = ref();
let itemSearched = ref(false);

function displaySearchResults(res: Recyclable) {
  displayResults.value = [];
  displayResults.value.push(res);
  
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


function getAnnotations(res, downloadUrl) {
  annotations.value = res
  imageUrl.value = downloadUrl
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
  console.log("new request created");
  console.log(res);
}

</script>



<style>
.container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.recyclable {
  background-color: #04aa6d;
}

.non-recyclable {
  background-color: #fc034e;
}

.not-found {
  background-color: rgb(203 213 225);
}
</style>
