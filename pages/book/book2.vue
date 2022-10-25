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
    <div>
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
        <InputText type="text" v-model="value" />
        <p>Email</p>
        <InputText type="text" v-model="value" />
        <p>Contact Number</p>
        <InputNumber type="number" v-model="value"/>
    </div>

    <br>
    <hr>
    <br>

    <div>
        <h3>Collection Location</h3>
        <div class = "inline">
            <p>Address</p>
            <InputText type="text" v-model="value" size="50" />
        </div>
        <div class = "inline">
            <p>Postal Code</p>
            <InputNumber type="number" v-model="value"/>
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
            <InputText type="text" v-model="value" size = "100" style = "height:200px"/>
        </div>
        <br>
        <Button label="Submit" style = "margin-left:4px">Book Collection</Button>
    </div>

    
  </template>
  
  
  <script lang="ts" setup>
  
  


  </script>