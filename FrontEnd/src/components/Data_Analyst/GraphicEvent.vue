<script>
import LineChart1 from './LineChart1.vue'

  export default {
    name: 'GraphicEvent',
    components: {
      LineChart1,
    },
    data() {
      return {
        suggested_events: null,
        event: null
      };
    },
    mounted() {
      this.event = this.$route.query.event;
      this.suggested_events = this.$route.query.suggested_events;
    },
    methods: {}
  };

</script>

<template>

  <div class="container">

    <!-- GRAFICO Media_prenotazioni_eventi/tempo
    <div v-if="suggestions !== null" class="graphics">
    </div> -->

    <!-- GRAFICO  N_eventi_proposti/tempo -->
    <LineChart1 :sugg_events="suggested_events" />

  </div>

</template>

<style scoped>

</style>