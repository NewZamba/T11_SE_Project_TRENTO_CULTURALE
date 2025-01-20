<script>

  export default {
    name: 'ListEvents',
    components: {},
    data() {
      return {
        t_event: null
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
        console.log(this.t_event);
      },
      showGraphic(event, x) {
        switch (x) {
            // N_eventi_proposti/tempo
          case 1:
            console.log(this.sugg_events);
            this.$router.push({
              path: '/GraphicEvent',
              query: {
                suggested_events: this.sugg_events
              }
            });
            break;
            // Media_feedback_eventi/tempo
          case 2:
            console.log(this.event + 'dio latte');
            this.$router.push({
              path: '/GraphicEvent',
              query: {
                event: event
              }
            });
            break;
            // Media_prenotazioni_eventi/tempo
            /*case 3: this.$router.push({
                            path: '/GraphicEvent',
                            query: {
                              prenotations: this.prenotations
                            }
                          });
              break;*/
          default:
            break;
        }
      }
    }
  };

</script>

<template>

  <div class="main-container">

    <div class="left-column">
      <b-button
          v-for="event in events"
          :key="event._id"
          :title="event.name_event"
          @click="showDetails(event)"
          class="card-item d-flex flex-column justify-content-between">
        <span> {{ event.name_event }} </span>
      </b-button>
    </div>

    <div class="right-column">
      <div v-if="t_event === null">
        <p> Nessun evento selezionato </p>
      </div>

      <div v-else class="graphics">
          <!--Info eventi-->
          <div class="info">
            <h1> {{ t_event.name_event }} </h1>
            <p> {{ t_event.location_event }} </p>
            <p> {{ t_event.date_event }} </p>
            <p> {{ t_event.tags }} </p>
            <p> {{ t_event.description_event }} </p>
            <img :src="t_event.img_event"
                 v-if="t_event && t_event.img_event" alt="Immagine Evento" />
          </div>

        <div class="buttons">
          <!--Possibili grafici-->
          <b-button
              @click="showGraphic(t_event, 1)"
              class="card-item">
            N eventi proposti/tempo
          </b-button>

          <b-button
              @click="showGraphic(t_event, 2)"
              class="card-item">
            Media prenotazioni eventi/tempo
          </b-button>

          <!--
          <b-button
              @click="showGraphic(this.t_event, 3)"
              class="card-item" >
            Media prenotazioni evento/tempo
          </b-button>
          -->
        </div>

      </div>
    </div>

  </div>

</template>

<style scoped>

  .main-container {
    display: flex;
    gap: 20px;
  }

  .left-column {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }

  .right-column {
    flex: 3;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .graphics {
    display: flex;
    gap: 20px;
  }

  .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
  }

  .info img {
    max-width: 100%;
    height: auto;
    border-radius: 5px;
  }

  .buttons {
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }

  .card-item {
    width: 200px;
    padding: 10px;
  }

</style>