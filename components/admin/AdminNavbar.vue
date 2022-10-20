<template>
  <nav
    class="w-[200px] h-screen fixed left-0 top-0 bottom-0 bg-white border-r border-r-neutral-100 flex flex-col justify-center">
    <ul>
      <li class="py-4 px-3 hover:bg-neutral-100 cursor-pointer">Dashboard</li>
      <li class="py-4 px-3 hover:bg-neutral-100 cursor-pointer">Requests</li>
      <li class="py-4 px-3 hover:bg-neutral-100 cursor-pointer">Database</li>
    </ul>

    <ul class="absolute bottom-0 pb-2 w-full">
      <li class="py-4 px-3 hover:bg-neutral-100 cursor-pointer">Logout</li>
    </ul>
  </nav>
</template>