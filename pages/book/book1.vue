<style>
h2 {
    font-size: 50px;
    font-family: "Times New Roman";
}

div {
    margin: 5px;
}

.inline {
    display: inline-block;
}

</style>

<template>
    
    <h2>Book Collection</h2>
    <div>
        <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque harum corrupti temporibus dignissimos, deleniti maiores aut sequi voluptatibus nihil eveniet quasi id esse voluptatem, ipsum unde libero quae doloremque inventore!
        </p>
    </div>
    <br>
    <div class = "inline">
        <Calendar v-model="value" :inline="true"></Calendar>
    </div>
    <div class = "inline">
        <Listbox v-model="selectedCity" :options="cities" optionLabel="name" />
    </div>

  </template>
  
  
  <script lang="ts" setup>
  
  import Button from 'primevue/button';
  import Calendar from 'primevue/calendar';
  import Listbox from 'primevue/listbox';
  
  </script>