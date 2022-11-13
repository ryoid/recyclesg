<template>

  <div>
    <div class="grid grid-cols-12 min-h-screen">
      <div class="hidden lg:col-span-4 bg-teal-600 text-white lg:flex flex-col justify-center px-8">
      </div>
      <form @submit="onSubmit" class="col-span-12 lg:col-span-8 p-8 flex flex-col gap-4 justify-center">
        <h1 class="text-2xl font-semibold">Sign Up</h1>
        <div class="field">
          <label class="label">Email</label>
          <div class="control has-icons-left has-icons-right">
            <InputText v-model="form.email" class="w-full" type="email" placeholder="john@gmail.com"
              autocomplete="false" />
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
          </div>
        </div>
        <div class="field">
          <div>
            <label class="label">Password</label>
            <div class="control">
              <InputText v-model="form.password" class="w-full" type="password" placeholder="*************"
                autocomplete="false" />
            </div>
          </div>
        </div>

        <div v-if="form.message" class="p-3 rounded bg-orange-100 text-orange-800">
          {{ form.message }}
        </div>

        <button type="submit"
          class="text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-4 text-center mr-3 md:mr-0 w-full">Create
          your account</button>

        <div>
          Already have an account? <span class="text-teal-600 font-medium">
            <NuxtLink href="/login">Login</NuxtLink>
          </span>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>

definePageMeta({
  layout: false,
  middleware: ["unauth"],
});


const form = ref<{
  email: string
  password: string
  message: string
  submitting: boolean
}>({
  email: null,
  password: null,
  message: null,
  submitting: false
})


async function onSubmit(e) {
  e.preventDefault();
  form.value.submitting = true
  try {
    const credentials = await createUser(
      form.value.email,
      form.value.password
    );
    form.value = {
      ...form.value,
      email: null,
      password: null,
      message: null
    }

  } catch (err) {
    console.log('err', err);
    form.value.message = err.message
  } finally {
    form.value.submitting = false
  }

}
</script>