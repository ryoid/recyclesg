<template>
  <div class="bg-slate-200 w-50" @click="createRecycleRequest">
    <h1>Test</h1>
    {{ data }}
  </div>
</template>

<script lang="ts" setup>
import { RecycleRequest } from "~/server/types"
let data = ref();

async function createRecycleRequest() {
  // const body: RecycleRequest = {

  // }
  data = await $fetch('/api/admin/recyclerequests', {
    method: 'POST',
    body: JSON.stringify({
      // id: string | number;

      title: "test",
      description: "Description",
      image: "imageUrl",
      tags: ["tag1", "tag2"],

      status: "pending",

      email: "email",

      // createdAt: "createdAt",
      // updatedAt: "updatedAt",
      // completedAt?: string;
    })
  })
  console.log(data);
}

</script>

<style>

</style>