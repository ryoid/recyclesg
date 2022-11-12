<template>
  <div>
    <form @submit="onSubmit">
      <h2 class="mb-5 title is-4 has-text-black">Login</h2>
    <div class="field">
      <label class="label">Email</label>
      <div class="control has-icons-left has-icons-right">
        <InputText
          v-model="form.email"
          class="input"
          type="email"
          placeholder="john@gmail.com"
          autocomplete="false"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-envelope"></i>
        </span>
      </div>
    </div>
    <div class="field">
      <div>
        <label class="label">Password</label>
        <div class="control">
          <InputText
            v-model="form.password"
            class="input"
            type="password"
            placeholder="*************"
            autocomplete="false"
          />
        </div>
      </div>
    </div>

    <div v-if="form.message" class="has-text-success p-3">
      {{ form.message }}
    </div>

    <button type="submit">Submit</button>

    <NuxtLink href="/signup">Signup</NuxtLink>
    </form>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
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
  try{
    const res = await signInUser(form.value.email, form.value.password);
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