<template>
  <div>
    <h1 class="text-3xl font-bold underline">
      Admin / Database / [id] detail
    </h1>

    <div class="container">
      <div class="grid grid-cols-4 gap-20 mt-6">
        <div>
          <Image src="https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc=" alt="Image Text" />
        </div>
        <div class="col-span-3">
          <div>
            <h2 class="text-xl mb-2">Suggested Words</h2>
            <InputText class="w-full"  type="text" />
          </div>

          <div class="mb-2 mt-4">
            <h2 class="text-xl mb-2">Description</h2>
            <!-- <InputText class="w-full"  type="tex" /> -->
            <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Your message..."></textarea>
          </div>

          <div class="mt-3 mb-6">
            <h2 class="text-xl mb-2">Email</h2>
            <InputText class="w-full"  type="text" />
          </div>
          <!-- <hr> -->
          <Divider/>
          <div>            
            <h2 class="font-semibold text-xl">Add new Entry</h2>
          </div>
          <div class="grid grid-cols-2 gap-4 mt-5">
            <div>
              <h2 class="text-xl mb-2">Name</h2>
              <InputText type="text" />
            </div>
            <div>
              <h2 class="text-xl mb-2">Material</h2>
              <InputText type="text" />
            </div>
          </div>

          <div class="grid grid-cols-1 mt-5">
            <div>
              <h2 class="text-xl mb-3">Recycable?</h2>
              <div class="flex flex-row items-center mt-3">
                <div class="flex flex-row items-center">
                  <input type="radio" id="yes" name="options" value="yes" />
                  <label for="yes" class="ml-2">Yes</label>
                </div>
                <div class="flex flex-row items-center ml-6">
                  <input type="radio" id="no" name="options" value="blue" />
                  <label for="no" class="ml-2">No</label>
                </div>
              </div>
            </div>
            <div class="mt-5">
              <label for="message" class="block mb-2 font-medium text-gray-900 text-xl">Description</label>
              <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Your message..."></textarea>
            </div>
          </div>

          <div class="grid grid-cols-3 mt-5 place-items-center">
            <div>
              <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Reject Entry</button>
            </div>
            <div>
              <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add Entry</button>
            </div>
            <div>
              <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add & Notify Entry</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
function fileUpload(){
  console.log("fileUpload")
  // toggle button to file upload image
  // upload image to server
  // return image url

  

}
const name = ref("");
definePageMeta({
  layout: "admin",
});
</script>