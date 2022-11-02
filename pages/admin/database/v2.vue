<template>
  <div>
    <AdminHeader title="Database" subtitle="The recyclable database" />

    <div>
      <table>
        <thead>
          <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <th v-for="header in headerGroup.headers" :key="header.id" :colSpan="header.colSpan" :class="
              header.column.getCanSort() ? 'cursor-pointer select-none' : ''
            " @click="header.column.getToggleSortingHandler()?.($event)">
              <template v-if="!header.isPlaceholder">
                <FlexRender :render="header.column.columnDef.header" :props="header.getContext()" />

                {{ { 'asc': ' 🔼', 'desc': ' 🔽' }[header.column.getIsSorted() as string] }}
              </template>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="row in table.getRowModel().rows.slice(0, 10)" :key="row.id">
            <td v-for="cell in row.getVisibleCells()" :key="cell.id">
              <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
            </td>
          </tr>
        </tbody>

        <tfoot>
          <tr v-for="footerGroup in table.getFooterGroups()" :key="footerGroup.id">
            <th v-for="header in footerGroup.headers" :key="header.id" :colSpan="header.colSpan">
              <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.footer"
                :props="header.getContext()" />
            </th>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  FlexRender,
  getCoreRowModel,
  useVueTable,
  SortingState,
  createColumnHelper,
  getSortedRowModel,
} from '@tanstack/vue-table'
import { h, ref } from 'vue'
import { Recyclable } from '../../../server/types/index';

definePageMeta({
  layout: "admin",
});

// const materials = ref(['Plastic', 'Paper', 'Non Food Plastic', 'F&B Plastic', 'Metal', 'Glass', 'Other'])
// const filters = ref({
//   'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
//   'name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
//   'description': { value: null, matchMode: FilterMatchMode.CONTAINS },
//   'tags': { value: null, matchMode: FilterMatchMode.CONTAINS },
//   // 'createdAt': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
//   'material': { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
// })
// const materialsCn: Record<string, string> = {
//   'Paper': 'bg-gray-100 text-gray-500',
//   'Plastic': 'bg-green-300 text-green-700',
//   'Non Food Plastic': 'bg-red-300 text-red-700',
//   'F&B Plastic': 'bg-yellow-300 text-yellow-700',
//   'Glass': 'bg-blue-100 text-blue-700',
//   'Metal': 'bg-slate-700 text-slate-300',
//   'Other': 'bg-gray-100 text-gray-500',
// }

const route = useRoute()

const { data, pending, refresh, error } = await useFetch('/api/admin/recyclable', {
  initialCache: false
})

onMounted(() => {
  refresh()
})

const columnHelper = createColumnHelper<Recyclable>()

const columns = [
  columnHelper.group({
    header: 'Name',
    footer: props => props.column.id,
    columns: [
      columnHelper.accessor('id', {
        cell: info => info.getValue(),
        footer: props => props.column.id,
      }),

      columnHelper.accessor(row => row.name, {
        id: 'name',
        cell: info => info.getValue(),
        header: () => h('span', 'Name'),
        footer: props => props.column.id,
      }),
    ],
  }),

  columnHelper.group({
    header: 'Info',
    footer: props => props.column.id,

    columns: [
      columnHelper.accessor('material', {
        header: () => 'Material',
        footer: props => props.column.id,
      }),

      columnHelper.group({
        header: 'More Info',
        columns: [
          columnHelper.accessor('tags', {
            header: () => h('span', 'Tags'),
            footer: props => props.column.id,
          }),

        ],
      }),

      columnHelper.accessor('recyclable', {
        header: 'Recyclable',
      }),
    ],
  }),
]

const sorting = ref<SortingState>([])

const table = useVueTable({
  get data() {
    return data.value
  },
  columns,
  state: {
    get sorting() {
      return sorting.value
    },
  },
  onSortingChange: updaterOrValue => {
    sorting.value =
      typeof updaterOrValue === 'function'
        ? updaterOrValue(sorting.value)
        : updaterOrValue
  },
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  debugTable: true,
})

</script>