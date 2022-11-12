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

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>

<template>
    <div class="w-auto">
        <nav_bar />
        <div>
        

        <h2>Booking Details</h2>
        <div>
            <p>{{ form.date }}</p>
            <br />
            <h3>Your details</h3>
        </div>
        

        

        <form :onSubmit="onSubmit" class="was-validated">
            <div>

                <label for="name" class="form-label">Name:</label><br>
                <InputText type="text" v-model="form.name" required class = "w-[500px] form-control" id="name" pattern="[a-zA-Z ]{1,}" title="Name"/><br><br>
                
                
                
                <label for="email" class="form-label">Email:</label><br>
                <InputText type="email" v-model="form.email" required class = "w-[500px] form-control" id="email"/><br><br>
            
                <label for="phone" class="form-label">Contact Number:</label><br>
                <InputText :useGrouping="false" v-model="form.phone" required class = "w-[500px] form-control" id="phone" pattern="[0-9]{8}" title="Phone Number" /><br>
                
            </div>

            <br />
            <hr />
            <br />

            <div>
                <h3>Collection Location</h3>
                <div class="inline">
                    <label for="address" class="form-label">Address:</label><br>
                    <InputText type="text" v-model="form.address" size="50" required class = "w-[500px] form-control" id="address"/>
                    
                </div>
                <div class="inline">
                    <label for="postal" class="form-label">Postal Code:</label><br>
                    <InputText :useGrouping="false" v-model="form.postal" required class = "w-[300px] form-control" id="postal" pattern="[0-9]{6}" title="Postal Code" />
                    
                </div>
            </div>

            <br />
            <hr />
            <br />

            <div>
                <h3>Collection Items</h3>
                <FileUpload name="demo[]" url="./upload" :multiple="true" accept="image/*"  ref="fileUploadRef" :fileLimit="1"/>
                <div>
                    <label for="desc" class="form-label">Description (Optional):</label><br>
                    <Textarea v-model="form.desc" rows="10" cols="80" class = "form-control" id="desc"  />
                    
                </div>
                <br />
                <Button type="submit" label="Submit" style="margin-left: 4px">Book
                    Collection</Button>
                <!-- <div v-if="errors.submit" class="text-red-500 inline-block" style="margin-left: 20px"  >{{ errors.submit }}</div> -->
            </div>
        </form>
        
        
        </div>
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
    date: new Date(date.toString()),
    submit: null
});


async function onSubmit(e: SubmitEvent) {
    e.preventDefault()
    console.log('Submit');

    // Validate form
    let valid = true

    
    if(form.value.phone.toString().length != 8) {
        errors.value.phone = "Invalid phone number"
        valid = false
    }
    if(form.value.postal.toString().length != 6) {
        errors.value.postal = "Invalid postal code"
        valid = false
    }



    if(!valid){
        errors.value.submit = "Please fill in all fields"
    }
    

    // errors.value.name = null
    
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
