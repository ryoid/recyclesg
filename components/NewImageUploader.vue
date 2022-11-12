<template>
  <div class="container w-5/6 mx-auto">
    <!-- Take a picture upload image row -->
    <div class="row mx-auto m-0" v-if="!cameraOn">
      <p class="mb-3" :style="'font-weight:bold; font-size:20px;'">Search by image</p>
      <div class="flex m-0 border">
        <Button id="fileUploadButton" @click="openCamera()" icon="pi pi-camera" label="Take a picture"></Button>
        <Button :disabled="!imageSrc" id="fileUploadButton" icon="pi pi-upload" @click="getAnnotations"
          label="Upload"></Button>
        <div v-if="fileObj['size'] != null" class="flex">
          <div class="m-auto">{{ fileObj['name'] }} - {{ fileObj['size'] / 1000 }} MB</div>
        </div>
      </div>
    </div>

    <!-- Drag and drop row -->
    <div class="row mx-auto m-0" v-if="!cameraOn">
      <form class="bg-gray-100 p-3 border" @click="selectImage" @dragover="dragOverHandler" @drop="dropHandler">
        <input class="hidden" type="file" @change="imageChange" ref="imageInputRef" accept="image/*" />
        <div class="mx-auto bg-gray-100 h-64 sm:h-80 md:h-96 lg:h-80 w-2/3 relative">
          <div v-if="!imageSrc" class="absolute inset-0 top-20 items-center justify-center">
            <i id="uploadicon" class="col-12 pi pi-upload"></i>
            <p class="col-12 text-center">Click or drag and drop here to upload from storage.</p>
            <p id="warntext">*Maximum file limit: 1</p>
          </div>
          <img v-if="imageSrc" :src="imageSrc" class="absolute inset-0 z-10 m-auto lg:w-96" />
        </div>
      </form>
    </div>

    <!-- Camera preview video row -->
    <div class="row">
      <video :hidden="!cameraOn" class="mx-auto w-5/6 m-3" id="video" autoplay>{{ cameraPreview }}</video>
      <div v-if="cameraOn">
        <div class="w-1/3 flex mx-auto">
          <Button class="flex p-button-rounded mx-auto" id="snap" v-on:click="capture()"
            icon="pi pi-camera"></Button>
            <Button class="p-button-rounded mx-auto" id="snap" v-on:click="back()"
            icon="pi pi-arrow-circle-left"></Button>
        </div>
        <canvas hidden id="canvas" width="640" height="480"></canvas>
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
let cameraOn = ref(false)
let fileObj = ref({})
let localStream = null
const emit = defineEmits(['uploaded'])

function dropHandler(ev) {
  ev.preventDefault()
  const temp = [...ev.dataTransfer.items]
  temp.forEach((item, i) => {
    if (item.kind == 'file') {
      const file = item.getAsFile()
      console.log(file)
      console.log(file.type)
      if (['image/jpeg', 'image/png'].includes(file.type)) {
        imageSrc.value = URL.createObjectURL(file)
        fileObj['image'] = file
      } else {
        alert('Please upload image files of type jpg/png only')
      }
    }
  })
}

function back(){
  cameraOn.value = !cameraOn.value
  closeCamera()
}

function closeCamera(){
  localStream.getTracks()[0].stop()
}

function dragOverHandler(ev) {
  console.log('File(s) in drop zone')
  ev.preventDefault()
}

function openCamera() { 
  cameraOn.value = !cameraOn.value
  cameraPreview()
}

function capture() {
  let canvas = document.getElementById('canvas') as HTMLCanvasElement
  let video = document.getElementById('video') as HTMLVideoElement
  
  let context = canvas
    .getContext("2d")
    .drawImage(video, 0, 0, 640, 480);
  imageSrc.value = canvas.toDataURL("image/png")
  canvas.toBlob(function (blob) {
    fileObj['image'] = (new File([blob], 'image', { type: 'image/jpeg' }))
  }, 'image/png');
  closeCamera()
  back()
}

function cameraPreview() {
  let video = document.getElementById('video') as HTMLVideoElement
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then(stream => {
      localStream = stream
      video.srcObject = stream;
      video.play();
    })
  }
}

function selectImage() {
  imageInputRef.value.click()
}

function imageChange() {
  const imageFile = imageInputRef.value.files[0]
  if (imageFile) {
    imageSrc.value = URL.createObjectURL(imageFile)
    fileObj['image'] = imageInputRef.value.files[0]
  }
}

async function getAnnotations(e) {
  e.preventDefault()
  console.log('Submit form');
  const imageFile = fileObj['image']
  if (!imageFile) {
    console.log("Select an image");
    return
  }

  submitting.value = true
  try {
    const uploadRes = await uploadFile(storage, "user-item-uploads", imageFile)
    console.log(uploadRes);
    const imageUri = `gs://${uploadRes.metadata.bucket}/${uploadRes.metadata.fullPath}`;
    // Send to cloud vision api to get text
    const visionRes = await $fetch('/api/vision', {
      method: 'POST',
      body: JSON.stringify({
        imageUri: imageUri
      })
    })
    console.log('receive visionRes', visionRes);

    // Sort etc
    annotations.value = visionRes.labelAnnotations
    emit('uploaded', annotations.value, uploadRes.downloadUrl);

  } catch (err) {
    console.log("Failed to upload", err);
  } finally {
    submitting.value = false
  }

}
</script>

<style>
#fileUploadButton {
  margin: 15px
}

#warntext {
  text-align: center;
  color: red;
  font-size: small;
}

#uploadicon {
  font-size: 100px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

#snap {
  margin: auto;
  min-width: 50px;
  min-height: 50px;
}
</style>