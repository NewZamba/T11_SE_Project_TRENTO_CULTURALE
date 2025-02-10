<script>
import { Bar } from 'vue-chartjs';
import { Chart, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

  export default {
    name: 'BarChartTemplate',
    components: {
      Bar: Bar
    },
    props: {
      data: {
        type: Array,
        required: true
      },
      labels: {
        type: Array,
        required: true
      },
      titles: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        chartData: {
          labels: this.labels,
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
                stepSize: 1
              }
            },
            x: {
              ticks: {
                autoSkip: false
              }
            }
          },
          plugins: {
            title: {
              display: true,
              text: this.titles,
              font: {
                size: 18,
              }
            },
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
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color:  rgb(255, 245, 238);
  }

</style>