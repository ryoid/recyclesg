<template>

    <div>
        <nav_bar />

        <n-layout has-sider>
            
            <n-layout-sider title class="w-1/3">
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/c9/-Insert_image_here-.svg">
            </n-layout-sider>

            <n-layout class="w-2/3">
                <n-layout-header class="title">
                    Detected Items
                </n-layout-header>
                <n-layout-content>

                    <div class="w-5/6" id="textbox">
                        We are not able to confidently identify the items.
                        <n-button id="retake"
                        round>Retake Image</n-button>
                    </div>

                    <n-radio-group class="w-5/6">
                        <n-space vertical>
                            <n-radio-button id="item" v-for="option in menuOptions" :label="option.label" :value="option.label" />
                        </n-space>
                    </n-radio-group>
                    
                </n-layout-content>
                <n-layout-footer>
                    <n-button>View Results</n-button>
                </n-layout-footer>
            </n-layout>
        </n-layout>
    </div>

</template>

<script>

    const menuOptions = [
    {
        label: "Hear the Wind Sing",
        key: "hear-the-wind-sing",
    },
    {
        label: "Pinball 1973",
        key: "pinball-1973",
    },
    {
        label: "A Wild Sheep Chase",
        key: "a-wild-sheep-chase",
    },
    {
        label: "Dance Dance Dance",
        key: "Dance Dance Dance",
    }
    ];

    import { defineComponent } from "vue";
    import {
        NLayout,
        NLayoutHeader,
        NLayoutContent,
        NLayoutFooter,
        NMenu,
        NButton,
        NRadioGroup,
        NRadioButton,
        NSpace
    } from 'naive-ui'

    export default defineComponent({

    components: {
        NLayout,
        NLayoutHeader,
        NLayoutContent,
        NLayoutFooter,
        NMenu,
        NButton,
        NRadioGroup,
        NRadioButton,
        NSpace
    },

    data(){
        return {
            menuOptions
        };
    },

    methods(){

    }
})

</script>

<style>

    .title{
        font-size: xx-large;
        font-weight: bolder;
    }

    .n-radio-button#item {
        width: 100%;
        height: 80px;
        line-height: 80px;
    }

    #textbox {
        font-size: medium;
        position: relative;
        border: solid 1px black;
        height: 80px;
        margin-top: 50px;
        margin-bottom: 50px;
        padding-left: 5px;
        padding-top: 5px;
    }

    #retake {
        position: absolute;
        bottom: 5px;
        right: 5px;
    }

</style>