<script>
import Cookie from "js-cookie";
import { EventBus } from '../../eventBus.js';


export default {
  name: 'FormEvents',
  data() {
    return {
      events: [],
      openEvents: [],
      feedback: '',
      rating: null
    }
  },
  created() {
    // Gli eventi vengono passati come query parameter (adatta in base alle tue esigenze)
    this.events = this.$route.query.events;
    if(this.events.length === 0){
      this.showModal();
    }
  },
  methods: {
    toggleMenu(toggleId) {
      const index = this.openEvents.indexOf(toggleId);
      if (index > -1) {
        this.openEvents.splice(index, 1);
      } else {
        this.openEvents.push(toggleId);
      }
    },
    isEventOpen(toggleId) {
      return this.openEvents.includes(toggleId);
    },
    backToHome() {
      this.$router.push('/UserHome');
    },
    submitRating(newRating) {
      // Puoi aggiungere qui eventuale logica al cambiamento del rating
      console.log('Rating submitted:', newRating);
    },
    sendForm(event) {
      try {
        // Prima eseguiamo la richiesta POST per inviare feedback e rating
        fetch('https://process.env.DEPLOY_API + \'//form', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id_user: Cookie.get('id_user'),
            id_event: event.id_event,
            name_event: event.name_event,
            feedback: this.feedback,
            rating: this.rating
          })
        })
            .then(response => {
              if (!response.ok) {
                return response.json().then(err => {
                  throw new Error('Error during POST request');
                });
              }
            })
            .then(() => {
              // Eseguiamo una PUT per aggiornare l’evento
              return fetch(process.env.DEPLOY_API + '/form', {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  id_event: event.id_event,
                  id_user: Cookie.get('id_user')
                })
              });
            })
            .then(response => {
              if (!response.ok) {
                return response.json().then(err => {
                  throw new Error('Error during PUT request');
                });
              }
              alert('Form inviato e evento aggiornato correttamente!');
              // Rimuoviamo l’evento dall’elenco e chiudiamo il collapse
              this.events = this.events.filter(e => e.id_event !== event.id_event);
              this.openEvents = this.openEvents.filter(id => id !== event._id);
              // Reset dei campi
              this.feedback = '';
              this.rating = null;
            })
            .catch(err => {
              alert(`Errore: ${err.message}`);
            });
      } catch (err) {
        alert(`Errore: ${err.message}`);
      }
    },
    showModal() {
      EventBus.$emit('open-global-modal', {
        title: '⚠️Attenzione⚠️',
        message: 'Non sono presenti eventi da recensire',
      });
    }
  }
};
</script>

<template>
  <div class="background">
    <img src="https://images.pexels.com/photos/571169/pexels-photo-571169.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />

    <div class="container">
      <header class="headerEP">
        <button class="back_btn" @click="backToHome">×</button>
      </header>

      <nav class="navbar">
        <div
            v-for="event in events"
            :key="event.id_event"
            class="event-container"
            v-if="events.length > 0"
        >
          <div class="ec2">
            <!-- Apertura/chiusura del form cliccando sul nome dell'evento -->
            <b-button variant="link" @click="toggleMenu(event._id)">
              <span>{{ event.name_event }}</span>
            </b-button>
          </div>

          <!-- Utilizzo di b-collapse per mostrare/nascondere il form -->
          <b-collapse :visible="isEventOpen(event._id)" class="slide">
            <b-form @submit.prevent="sendForm(event)">
              <!-- Un unico form group per feedback e rating -->
              <b-form-group label="Feedback e Rating:" label-for="feedback">
                <b-form-textarea
                    id="feedback"
                    v-model="feedback"
                    placeholder="Inserisci il tuo feedback"
                ></b-form-textarea>
                <b-form-rating
                    id="rating"
                    v-model="rating"
                    inline
                    @change="submitRating"
                    variant="warning"
                ></b-form-rating>
              </b-form-group>
              <b-button type="submit" class="voteBtn">
                Send
              </b-button>
            </b-form>
          </b-collapse>
        </div>
      </nav>

      <footer></footer>
    </div>
  </div>
</template>

<style scoped>
.background {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  min-height: 100vh;
}

.background img {
  position: absolute;
  width: 100%;
  object-fit: fill;
  z-index: -1;
  min-width: 100%;
  max-width: 100%;
  min-height: 100%;
}

.container {
  padding: 0;
  display: flex;
  flex-direction: column;
  width: 70%;
  min-height: 60vh;
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

.navbar {
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

.ec2 {
  display: flex;
  height: 100%;
  width: 100%;
  margin: 0;
  align-items: center;
  justify-content: space-between;
  border: 2px solid rgba(255, 245, 238);
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

.voteBtn {
  height: 10%;
  color: rgb(104, 85, 224);
  background-color: rgba(255, 255, 255, 1);
  border: 1px solid rgba(104, 85, 224, 1);
}

.back_btn {
  cursor: pointer;
  border: none;
  background: rgba(104, 85, 224, 1);
  font-size: 1.5em;
  color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s;
}

.back_btn:hover {
  transform: scale(1.3);
}

.voteBtn:hover {
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1),
  0px -4px 6px rgba(0, 0, 0, 0.1),
  4px 0px 6px rgba(0, 0, 0, 0.1),
  -4px 0px 6px rgba(0, 0, 0, 0.1);
  transform: scale(1.1);
}
</style>
