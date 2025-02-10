<script>
import Cookie from "js-cookie";
import {computed} from "vue";
export default {
  name: 'SuggEvents',
  data() {
    return {
      events: [],
      openEvents: [],
      ratings: {},        // Voto attuale inserito dall'utente per ciascun evento
      evaluations: {},    // La valutazione (di questo utente) per ciascun evento (se necessaria)
      averageRatings: {}, // Media dei voti per ciascun evento
      id_user: null       // ID dell'utente corrente
    };
  },
  created() {
    // Recupera gli eventi (assicurati che siano passati come query, ad es. array di oggetti)
    this.events = this.$route.query.events || [];
    this.id_user = Cookie.get('id_user');

    // Per ciascun evento:
    this.events.forEach(event => {
      // Imposta il voto locale iniziale: usa il rating già presente nell'oggetto event oppure 0
      this.$set(this.ratings, event._id, event.rating || 0);
      // Richiede le valutazioni per l'evento e calcola la media
      this.getAverageRating(event._id);
      // Se l'utente è loggato, controlla se esiste già una valutazione per questo evento
      if(this.id_user){
        this.getUserEvaluation(event._id);
      }
    });
  },
  computed: {
    sortedEvents() {
      return [...this.events].sort((a, b) => {
        const avgA = parseFloat(this.averageRatings[a._id]) || 0;
        const avgB = parseFloat(this.averageRatings[b._id]) || 0;
        return avgB - avgA; // Ordine decrescente
      });
    }
  },
  methods: {
    toggleMenu(eventId) {
      const index = this.openEvents.indexOf(eventId);
      if (index > -1) {
        this.openEvents.splice(index, 1);
      } else {
        this.openEvents.push(eventId);
      }
    },
    isEventOpen(eventId) {
      return this.openEvents.includes(eventId);
    },
    backToHome() {
      this.$router.push('/UserHome');
    },
    async submitRating(eventId, newRating) {
      // Se il voto dell'utente per questo evento è cambiato, invia il nuovo voto.
      // Se il nuovo valore è identico al precedente, non fare nulla.
      const oldEvaluation = this.evaluations[eventId];
      if (oldEvaluation && oldEvaluation.rating === newRating) {
        // Il nuovo voto è identico al precedente: non fare nulla.
        return;
      }
      await this.addRating(eventId, newRating);
      // Dopo aver votato, aggiorna la media dei voti per l'evento
      this.getAverageRating(eventId);
    },
    async addRating(eventId, newRating) {
      console.log(eventId, this.id_user,newRating);
      try {
        const response = await fetch("http://localhost:3000/addEvaluation", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_event: eventId,
            id_user: this.id_user,
            rating: newRating
          }),
        });
        if (!response.ok) throw new Error("Failed to add rating");
        const data = await response.json();
        // Salva la valutazione dell'utente per questo evento (se presente)
        if (data) {
          console.log(data.evaluation);
          this.$set(this.evaluations, eventId, data.evaluation);
          this.$set(this.ratings, eventId, data.evaluation.rating);
          console.log("Valutazione aggiornata per l'evento", eventId, ":", data.rating);
        }
      } catch (error) {
        console.error(error);
      }
    },
    // Metodo per ottenere tutte le valutazioni di un evento e calcolarne la media
    async getAverageRating(eventId) {
      try {
        // Non passiamo id_user per far sì che la API restituisca tutte le valutazioni
        const response = await fetch("http://localhost:3000/getEvaluation", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_event: eventId,
          }),
        });
        if (!response.ok) throw new Error("Failed to get evaluations");
        const evaluations = await response.json();
        if (Array.isArray(evaluations) && evaluations.length > 0) {
          const sum = evaluations.reduce((acc, cur) => acc + (cur.rating || 0), 0);
          const avg = sum / evaluations.length;
          // Imposta la media arrotondata a una cifra decimale
          this.$set(this.averageRatings, eventId, avg.toFixed(1));
        } else {
          this.$set(this.averageRatings, eventId, "N/A");
        }
      } catch (error) {
        console.error(error);
        this.$set(this.averageRatings, eventId, "N/A");
      }
    },
    // Funzione per ottenere la valutazione specifica dell'utente per un determinato evento
    async getUserEvaluation(eventId) {
      try {
        const response = await fetch("http://localhost:3000/getEvaluation", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_event: eventId,
            id_user: this.id_user
          }),
        });
        if (!response.ok) throw new Error("Failed to get user evaluation");
        const data = await response.json();
        // Se la valutazione esiste, la salvo e la imposto nel rating
        if (data && data.rating !== undefined) {
          this.$set(this.evaluations, eventId, data);
          this.$set(this.ratings, eventId, data.rating);
        }
      } catch (error) {
        console.error(error);
      }
    }
  },
};
</script>
<template>
  <div class="background">
    <img src="https://images.pexels.com/photos/571169/pexels-photo-571169.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"/>
    <div class="container">
      <header>
        <button class="backBtn" @click="backToHome">
          <b-icon icon="arrow-left"/>
        </button>
      </header>
      <nav class="navbar">
        <div v-for="event in sortedEvents" :key="event._id" class="event-container">
          <div class="ec2">
            <label @click="toggleMenu(event._id)">
              <span>{{ event.name_event }}</span>
            </label>
            <!-- Mostra la media dei voti (se presente) -->
            <div class="average-rating">
              Media voti:
              <span v-if="averageRatings[event._id]">{{ averageRatings[event._id] }}</span>
              <span v-else>N/A</span>
            </div>
          </div>
          <ul class="slide" v-show="isEventOpen(event._id)">
            <li>
              <strong><i>Date:</i></strong>
              {{ new Date(event.date_event).toLocaleDateString() }}
            </li>
            <hr/>
            <li>
              <strong><i>Description:</i></strong>
              {{ event.description_event }}
            </li>
            <hr/>
            <li>
              <b-form-group
                  :label="'Dai un voto:'"
                  :label-for="'rating-' + event._id"
                  style="background-color: transparent"
              >
                <b-form-rating
                    :id="'rating-' + event._id"
                    v-model="ratings[event._id]"
                    inline
                    @change="(newRating) => submitRating(event._id, newRating)"
                    variant="warning"
                ></b-form-rating>
              </b-form-group>
            </li>
          </ul>
        </div>
      </nav>
      <footer/>
    </div>
  </div>
