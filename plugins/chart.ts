import { defineNuxtPlugin } from "#app";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
} from "chart.js";

export default defineNuxtPlugin((nuxtApp) => {
  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    PointElement,
    BarElement,
    CategoryScale,
    LinearScale,
    LineElement
  );

  nuxtApp.vueApp.component("LineChart", Line);
});
