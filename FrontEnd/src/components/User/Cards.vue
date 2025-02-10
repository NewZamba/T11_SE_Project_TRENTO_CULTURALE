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
            tags: JSON.stringify(event.tags_event),
            guests_event: event.guests_event,
          }
        });
      }
    }
  };

</script>

<template>

  <div class="cards">
    <b-card
        v-for="event in events"
        :key="event._id"
        :title="event.name_event"
        :img-src="event.img_event"
        img-alt="Event Image"
        img-height="200px"
        tag="article"
        class="card-item" >
      <button class="viewEventBtn" @click="showEvent(event)">
        View Event
      </button>
    </b-card>
  </div>

</template>

<style scoped>

  .cards {
    display: flex;
    flex-direction: row;
    overflow-x: scroll;
    margin: 0;
    padding: 5px;
    gap: 10px;
  }

  .card-item {
    min-width: 250px;
    max-width: 250px;
    height: 100%;
    margin: 0;
    font-family: "Roboto Light";
    font-weight: bold;
  }

  button {
    cursor: pointer;
    border: 0;
    border-radius: 4px;
    font-weight: 600;
    font-size: medium;
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
