<template>
  <nav
    class="hidden sm:flex sm:w-20 lg:w-[200px] h-screen fixed left-0 top-0 bottom-0 bg-white border-r border-r-neutral-100  flex-col justify-center">
    <ul>
      <NuxtLink href="/admin">
        <li class="py-4 px-3 hover:bg-neutral-100 cursor-pointer">
          Dashboard
        </li>
      </NuxtLink>
      <NuxtLink href="/admin/requests">
        <li class="py-4 px-3 hover:bg-neutral-100 cursor-pointer">
          Requests
        </li>
      </NuxtLink>
      <NuxtLink href="/admin/database">
        <li class="py-4 px-3 hover:bg-neutral-100 cursor-pointer">
          Database
        </li>
      </NuxtLink>
    </ul>

    <ul class="absolute bottom-0 pb-2 w-full">
      <li class="py-4 px-3 hover:bg-neutral-100 cursor-pointer">Logout</li>
    </ul>
  </nav>
</template>