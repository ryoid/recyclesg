<template>

  <div>
    <NewNavBar />
    <div class="container mx-auto">

      <!-- <Image v-if="!itemSearched" link="../assets/img/illustration/logo.jpg" /> -->
      <img src="../assets/img/illustration/logo.jpg" class="mx-auto w-64 sm:w-64 md:w-96 lg:w-128" v-if="!itemSearched">
      <img
        src="https://media.istockphoto.com/photos/mockup-of-male-hand-holding-a-coffee-paper-cup-isolated-on-light-grey-picture-id695455588?k=20&m=695455588&s=612x612&w=0&h=VWpcDiGihi4MBvXylg4ZLMzT_FQqHz0uy1R6FKmmtFk="
        v-else class="mx-auto w-64 sm:w-64 md:w-96 lg:w-128" />

      <SearchNewSearchBar @item-select="displaySearchResults" />

      <h1>Test upload</h1>
      <form @submit="getLabels">
        <input class="hidden" type="file" @change="imageChange" ref="imageInputRef" accept="image/*" />
        <div class="h-32 w-32 bg-gray-100 relative" @click="selectImage">
          <div class="absolute inset-0 flex items-center justify-center">Click to upload</div>
          <img v-if="imageSrc" :src="imageSrc" class="absolute inset-0 z-10 h-full w-full" />
        </div>
        <button type="submit">Submit</button>
      </form>


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
          <Button label="Check" class="p-button-raised " @click="displayImageResults()" />
        </div>
      </div>

      <hr>

      <div class="container my-4" v-if="displayResults.length > 0">
        <p class="text-slate-900 font-bold">Your Results</p>
        <ResultAccordion v-for="(item, idx) of displayResults" :key="idx" :item="item" :item_id="item.id + ''" />
      </div>


      <hr>

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
        <Button label="Submit request" />
      </div>


    </div>
  </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Recyclable } from '~~/server/types';
import { v4 as uuidv4 } from "uuid";


const { storage } = useFirebase()
const imageInputRef = ref(null)
let imageSrc = ref(null)
let submitting = ref(false)
let annotations = ref(null) // labels returned from cloud api

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


function selectImage() {
  imageInputRef.value.click()
}


function imageChange() {
  const imageFile = imageInputRef.value.files[0]
  if (imageFile) {
    imageSrc.value = URL.createObjectURL(imageFile)
  }
}

async function getLabels(e) {
  e.preventDefault();
  console.log('Submit form');
  const imageFile = imageInputRef.value.files[0]
  if (!imageFile) {
    console.log("Select an image");
    return
  }

  selectedItems.value = [];
  submitting.value = true
  try {
    const uploadRes = await uploadFile(storage, "user-item-uploads", imageFile)
    console.log(uploadRes);
    // Send to cloud vision api to get text
    const visionRes = await $fetch('/api/vision', {
      method: 'POST',
      body: JSON.stringify({
        imageUri: `gs://${uploadRes.metadata.bucket}/${uploadRes.metadata.fullPath}`
      })
    })
    console.log('receive visionRes', visionRes);

    // Sort etc
    annotations.value = visionRes.labelAnnotations


  } catch (err) {
    console.log("Failed to upload", err);
  } finally {
    submitting.value = false
  }

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
