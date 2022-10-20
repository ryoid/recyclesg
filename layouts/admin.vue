<template>
  <div class="flex">
    <AdminNavbar />
    <main class="container mx-auto px-2 sm:px-4 md:px-10">
      <div class="sm:pl-20 lg:pl-[200px]">
        <slot />
      </div>
    </main>
  </div>
</template>
