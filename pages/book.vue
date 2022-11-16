<template>
    <div class="w-auto">
        <div>
            <h2 class="text-4xl font-medium">Book Collection</h2>
            <div></div>
            <p>
                Make a booking for collection of your recyclables!
            </p>
        </div>
        <br>
        <br>
        <div class="flex flex-col lg:flex-row gap-8">
            <!-- <Calendar :disabled-dates="data.unavailableDays.map(day => new Date(day))" v-model="form.selectedDate"
                    :inline="true" :minDate="form.minDateValue" :maxDate="form.maxDateValue"
                    class="inline-block margin-right" style="margin: 5px" /> -->
            <div class="flex flex-col gap-4 w-full">
                <div v-for="key in Object.keys(dates)">
                    <div class="text-lg font-medium">
                        {{ isThisYear(dates[key][0])
                                ? format(dates[key][0], 'MMMM')
                                : format(dates[key][0], 'yyyy MMMM')
                        }}
                    </div>
                    <div class="grid grid-cols-7 gap-2">
                        <div v-for="date in dates[key]" :class="['bg-gray-100 hover:bg-blue-100/50 p-4 rounded-lg cursor-pointer font-medium select-none text-sm lg:text-lg', {
                            'text-blue-500 bg-blue-100': form.selectedDate == date,
                            'cursor-not-allowed': data.unavailableDays.find(day => isSameDay(new Date(day), date))
                        }]" @click="e => form.selectedDate = date">
                            {{ format(date, 'd') }}
                            <div>
                                {{ format(date, 'EEE') }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex flex-col w-full">
                <div class="text-lg font-medium" v-if="form.selectedDate">
                    {{ format(form.selectedDate, 'yyyy MMMM') }}
                </div>
                <ul class="grid grid-cols-3 gap-2">
                    <li :class="['bg-white py-4 px-3 rounded-xl border border-gray-200 cursor-pointer text-center select-none', {
                        'bg-gray-200 text-gray-700 cursor-not-allowed': !slot.available,
                        'bg-blue-500 text-white': form.selectedDateTime?.toISOString() === slot.date
                    }]" v-for="slot in data.availableSlots.find(d => isSameDay(new Date(d[0].date), form.selectedDate))"
                        @click="selectDate(slot as any)">
                        {{ format(new Date(slot.date), 'h:mm a') }}
                    </li>
                </ul>
                <div class="w-full flex items-end justify-end mt-10" v-if="form.selectedDate">
                    <Button class="w-full md:w-auto" v-if="form.selectedDateTime == null" @click="showAlert()"
                        label="Continue" />
                    <Button class="w-full md:w-auto" v-else @click="submit" label="Continue" />
                </div>
            </div>
        </div>

    </div>
</template>
  
<script lang="ts" setup>
import { addDays, isSameDay, format, eachDayOfInterval, getMonth, isThisYear } from 'date-fns'

const router = useRouter()

const form = ref({
    timings: ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"],
    dates: eachDayOfInterval({
        start: new Date(),
        end: addDays(new Date(), 7)
    }),
    minDateValue: new Date(),
    maxDateValue: addDays(new Date(), 14),
    selectedDate: null,
    selectedDateTime: null,
})

const dates = form.value.dates.reduce((acc, date) => {
    const groupKey = date.getFullYear() + '-' + date.getMonth()
    if (acc[groupKey]) {
        acc[groupKey].push(date)
    } else {
        acc[groupKey] = [date]
    }
    return acc
}, {} as any)

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
    router.push(`/book2?date=${form.value.selectedDateTime.toISOString()}`)
}

function showAlert() {
    return alert("Please select a date and time");
};

</script>