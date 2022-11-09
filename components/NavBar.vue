<template>
    <div>
        <client-only>
            <Menubar id="navbar" :model="items">
                <template #item="{item}">
                    <i :class="item.icon" class="mx-2"></i>
                    <NuxtLink :to="item.to">{{item.label}}</NuxtLink>
                </template>
            </Menubar>
        </client-only>     
    </div>
</template>

<script>

    export default {

        data() {
            return {
                items: [
                {
					label:'Check Recyclables',
					icon:'pi pi-fw pi-search',
                    to: "/search/home" 
                },
                {
					label:'Book Collection',
					icon:'pi pi-fw pi-phone',
                    to: "/book/book1"
                },
                {
					label:'Login/Signup',
					icon:'pi pi-fw pi-users',
					items:[
						{
							label:'Login',
							icon:'pi pi-fw pi-user',
                            to: "/search/home"
						},
						{
							label:'Signup',
							icon:'pi pi-fw pi-user-plus',
                            to: "/search/home"
						},
					]
                }
            ]}},
            
        
}
</script>

<style>

#navbar {
    text-align: center;
    margin: auto;
    background-color: lightgray;
    padding-top: 10px;
    padding-bottom: 10px;
}
</style>