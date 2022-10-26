<template>
  <div>
    <div>
    <h1 class="text-3xl font-bold underline">
      Admin / Requests / [{{ id }}] detail
    </h1>
  </div>

  <div class="container">
    <div class="grid grid-cols-2 gap-4 mt-10">
      <div>
        <h2 class="text-xl mb-2">Name</h2>
        <InputText v-model="name" type="text" />
        <span :style="{ marginLeft: '.5em' }">{{ name }}</span>
      </div>
      <div>
        <h2 class="text-xl mb-2">Material</h2>
        <InputText v-model="material" type="text" />
        <span :style="{ marginLeft: '.5em' }">{{ material }}</span>
      </div>
    </div>

    <!-- tailwindcss radio button -->
    <div class="mt-6">
      <h2 class="text-xl mb-3">Recycable?</h2>
      <div class="flex flex-row items-center">
        <div class="flex flex-row items-center">
          <input type="radio" id="yes" name="options" value="yes" v-model="options" />
          <label for="yes" class="ml-2">Yes</label>
        </div>
        <div class="flex flex-row items-center ml-6">
          <input type="radio" id="no" name="options" value="blue" v-model="options" />
          <label for="no" class="ml-2">No</label>
        </div>
      </div>
      <!-- <span :style="{ marginLeft: '.5em' }">{{ color }}</span> -->
    </div>

    <div class="mt-6">
      <label for="message" class="block mb-2 font-medium text-gray-900 text-xl">Description</label>
      <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Your message..."></textarea>
    </div>

    <div class="grid grid-cols-1 place-items-end mt-6">
      <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add Entry</button>
    </div>
    
  </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
});

const name = ref("");
const material = ref("");
const options = ref("");


const city = ref(null);
function test() {
  // value.value = (e.target as HTMLInputElement).value;
  console.log("test");
}

const route = useRoute()
const id = route.params.id

</script>

