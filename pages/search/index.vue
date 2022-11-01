<template>

  <div class="m-10">
    <div class="uploaded-image">
      <img
        src="https://media.istockphoto.com/photos/mockup-of-male-hand-holding-a-coffee-paper-cup-isolated-on-light-grey-picture-id695455588?k=20&m=695455588&s=612x612&w=0&h=VWpcDiGihi4MBvXylg4ZLMzT_FQqHz0uy1R6FKmmtFk="
        width="400" />
    </div>

    <div class="m-3 results-container">
      <div class="detected-items my-3">
        <h1>Detected Items</h1>
        <p>Select which best describes your item</p>
        <div v-for="(item, idx) of items" :key="idx" class="selected-items my-1">
          <Button class="p-button-outlined p-button-rounded">
            <Checkbox :input-id="item" name="items" :value="item" v-model="selectedItems" />
            <label :for="item" class="p-2">{{ item }}</label>
          </Button>
        </div>

        <Button class="p-button-outlined p-button-rounded">
          <Checkbox input-id="others" name="others" v-model="othersChecked" :binary="true" />
          <label for="others" class="p-2">Others</label>
        </Button>

      </div>
      <Button label="Submit" @click="populateResults()" />

      <hr>

      <div class="search-results my-4">
        <h1>Results</h1>
        <Accordion :multiple=true>
          <AccordionTab v-for="(item, idx) of results" :key="idx" :header="item">
            <!-- change color to green if recyclable,  red if not-->
            <p>{{ item }}</p>
            <!-- if score percentage is < 50%, add "we are not able to confidently identify this item and nuxt link back to home page" -->
          </AccordionTab>
        </Accordion>
        <hr>
      </div>

    </div>

    <hr>

    <div class="no-results-container" v-if="othersChecked">
      <h2>Sorry we do not have the item in our database! With your help, We will review your item and let you know if it
        is recyclable</h2>
      <h3>Describe the item</h3>
      <p>Please describe the item so our team will be able to label the item</p>
      <!-- inputBox -->
      <Textarea v-model="optDes" :autoResize="true" rows="5" cols="40"
        placeholder="Tell us what you think this is; e.g. Plastic with metal wire" />

      <h3 class="mt-3">Email</h3>
      <p>You will be notified once we have labelled the item</p>
      <!-- email -->
      <div class="p-inputgroup">
        <span class="p-inputgroup-addon">
          <i class="pi pi-user"></i>
        </span>
        <InputText placeholder="Email address" v-model="email" />
      </div>
      <Button label="Send request"></Button>
    </div>


  </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RECYCLE_DATABASE_ITEMS } from '~~/server/api/recyclerequests/data'; // list of NEA recyclable items to be obtained from realtime database or hardcoded
import axios from 'axios';

const items = ["Paper", "Newspaper", "Cardboard"]; // to be obtained from cloud vision api

const selectedItems = ref([]);
const results = ref([]);

const othersChecked = ref();
const optDes = ref();
const email = ref();

let databaseItems = "";
const error = "";

function populateResults(): void {
  for (const selectedItem of selectedItems.value) {
    for (const item of RECYCLE_DATABASE_ITEMS) {
      if (item.itemName.match(new RegExp(selectedItem, "g"))) {
        results.value.push(selectedItem);
      }
    }
  }
}





</script>
