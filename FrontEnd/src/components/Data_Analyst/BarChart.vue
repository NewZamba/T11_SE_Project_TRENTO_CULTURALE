<script>
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

  export default {
    name: 'BarChart',
    components: {
      Bar: Bar
    },
    props: {
      data: {
        type: Array,
        required: true,
        default: () => []
      }
    },
    data() {
      return {
        chartData: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [{
            data: this.data
          }]
        },
        chartOptions: {
          responsive: true
        }
      }
    }
  }

</script>

<template>

  <div>
    <Bar id="Grafico" :options="chartOptions" :data="chartData" />
  </div>

</template>

<style scoped>

</style>