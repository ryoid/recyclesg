<style>
h2 {
    font-size: 50px;

}

h3 {
    font-size: 30px;
}

div {
    margin: 5px;
}

.inline {
    display: inline-block;
}

hr {
    border-top: 2px solid rgb(138, 138, 138);
}
</style>

<template>
    <div>
        <nav_bar />

        <h2>Booking Details</h2>
        <div id="date_time">
            <p>{{ form.date }}</p>
            <br />
            <h3>Your details</h3>
        </div>

        <form :onSubmit="onSubmit">
            <div>
                <p>Name</p>
                <InputText type="text" v-model="form.name" required />
                <div v-if="errors.name" class="text-red-500">{{ errors.name }}</div>
                <p>Email</p>
                <InputText type="email" v-model="form.email" required />
                <p>Contact Number</p>
                <InputNumber type="text" :useGrouping="false" v-model="form.phone" required />
            </div>

            <br />
            <hr />
            <br />

            <div>
                <h3>Collection Location</h3>
                <div class="inline">
                    <p>Address</p>
                    <InputText type="text" v-model="form.address" size="50" required />
                </div>
                <div class="inline">
                    <p>Postal Code</p>
                    <InputNumber type="number" :useGrouping="false" v-model="form.postal" required />
                </div>
            </div>

            <br />
            <hr />
            <br />

            <div>
                <h3>Collection Items</h3>
                <FileUpload name="demo[]" url="./upload" :multiple="true" accept="image/*"  ref="fileUploadRef" :fileLimit="1"/>
                <div>
                    <p>Description (optional)</p>
                    <Textarea v-model="form.desc" rows="10" cols="80" required />
                </div>
                <br />
                <Button type="submit" label="Submit" style="margin-left: 4px">Book
                    Collection</Button>
            </div>
        </form>
        date
        
    </div>
</template>

<script lang="ts" setup>
const { storage } = useFirebase()

const router = useRouter()
const route = useRoute()


const { date } = route.query
if (!date) {
    router.replace('/book/book1')
}

const fileUploadRef = ref(null)

const form = ref({
    name: null,
    email: null,
    phone: null,
    address: null,
    postal: null,
    image: null,
    desc: null,
    date: new Date(date)
});


const errors = ref({
    name: null,
    email: null,
    phone: null,
    address: null,
    postal: null,
    image: null,
    desc: null,
    date: new Date(date.toString())
});


async function onSubmit(e: SubmitEvent) {
    e.preventDefault()
    console.log('Submit');

    // Validate form
    let valid = true

    // if (somethin) valid = false
    errors.value.name = "Please enter a name"

    errors.value.name = null
    
    // If valid
    if (!valid) return

    const imageFile = fileUploadRef.value.files[0]
    const uploadRes = await uploadFile(storage, "user-item-uploads", imageFile)
    console.log(uploadRes.downloadUrl)
    
    const payload: Omit<CollectionBooking, 'id'> = {
        // name: string;
        // email: string;
        // contactNo: string;

        // address: string;
        // postalCode: string;
        pickupDate: form.value.date.toISOString(),

        image: uploadRes.downloadUrl,
        // description: string;
    }
    // const visionRes = await $fetch('/api/admin/bookings', {
    //   method: 'POST',
    //   body: JSON.stringify(payload)
    // })
}

function showAlert2() {
    console.log("show alert", form.value);
    if (
        form.value.name == "" ||
        form.value.email == "" ||
        form.value.phone == null ||
        form.value.address == "" ||
        form.value.postal == null
    ) {
        return alert("Please fill in all the fields");
    } else if (form.value.email.includes("@") == false) {
        return alert("Please enter a valid email address");
    } else if (form.value.phone.toString().length != 8) {
        return alert("Please enter a valid phone number");
    } else if (form.value.postal.toString().length != 6) {
        return alert("Please enter a valid postal code");
    } else {
        console.log(form.value);
        return alert("Your booking has been submitted");
    }
}
</script>
