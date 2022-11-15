<template>
  <div>
    <div v-if="error">
      <h1 class=" text-2xl text-red-500 text-center">Error</h1>
    </div>
    <div v-else-if="pending">
      <!-- <h1 class=" text-2xl text-red-500 text-center">Loading content...</h1> -->
      <!-- do placeholder content here, ultimately make new component -->
      <div class="rounded-md p-4 w-full mt-40">
        <div class="animate-pulse flex space-x-4">
          <div class="flex-1 space-y-6 py-1">
            <div class="space-y-3">
              <div class="grid grid-cols-4 gap-4">
                <div class="h-10 bg-slate-200 rounded col-span-2 mb-2"></div>
                <div class="h-10 bg-slate-200 rounded col-span-2 mb-2"></div>
              </div>
              <div class="grid grid-cols-8 gap-4">
                <div class="h-10 bg-slate-200 rounded-full col-span-1 mb-3"></div>
                <div class="h-10 bg-slate-200 rounded-full col-span-1 mb-3"></div>
              </div>
              <div class="h-32 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div v-else>
      <div>
        <!-- <h1 class="text-3xl font-bold underline">
          Admin / Database / [{{ id }}] detail
        </h1>  -->
      </div>
      <div class="container">
        <div class="grid grid-cols-2 gap-4 mt-5">
          <div class="col-span-2 lg:col-span-1">
            <h2 class="text-xl mb-2">Name</h2>

            <InputText class="w-full" type="text" v-model="data.name" />
            <!-- <div v-if="errors.name" class="text-red-500">{{ errors.name }}</div><br> -->

          </div>
          <div class="col-span-2 lg:col-span-1">
            <h2 class="text-xl mb-2">Material</h2>
            <InputText class="w-full" type="text" v-model="data.material" />
            <!-- <div v-if="errors.material" class="text-red-500">{{ errors.material }}</div><br> -->
            <!-- <input type="text" class="border-solid border-gray-400 border-2 p-3 md:text-xl w-full" placeholder="Name" :value="data.material"/> -->

          </div>
        </div>

        <!-- tailwindcss radio button -->
        <div class="mt-6">
          <h2 class="text-xl mb-3">Recycable?</h2>
          <div class="flex flex-row items-center">
            <div class="flex flex-row items-center">
              <input type="radio" id="yes" name="options" v-model="data.recyclable" value="true" />
              <label for="yes" class="ml-2">Yes</label>
            </div>
            <div class="flex flex-row items-center ml-6">
              <input type="radio" id="no" name="options" v-model="data.recyclable" value="false" />
              <label for="no" class="ml-2">No</label>
            </div>
          </div>
          <!-- <span :style="{ marginLeft: '.5em' }">{{ color }}</span> -->
        </div>

        <div class="mt-6">
          <label for="message" class="block mb-2 font-medium text-gray-900 text-xl">Description</label>
          <Textarea v-model="data.description" class="w-full" rows="5" cols="30" />
          <!-- <div v-if="errors.description" class="text-red-500">{{ errors.description }}</div><br> -->

          <!-- <textarea :value="data.description" id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Your message..."></textarea> -->
        </div>

        <div class="grid grid-cols-1 place-items-end mt-6">
          <button type="submit" @click="updateForm"
            class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-md text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Update
            Entry</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
});


const options = ref(""); // remove this later
const route = useRoute()
const router = useRouter()
const id = route.params.id

const { data, pending, refresh, error } = await useFetch(`/api/admin/recyclable/${id}`, {
})

onMounted(() => {
  console.log(data)
  refresh()
})


const updateForm = async () => {
  // prevent default
  event.preventDefault()

  console.log("submit form", data)
  await $fetch(`/api/admin/recyclable/${id}`, {
    method: "POST",
    body: JSON.stringify({
      name: data.value.name,
      material: data.value.material,
      description: data.value.description,
      recyclable: data.value.recyclable,
    }),
  })
  console.log("submit form", data.value.name)
  router.push("/admin/database");

}
</script>