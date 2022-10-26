<template>  
    <div>
        <nav class="bg-white border-gray-200">
            <div class="flex flex-col p-4 nav background mb-4">
                <div class="container flex flex-wrap justify-between items-center mx-auto">                
                    <n-menu class="mx-auto" v-model:value="activeKey" mode="horizontal" :options="menuOptions" />
                </div>
            </div>
        </nav>
    </div>
</template>
  
<script>

  import my_nuxt_link from '~/components/my_nuxt_link'
  import { defineComponent, ref } from "vue";
  import { 
    LeafOutline as LeafIcon,
    SearchOutline as SearchIcon,
    PeopleOutline as PeopleIcon,
    PersonOutline as PersonIcon,
    PersonAddOutline as PersonAddIcon
  } from "@vicons/ionicons5";

  import {
    NMenu,
    NIcon,
  } from 'naive-ui'
  
  function renderIcon(icon) {
    return () => h(NIcon, null, { default: () => h(icon) });
  }
  
  const menuOptions = [
    {
      label: () => h(
        my_nuxt_link,
            {
                to: "/home",
            },
        "Check Recyclables"
      ),
      key: "CheckRecyclables",
      icon: renderIcon(SearchIcon)
    },
    {
        label: () => h(
        my_nuxt_link,
            {
                to: "",
            },
        "Book Collection"
        ),
      key: "BookCollection",
      icon: renderIcon(LeafIcon),
    },
    {
      class:"text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3",
      label: "Login/Signup",
      key: "",
      icon: renderIcon(PeopleIcon),
      children: [
        {
          label: () => h(
            my_nuxt_link,
            {
                to:""
            },
        "Login"
          ),
          icon: renderIcon(PersonIcon)
        },
        {
          label: () => h(
            my_nuxt_link,
            {
                to:""
            },
        "Signup"
          ),
          icon: renderIcon(PersonAddIcon)
        },
      ]
    }
  ];
  
  export default defineComponent({

    components: {
        NMenu,
        my_nuxt_link
    },

    data() {
      return {
        activeKey: ref(null),
        menuOptions
      };
    },

  });
</script>

<style>

    .nav.background {
            background-color:lightgray;
    }

    .n-menu.options:hover{
      background-color: darkgray;
    }

</style>