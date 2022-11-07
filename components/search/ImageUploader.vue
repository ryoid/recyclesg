<template>

  <div>

    <div class="container w-5/6 mx-auto">
      <div class="row" v-if="!cameraOn">
        <Button id="takePicture" @click="openCamera()" icon="pi pi-camera" label="Take a picture"></Button>
      </div>
      
      <div class="row">
        <FileUpload
          v-if="!cameraOn"
          id = "fileupload" 
          name="image[]" 
          url="url" 
          @upload="onAdvancedUpload($event)"
          v-bind:fileLimit= 1
          accept="image/*"
          :max-file-size="1000000">
          <template #content>
              <ul v-if="uploadedFiles && uploadedFiles[0]">
                  <li v-for="file of uploadedFiles[0]" :key="file">{{ file.name }} - {{ file.size }} bytes</li>
              </ul>
          </template>
          <template #empty>
              <i id="uploadicon" class="col-12 pi pi-upload"></i>
              <p class="col-12 text-center">Drag and drop files to here to upload.</p>
              <p id="warntext">*Maximum file limit: 1</p>
          </template>
        </FileUpload>        
      </div>

      <div class="row">
        <div id="takePicture"><video class="mx-auto" :hidden="!cameraOn" ref="video" id="video" width="640" height="480" autoplay>{{cameraPreview}}</video></div>
        <div v-if="cameraOn">
          <div class="flex">
            <Button 
              class="flex p-button-rounded w-1/3 mx-auto" 
              id="snap" 
              v-on:click="capture()" 
              icon="pi pi-camera"></Button>
          </div>
          <canvas hidden ref="canvas" id="canvas" width="640" height="480"></canvas>
        </div>         
      </div>

      <div class="row">
        <Dialog v-model:visible="display" :closable="false">
          <template #header>
          <h3 :style="'font-size:20px;'" class="mx-auto">Upload image?</h3>
        </template>

        <ul>
            <li v-for="c of captures">
              <img v-bind:src="c" :width="width"/>
            </li>              
        </ul> 

        <template #footer>
          <Button label="No" icon="pi pi-times" class="p-button-text" v-on:click="clear()"/>
              <Button label="Yes" icon="pi pi-check" autofocus />
        </template>
      </Dialog>
      </div>
    </div>
   
  </div>
</template>

  <script>
      export default({

      data(){
        return {
          uploadedFiles: [],
          length: 0,
          previewImage: null,
          upload: null,
          video: {},
          canvas: {},
          captures: [],
          cameraOn: false,
          display: false,
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
          this.display = true
        },

        cameraPreview(){
          if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then(stream => {
              console.log(stream)
              console.log(this.uploadedFiles)
              video.srcObject = stream;
              this.width = this.video.width
              this.video.play();              
        })}
        },

        clear(){
          this.canvas = {}
          this.captures = []
          this.display = false
        }
      },
      
      mounted() {
        this.cameraPreview()
      }
      
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

  #takePicture{
    margin-bottom: 10px;
  }

  #snap{
    margin: auto;
    min-width: 50px;
    min-height: 50px;
  }

</style>