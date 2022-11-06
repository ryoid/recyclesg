<style>
h2 {
    font-size: 50px;
    font-family: "Times New Roman";
}

h3 {
    font-size: 30px;
    font-family: "Times New Roman";
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
            <p>day, ## month - time</p>
            <br />
            <h3>Your details</h3>
        </div>

        <form>
            <div>
                <p>Name</p>
                <InputText type="text" v-model="person.name" />
                <p>Email</p>
                <InputText type="text" v-model="person.email" />
                <p>Contact Number</p>
                <InputNumber type="number" :useGrouping="false" v-model="person.phone" />
            </div>

            <br />
            <hr />
            <br />

            <div>
                <h3>Collection Location</h3>
                <div class="inline">
                    <p>Address</p>
                    <InputText type="text" v-model="person.address" size="50" />
                </div>
                <div class="inline">
                    <p>Postal Code</p>
                    <InputNumber type="number" :useGrouping="false" v-model="person.postal" />
                </div>
            </div>

            <br />
            <hr />
            <br />

            <div>
                <h3>Collection Items</h3>
                <FileUpload name="demo[]" url="./upload" :multiple="true" accept="image/*" />
                <div>
                    <p>Description (optional)</p>
                    <Textarea v-model="person.desc" rows="10" cols="80" />
                </div>
                <br />
                <Button @click="showAlert2()" label="Submit" style="margin-left: 4px">Book Collection</Button>
            </div>
        </form>
    </div>
</template>

<script lang="ts" setup>
const person = ref({
    name: "",
    email: "",
    phone: null,
    address: "",
    postal: null,
    image: "",
    desc: "",
});

function showAlert2() {
    console.log("show alert", person.value);
    if (
        person.value.name == "" ||
        person.value.email == "" ||
        person.value.phone == null ||
        person.value.address == "" ||
        person.value.postal == null
    ) {
        return alert("Please fill in all the fields");
    } else if (person.value.email.includes("@") == false) {
        return alert("Please enter a valid email address");
    } else if (person.value.phone.toString().length != 8) {
        return alert("Please enter a valid phone number");
    } else if (person.value.postal.toString().length != 6) {
        return alert("Please enter a valid postal code");
    } else {
        console.log(person.value);
        return alert("Your booking has been submitted");
    }
}
</script>
