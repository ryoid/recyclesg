<template>
  <div>
    <h1>Test upload</h1>
    <form @submit="onSubmit">
      <input class="hidden" type="file" @change="imageChange" ref="imageInputRef" accept="image/*" />
      <div class="h-32 w-32 bg-gray-100 relative" @click="selectImage">
        <div class="absolute inset-0 flex items-center justify-center">Click to upload</div>
        <img v-if="imageSrc" :src="imageSrc" class="absolute inset-0 z-10 h-full w-full" />
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>


<script lang="ts" setup>
const { storage } = useFirebase()
const imageInputRef = ref(null)
let imageSrc = ref(null)
let submitting = ref(false)

function selectImage() {
  imageInputRef.value.click()
}

function imageChange() {
  const imageFile = imageInputRef.value.files[0]
  if (imageFile) {
    imageSrc.value = URL.createObjectURL(imageFile)
  }
}

async function onSubmit(e) {
  e.preventDefault();
  console.log('Submit form');
  const imageFile = imageInputRef.value.files[0]
  if (!imageFile) {
    console.log("Select an image");
    return
  }

  submitting.value = true
  try {
    const res = await uploadFile(storage, "user-item-uploads", imageFile)
    console.log(res.downloadUrl);
    // Send to cloud vision api to get text
  } catch (err) {
    console.log("Failed to upload", err);
  } finally {
    submitting.value = false
  }

}
</script>