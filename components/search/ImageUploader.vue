<template>
  <div>
    <div class="row w-5/6 mx-auto m-0" v-if="!cameraOn">
      <p class="mb-3" :style="'font-weight:bold; font-size:20px;'">Search by image</p>
      <div class="flex m-0 border">
      <Button id="fileUploadButton" @click="openCamera()" icon="pi pi-camera" label="Take a picture"></Button>
      <Button :disabled="!imageSrc" id="fileUploadButton" icon="pi pi-upload" @click="onSubmit" label="Upload"></Button>
      <div v-if="fileList" v-for="file of fileList" class="flex">
        <div class="m-auto">{{ file.name }} - {{ file.size }} bytes</div>
      </div>
    </div>
    </div>

    <div class="row w-5/6 mx-auto m-0" v-if="!cameraOn">
      <form class="bg-gray-100 p-3 border" @click="selectImage" @dragover="dragOverHandler" @drop="dropHandler">
        <input class="hidden" type="file" @change="imageChange" ref="imageInputRef" accept="image/*" />
        <div class="mx-auto h-80 w-96 bg-gray-100 relative">
          <div class="absolute inset-0 top-24 items-center justify-center">
            <i id="uploadicon" class="col-12 pi pi-upload"></i>
            <p class="col-12 text-center">Click or drag and drop here to upload from storage.</p>
            <p id="warntext">*Maximum file limit: 1</p>
          </div>
          <img v-if="imageSrc" :src="imageSrc" class="absolute inset-0 z-10 h-full w-full" />
        </div>
      </form>
    </div>

    <div class="row">
      <video :hidden="!cameraOn" class="mx-auto" id="video" width="640" height="480" autoplay>{{cameraPreview}}</video>
      <div v-if="cameraOn">
        <div class="flex">
          <Button 
            class="flex p-button-rounded w-1/3 mx-auto" 
            id="snap" 
            v-on:click="capture()" 
            icon="pi pi-camera"></Button>
        </div>
        <canvas hidden id="canvas" width="640" height="480"></canvas>
        </div>
    </div>
    <div v-if="annotations">
      Result
      <div>
        <code>
          {{ JSON.stringify(annotations, null, 2) }}
        </code>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

const { storage } = useFirebase()
const imageInputRef = ref(null)
let imageSrc = ref(null)
let submitting = ref(false)
let annotations = ref(null)
let video = {}
let canvas = {}
let cameraOn = ref(false)
let fileList = {}

function dropHandler(ev){
  ev.preventDefault()
  const temp = [...ev.dataTransfer.items]
  temp.forEach((item, i)=>{
    if (item.kind == 'file'){
      console.log(item.kind)
      const file = item.getAsFile()
      if (file['type'] == ('image/jpeg' || 'image/png')){
        console.log(1, file)
        imageSrc.value = URL.createObjectURL(file)
        fileList['image'] = file
      } else {
        alert('Please upload image files of type jpg/png only')
      }
    }
  })
}

function dragOverHandler(ev){
  console.log('File(s) in drop zone')
  ev.preventDefault()
}

function openCamera(){
  cameraOn.value = !cameraOn.value
  console.log(cameraOn.value)
  video = document.getElementById('video')
  setTimeout(cameraPreview, 1000)
}

function capture() {
  cameraOn.value = !cameraOn.value
  canvas = document.getElementById('canvas')
  let context = canvas
    .getContext("2d")
    .drawImage(video, 0, 0, 640, 480);
  imageSrc.value = canvas.toDataURL("image/png")
  canvas.toBlob(function(blob){
    fileList['image'] = (new File([blob], 'image', { type: 'image/jpeg' }))
  },'image/png');
}

function cameraPreview(){
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then(stream => {
      video.srcObject = stream;
      video.play();              
})}
}

function selectImage() {
  imageInputRef.value.click()
}

function imageChange() {
  const imageFile = imageInputRef.value.files[0]
  if (imageFile) {
    imageSrc.value = URL.createObjectURL(imageFile)
    fileList['image'] = imageInputRef.value.files[0]
  }
}

async function onSubmit(e) {

  e.preventDefault()
  console.log('Submit form');
  const imageFile = fileList.image
  if (!imageFile) {
    console.log("Select an image");
    return
  }
  submitting.value = true
  try {
    const uploadRes = await uploadFile(storage, "user-item-uploads", imageFile)
    console.log(uploadRes);
    // Send to cloud vision api to get text
    const visionRes = await $fetch('/api/vision', {
      method: 'POST',
      body: JSON.stringify({
        imageUri: `gs://${uploadRes.metadata.bucket}/${uploadRes.metadata.fullPath}`
      })
    })
    console.log('receive visionRes', visionRes);

    // Sort etc
    annotations.value = visionRes.labelAnnotations

    const searchTags = visionRes.labelAnnotations.slice(0, 2).map(a => a.description).join(',')
    const results = await $fetch(`/api/admin/recyclable/tags?tags=${searchTags}`)

    console.log('results of first 2', searchTags, results);
  } catch (err) {
    console.log("Failed to upload", err);
  } finally {
    submitting.value = false
  }

}

onMounted(() => {
  cameraPreview()
})
</script>

<style>

#fileUploadButton{
  margin: 15px
}

#warntext{
    text-align: center;
    color: red;
    font-size: small;
}

#uploadicon{
    font-size: 100px;
    margin-bottom: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
}

#snap{
    margin: auto;
    min-width: 50px;
    min-height: 50px;
  }
  
</style>