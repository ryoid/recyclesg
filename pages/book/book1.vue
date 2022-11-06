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

<nav_bar/>
<search_bar/>

<template>
    <h2>Book Collection</h2>
    <div>
        <p>
            Lorem,ipsum dolor sit amet consectetur adipisicing elit. Itaque harum corrupti temporibus dignissimos, deleniti maiores aut sequi voluptatibus nihil eveniet quasi id esse voluptatem, ipsum unde libero quae doloremque inventore!
        </p>
    </div>
    <br>
        <div class="flex justify-center ">
            <Calendar :disabled-dates="data.disabledDateArray" v-model="data.selectedDate" :inline="true" :minDate="new Date(data.minDateValue)" :maxDate="maxDateValue" :disabledDates="data.disabledDateArray" class = "inline-block margin-right" />
            <div class = "inline-block">
                <Dropdown v-model="data.selectedTiming" :options="data.timings"  placeholder="Select a timing" />
                <div class = "inline-block ">
                    <Button v-if="data.selectedDate == '' || data.selectedTiming == ''" @click="showAlert()" label="Continue"/>
                    <Button v-else onclick="location.href = './book2'" label="Continue"/>
                </div>
            </div>
                <p>{{data.selectedDate}}</p>
                <p>{{data.selectedTiming}}</p>
            </div>
        <div>
      
    </div>

  </template>
  
  
  <script lang="ts" setup>
  
    const { data, pending, refresh, error } = await useFetch('/api/admin/book1', {
    });

    function showAlert(){
            return alert("Please select a date and time");
        }; 

  </script>