<template>
  <div>
    <h1 class="text-3xl font-bold underline">
      Admin / Bookings / {{id}} detail
    </h1>

    <div class="container">
      <div class="grid md:grid-cols-1 lg:grid-cols-4 gap-20 mt-6">
        <pre>
          {{
          data
        }}
        </pre>
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


const { data, pending, refresh, error } = await useFetch(`/api/admin/bookings/${id}`, {
})

console.log(data)

const name = ref("");
definePageMeta({
  layout: "admin",
});
</script>