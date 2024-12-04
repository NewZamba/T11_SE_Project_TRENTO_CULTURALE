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
          img-top
          tag="article"
          class="card-item d-flex flex-column justify-content-between"
      >
        <b-card-text>
          {{ event.description }}
        </b-card-text>

        <b-button href="#" variant="primary">View details</b-button>
      </b-card>
    </b-card-group>
</template>

<style scoped>

  .card-item {
    max-width: 20rem;
    height: 100%;
    flex: 1 1 calc(33.333% - 1rem);
    box-sizing: border-box;
    margin: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  @media (max-width: 768px) {
    .card-item {
      flex: 1 1 100%;
    }
  }

</style>
