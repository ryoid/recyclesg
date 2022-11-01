<template>
    <div>
        <div class="mx-auto w-5/6">
            <span class="p-fluid flex w-full">
                    <i class="pi pi-search my-auto"></i>
                    <AutoComplete 
                        class="p-autocomplete"
                        v-model="selectedRecyclables" 
                        :suggestions="filteredRecyclables" 
                        @complete="searchCountry($event)"
                        v-on:keyup.enter="redirect" 
                        optionLabel="name" 
                        placeholder="e.g. plastic bottle, toilet paper"/>
                
                <NuxtLink to="/imagesearch">
                    <Button icon="pi pi-upload" class="p-button-rounded p-button-primary p-button-outlined"></Button>
                </NuxtLink>
            </span>
        
            <div v-if="length==0" id="noresults">No results found</div>
            {{selectedRecyclables}}
        </div>
    </div>
</template>

<script>
    import json from "~~/server/api/recyclerequests/NEA_parsed.json";

    export default({

    data(){
        return {
            json: json,
            selectedRecyclables: null,
			filteredRecyclables: null,
            recyclablesList: [],
            length: null
        }
    },

    methods: {
        searchCountry(event) {
            setTimeout(() => {
                if (!event.query.trim().length) {
                    this.filteredRecyclables = [...this.recyclablesList];
                }
                else {
                    this.length = 0
                    this.filteredRecyclables = this.recyclablesList.filter((item) => {
                        if (item.name.toLowerCase().includes(event.query.toLowerCase())){
                            this.length++
                            return item.name
                        }
                    });
                }
            }, 250);
        },

        countryList(){
            let item = null
            for (item of this.json){
                var obj = {}
                obj['id'] = item.id
                obj['name'] = item.name
                this.recyclablesList.push(obj)
            }
        },

        redirect() {
            let urlRecyclables = encodeURIComponent(JSON.stringify(this.selectedRecyclables))
            let url = 'results/' + urlRecyclables
            this.$router.push(url)
        },
    },

    mounted(){
        this.countryList()
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

    .p-autocomplete{
        width: 100%;
        margin-right: 10px;
        margin-left: 10px;
    }

    #noresults{
        color: red;
        font-size: small;
        font-weight: bold   ;
    }

</style>