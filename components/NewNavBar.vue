<template>
  <nav class="bg-slate-100" v-if="innerWidth < 640">
    <Button type="button"  @click="toggle" icon="pi pi-bars p-toolbar-separator" class="p-button-text" />
    <Menu id="overlay_menu" ref="menu" :model="items" :popup="true" />
  </nav>

  <nav class="bg-slate-100" v-else>
    <div class="flex ">
      <ul class="flex grid grid-cols-4">
        <NavBarLink link="/home" name="home" label="Check" icon="pi pi-search" />
        <NavBarLink link="/book/book1" name="book" label="Book" icon="pi pi-calendar" />
        <NavBarLink link="/login" name="home" label="Login" icon="pi pi-user" class="ml-auto" />
      </ul>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const innerWidth = getInnerWidth();

function getInnerWidth() {
  return window.innerWidth;
}

const menu = ref();
const items = ref([{
  label: 'Check',
  icon: 'pi pi-search',
  to: "/"
},
{
  label: 'Book',
  icon: 'pi pi-calendar',
  to: "/book/book1"
},
{
  label: 'Login',
  icon: 'pi pi-user',
  to: "/" // to link to login page
}
]);

const toggle = (event) => {
  menu.value.toggle(event);
}

</script>
