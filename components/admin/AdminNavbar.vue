<template>
  <nav class="bg-white border-neutral-100 w-full border-b">
    <div class="container mx-auto">
      <div class="flex justify-between">
        <div class="ml-3 mt-4">
          RecycleSG
        </div>
        <div class="mr-1 mt-2">
            <div class="bg-gradient-to-r from-gray-100 to-gray-200 rounded-full h-10 w-10 ring ring-gray-100 ring-offset-1">
              <client-only>
                  <img :src="`https://source.boringavatars.com/beam/120/${firebaseUser.email}?colors=1A325F,9cc4e4,e9f2f9,3a89c9,f26c4f`"  v-if="firebaseUser"/>
              </client-only>
          </div>
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
        </ul>

        <div class="ml-auto flex items-center">
          <div>
            <client-only>
              <div v-if="firebaseUser" class="py-2 px-3 hover:bg-gray-200/75 rounded-lg cursor-pointer">
                <button class="button" @click="signOut" >Sign out</button>
              </div>
            </client-only>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>


<script setup lang="ts">
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