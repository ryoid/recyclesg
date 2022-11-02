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

.inline-block {
    display: inline-block;
    vertical-align: top;
}

.margin-right {
    margin-right: 100px;
}
</style>

<template>
    <div>
        <h2>Book Collection</h2>
        <div>
            <p>
                Lorem,ipsum dolor sit amet consectetur adipisicing elit. Itaque harum corrupti temporibus dignissimos,
                deleniti maiores aut sequi voluptatibus nihil eveniet quasi id esse voluptatem, ipsum unde libero quae
                doloremque inventore!
            </p>
        </div>
        <br>
        <div class="flex justify-center ">
            <Calendar v-model="selectedDate" :inline="true" :minDate="new Date(data.minDateValue)" :maxDate="maxDate"
                :disabledDates="data.disabledDateArray" class="inline-block margin-right" />
            <div class="inline-block">
                <!-- <p class=" text-lg">Timings</p> -->
                <Dropdown v-model="data.selectedTiming" :options="data.timings" placeholder="Select a timing" />
                <div class="inline-block ">
                    <Button @click="onSubmit()" label="Continue" />
                </div>
            </div>

            <p>{{ data.selectedDate }}</p>
            <p>{{ data.selectedTiming }}</p>
        </div>
    </div>
</template>
  
  
<script lang="ts" setup>
import { addDays } from 'date-fns';

const router = useRouter()
let selectedDate = new Date()


const { data, pending, refresh, error } = await useFetch('/api/admin/book1', {
});

const maxDate = addDays(new Date(), 10)

function onSubmit() {
    console.log("onSubmit", selectedDate);
    const link = `/book/book2?date=${selectedDate.getTime()}`
    router.push(link);
}


</script>