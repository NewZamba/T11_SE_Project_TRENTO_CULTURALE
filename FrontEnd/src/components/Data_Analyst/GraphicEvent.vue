<script>

  export default {
    name: 'GraphicEvent',
    components: {},
    data() {
      return {
        suggestions: null,
        event: null
      };
    },
    chartData: {
      labels: [], // Etichette sull'asse X
      datasets: [
        {
          label: '',
          data: [], // Dati per il grafico
          borderColor: 'rgb(75, 192, 192)', // Colore della linea
          fill: true
        }
      ]
    },
    chartOptions: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top'
        },
        title: {
          display: true,
          text: 'GRAFICO - N_eventi_proposti/tempo '
        }
      },
      scales: {
        x: {
          beginAtZero: true
        },
        y: {
          beginAtZero: true
        }
      }
    },
    mounted() {
      this.event = this.$route.query.event;
      this.suggested_events = this.$route.query.suggested_events;
    },
    methods: {

    }
  };

</script>

<template>

  <div class="container">

    <!-- GRAFICO Media_prenotazioni_eventi/tempo
    <div v-if="suggestions !== null" class="graphics">
    </div> -->

    <!-- GRAFICO  N_eventi_proposti/tempo -->
    <div class="graphics">

    </div>

  </div>

</template>

<style scoped>

</style>