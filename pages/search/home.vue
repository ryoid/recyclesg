<template>

    <div>

        <NavBar />

        <CompanyLogo />

        <SearchBar />

        <SearchImageUploader />

    </div>

</template>

<script>

    import json from "~~/server/api/recyclerequests/NEA_parsed.json";

    export default {
        data() {
            return {
                json: json,
                selectedRecyclables: '',
                displayModal: false,
                recyclable: true,
                id: null,
                item_name: null,
                recycling_instruction: null,
            }
        },

        methods: {

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