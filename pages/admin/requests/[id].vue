<template>

  <div>
    <div v-if="error">
      <h1 class=" text-2xl text-red-500 text-center">Error</h1>
    </div>
    <div v-else-if="pending">
      <h1 class=" text-2xl text-red-500 text-center">Loading content...</h1>
      <!-- do placeholder content here, ultimately make new component -->
    </div>
    <div v-else>
      <!-- <h1 class="text-3xl font-bold underline">
        Admin / Request / {{id}} detail
      </h1> -->
      <form>
        <div class="container">
          <div class="grid md:grid-cols-1 lg:grid-cols-4 gap-20 mt-6">
            <div class="col-span-1">
              <div class="mb-5">
                <img class="lg:w-90 md:w-90 sm:w-90 rounded-lg shadow" :src="data.image" alt="">
              </div>
            </div>
        
            <div class="col-span-3">
              <div>
                <h2 class="text-xl mb-2">Suggested Words</h2>
                <InputText class="w-full"  type="text" />
              </div>

              <div class="mb-2 mt-4">
                <h2 class="text-xl mb-2">Description</h2>
                <!-- <InputText class="w-full"  type="tex" /> -->
                <Textarea class="w-full" rows="5" cols="30" />

                <!-- <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Your message..."></textarea> -->
              </div>

              <div class="mt-3 mb-6">
                <h2 class="text-xl mb-2">Email</h2>
                <InputText class="w-full" v-model="data.email" type="text" disabled />
              </div>
              <!-- <hr> -->
              <Divider/>
              <div>            
                <h2 class="font-semibold text-xl">Add new Entry</h2>
              </div>
              <div class="grid grid-cols-2 gap-4 mt-5">
                <div class="col-span-2 lg:col-span-1">
                  <h2 class="text-xl mb-2">Name</h2>
                  <InputText class="w-full" type="text" v-model="form.name" />
                  <!-- <input type="text" class="border-solid border-gray-400 border-2 p-3 md:text-xl w-full" placeholder="Name" :value="data.name"/> -->

                </div>
                <div class="col-span-2 lg:col-span-1">
                  <h2 class="text-xl mb-2">Material</h2>
                  <InputText class="w-full" type="text" v-model="form.material"/>
                  <!-- <input type="text" class="border-solid border-gray-400 border-2 p-3 md:text-xl w-full" placeholder="Name" :value="data.material"/> -->

              </div>
            </div>

              <div class="grid grid-cols-1 mt-5">
                <div>
                  <h2 class="text-xl mb-3">Recycable?</h2>
                  <div class="flex flex-row items-center mt-3">
                    <div class="flex flex-row items-center">
                      <input type="radio" id="yes" v-model="form.recyclable" value="true" /> <!-- fix this later --->
                      <!-- {{items.recyclable}} -->
                      <label for="yes" class="ml-2">Yes</label>
                    </div>
                    <div class="flex flex-row items-center ml-6">
                      <input type="radio" id="no"  v-model="form.recyclable" value="false" />
                      

                      <label for="no" class="ml-2">No</label>
                    </div>
                  </div>
                </div>
                <div class="mt-5">
                  <label for="message" class="block mb-2 font-medium text-gray-900 text-xl">Description</label>
                  <Textarea v-model="form.description" class="w-full" rows="5" cols="30" />

                </div>
              </div>

              <div class="grid grid-cols-3 gap-4 mt-5">
                <div class="col-span-3 lg:col-span-1">
                  <!-- Added .prevent to stop page from refreshing after submission -->
                  <button type="submit" @click.prevent="addFormEntry" class="w-full text-white bg-blue-700 hover:bg-blue-800 duration-300 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2">Add Entry</button>
                </div>
                <!-- Check if email is there, if not disable button -->
                <div class="col-span-3 lg:col-span-1">
                  <button v-if="data.email == undefined" disabled type="button" class="w-full text-white bg-gray-400 font-medium rounded-md duration-300 text-sm px-5 py-2.5 mr-2 mb-2">Add & Notify</button>
                  <button v-else type="submit" @click.prevent="addNotify" class="w-full text-white bg-green-700 hover:bg-green-800 duration-300 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2">Add Entry & Notify User</button>
                </div>
                <div class="col-span-3 lg:col-span-1">
                  <button type="submit" @click.prevent="rejectForm" class="w-full text-white rounded-md bg-red-600 hover:bg-red-700 duration-300 font-medium text-sm px-5 py-2.5 mr-2 mb-2">Reject Entry      
                  </button>
                </div>

                <!-- Toast Experiment -->
            

              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { da, tr } from 'date-fns/locale';

const route = useRoute()
const id = route.params.id

const { data, pending, refresh, error } = await useFetch(`/api/admin/recyclerequests/${id}`, {

})

onMounted(() => {
  console.log(data)
  refresh()
})

const name = ref("");
definePageMeta({
  layout: "admin",
});

const form = ref({
    name: null,
    material: null,
    description: null,  
    recyclable: null,

});


// Add entry
const addFormEntry = async () => {
  event.preventDefault();
  const response = await fetch(`/api/admin/recyclable/`, {
    method: "POST",
    body: JSON.stringify({
      name: form.value.name,
      material: form.value.material,
      description: form.value.description,
      recyclable: form.value.recyclable,
      createdAt: new Date().toISOString(),
      tags: [],
    }),
  });
  
  if (response.ok) {
    const update = await fetch(`/api/admin/recyclerequests/${id}`, {
      method: "POST",
      body: JSON.stringify({
        status: "completed",
      }),
    });
  }
  console.log(data);
};

// add and notify
const addNotify = async () => {
  console.log("Added and Notified!");
  // alert("Added and Notified!");
  event.preventDefault();
  const response = await fetch(`/api/admin/recyclable/`, {
    method: "POST",
    body: JSON.stringify({
      name: form.value.name,
      material: form.value.material,
      description: form.value.description,
      recyclable: form.value.recyclable,
      createdAt: new Date().toISOString(),
      tags: [],
    }),
  });
  
  if (response.ok) {
    const update = await fetch(`/api/admin/recyclerequests/${id}`, {
      method: "POST",
      body: JSON.stringify({
        status: "completed",
      }),
    });
    console.log("Added and Notified!");

  }
};

// Reject form
const rejectForm  = async () => {
  event.preventDefault()
  await $fetch(`/api/admin/recyclerequests/${id}`, {
    method: "POST",
    body: JSON.stringify({
      status: "rejected"
    }),
  })
  console.log("reject form", data.value.status)    
}



</script>
