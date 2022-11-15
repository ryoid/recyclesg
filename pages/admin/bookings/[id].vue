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
        Admin / Bookings / {{id}} detail
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
                <h2 class="font-semibold text-xl">Add new Entry</h2>
              </div>
              <div class="grid grid-cols-2 gap-4 mt-5">
                <div class="col-span-2 lg:col-span-1">
                  <h2 class="text-xl mb-2">Name</h2>
                  <InputText class="w-full" type="text" v-model="data.name" />
                </div>
                <div class="col-span-2 lg:col-span-1">
                  <h2 class="text-xl mb-2">Email</h2>
                  <InputText class="w-full" type="text" v-model="data.email" />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4 mt-5">
                <div class="col-span-2 lg:col-span-1">
                  <h2 class="text-xl mb-2">Address</h2>
                  <InputText class="w-full" type="text" v-model="data.address" />
                </div>
                <div class="col-span-2 lg:col-span-1">
                  <h2 class="text-xl mb-2">Postal</h2>
                  <InputText class="w-full" type="text" v-model="data.postalCode" />
                </div>
              </div>
              <div class="mt-5">
                <label for="message" class="block mb-2 font-medium text-gray-900 text-xl">Description</label>
                <Textarea v-model="data.description" class="w-full" rows="5" cols="30" />
              </div>
              <div class="grid grid-cols-1 place-items-end mt-6">
                <div class="col-span-3 lg:col-span-1">
                  <button type="submit" @click="updateBooking"
                    class="w-full text-white rounded-md bg-blue-600 hover:bg-blue-700 duration-300 font-medium text-sm px-5 py-2.5 mr-2 mb-2">Update
                    Booking
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { da } from 'date-fns/locale';

function fileUpload() {
  console.log("fileUpload")
  //file upload
}

const router = useRouter()
const route = useRoute()
const id = route.params.id


const { data, pending, refresh, error } = await useFetch(`/api/admin/bookings/${id}`, {
})

onMounted(() => {
  refresh()
})




const updateBooking = async () => {
  // prevent default
  event.preventDefault()

  console.log("submit form", data)
  await $fetch(`/api/admin/bookings/${id}`, {
    method: "POST",
    body: JSON.stringify({
      name: data.value.name,
      email: data.value.email,
      description: data.value.description,
      address: data.value.address,
      postalCode: data.value.postalCode,
    }),
  })
  console.log("submit form", data.value.name)
  router.push("/admin/bookings");
}

console.log(data)

// const name = ref("");
definePageMeta({
  layout: "admin",
});
</script>