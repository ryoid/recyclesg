<template>
  <Line :chart-options="chartOptions" :chart-data="data" :chart-id="id" :dataset-id-key="'label'"
    :css-classes="cssClasses" :width="width" :height="height" />
</template>


<script setup lang="ts">
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ScatterDataPoint } from 'chart.js'
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

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    }
  }
}

</script>

<!-- <script lang="ts">
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  props: {
    chartId: {
      type: String,
      default: 'bar-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 600
    },
    height: {
      type: Number,
      default: 200
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => { }
    },
    plugins: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    console.log('data', data);

    return {
      chartData: {
        labels: ['January', 'February', 'March'],
        datasets: [{ data: [40, 20, 12] }]
      },
      chartOptions: {
        responsive: true
      }
    }
  }
}
</script>> -->