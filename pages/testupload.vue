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

    const searchTags = visionRes.labelAnnotations.slice(0, 2).map(a => a.description).join(',');
    const results = await $fetch(`/api/admin/recyclable/tags?tags=${searchTags}`)

    console.log('results of first 2', searchTags, results);
  } catch (err) {
    console.log("Failed to upload", err);
  } finally {
    submitting.value = false
  }
}
</script>