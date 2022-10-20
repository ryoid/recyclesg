<template>
  <LineChart :chart-options="chartOptions" :chart-data="data" :chart-id="id" :dataset-id-key="'label'"
    :css-classes="cssClasses" :width="width" :height="height" />
</template>


<script setup lang="ts">
import { ScatterDataPoint } from 'chart.js'
import { TChartData } from 'vue-chartjs/dist/types'

export type Props = {
  id: string
  data: TChartData<"line", (number | ScatterDataPoint)[], unknown>
  cssClasses?: string
  width?: number
  height?: number
}

const props = withDefaults(defineProps<Props>(), {
  width: 600,
  height: 200,
})

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    }
  }
}

</script>
