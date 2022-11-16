<template>
  <nav class="bg-white border-neutral-100 w-full border-b">
    <div class="container mx-auto">
      <div class="flex justify-between">
        <NuxtLink href="/">
          <div class="ml-3 mt-4">
            RecycleSG
          </div>
        </NuxtLink>
        <div class="mr-1 mt-2">
          <Menu v-if="firebaseUser.user" as="div" class="relative inline-block text-left mr-4 md:mr-0">
            <div class="flex items-center justify-center">
              <MenuButton class="focus:ring-5 focus:ring-black rounded-full">
                <div
                  class="bg-gradient-to-r from-gray-100 to-gray-200 rounded-full h-8 w-8 ring ring-gray-100 ring-offset-1">
                  <client-only>
                    <img
                      :src="`https://source.boringavatars.com/beam/120/${firebaseUser.user.email}?colors=1A325F,9cc4e4,e9f2f9,3a89c9,f26c4f`"
                      v-if="firebaseUser.user" />
                  </client-only>
                </div>
              </MenuButton>
            </div>

            <transition enter-active-class="transition duration-100 ease-out"
              enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0">
              <MenuItems
                class="z-20 absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">

                <div class="py-3 px-4">
                  <span class="block text-sm text-gray-900">{{ firebaseUser.user.displayName }}</span>
                  <span class=" block text-sm font-medium text-gray-500 truncate ">{{
                      firebaseUser.user.email
                  }}</span>
                </div>

                <div class="px-1 py-1">
                  <MenuItem v-slot="{ active }">
                  <button :class="[
                    active ? 'bg-gray-200/50' : 'text-gray-900',
                    'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                  ]" @click="signOut">
                    <ArrowLeftOnRectangleIcon :active="active" class="mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                    Signout
                  </button>
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
      <div class="flex justify-center">
        <ul class="flex relative" @mouseout="hideHighlight">
          <div ref="highlight" class="bg-gray-200/75 absolute top-2 bottom-3 rounded-lg transition-all"
            :style="{ width: `${highlightWidth}px`, transform: `translateX(${highlightLeft}px)`, opacity: highlightOpacity }" />
          <AdminNavbarLink link="/admin" label="Dashboard" name="admin" @mouseover="repositionHighlight" />
          <AdminNavbarLink link="/admin/requests" label="Requests" name="admin-requests"
            @mouseover="repositionHighlight" />
          <AdminNavbarLink link="/admin/database" label="Database" name="admin-database"
            @mouseover="repositionHighlight" />
          <AdminNavbarLink link="/admin/bookings" label="Bookings" name="admin-bookings"
            @mouseover="repositionHighlight" />
        </ul>

        <div class="ml-auto flex items-center">
          <div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>


<script setup lang="ts">
import { Menu, MenuItems, MenuItem, MenuButton } from '@headlessui/vue'
import { ArrowLeftOnRectangleIcon, UserCircleIcon, BuildingLibraryIcon } from '@heroicons/vue/24/outline'

const firebaseUser = useFirebaseUser();


const signOut = async () => {
  await signOutUser();
};


const highlight = ref<HTMLElement>(null)
const highlightLeft = ref(0)
const highlightWidth = ref(100)
const highlightOpacity = ref(0)

function repositionHighlight(e: MouseEvent) {
  const target = e.target as HTMLElement
  const rect = target.getBoundingClientRect()
  const container = target.parentElement.parentElement.parentElement

  highlightOpacity.value = 1
  highlightWidth.value = rect.width
  highlightLeft.value = rect.left - container.querySelector("li").getBoundingClientRect().x // rect.x of first nav link
}

function hideHighlight(e: MouseEvent) {
  highlightOpacity.value = 0
}

</script>


<style>
.test {
  width: v-bind(highlightWidth)px;
}
</style>