<template>

  <div>
    <NavBar />
    <div class="container mx-auto">

      <Image v-if="!itemSearched" link="../../assets/img/illustration/logo.jpg" />

      <search_bar />

      <div>
        <img
          src="https://media.istockphoto.com/photos/mockup-of-male-hand-holding-a-coffee-paper-cup-isolated-on-light-grey-picture-id695455588?k=20&m=695455588&s=612x612&w=0&h=VWpcDiGihi4MBvXylg4ZLMzT_FQqHz0uy1R6FKmmtFk="
          width="400" class="mx-auto" />
      </div>

      <div class="container m-3">
        <div class="my-3">
          <h1>Detected Items</h1>
          <p>Select which best describes your item</p>
          <Button v-for="(item, idx) of items" :key="idx" class="p-button-outlined p-button-rounded"
            style="margin: 10px 10px">
            <Checkbox :input-id="item" name="items" :value="item" v-model="selectedItems" />
            <label :for="item" class="p-2">{{ item }}</label>
          </Button>


          <div>
            <Button class="p-button-outlined p-button-rounded">
              <Checkbox input-id="others" name="others" v-model="othersChecked" :binary="true" />
              <label for="others" class="p-2">Others</label>
            </Button>
          </div>

        </div>
        <Button label="Submit" @click="populateResults()" />

        <hr>

        <div class="container my-4">
          <p class="text-slate-900 font-bold">Your Results</p>
          <div v-for="(item, idx) of foundResults" :key="idx"
            :class="['p-4', (item.canBePlaced ? 'recyclable' : 'non-recyclable'), 'rounded-lg', 'my-4']">
            <p class="font-bold" style="color: #fffff8">{{ item.itemName }}</p>

            <div style="background-color: white;" class="rounded p-3 m-2">
              <small>Material Type:</small>
              <p>{{ item.materialType }}</p>
              <!-- if score percentage is < 50%, add "we are not able to confidently identify this item and nuxt link back to home page" -->
              <hr>
              <small>Recycling Status:</small>
              <p class="font-semibold">{{ item.canBePlaced ? 'Recyclable' : 'Non-Recyclable' }}</p>
              <hr>
              <small>Description:</small>
              <p>{{ item.description }}</p>
            </div>

          </div>

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

const items = ["Paper", "Newspaper", "Cardboard"]; // to be obtained from cloud vision api

const RECYCLE_DATABASE_ITEMS = [ // list of NEA recyclable items to be obtained from realtime database or hardcoded
  {
    "idx": 1,
    "materialType": "Paper",
    "itemName": "Printed paper (Glossy and non-glossy)",
    "canBePlaced": true,
    "description": "Make sure it is clean before recycling.",
    "qrURL": ""
  },
  {
    "idx": 2,
    "materialType": "Paper",
    "itemName": "Writing paper",
    "canBePlaced": true,
    "description": "Make sure it is clean before recycling.",
    "qrURL": ""
  },
  {
    "idx": 2,
    "materialType": "Paper",
    "itemName": "Paper",
    "canBePlaced": false,
    "description": "Make sure it is clean before recycling.",
    "qrURL": ""
  },
  {
    "idx": 3,
    "materialType": "Paper",
    "itemName": "Newspaper",
    "canBePlaced": true,
    "description": "Make sure it is clean before recycling.",
    "qrURL": ""
  },
  {
    "idx": 4,
    "materialType": "Paper",
    "itemName": "Flyer (Glossy and non-glossy)",
    "canBePlaced": true,
    "description": "Make sure it is clean before recycling.",
    "qrURL": ""
  }]

const selectedItems = ref([]);
const prevSelectedItems = [];
const foundResults = ref([]);
const notFoundResults = ref([]);

const othersChecked = ref();
const optDes = ref();
const email = ref();
const itemSearched = ref(false);

let databaseItems = "";
const error = "";

function populateResults(): void {
  for (const selectedItem of selectedItems.value) {
    for (const item of RECYCLE_DATABASE_ITEMS) {
      let itemName = item.itemName;
      if (itemName.match(new RegExp(selectedItem, "g")) &&
        !prevSelectedItems.includes(itemName)) {
        foundResults.value.push(item);
        prevSelectedItems.push(itemName)
      } else {
        notFoundResults.value.push(item);
      }
    }
  }
}


</script>

<style>
.container {
  font-family: sans-serif;
}

.recyclable {
  background-color: #04aa6d;
  ;
}

.non-recyclable {
  background-color: #fc034e;
}
</style>
