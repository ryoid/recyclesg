<template>
  <DataTable :value="data" scrollable :rowHover="true" v-model:selection="selectedCustomers" v-model:filters="filters"
    filterDisplay="menu" :loading="loading || pending" paginatorTemplate="" selectionMode="single" dataKey="id"
    :globalFilterFields="['name', 'description', 'tags', 'material', 'createdAt']" responsiveLayout="scroll"
    :virtualScrollerOptions="{ itemSize: 46 }" scrollHeight="100vh" class="border border-gray-200 rounded"
    @row-select="onRowSelect">
    <template #header>
      <div class="sticky w-full flex justify-between items-end gap-2">
        <div class="flex flex-col gap-1 w-1/2">
          <h5 class="m-0">Search</h5>
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText v-model="filters['global'].value" placeholder="Keyword Search" class="w-full" />
          </span>
        </div>

        <div>
          <NuxtLink href="/admin/database/new">
            <Button class="p-button-secondary">Add new item</Button>
          </NuxtLink>
        </div>
      </div>
    </template>
    <template #empty>
      No recyclables found.
    </template>
    <template #loading>
      Loading recyclables data. Please wait.
    </template>

    <Column field="id" header="Id" class="" sortable>
    </Column>
    <Column field="name" header="Name" class="" sortable></Column>
    <Column field="material" header="Material" class="" sortable :filterMenuStyle="{ 'width': '14rem' }">
      <template #body="{ data }">
        <span :class="[
          'px-1.5 rounded',
          materialsCn[data.material]
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
</template>

<script setup lang="ts">
import { FilterMatchMode, FilterOperator } from 'primevue/api';

const selectedCustomers = ref(null)
const materials = ref(['Plastic', 'Paper', 'Non Food Plastic', 'F&B Plastic', 'Metal', 'Glass', 'Other'])
const filters = ref({
  'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
  'material': { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
})
const materialsCn: Record<string, string> = {
  'Paper': 'bg-gray-100 text-gray-500',
  'Plastic': 'bg-green-300 text-green-700',
  'Non Food Plastic': 'bg-red-300 text-red-700',
  'F&B Plastic': 'bg-yellow-300 text-yellow-700',
  'Glass': 'bg-blue-100 text-blue-700',
  'Metal': 'bg-slate-700 text-slate-300',
  'Other': 'bg-gray-100 text-gray-500',
}

const router = useRouter()
let loading = ref(false)
const { data, pending, refresh, error } = await useFetch('/api/admin/bookings', {
  initialCache: false
})


onMounted(async () => {
  loading.value = true
  await refresh()
  loading.value = false
})


function onRowSelect(event) {
  router.push(`/admin/bookings/${event.data.id}`)
}

</script>