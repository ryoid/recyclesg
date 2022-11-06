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
        <nav_bar />
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
            <Calendar :disabled-dates="data.unavailableDays.map(day => new Date(day))" v-model="form.selectedDate"
                :inline="true" :minDate="form.minDateValue" :maxDate="form.maxDateValue"
                class="inline-block margin-right" />
            <div class="inline-block">
                <!-- <Dropdown v-model="form.selectedTiming" :options="form.timings" placeholder="Select a timing" /> -->
                Timings
                <ul>
                    <li
                        v-for="slot in data.availableSlots.find(d => isSameDay(new Date(d[0].date), form.selectedDate))">
                        {{ slot.date }}
                    </li>
                </ul>
                <div class="inline-block ">
                    <Button v-if="form.selectedDate == '' || form.selectedTiming == ''" @click="showAlert()"
                        label="Continue" />
                    <Button v-else onclick="location.href = './book2'" label="Continue" />
                </div>
            </div>
            <p>{{ form.selectedDate }}</p>
            <p>{{ form.selectedTiming }}</p>

        </div>
            <div>
                {{ JSON.stringify(data.availableSlots, null, 2) }}
            </div>
    </div>

</template>
  
<script lang="ts" setup>
import { addDays, isSameDay } from 'date-fns'

const form = ref({
    timings: ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"],
    minDateValue: new Date(),
    maxDateValue: addDays(new Date(), 14),
    selectedDate: null,
    selectedTiming: null,

})

const { data, pending, refresh, error } = await useFetch('/api/admin/bookings/available', {
});


function showAlert() {
    return alert("Please select a date and time");
};

</script>