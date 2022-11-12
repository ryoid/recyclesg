<template>
    <div>
      <!-- <div v-if="error">
        <h1 class=" text-2xl text-red-500 text-center">Error</h1>
      </div>
      <div v-else-if="pending">
        <h1 class=" text-2xl text-red-500 text-center">Loading content...</h1>
      </div> -->
  
      <!-- <p v-if="pending">Pending leh bro</p> -->
    
      <div>
        <div>
          <h1 class="text-3xl font-bold underline">
            Admin / Requests / [new] detail
          </h1> 
        </div>
        <form class="was-validated">
            <div class="container">
                <div class="grid grid-cols-2 gap-4 mt-5">
                    <div class="col-span-2 lg:col-span-1">
                        <h2 class="text-xl mb-2">Name</h2>
                        <InputText class="w-full" v-model="form.name" type="text" />
                        <!-- <div v-if="errors.name" class="text-red-500">{{ errors.name }}</div><br> -->

                    </div>
                    <div class="col-span-2 lg:col-span-1">
                        <h2 class="text-xl mb-2">Material</h2>
                        <InputText class="w-full" v-model="form.material" type="text" />
                        <!-- <div v-if="errors.material" class="text-red-500">{{ errors.material }}</div><br> -->
                        <!-- <input type="text" class="border-solid border-gray-400 border-2 p-3 md:text-xl w-full" placeholder="Name" :value="data.material"/> -->

                    </div>
                </div>

            <!-- tailwindcss radio button -->
                <div class="mt-6">
                    <h2 class="text-xl mb-3">Recycable?</h2>
                    <div class="flex flex-row items-center">
                    <div class="flex flex-row items-center">
                        <input type="radio" id="yes" v-model="form.recyclable" value="true" />
                        <label for="yes" class="ml-2">Yes</label>
                    </div>
                    <div class="flex flex-row items-center ml-6">
                        <input type="radio" id="no" v-model="form.recyclable" value="false"  />
                        <label for="no" class="ml-2">No</label>
                    </div>
                    </div>
                    <!-- <span :style="{ marginLeft: '.5em' }">{{ color }}</span> -->
                </div>

                <div class="mt-6">
                    <label for="message" class="block mb-2 font-medium text-gray-900 text-xl">Description</label>
                    <Textarea class="w-full" rows="5" v-model="form.description" cols="30" />
                    <!-- <div v-if="errors.description" class="text-red-500">{{ errors.description }}</div><br> -->

                    <!-- <textarea :value="data.description" id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Your message..."></textarea> -->
                </div>

                <div class="grid grid-cols-1 place-items-end mt-6">
                    <button type="submit" @click="submitForm" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add Entry</button>
                    <!-- <button v-else type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add Entry</button> -->
                
                </div>
            </div>
        </form>
      </div>
    </div>
  </template>
  
<script setup lang="ts">
definePageMeta({
layout: "admin",
});

// const { data, pending, refresh, error } = await useFetch(`/api/admin/recyclable/`, {
// })

const route = useRoute()
const router = useRouter()

const id = route.params.id
// Error handling
const form = ref({
    name: null,
    material: null,
    description: null,  
    recyclable: null,

});

// const errors = ref({
//     name: null,
//     material: null,
//     description: null,

// });

const submitForm  = async () => {
// prevent default form submission
    event.preventDefault();
    try {
        const res = await fetch(`/api/admin/recyclable/`, {
            method: 'POST',
            body: JSON.stringify({
              name: form.value.name,
              material: form.value.material,
              description: form.value.description,
              recyclable: form.value.recyclable,
            }),
        })
    } catch (err) {
        console.log(err)
    }
}


//   await $fetch(`/api/admin/recyclable/`, {
//         method: "POST",
//     body: JSON.stringify({
//         name: form.value.name,
//         material: form.value.material,
//         description: form.value.description,
//         recyclable: form.value.recyclable,
//     }),
//   })
//   console.log("submit form", form.value.name)    
// }


  
</script>