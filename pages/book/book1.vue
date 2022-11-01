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
        <div class="flex justify-center ">
            <Calendar :disabled-dates="data.disabledDateArray" v-model="data.selectedDate" :inline="true" :minDate="new Date(data.minDateValue)" :maxDate="maxDateValue" :disabledDates="data.disabledDateArray" class = "inline-block margin-right" />
            <div class = "inline-block">
                <!-- <p class=" text-lg">Timings</p> -->
                <Dropdown v-model="data.selectedTiming" :options="data.timings"  placeholder="Select a timing" />
                <div class = "inline-block ">
                    
                    <NuxtLink v-if="data.selectedDate == '' || data.selectedTiming == ''" @click="showAlert()">
                        <Button  label="Continue"/>
                    </NuxtLink>
                    <NuxtLink v-else :href="testLink">
                        <Button  label="Continue"/>
                    </NuxtLink>
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

    const myArray = [data.selectedDate, data.selectedTiming, 'ccc'];
    const arrStr = encodeURIComponent(JSON.stringify(myArray));
    const testLink = `./book2?myArray=${arrStr}`;
  

  </script>