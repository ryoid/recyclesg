<template>
    <div>
        <Menubar id="navbar" :model="items">
            <template #item="{item}">
                <NuxtLink :to="item.url">{{item.label}}</NuxtLink>
            </template>
        </Menubar>        
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
                    url: "/home"
                },
                {
					label:'Book Collection',
					icon:'pi pi-fw pi-phone',
                    url: ""
                },
                {
					label:'Login/Signup',
					icon:'pi pi-fw pi-users',
					items:[
						{
							label:'Login',
							icon:'pi pi-fw pi-user',
                            url: ""
						},
						{
							label:'Signup',
							icon:'pi pi-fw pi-user-plus',
                            url: ""
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