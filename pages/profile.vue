<template>
  <div>
    <div>Profile</div>


    <div v-if="firebaseUser">
      <client-only>
        <pre
          >{{ firebaseUser }}
    </pre
        >
      </client-only>
    </div>
    <div v-else>User is signed out</div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"],
});

const firebaseUser = useFirebaseUser();
</script>

<style></style>
