<script>

  export default {
    name: 'Carousel',
    components: {},
    data() {
      return {
        slide: 0,
        sliding: null
      };
    },
    props: {
      events: {
        type: Array,
        required: true
      }
    },
    methods: {

    }
  };

</script>

<template>

    <b-carousel
        id="carousel-1"
        v-model="slide"
        :interval="4000"
        controls
        img-height="30vh"
        img-width="100vw"
        style="text-shadow: 1px 1px 2px #333;"
    >


      <!--
      Per le immagini le mettiamo in base64 nel database e poi ssi richiama la funz inversa per riportarle im img
      -->
      <b-carousel-slide
          v-for="event in events"
          :key="event._id"
          :caption="event.name_event"
          :img-src="event.img_event"
          :img-width="1600"
          :img-height="480"
      >
      </b-carousel-slide>
    </b-carousel>

</template>

<style scoped>
#carousel-1 {
  height: 100%;
  width: 60%;
  align-items: center;
}




</style>