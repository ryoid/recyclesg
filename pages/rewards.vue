<template>
  <div>
    <NuxtLink v-if="user.user?.email == null" class="flex items-center justify-center h-screen" to="/login">
      <div class="text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm p-10 text-center mr-3 md:mr-0">
          <p class="text-2xl font-semibold">Log in to see the list of rewards you can claim!</p>
      </div>
    </NuxtLink>

 
    <div v-else class="container">
      <div class="grid-cols-1">
        <h1 class="flex items-center text-4xl font-extrabold dark:text-white">Rewards</h1>
      </div>

     
      <div class="flex flex-col items-center pb-10">
        <img class="mb-3 w-24 h-24 rounded-full shadow-lg"
          src="https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg" />
        <h5 class="mb-1 text-xl font-medium text-gray-900">{{ user.user?.email }}</h5>
        <span class="text-2xl font-extrabold text-black-800">Points: <span class="text-green-700">{{
            profile.user?.points
        }}</span></span>

      </div>
      <div class="grid-cols-1 mt-5">
        <h2 class="text-2xl font-semibold">My Rewards</h2>
      </div>
      <div class="grid grid-cols-3 gap-4 mt-5">
        <div v-for="reward in (profile.user?.rewards ?? [])" class="col-span-3 lg:col-span-1">
          <a class="block p-6 bg-white rounded-lg border border-gray-200 shadow-md mb-3 w-full ">
            <h5 class="mb-5 text-2xl font-bold tracking-tight text-gray-900 text-center">{{ reward.name }}</h5>
            <p class="font-normal text-xl text-green-700 text-center">{{ reward.points }}</p>
          </a>
        </div>
      </div>

      <div class="grid-cols-1 mt-20">
        <h2 class="text-2xl font-semibold">List of Rewards</h2>
      </div>
      <div class="grid grid-cols-3 gap-4 mt-5">
        <div v-for="reward in rewards.data.value" class="col-span-3 lg:col-span-1">
          <a class="block p-6 bg-white rounded-lg border border-gray-200 shadow-md w-full">
            <h5 class="mb-5 text-2xl font-bold tracking-tight text-gray-900 text-center">{{ reward.name }}</h5>
            <p class="font-normal text-xl text-green-700 text-center">{{ reward.points }}</p>
            <button type="submit" @click="redeemRewards(reward.id)"
              class="mt-5 w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2">Redeem
              now!</button>
          </a>
        </div>
      </div>

      <!-- <div>
        <div class="bg-yellow-500/50 text-yellow-800 text-center p-4 rounded-lg justify-between items-center mt-6 mb-2">
          You just earned 150 points
        </div>
      </div> -->

    </div>

  </div>
</template>

<script lang="ts" setup>
const router = useRouter()
const route = useRoute()
const user = useFirebaseUser()

const rewards = await useFetch('/api/rewards', {
})


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

const redeemRewards = async (id) => {
  event.preventDefault()
  await $fetch('/api/user/redeem', {
    method: "POST",
    body: JSON.stringify({
      rewardId: id,
      uid: user.value.user?.uid
    }),
  })
  await rewards.refresh()
  profile.value.user = await $fetch(`/api/user/${user.user?.uid}`).catch(err => {
    profile.value.error = err
   
  })
}

// function checkLogin(){
//   // redirect to login page if user is not logged in
//   // if(!user.value.user){
//   //   router.push('/login')
//   // }
//   console.log('test')
//   console.log(user.user?.email)
//   // return true
// }

// checkLogin()

</script>