<template>

    <div class="container parent flex w-5/6 mx-auto ">
      <!-- <n-layout vertical>
        <n-layout-content>
          <n-upload
            directory-dnd
            ref="upload"
            action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
            @change="handleChange"
          >
            <n-upload-dragger>
              <div style="margin-bottom: 12px">
                <n-icon size="48" :depth="3">
                  <archive-icon />
                </n-icon>
              </div>
              <n-text style="font-size: 16px">
                Click or drag a file to this area to upload
              </n-text>
            </n-upload-dragger>
          </n-upload>

            <img :src="previewImage" class="flex mx-auto" />

            <n-button 
              class="flex mx-auto"
              @click="handleClick"
              :disabled="!fileListLength"
            >Search by image</n-button>       
        </n-layout-content>
      </n-layout> -->

      <FileUpload
        id = "fileupload" 
        name="image[]" 
        url="url" 
        @upload="onAdvancedUpload($event)"
        fileLimit= 1
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
  </template>

  <script>
      import FileUpload from 'primevue/fileupload';
      import { defineComponent, ref } from "vue";
      import { ArchiveOutline as ArchiveIcon } from "@vicons/ionicons5";
      import {
        NUploadDragger,
        NIcon,
        NUpload,
        NText,
        NButton,
        NLayout,
        NLayoutContent
      } from 'naive-ui'

      export default defineComponent({

      name:'imageUpload',

      components: {
        ArchiveIcon,
        NUploadDragger,
        NIcon,
        NUpload,
        NText,
        NButton,
        NLayout,
        NLayoutContent,
        FileUpload
      },

      data(){
        return {
          uploadedFiles: null,
          length: 0,
          previewImage: null,
          fileListLength: 0,
          upload: null,
          fileList: ref([]),
        }
      },

      methods: {

        onAdvancedUpload() {
            this.$toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
        },

        uploadImage(imgLink){
          this.previewImage = 'images' + imgLink
          console.log(this.previewImage)
        },
        
        handleChange(data) {
          const fileListLengthRef = ref(0)
          fileListLengthRef.value = data.fileList.length;
          this.fileListLength = fileListLengthRef;
          this.uploadImage(data.fileList[0].fullPath)
          console.log(data.fileList)
        },
        handleClick() {
          const uploadRef = ref(null);
          uploadRef.value?.submit();
          this.upload = this.uploadRef;
        },
      },
  })

  </script>

<style>

  /* .parent {
        position: relative;
        margin: auto;
        padding-top: 20px;
        padding-bottom: 20px;
        padding-left: 30px;
        padding-right: 30px;
        border-radius: 30px;
        border: 1px solid black;
    } */

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