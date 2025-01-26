<script>
import { Bar } from 'vue-chartjs';
import { Chart, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

  export default {
    name: 'BarChart',
    components: {
      Bar: Bar
    },
    props: {
      data: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        chartData: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [{
            data: this.data,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        chartOptions: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 5
              }
            },
            x: {
              ticks: {
                autoSkip: false
              }
            }
          },
          plugins: {
            tooltip: {
              enabled: true
            }
          }
        }
      }
    }
  }

</script>

<template>

  <div class="chart">
    <Bar :options="chartOptions" :data="chartData" />
  </div>

</template>

<style scoped>

  .chart {
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border: 1px solid #ddd;
    border-radius: 8px;
  }

</style>