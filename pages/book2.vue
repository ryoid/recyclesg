
<template>
    <br>
    <div class="w-auto">
        <div>


            <h2>Booking Details</h2>
            <div>
                <p>{{ form.pickupDate }}</p>
                <br />
                <h3>Your details</h3>
            </div>




            <form>
                <div>

                    <label for="name" class="form-label">Name:</label><br>
                    <InputText type="text" v-model="form.name" required class="w-[500px] form-control" id="name"
                        pattern="[a-zA-Z ]{1,}" title="Name" /><br><br>



                    <label for="email" class="form-label">Email:</label><br>
                    <InputText type="email" v-model="form.email" required class="w-[500px] form-control" id="email" />
                    <br><br>

                    <label for="phone" class="form-label">Contact Number:</label><br>
                    <InputText :useGrouping="false" v-model="form.contactNo" required class="w-[500px] form-control"
                        id="phone" pattern="[0-9]{8}" title="Phone Number" /><br>

                </div>
                <br />
                <hr />
                <br />
                <div>
                    <h3>Collection Location</h3>
                    <div class="flex flex-col">
                        <label for="address" class="form-label">Address:</label>
                        <InputText type="text" v-model="form.address" size="50" required class="w-[500px] form-control"
                            id="address" />
                    </div>
                    <div class="flex flex-col">
                        <label for="postal" class="form-label">Postal Code:</label>
                        <InputText :useGrouping="false" v-model="form.postalCode" required
                            class="w-[300px] form-control" id="postal" pattern="[0-9]{6}" title="Postal Code" />

                    </div>
                </div>

                <br />
                <hr />
                <br />

                <div>
                    <h3>Collection Items</h3>
                    <!-- <FileUpload name="demo[]" url="./upload" :multiple="true" accept="image/*"  ref="fileUploadRef" :fileLimit="1"/> -->
                    <NewImageUploader :annotate='false' @uploaded="getImageUrl" />
                    <div>
                        <label for="desc" class="form-label">Description (Optional):</label><br>
                        <Textarea v-model="form.description" rows="10" cols="80" class="form-control w-[500px]"
                            id="desc" />
                    </div>
                    <br />
                    <Button type="submit" @click="submitForm" label="Submit" style="margin-left: 4px">Book
                        Collection</Button>
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
// if (!date) {
//     router.replace('/book')
// }

const fileUploadRef = ref(null)

const form = ref({
    address: null,
    contactNo: null,
    email: null,
    image: null,
    name: null,
    pickupDate: new Date(date),
    postalCode: null,
    description: null,
    noImage : null


});

console.log(form.value.image)

function getImageUrl(downloadurl) {
    form.value.image = downloadurl
    console.log(downloadurl)
}



const submitForm  = async () => {
// prevent default form submission


    if(form.value.image == null){
        event.preventDefault();
        form.value.noImage = "Please upload an image";
        console.log(form.value.noImage)
        
    }
    
    else{
    event.preventDefault();
    try {
        const res = await fetch(`/api/admin/bookings/`, {
            method: 'POST',
            body: JSON.stringify({
                address: form.value.address,
                contactNo: form.value.contactNo,
                email: form.value.email,
                image: form.value.image,
                name: form.value.name,
                pickupDate: form.value.pickupDate,
                postalCode: form.value.postalCode,
                description: form.value.description,
                createdAt: new Date().toISOString(),
            }),
        })
        console.log("works")
        console.log(res)
        router.push(`/`)
    } catch (err) {
        console.log(err)
    }
    

}}


</script>