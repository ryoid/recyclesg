<template>

    <div>

        <NavBar />

        <CompanyLogo />

        <SearchBar v-show="!imageSearch"/>

        <SearchImageUploader v-show="imageSearch" />

        <!-- <Dialog
            id="results" 
            v-bind:draggable= false 
            v-model:visible="displayModal" 
            :breakpoints="{'960px': '75vw', '640px': '90vw'}" 
            :style="{width: '50vw'}">
            <template #header>
                <h3>{{selectedRecyclables.name}}</h3>
            </template>
            <p :style="'color: gray'">{{isRecyclable}}</p>
            <template #footer v-if="recyclable">
                <NuxtLink to="/book/book1">
                    <Button label="Proceed to Book Collection" icon="pi pi-arrow-right" class="p-button-primary"></Button>
                </NuxtLink>
            </template>
        </Dialog> -->

        <SearchResultCollapse v-if="displayModal" />
    </div>

</template>

<script>

    import json from "~~/server/api/recyclerequests/NEA_parsed.json";

    export default {
        data() {
            return {
                json: json,
                imageSearch: false,
                selectedRecyclables: '',
                displayModal: false,
                recyclable: true,
                id: null,
                item_name: null,
                recycling_instruction: null,
            }
        },

        methods: {

            imagesearch() {
                this.imageSearch = true
            },

            getSelectedRecyclables(item) {
                this.selectedRecyclables = item
                this.displayModal = true
                let temp = null
                for (temp of this.json){
                    if (this.selectedRecyclables.name == temp.name){
                        console.log(temp)
                        this.id = temp.id
                        this.item_name = temp.name
                        this.recycling_instruction = temp.description
                    }
                }
            },

        },

        // computed: {
        //     isRecyclable() {
        //         let item = null
        //         for (item of this.json){
        //             if (this.selectedRecyclables.name == item.name){
        //                 let recyclable = item.recyclable
        //                 if (recyclable == true){
        //                     this.recyclable = true
        //                     return 'Your item is recyclable!'
        //                 }                        
        //             } 
        //         }
        //         this.recyclable = false
        //         return 'Item is not recyclable!'
        //     }
        // },

    }


</script>

<style>

    #results {
        background-color: white;
        opacity: 1;
    }

</style>