</template>
<style scoped>
/* (Il CSS rimane invariato rispetto al codice originale) */

.background {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}

.background img {
  position: absolute;
  width: 100%;
  object-fit: fill;
  z-index: -1;
  min-width: 100%;
  max-width: 100%;
  min-height: 100%;
  max-height: 100%;
}

.container {
  padding: 0;
  display: flex;
  flex-direction: column;
  height: 70%;
  width: 70%;
  justify-content: center;
  align-items: flex-start;
  border-radius: 30px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1),
  0px -4px 6px rgba(0, 0, 0, 0.1),
  4px 0px 6px rgba(0, 0, 0, 0.1),
  -4px 0px 6px rgba(0, 0, 0, 0.1);
  background-color: rgb(255, 245, 238);
  z-index: 1;
}

header {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 10%;
  width: 100%;
  margin: 0;
  padding: 2px;
}

footer {
  display: flex;
  flex-direction: column;
  height: 10%;
  width: 100%;
}

nav {
  background: rgba(104, 85, 224, 1);
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1),
  0px -4px 6px rgba(0, 0, 0, 0.1),
  4px 0px 6px rgba(0, 0, 0, 0.1),
  -4px 0px 6px rgba(0, 0, 0, 0.1);
}

.event-container {
  margin: 0;
  font-family: "Roboto Light", sans-serif;
  width: 100%;
  justify-content: space-between;
}

.navbar {
  height: 90%;
  overflow-y: auto;
  border: none;
  padding: 2px;
  scroll-behavior: smooth;
}

.ec2 {
  display: flex;
  height: 100%;
  width: 100%;
  margin: 0;
  align-items: center;
  justify-content: space-between;
  border: 2px solid rgba(255, 245, 238);
}

.average-rating {
  color: #fff;
  font-size: 1em;
  margin-right: 10px;
}

span {
  padding: 20px;
  background: rgba(104, 85, 224, 1);
  color: rgba(255, 245, 238);
  font-size: 1.2em;
  font-variant: small-caps;
  cursor: pointer;
  display: block;
}

.slide {
  clear: both;
  width: 100%;
  overflow: hidden;
  text-align: left;
  background: rgba(255, 245, 238);
  list-style: none;
  margin: 0;
  padding: 10px;
  border: 1px solid rgba(255, 245, 238);
  font-family: "Roboto Light", sans-serif;
}

.slide li {
  padding: 8px 0;
  color: #2d2f31;
}

hr {
  border: none;
  height: 2px;
  width: 95%;
  align-self: center;
  background-color: rgb(104, 85, 224);
}

button {
  cursor: pointer;
  border: 0;
  border-radius: 4px;
  font-weight: 600;
  margin: 0 10px;
  width: 15%;
  padding: 10px;
  box-shadow: 0 0 20px rgba(115, 99, 238, 0.2);
  transition: 0.4s;
}

.voteBtn {
  height: 10%;
  color: rgb(104, 85, 224);
  background-color: rgba(255, 255, 255, 1);
  border: 1px solid rgba(104, 85, 224, 1);
}

.voteBtn:hover {
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1),
  0px -4px 6px rgba(0, 0, 0, 0.1),
  4px 0px 6px rgba(0, 0, 0, 0.1),
  -4px 0px 6px rgba(0, 0, 0, 0.1);
  transform: scale(1.1);
}

.backBtn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: solid 1px rgba(104, 85, 224, 1);
  background-color: rgba(104, 85, 224, 1);
  color: whitesmoke;
  font-family: "Roboto Light";
  font-size: 1.2em;
}

button:hover {
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1),
  0px -4px 6px rgba(0, 0, 0, 0.1),
  4px 0px 6px rgba(0, 0, 0, 0.1),
  -4px 0px 6px rgba(0, 0, 0, 0.1);
  transform: scale(1.1);
}
</style>
