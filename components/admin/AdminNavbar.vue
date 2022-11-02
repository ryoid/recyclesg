<template>
  <nav class="bg-white border-neutral-100 w-full border-b">
    <div class="container mx-auto">
      <div class="flex justify-between">
        <div>
          Logo
        </div>
        <div>
          Avatar
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

        <ul class="ml-auto">
          <li class="py-4 px-3 hover:bg-neutral-100 cursor-pointer">Logout</li>
        </ul>
      </div>
    </div>
  </nav>
</template>


<script setup lang="ts">
const highlight = ref<HTMLElement>(null)
const highlightLeft = ref(0)
const highlightWidth = ref(100)
const highlightOpacity = ref(0)

function repositionHighlight(e: MouseEvent) {
  const target = e.target as HTMLElement
  const rect = target.getBoundingClientRect()

  highlightOpacity.value = 1
  highlightWidth.value = rect.width
  highlightLeft.value = rect.left - 63 // rect.x of first element is 63
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