<template>
    <nav class="bg-white/80 backdrop-blur px-2 sm:px-4 py-2.5 fixed w-full z-20 top-0 left-0 border-b border-gray-200 ">
        <div class="container flex flex-wrap justify-between items-center mx-auto">
            <a href="/" class="flex items-center">
                <img src="@/assets/img/illustration/logo.jpg" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo">
            </a>
            <div class="flex items-center md:order-2">
                <client-only>
                    <NuxtLink v-if="!user.user && !user.loading" to="/login">
                        <button type="button"
                            class="text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0">Login
                            / Signup</button>
                    </NuxtLink>
                </client-only>
                <Menu v-if="user.user" as="div" class="relative inline-block text-left mr-4 md:mr-0">
                    <div class="flex items-center justify-center">
                        <MenuButton class="focus:ring-5 focus:ring-black rounded-full">
                            <div
                                class="bg-gradient-to-r from-gray-100 to-gray-200 rounded-full h-8 w-8 ring ring-gray-100 ring-offset-1">
                                <client-only>
                                    <img :src="`https://source.boringavatars.com/beam/120/${user.user.email}?colors=1A325F,9cc4e4,e9f2f9,3a89c9,f26c4f`"
                                        v-if="user.user" />
                                </client-only>
                            </div>
                        </MenuButton>
                    </div>

                    <transition enter-active-class="transition duration-100 ease-out"
                        enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
                        leave-active-class="transition duration-75 ease-in"
                        leave-from-class="transform scale-100 opacity-100"
                        leave-to-class="transform scale-95 opacity-0">
                        <MenuItems
                            class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">

                            <div class="py-3 px-4">
                                <span class="block text-sm text-gray-900">{{ user.user.displayName }}</span>
                                <span class=" block text-sm font-medium text-gray-500 truncate ">{{
                                        user.user.email
                                }}</span>
                            </div>
                            <div class=" px-1 py-1">
                                <MenuItem v-slot="{ active }">
                                <NuxtLink href="/profile">
                                    <button :class="[
                                        active ? 'bg-gray-200/50' : 'text-gray-900',
                                        'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                                    ]">
                                        <UserCircleIcon :active="active" class="mr-2 h-5 w-5 text-gray-400"
                                            aria-hidden="true" />
                                        Profile
                                    </button>
                                </NuxtLink>
                                </MenuItem>
                                <MenuItem v-slot="{ active }">
                                <NuxtLink href="/admin">
                                    <button :class="[
                                        active ? 'bg-gray-200/50' : 'text-gray-900',
                                        'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                                    ]">
                                        <BuildingLibraryIcon :active="active" class="mr-2 h-5 w-5 text-gray-400"
                                            aria-hidden="true" />
                                        Admin
                                    </button>
                                </NuxtLink>
                                </MenuItem>
                            </div>

                            <div class="px-1 py-1">
                                <MenuItem v-slot="{ active }">
                                <button :class="[
                                    active ? 'bg-gray-200/50' : 'text-gray-900',
                                    'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                                ]" @click="signOut">
                                    <ArrowLeftOnRectangleIcon :active="active" class="mr-2 h-5 w-5 text-gray-400"
                                        aria-hidden="true" />
                                    Signout
                                </button>
                                </MenuItem>
                            </div>
                        </MenuItems>
                    </transition>
                </Menu>
                <button data-collapse-toggle="navbar-sticky" type="button"
                    class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
                    aria-controls="navbar-sticky" aria-expanded="false" @click="toggleMenu">
                    <span class="sr-only">Open main menu</span>
                    <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>
            <div class="hidden justify-between items-center w-full md:flex md:w-auto md:order-1 mt-2"
                id="navbar-sticky">
                <div
                    class="flex flex-col h-full rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0">
                    <NuxtLink href="/" aria-current="page">
                        <div
                            class="flex py-2 md:py-4 pr-4 pl-3 text-white bg-teal-700 rounded md:bg-transparent md:text-teal-700 h-full">
                            Search</div>
                    </NuxtLink>
                    <NuxtLink href="/book"
                        class="flex py-2 md:py-4 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-teal-700 ">
                        Book Collection</NuxtLink>
                    <NuxtLink href="/rewards"
                        class="flex py-2 md:py-4 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-teal-700 ">
                        Rewards</NuxtLink>
                </div>
            </div>
        </div>
    </nav>
</template>

<script lang="ts" setup>
import { Menu, MenuItems, MenuItem, MenuButton } from '@headlessui/vue'
import { ArrowLeftOnRectangleIcon, UserCircleIcon, BuildingLibraryIcon } from '@heroicons/vue/24/outline'

const user = useFirebaseUser()

const signOut = async () => {
    await signOutUser();
};

function toggleMenu() {
    const navbar = document.getElementById('navbar-sticky');
    if (navbar) {
        navbar.classList.toggle('hidden');
    }
}
</script>
