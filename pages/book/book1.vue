<style scoped>
h2 {
    font-size: 50px;
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
    <div class="w-auto">
        <nav_bar/>
        <div>
            <h2>Book Collection</h2>
            <div></div>
            <p>
                Lorem,ipsum dolor sit amet consectetur adipisicing elit. Itaque harum corrupti temporibus dignissimos,
                deleniti maiores aut sequi voluptatibus nihil eveniet quasi id esse voluptatem, ipsum unde libero quae
                doloremque inventore!
            </p>
        </div>
        <br>
        <br>
        <div class="flex justify-center">
            <div class="">
                <Calendar :disabled-dates="data.unavailableDays.map(day => new Date(day))" v-model="form.selectedDate"
                    :inline="true" :minDate="form.minDateValue" :maxDate="form.maxDateValue"
                    class="inline-block margin-right" style="margin: 5px"/>
                <div class="inline-block" >
                    <ul class="grid grid-cols-3 gap-2 w-[300px]" style="margin: 5px">
                        <li style="margin-left:5"    :class="['bg-white py-4 px-3 rounded-xl border border-gray-200 cursor-pointer text-center select-none', {
                            'bg-gray-200 text-gray-700 cursor-not-allowed': !slot.available,
                            'bg-blue-500 text-white': form.selectedDateTime?.toISOString() === slot.date
                        }]" v-for="slot in data.availableSlots.find(d => isSameDay(new Date(d[0].date), form.selectedDate))"
                            @click="selectDate(slot as any)">
                            {{ format(new Date(slot.date), 'h:mm a') }}
                        </li>
                    </ul>
                    <div class="inline-block" >   
                        <Button v-if="form.selectedDateTime == null" @click="showAlert()" label="Continue" style="margin-left: 100px" />
                        <Button v-else @click="submit" label="Continue"  style="margin-left: 100px"/>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
  
<script lang="ts" setup>
import { addDays, isSameDay, format } from 'date-fns'

const router = useRouter()

const form = ref({
    timings: ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"],
    minDateValue: new Date(),
    maxDateValue: addDays(new Date(), 14),
    selectedDate: null,
    selectedDateTime: null,
})

const { data, pending, refresh, error } = await useFetch('/api/admin/bookings/available', {
});

function selectDate(slot: {
    date: string
    available: boolean
}) {
    if (!slot.available) return
    form.value.selectedDateTime = new Date(slot.date)
}

function submit() {
    console.log(form.value.selectedDateTime)
    router.push(`/book/book2?date=${form.value.selectedDateTime.toISOString()}`)
}

function showAlert() {
    return alert("Please select a date and time");
};

</script>