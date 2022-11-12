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
      <h1 class="text-3xl font-bold underline">
        Admin / Database / {{id}} detail
      </h1>
      <div class="container">
        <div class="grid md:grid-cols-1 lg:grid-cols-4 gap-20 mt-6">
          <div class="col-span-1">
            <div class="mb-5">
              <!-- <Image src="https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc=" alt="Image Text" /> -->
              <img class="object-contain" src="https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc=" alt="">
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
              <InputText class="w-full"  type="text" />
            </div>
            <!-- <hr> -->
            <Divider/>
            <div>            
              <h2 class="font-semibold text-xl">Add new Entry</h2>
            </div>
            <div class="grid grid-cols-2 gap-4 mt-5">
              <div class="col-span-2 lg:col-span-1">
                <h2 class="text-xl mb-2">Name</h2>
                <InputText class="w-full" type="text" :value="data.name" />
                <!-- <input type="text" class="border-solid border-gray-400 border-2 p-3 md:text-xl w-full" placeholder="Name" :value="data.name"/> -->

              </div>
              <div class="col-span-2 lg:col-span-1">
                <h2 class="text-xl mb-2">Material</h2>
                <InputText class="w-full" type="text" :value="data.material"/>
                <!-- <input type="text" class="border-solid border-gray-400 border-2 p-3 md:text-xl w-full" placeholder="Name" :value="data.material"/> -->

            </div>
          </div>

            <div class="grid grid-cols-1 mt-5">
              <div>
                <h2 class="text-xl mb-3">Recycable?</h2>
                <div class="flex flex-row items-center mt-3">
                  <div class="flex flex-row items-center">
                    <input type="radio" id="yes" :name="`${data.id}`" v-model="data.recyclable" :value=true /> <!-- fix this later --->
                    <!-- {{items.recyclable}} -->
                    <label for="yes" class="ml-2">Yes</label>
                  </div>
                  <div class="flex flex-row items-center ml-6">
                    <input type="radio" id="no" :name="`${data.id}`" v-model="data.recyclable" :value=false />
                    <!-- {{items.recyclable}}
                    -->

                    <label for="no" class="ml-2">No</label>
                  </div>
                </div>
              </div>
              <div class="mt-5">
                <label for="message" class="block mb-2 font-medium text-gray-900 text-xl">Description</label>
                <Textarea :value="data.description" class="w-full" rows="5" cols="30" />

                <!-- <textarea :value="data.description" id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Your message..."></textarea> -->
              </div>
            </div>

            <!-- <div class="grid md:grid-cols-1 lg:grid-cols-3 mt-5 place-items-center">
              <div>
                <button type="button" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2">Reject Entry</button>
              </div>
              <div>
                <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2">Add Entry</button>
              </div>
              <div>
                <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2">Add & Notify Entry</button>
              </div>
            </div> -->
            <div class="grid grid-cols-3 gap-4 mt-5">
              <div class="col-span-3 lg:col-span-1">
                <button type="button" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2">Reject Entry</button>
                <!-- <input type="text" class="border-solid border-gray-400 border-2 p-3 md:text-xl w-full" placeholder="Name" :value="data.name"/> -->

              </div>
              <div class="col-span-3 lg:col-span-1">
                <button type="button" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2">Add Entry</button>
              </div>
              <div class="col-span-3 lg:col-span-1">
                <button type="button" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2">Add & Notify</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { da } from 'date-fns/locale';

function fileUpload(){
  console.log("fileUpload")
  //file upload
}

const route = useRoute()
const id = route.params.id


// const { data, pending, refresh, error } = await useFetch(`/api/admin/recyclable/${id}`, {
// })

const { data, pending, refresh, error } = await useFetch(`/api/admin/recyclerequests/${id}`, {

})

onMounted(() => {
  console.log(data)
  refresh()
})


console.log(data)

const name = ref("");
definePageMeta({
  layout: "admin",
});

// const submitForm  = async () => {
//   console.log("submit form", data)
//   await $fetch(`/api/admin/recyclerequests/${id}`, {
//     method: "POST",
//     body: JSON.stringify(data),
//   })
// }

const submitForm  = async () => {
  console.log("submit form", data)
  await $fetch(`/api/admin/recyclerequests/${id}`, {
    method: "POST",
    body: JSON.stringify({
  //       name: data.value.name,
  //       material: data.value.material,
  //       description: data.value.description,
  //       recyclable: data.value.recyclable,
    }),
  })
  console.log("submit form", data.value.name)    
}
</script>