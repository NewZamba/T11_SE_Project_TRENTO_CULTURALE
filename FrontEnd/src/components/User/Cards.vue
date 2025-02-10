<script>
export default {
  name: 'Cards',
  props: {
    events: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      currentPage: 1,
      perPage: 12
    };
  },
  computed: {
    // Calcola gli eventi da mostrare nella pagina corrente
    pagedEvents() {
      const start = (this.currentPage - 1) * this.perPage;
      return this.events.slice(start, start + this.perPage);
    },
    // Raggruppa gli eventi in righe da 4 elementi
    chunkedPagedEvents() {
      const chunks = [];
      for (let i = 0; i < this.pagedEvents.length; i += 4) {
        chunks.push(this.pagedEvents.slice(i, i + 4));
      }
      return chunks;
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
          tags: JSON.stringify(event.tags_event),
          guests_event: event.guests_event
        }
      });
    }
  }
};
</script>

<template>
  <div>
    <b-container fluid id="cards-container">
      <!-- Raggruppiamo le card in righe da 4 elementi -->
      <b-row
          v-for="(row, rowIndex) in chunkedPagedEvents"
          :key="rowIndex"
          class="mb-3"
      >
        <b-col
            v-for="event in row"
            :key="event._id"
            md="3"
            class="d-flex align-items-stretch"
        >
          <b-card
              class="card-item flex-fill"
              :title="event.name_event"
              :img-src="event.img_event"
              img-alt="Event Image"
              img-height="200px"
              tag="article"
          >
            <button class="viewEventBtn" @click="showEvent(event)">
              View Event
            </button>
          </b-card>
        </b-col>
      </b-row>
    </b-container>

    <!-- Paginazione: 12 eventi per pagina -->
    <b-pagination
        v-model="currentPage"
        :total-rows="events.length"
        :per-page="perPage"
        aria-controls="cards-container"
        align="center"
        class="my-3"
    ></b-pagination>
  </div>
</template>

<style scoped>
.card-item {
  font-family: "Roboto Light";
  font-weight: bold;
  background-color: rgb(255, 245, 238);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1),
  0px -4px 6px rgba(0, 0, 0, 0.1),
  4px 0px 6px rgba(0, 0, 0, 0.1),
  -4px 0px 6px rgba(0, 0, 0, 0.1);
}

/* Stili per il pulsante all'interno della card */
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
  color: rgb(255, 245, 238);
  box-shadow: 0 0 40px rgba(104, 85, 224, 0.6);
  background-color: rgba(104, 85, 224, 1);
}

.viewEventBtn {
  color: rgb(104, 85, 224);
  background-color: rgb(255, 245, 238);
  border: 1px solid rgba(104, 85, 224, 1);
}

</style>
