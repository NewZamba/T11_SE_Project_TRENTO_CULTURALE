<script>

  export default {
    name: 'GraphicEvent',
    components: {},
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

  </div>

</template>

<style scoped>

</style>