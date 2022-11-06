<template>

  <div>

    <div class="container parent flex w-5/6 mx-auto">

      <FileUpload
        id = "fileupload" 
        name="image[]" 
        url="url" 
        @upload="onAdvancedUpload($event)"
        v-bind:fileLimit= 1
        accept="image/*"
        :max-file-size="1000000">
        <template #header="{ chooseCallback, uploadCallback, clearCallback, files }">
            <div class="flex flex-wrap justify-content-between align-items-center flex-1 gap-2">
                <div class="flex gap-2">
                    <Button @click="chooseCallback()" icon="pi pi-images" label="Choose a picture"></Button>
                    <Button @click="openCamera()" icon="pi pi-times" label="Take a picture"></Button>
                    <Button @click="uploadCallback()" icon="pi pi-cloud-upload" label="Upload" :disabled="!files || files.length === 0"></Button>
                    <Button @click="clearCallback()" icon="pi pi-times" label="Cancel" :disabled="!files || files.length === 0"></Button>
                    
                </div>
            </div>
        </template>
        <template #content>
            <ul v-if="uploadedFiles && uploadedFiles[0]">
                <li v-for="file of uploadedFiles[0]" :key="file">{{ file.name }} - {{ file.size }} bytes</li>
            </ul>
            <ul v-if="captures!=[]">
                <li v-for="c of captures">
                  <img v-bind:src="c" height="50" />
                </li>              
            </ul>
        </template>
        <template #empty>
            <i id="uploadicon" class="col-12 pi pi-upload"></i>
            <p class="col-12 text-center">Drag and drop files to here to upload.</p>
            <p id="warntext">*Maximum file limit: 1</p>
        </template>
      </FileUpload>


      </div>
      <div v-if="cameraOn">
        <div><video ref="video" id="video" width="640" height="480" autoplay>{{cameraPreview}}</video></div>
        <div><button id="snap" v-on:click="capture()">Snap Photo</button></div>
        <canvas ref="canvas" id="canvas" width="640" height="480"></canvas>
      </div>
    </div>    
  </template>

  <script>
      export default({

      data(){
        return {
          uploadedFiles: null,
          length: 0,
          previewImage: null,
          upload: null,
          video: {},
          canvas: {},
          captures: [],
          cameraOn: false
        }
      },

      methods: {
        openCamera(){
          this.cameraOn = true
          this.video = this.$refs.video; 
          setTimeout(this.cameraPreview(), 1000)
        },

        capture() {
          this.canvas = this.$refs.canvas;
          var context = this.canvas
            .getContext("2d")
            .drawImage(this.video, 0, 0, 640, 480);
          this.captures.push(canvas.toDataURL("image/png"));
        },

        cameraPreview(){
          if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then(stream => {
              console.log(stream)
              video.srcObject = stream;
              this.video.play();              
        })}
        }
      }, 
      
  })

  </script>

<style>

  #fileupload{
    width: 100%;
  }

  #uploadicon{
    font-size: 100px;
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #warntext{
    text-align: center;
    color: red;
    font-size: small;
  }

</style>