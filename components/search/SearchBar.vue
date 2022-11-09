<template>
    <div class="mx-auto w-5/6">
        <span class="p-fluid flex w-full">
                <i class="pi pi-search my-auto"></i>
                <AutoComplete 
                    ref="autocomplete"
                    class="p-autocomplete"
                    v-model="selectedRecyclables" 
                    :suggestions="filteredRecyclables"
                    @complete="searchRecyclables($event)"
                    optionLabel="name"
                    placeholder="e.g. plastic bottle, toilet paper"/>
            
        </span>
        <div v-if="recyclablesList.length==0 && selectedRecyclables==''" id="noresults">No results found</div>
    </div>
</template>

<script lang="ts" setup>

    let selectedRecyclables = ref()
    let filteredRecyclables = ref()
    let recyclablesList = []

    const searchRecyclables = (event) => {
        onSearch()
        setTimeout(() => {
            if (!event.query.trim().length) {
                filteredRecyclables.value = [...recyclablesList];
            }
            else {
                let item = null
                filteredRecyclables.value = recyclablesList.filter((item) => {
                    return item   
                });
            }
        }, 250);
    }
    
    function recyclableList(list) {
                recyclablesList = []
                let item = null;
                let counter = 0
                for (item of list) {
                    var obj = {};
                    obj["id"] = counter;
                    obj["name"] = item.name;
                    recyclablesList.push(obj)
                    counter++
                }
            }

    async function onSearch(){
        const data = await $fetch(`/api/admin/recyclable/search?q=${selectedRecyclables.value}`)
        recyclableList(data)
    }

</script>

<style>

    .upload{
        margin: 5px;
    }

    .bar{
        margin: 5px;
    }

    .p-autocomplete{
        width: 100%;
        margin-left: 10px;
    }

    #noresults{
        color: red;
        font-size: small;
        font-weight: bold   ;
    }

</style>