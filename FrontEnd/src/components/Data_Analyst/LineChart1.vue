<script>
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

  export default ({
    name: 'LineChart1',
    components: {
      LineChart: Line,
    },
    props: {
      sugg_events: {
        required: true
      }
    },
    mounted() {
      this.countEventPerMonth();
    },
    data() {
      return {
        labels: ['Jen', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        chartData: {
          datasets: [
            {
              label: 'Numeri eventi',
              data: [],
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderWidth: 2,
            },
          ],
        },
        chartOptions: {
          responsive: true,
          indexAxis: 'y', // Imposta l'asse Y come principale
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'GRAFICO - N_eventi_proposti/tempo',
            },
            scales: {
              x: {
                type: 'time',
                time: {
                  unit: 'month',
                  displayFormats: {
                    month: 'MMM' // Formato, ad esempio "Jan", "Feb"
                  }
                },
                title: {
                  display: true,
                  text: 'Tempo',
                },
              },
              y: {
                beginAtZero: true,
                ticks: {
                  stepSize: 5 // Passo di incremento tra i valori
                },
                title: {
                  display: true,
                  text: 'Eventi',
                },
                min: 0
              }
            }
          }
        }
      }
    },
    methods: {
      countEventPerMonth() {
        const eventCounts = Array(12).fill(0);

        this.sugg_events.forEach(event => {
          if (event.date_event) {
            const month = new Date(event.date_event).getMonth();
            eventCounts[month] += 1;
          }
        });

        this.chartData.datasets[0].data = eventCounts;
      }
    }
  });

</script>

<template>

  <div>
    <line-chart :chart-data="chartData" :chart-options="chartOptions" />
  </div>

</template>

<style scoped>

</style>