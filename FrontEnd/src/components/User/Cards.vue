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

  <b-card-group deck>
    <b-card
        v-for="event in events"
        :key="event._id"
        :title="event.name_event"
        :img-src="event.img_event"
        img-alt="Event Image"
        img-height="200px"
        tag="article"
        class="card-item d-flex flex-column justify-content-between" >
      <b-card-text>
        {{ event.description }}
      </b-card-text>

      <button class="viewEventBtn" @click="showEvent(event)">View Event</button>
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



  button {
    cursor: pointer;
    border: 0;
    border-radius: 4px;
    font-weight: 600;
    margin: 0 10px;
    width: 50%;
    padding: 10px;
    box-shadow: 0 0 20px rgba(115, 99, 238, 0.2);
    transition: 0.4s;
  }

  button:hover {
    color: white;
    box-shadow: 0 0 40px rgba(104, 85, 224, 0.6);
    background-color: rgba(104, 85, 224, 1);
  }

  .viewEventBtn {
    color: rgb(104, 85, 224);
    background-color: rgba(255, 255, 255, 1);
    border: 1px solid rgba(104, 85, 224, 1);
  }

</style>
