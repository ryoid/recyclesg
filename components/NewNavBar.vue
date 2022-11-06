<template>
  <div class="container-fluid mx-auto">
    <nav class="bg-slate-100 flex sm:hidden">
      <Button type="button" @click="toggle" icon="pi pi-bars p-toolbar-separator" class="p-button-text" />
      <Menu id="overlay_menu" ref="menu" :model="items" :popup="true" />
    </nav>

    <nav class="bg-slate-100 hidden sm:flow-root">
      <ul class="flex float-left">
        <NavBarLink link="/" name="home" label="Check" icon="pi pi-search" />
        <NavBarLink link="/book/book1" name="book" label="Book" icon="pi pi-calendar" />
      </ul>

      <ul class="float-right">
        <NavBarLink link="/login" name="home" label="Login" icon="pi pi-user" class="align-right" />
      </ul>
    </nav>

  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

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
