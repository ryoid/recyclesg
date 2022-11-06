<template>

  <div>
    <!-- <NavBar /> -->
    <NewNavBar />
    <div class="container mx-auto">

      <!-- <Image v-if="!itemSearched" link="../assets/img/illustration/logo.jpg" /> -->
      <img src="../assets/img/illustration/logo.jpg" class="mx-auto w-64 sm:w-64 md:w-96 lg:w-128" v-if="!itemSearched">
      <img
        src="https://media.istockphoto.com/photos/mockup-of-male-hand-holding-a-coffee-paper-cup-isolated-on-light-grey-picture-id695455588?k=20&m=695455588&s=612x612&w=0&h=VWpcDiGihi4MBvXylg4ZLMzT_FQqHz0uy1R6FKmmtFk="
        v-else class="mx-auto w-64 sm:w-64 md:w-96 lg:w-128" />

      <search_bar />

      <!-- show only after image is uploaded and response gotten back from cloud api -->
      <div class="container mt-20">
        <div class="my-3">
          <h1>Detected Items</h1>
          <p>Select which best describes your item</p>
          <Button v-for="(item, idx) of labels" :key="idx" class="p-button-outlined p-button-rounded"
            style="margin: 10px 10px">
            <Checkbox :input-id="item" name="labels" :value="item" v-model="selectedItems" />
            <label :for="item" class="p-2">{{ item }}</label>
          </Button>


          <div>
            <Button class="p-button-outlined p-button-rounded">
              <Checkbox input-id="others" name="others" v-model="othersChecked" :binary="true" />
              <label for="others" class="p-2">Others</label>
            </Button>
          </div>

        </div>

        <div class="m-5">
          <Button label="Check" class="p-button-raised " @click="populateResults()" />
        </div>

        <hr>

        <div class="container my-4">
          <p class="text-slate-900 font-bold">Your Results</p>
          <ResultAccordion v-for="(item, idx) of results" :key="idx" :item="item" :idx="idx + ''" />

        </div>

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
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-user"></i>
          </span>
          <InputText placeholder="Email address" v-model="email" />
        </div>
        <!-- on click, submit request case into realtime database -->
        <Button label="Submit request" />
      </div>


    </div>
  </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Recyclable } from '~~/server/api';
import RECYCLE_DATABASE_ITEMS from '../data/recyclables.json'; // list of NEA recyclable items to be obtained from realtime database

const labels = ["Paper", "Newspaper", "Cardboard", "Flyer", "Shoes"]; // to be obtained from cloud vision api

const selectedItems = ref<string[]>([]);
const results = ref<Recyclable[]>([]);

const othersChecked = ref();
const optDes = ref();
const email = ref();
const itemSearched = ref(false);

function populateResults(): void {
  if (selectedItems.value.length == 0) {
    return;
  }

  results.value = []; // clear results at every submit
  for (const selectedItem of selectedItems.value) {
    let hasMatch: boolean = false;
    for (const item of RECYCLE_DATABASE_ITEMS) {
      let itemName: string = item.name;
      if (itemName.match(new RegExp(selectedItem, "g"))) {
        hasMatch = true;
        results.value.push(item);
      } 
    }

    if (!hasMatch) {
      results.value.push({
        // null value means to be edited by admin
        "id": null,
        "material": null,
        "name": selectedItem,
        "tags": [selectedItem],
        "description": null,
        "recyclable": null
      });
    }
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
