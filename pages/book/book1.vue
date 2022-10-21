<style>
h2 {
    font-size: 50px;
    font-family: "Times New Roman";
}

div {
    margin: 5px;
}

.inline {
    display: inline;
}

.inline-block{
    display: inline-block;
}

</style>

<template>
    
    <h2>Book Collection</h2>
    <div>
        <p>
            Lorem,ipsum dolor sit amet consectetur adipisicing elit. Itaque harum corrupti temporibus dignissimos, deleniti maiores aut sequi voluptatibus nihil eveniet quasi id esse voluptatem, ipsum unde libero quae doloremque inventore!
        </p>
    </div>
    <br>
    <div class = "inline-block">
        <Calendar v-model="value" :inline="true"></Calendar>
    </div>
    <div class = "inline-block">
        <Listbox v-model="selectedTiming" :options="timings"/>
    </div>

  </template>
  
  
  <script lang="ts" setup>
  
  
  
  const timings = ["9:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00","00:00"];
  </script>