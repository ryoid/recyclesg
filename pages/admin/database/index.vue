<template>
  <div>
    <AdminHeader title="Database" subtitle="The recyclable database" />


    <div>
      <DataTable :value="data" scrollable dataKey="id" :rowHover="true" v-model:selection="selectedCustomers"
        v-model:filters="filters" filterDisplay="menu" :loading="pending" paginatorTemplate=""
        :globalFilterFields="['name', 'description', 'tags', 'material', 'createdAt']" responsiveLayout="scroll">
        <template #header>
          <div class="flex flex-col gap-1">
            <h5 class="m-0">Search</h5>
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
            </span>
          </div>
        </template>
        <template #empty>
          No recyclables found.
        </template>
        <template #loading>
          Loading recyclables data. Please wait.
        </template>

        <Column field="id" header="Id" class="" sortable></Column>
        <Column field="name" header="Name" class="" sortable></Column>
        <Column field="material" header="Material" class="" sortable :filterMenuStyle="{ 'width': '14rem' }">
          <template #body="{ data }">
            <span :class="[
              'px-1.5 rounded',
              materialsCn[data.material]
              // {
              //   'bg-gray-100 text-gray-500': data.material === 'Paper',
              //   'bg-green-300 text-green-700': data.material === 'Plastic',
              //   'bg-red-300 text-red-700': data.material === 'Non Food Plastic',
              //   'bg-yellow-300 text-yellow-700': data.material === 'F&B Plastic',
              //   'bg-blue-100 text-blue-700': data.material === 'Glass',
              //   'bg-slate-700 text-slate-300': data.material === 'Metal',
              //   'bg-slate-300 text-slate-500': data.material === 'Others'
            
              // }
            ]">{{ data.material }}</span>
          </template>
          <template #filter="{ filterModel }">
            <Dropdown v-model="filterModel.value" :options="materials" placeholder="Any" class="p-column-filter"
              :showClear="true">
              <template #value="slotProps">
                <span :class="[
                  'px-1.5 rounded',
                  materialsCn[slotProps.value]
                ]">{{ slotProps.value }}</span>
              </template>
              <template #option="slotProps">
                <span :class="[
                  'px-1.5 rounded',
                  materialsCn[slotProps.option]
                ]">{{ slotProps.option }}</span>
              </template>
            </Dropdown>
          </template>
        </Column>
        <Column field="tags" header="Tags" class="">
          <template #body="{ data }">
            <div class="flex gap-1">
              <span v-for="tag in data.tags" :class="['bg-gray-300 text-gray-700 px-1.5 rounded ']">{{ tag }}</span>
            </div>
          </template>
        </Column>
        <Column field="createdAt" header="Created At" class="" sortable>
          <template #body="{ data }">
            <span>{{ new Date(data.createdAt).toLocaleDateString('en-US', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })
            }}</span>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FilterMatchMode, FilterOperator } from 'primevue/api';

definePageMeta({
  layout: "admin",
});

const selectedCustomers = null
const materials = ['Plastic', 'Paper', 'Non Food Plastic', 'F&B Plastic', 'Metal', 'Glass', 'Other']
const filters = {
  'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
  'name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
  'description': { value: null, matchMode: FilterMatchMode.IN },
  'tags': { value: null, matchMode: FilterMatchMode.IN },
  'createdAt': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
  'material': { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
}
const materialsCn: Record<string, string> = {
  'Paper': 'bg-gray-100 text-gray-500',
  'Plastic': 'bg-green-300 text-green-700',
  'Non Food Plastic': 'bg-red-300 text-red-700',
  'F&B Plastic': 'bg-yellow-300 text-yellow-700',
  'Glass': 'bg-blue-100 text-blue-700',
  'Metal': 'bg-slate-700 text-slate-300',
  'Other': 'bg-gray-100 text-gray-500',
}

const route = useRoute()
console.log(route.query)

const { data, pending, refresh, error } = await useFetch('/api/admin/recyclable', {
})

</script>