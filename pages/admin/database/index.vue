<template>
  <div>
    <AdminHeader title="Database" subtitle="The recyclable database" />


    <div>
      <div class="shadow-lg">
        <ClientOnly>
          <AdminDatabaseTable />
        </ClientOnly>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
});
</script>