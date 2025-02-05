<script>

  export default {
    name: 'ListEvents',
    components: {},
    data() {
      return {
        t_event: null,
        graphicOn: false
      };
    },
    props: {
      events: {
        type: Array,
        required: true
      },
      prenotations: {
        type: Array,
        required: true
      },
      sugg_events: {
        type: Array,
        required: true
      }
    },
    methods: {
      showDetails(event) {
        this.t_event = event;
      }
    }
  };

</script>

<template>

  <div class="container">
    <div class="left-column">
      <button
          v-for="event in events"
          :key="event._id"
          :title="event.name_event"
          @click="showDetails(event)"
          class="btn_event">
        <span> {{ event.name_event }} </span>
      </button>
    </div>

    <div class="right-column">
      <div class="nothing" v-if="t_event === null">
        <p> Nessun evento selezionato </p>
      </div>

      <div v-else class="graphics">
        <div class="info">
          <h1>Name: {{ t_event.name_event }} </h1>
          <hr />
          <p>Location: {{ t_event.location_event }} </p>
          <hr />
          <p>Date: {{ t_event.date_event }} </p>
          <hr />
          <p>Tag: {{ t_event.tags }} </p>
          <hr />
          <p>Description: {{ t_event.description_event }} </p>
          <hr />
          <img :src="t_event.img_event" v-if="t_event && t_event.img_event" alt="Immagine Evento" />
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

  .container {
    display: flex;
    gap: 20px;
    height: 100%;
    padding: 5px;
  }

  .left-column {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }

  .right-column {
    display: flex;
    flex: 3;
    flex-direction: column;
    gap: 20px;
    font-family: "Roboto Light";
  }

  .graphics {
    display: flex;
    gap: 20px;
    padding: 20px;
    background-color: rgba(104, 85, 224, 1);
  }

  .nothing {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
  }

  .info {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    color: rgba(255, 255, 255, 1);
  }

  hr {
    border: none;
    height: 1.5px;
    width: 100%;
    align-self: center;
    background-color: rgb(255, 245, 238);
  }

  h1 {
    font-size: 35px;
  }

  p {
    font-size: 25px;
  }

  .info img {
    max-width: 100%;
    height: auto;
    border-radius: 5px;
  }

  button {
    cursor: pointer;
    border: 0;
    border-radius: 4px;
    font-weight: 600;
    margin: 0 10px;
    width: 200px;
    padding: 10px 0;
    box-shadow: 0 0 20px rgba(115, 99, 238, 0.2);
    transition: 0.4s;
  }

  button:hover {
    color: rgba(255, 255, 255, 1);
    box-shadow: 0 0 40px rgba(104, 85, 224, 0.6);
    background-color: rgba(104, 85, 224, 1);
  }

  .btn_event {
    color: rgb(104, 85, 224);
    background-color: rgba(255, 255, 255, 1);
    border: 1px solid rgba(104, 85, 224, 1);
  }

</style>