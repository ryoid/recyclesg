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

hr{
    border-top: 2px solid rgb(138, 138, 138);
  
}


</style>

<template>
    
    <h2>Booking Details</h2>
    <div id="date_time">
        <p>
            day, ## month - time
        </p>
            <br>
        <h3>
            Your details
        </h3>
    </div>

    <div>
        <p>Name</p>
        <InputText type="text" v-model="data.nameInput" />
        <p>Email</p>
        <InputText type="text" v-model="data.emailInput" />
        <p>Contact Number</p>
        <InputNumber type="number" :useGrouping="false" v-model="data.phoneInput"/>
    </div>

    <br>
        <hr>
    <br>

    <div>
        <h3>Collection Location</h3>
        <div class = "inline">
            <p>Address</p>
            <InputText type="text" v-model="data.addressInput" size="50" />
        </div>
        <div class = "inline">
            <p>Postal Code</p>
            <InputNumber type="number" :useGrouping="false" v-model="data.postalInput"/>
        </div>
    </div>

    <br>
    <hr>
    <br>
   
    <div>
        <h3>Collection Items</h3>
        <FileUpload name="demo[]" url="./upload" :multiple="true" accept="image/*" />
        <div>
            <p>Description (optional)</p>
            <Textarea v-model="data.descInput" rows="10" cols="80" />
        </div>
        <br>
        <Button v-if="data.nameInput == '' || data.emailInput == '' || data.phoneInput == null || data.addressInput == '' || data.postalInput == null" @click="showAlert2()" label="Submit" style = "margin-left:4px">Book Collection</Button>
        <Button v-else onclick="location.href = './book1'" label="Submit" style = "margin-left:4px">Book Collection</Button>          
    </div>
  </template>
  
  <script lang="ts" setup>
   
    const { data, pending, refresh, error } = await useFetch('/api/admin/book2', {
    });
    
    
    function showAlert2() {
        alert("Please fill in all the details!");
    }

  </script>