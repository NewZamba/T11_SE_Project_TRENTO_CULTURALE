<script>
import button from "bootstrap/js/src/button.js";

  export default {
    name: 'Carousel',
    computed: {
      button() {
        return button
      }
    },
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
            tags: event.tags,
            guests_event: event.guests_event,
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
        style="text-shadow: 1px 1px 2px #333">
      <b-carousel-slide
          v-for="event in events"
          :key="event._id"
          :img-src="event.img_event"
          :img-width="1024" >
        <div class="carousel-caption">
          <b-button class="btn" @click="showEvent(event)">
            {{ event.name_event }}
          </b-button>
        </div>
      </b-carousel-slide>
    </b-carousel>

</template>

<style scoped>

  #carousel-1 {
    height: 40%;
    width: 100%;
    align-items: center;
    margin: 0;
    padding-top: 0;
  }

  ::v-deep(img.img-fluid) {
    width: 100%;
    height: 360px !important;
    object-fit: cover;
    border-top-right-radius: 30px;
    border-top-left-radius: 30px;
  }

  b-carousel-slide {
    cursor: pointer;
  }

  .btn {
    font-size: xx-large;
    font-weight: bold;
    background: none;
    border: none;
    text-transform: uppercase;
    -webkit-text-stroke: 1px black;
    cursor: pointer;
    outline: none;
    transition: transform 0.2s;
  }

  .btn:hover {
    color: white;
    background: none;
    transform: scale(1.1);
  }

</style>