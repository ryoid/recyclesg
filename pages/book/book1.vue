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
    vertical-align:top;
}

.margin-right{
    margin-right: 100px;
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
    
        <Calendar v-model="value" :inline="true" :minDate="new Date(data.minDateValue)" :maxDate="maxDateValue" class = "inline-block margin-right" />
        <Listbox v-model="selectedTiming" :options="data.timings" class = "inline-block"/> 

    
    <div>
      
    </div>

  </template>
  
  
  <script lang="ts" setup>
  
    const { data, pending, refresh, error } = await useFetch('/api/admin/book1', {
    })

  </script>