<script>

  export default {
    name: 'Cards',
    components: {},
    data() {
      return {};
    },
    props: {
      events: {
        type: Array,
        required: true
      },
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
    <!-- Itera attraverso gli eventi per generare le carte -->
    <b-card-group deck>
      <b-card
          v-for="event in events"
          :key="event._id"
          :title="event.name_event"
          :img-src="event.img_event"
          img-alt="Event Image"
          img-height="200px"
          tag="article"
          class="card-item d-flex flex-column justify-content-between"
      >
        <b-card-text>
          {{ event.description }}
        </b-card-text>

        <b-button href="#" variant="primary" @click="showEvent(event)">View details</b-button>
      </b-card>
    </b-card-group>
</template>

<style scoped>

  .card-item {
    width: 325px;
    height: 375px;
    flex: 1 1 calc(33.333% - 1rem);
    box-sizing: border-box;
    margin: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 768px) {
    .card-item {
      flex: 1 1 100%;
    }
  }

</style>
