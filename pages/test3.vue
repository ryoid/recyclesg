<!-- 
<template>
  <div>
    <input type="file" multiple @change="handleFileSelection($event)" />
    <button type="submit" v-on:click="submit">Submit</button>
  </div>
</template>

<script setup lang="ts">

const files = ref([]);
const name = ref('');

const handleFileSelection = (event) => {
  let uploadedFiles = event.target.files;

  for (let i = 0; i < uploadedFiles.length; i++) {
    files.value.push(uploadedFiles[i]);
  }
}

async function submit(){
    let formData = new FormData();

    formData.append('name', name.value);

    for( let i = 0; i < files.value.length; i ++ ){
        formData.append('images['+i+']', files.value[i] );
    }

    await $fetch( '/api/search', {
        method: 'POST',
        body: formData
    } );
}
</script> -->

<template>
  <div>
    <testupload />

  </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>
