<template>
  <div>
    <!-- <div v-if="firebaseUser">
      <client-only>
        <pre
          >{{ firebaseUser }}
    </pre
        >
      </client-only>
    </div> -->
    <!-- <div v-else>User is signed out</div> -->
    <!-- start here -->
    <div class="container">
      <h1 class="text-3xl font-extrabold">Profile</h1>
      <div class="grid grid-cols-1 gap-4 mt-5">
          <div class="flex flex-col items-center pb-10 lg:col-span-1">
              <img class="mb-3 w-24 h-24 rounded-full shadow-lg" src="https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg" />
              <h5 class="mb-1 text-xl font-medium text-gray-900">{{ user.user?.email }}</h5>
              <span class="text-2xl font-extrabold text-black-800">Points: <span class="text-green-700">{{
                  profile.user?.points
              }}</span></span>
          </div>
      </div>
      <div class="grid gap-4 mt-5">
          <h5 class=" text-2xl font-bold tracking-tight text-gray-900 text-center">Collection Appointment</h5>
          <p class="font-normal text-xl text-red-700 text-center">No appointment made</p>
      </div>
      <div class="grid gap-4 mt-9">
          <h1 class="text-xl font-semibold">Latest Recycled</h1>
      </div>
    </div>

  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"],
});

const user = useFirebaseUser()
// console.log(firebaseUser);

// const { data, pending, refresh, error } = await useFetch('/api/admin/user/me', {
// })

// const userFetch = await useFetch(`/api/user/${user.value.user?.uid}}`, {
//     key: user.value.user?.uid
// })

let profile = ref({
  user: null,
  pending: true,
  error: null,
})

// console.log(profile.value.user)
// {{user.user?.uid}}

watch(user, async (newUser) => {
  if (newUser.user?.uid) {
    profile.value.pending = true
    profile.value.user = await $fetch(`/api/user/${newUser.user?.uid}`).catch(err => {
      profile.value.error = err
    })
    profile.value.pending = false

  }
})


// console.log(data)
</script>