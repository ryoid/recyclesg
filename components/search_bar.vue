<template>
    <div class="flex mx-auto w-5/6">
        <n-input
            v-model:value ="usersearch"
            v-on:keyup.enter="searchItem"
            class="bar"   
            round 
            placeholder="e.g. plastic bottle, toilet paper">
            <template #prefix>
                <n-icon size="30">
                    <search-icon />
                </n-icon>
            </template>
        </n-input>

        <NuxtLink to="/imagesearch">
            <n-button
                class="upload"
                quaternary
                circle > 
                <template #icon>
                    <n-icon size="30">
                        <arrow-up-circle-icon />
                    </n-icon>            
                </template>
            </n-button>
        </NuxtLink>        
    </div>
{{usersearch}}
</template>

<script>

    import { defineComponent, ref } from "vue";
    import { 
        SearchOutline as SearchIcon,
        ArrowUpCircleOutline as ArrowUpCircleIcon
    } from "@vicons/ionicons5";
    import {
        NInput,
        NIcon,
        NButton,
        NDynamicInput,
    } from 'naive-ui'

    export default defineComponent({

    data(){
        return {
            usersearch: ref(null)
        }
    },

    methods: {
        searchItem(){
            let item = this.usersearch
            redirect
        }
    },

    components: {
        SearchIcon,
        ArrowUpCircleIcon,
        NInput,
        NIcon,
        NButton,
        NDynamicInput
    },

    });

</script>

<style>

    .upload{
        margin: 5px;
    }

    .bar{
        margin: 5px;
    }

</style>