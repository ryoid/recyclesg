<template>

  <div class="container parent flex w-5/6 mx-auto ">

    <FileUpload id="fileupload" name="image[]" :url="url" @upload="uploadFile" fileLimit=1 accept="image/*"
      invalidFileTypeMessage="Invalid file type. Only image files are allowed " :max-file-size="1000000">
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
export default ({

  data() {
    return {
      uploadedFiles: null,
      length: 0,
      previewImage: null,
      fileListLength: 0,
      upload: null,
      fileList: ref([]),
      url: "/api/search",
    }
  },
  methods: {
    uploadFile(data) {
      console.log(data);
    }
  }
})



</script>

<style>
#fileupload {
  width: 100%;
}

#uploadicon {
  font-size: 100px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

#warntext {
  text-align: center;
  color: red;
  font-size: small;
}
</style>