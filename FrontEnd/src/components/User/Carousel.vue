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
      showEvent(event) {

        this.$router.push({
          path: `/EventPage`,
          query: {
            _id: event._id,
            name_event: event.name_event,
            img_event: event.img_event,
            description_event: event.description_event,
            location_event: event.location_event,
            date_event: event.date_event,
            tags: event.tags
          }
        });
      }
    }
  };

</script>

<template>

    <b-carousel
        id="carousel-1"
        v-model="slide"
        fade
        :interval="4000"
        img-width="1024"
        img-height="480"
        controls
        style="text-shadow: 1px 1px 2px #333"
    >
      <!--
      Per le immagini le mettiamo in base64 nel database e poi ssi richiama la funz inversa per riportarle im img
      -->
      <b-carousel-slide
          v-for="event in events"
          :key="event._id"
          :caption="event.name_event"
          :img-src="event.img_event"
          :img-width="1024"
      >
      </b-carousel-slide>
    </b-carousel>

</template>

<style scoped>

  #carousel-1 {
    height: 500px;
    width: 60%;
    align-items: center;
  }

  ::v-deep(img.img-fluid) {
    width: 100%;
    height: 480px !important;
    object-fit: fill;
  }

  b-carousel-slide {
    cursor: pointer;
  }

</style>