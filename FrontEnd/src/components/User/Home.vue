<script>
import CAROUSEL from './Carousel.vue';
import CARDS from './Cards.vue';
import Cookie from 'js-cookie';

export default {
  name: 'UserHome',
  components: {
    CAROUSEL,
    CARDS
  },
  data() {
    return {
      events: [],
      suggEvents: [],
      sortN: true,
      sortD: false,
      arrSortN: [],
      arrSortD: []
    };
  },
  created() {
    this.verifyUserType();
  },
  mounted() {
    this.fetchEvents();
    this.fetchSuggEvents();
  },
  computed: {
    sortedEvents() {
      return this.sortN ? this.arrSortN : this.arrSortD;
    }
  },
  methods: {
    async verifyUserType() {
      try {
        const response = await fetch('http://localhost:3000/verificaUserType/test', {
          method: 'GET',
          credentials: 'include'
        });
        if (response.status === 401) {
          throw new Error('utente non loggato');
        } else if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.message || 'Server error');
        }
        const user_data = await response.json();
        Cookie.set('id_user', user_data._id);
      } catch (error) {
        alert(`Error: ${error.message}`);
      }
    },
    fetchEvents() {
      try {
        fetch('http://localhost:3000/events', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
            .then(response => {
              if (!response.ok) {
                throw new Error('Error fetching events');
              }
              return response.json();
            })
            .then(data => {
              this.events = data;
              Promise.all([this.sortByName(), this.sortByDate()]);
            });
      } catch (err) {
        alert(err.message);
      }
    },
    fetchSuggEvents() {
      try {
        fetch('http://localhost:3000/suggEvents', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
            .then(response => {
              if (!response.ok) {
                throw new Error('Error fetching events');
              }
              return response.json();
            })
            .then(data => {
              this.suggEvents = data;
            });
      } catch (err) {
        alert(err.message);
      }
    },
    async sortByName() {
      this.arrSortN = this.events.slice().sort((a, b) =>
          a.name_event.localeCompare(b.name_event)
      );
      this.sortN = true;
      this.sortD = false;
    },
    async sortByDate() {
      this.arrSortD = this.events.slice().sort((a, b) =>
          a.date_event.localeCompare(b.date_event)
      );
      this.sortD = true;
      this.sortN = false;
    },
    suggEvent() {
      this.$router.push({ path: '/SuggestionEvent' });
    },
    viewSuggEvents() {
      this.$router.push({
        path: '/SuggEvents',
        query: { events: this.suggEvents }
      });
    }
  }
};
</script>

<template>
  <div class="background">
    <img
        src="https://images.pexels.com/photos/571169/pexels-photo-571169.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="Background"
    />

    <!-- Il container si adatta in altezza al contenuto -->
    <div class="container">
      <!-- Header: il Carousel -->
      <header class="header">
        <CAROUSEL :events="events" />
      </header>

      <!-- Main: le Cards (la griglia degli eventi) -->
      <main class="main">
        <CARDS :events="sortedEvents" />
      </main>

      <!-- Footer: posizionato al termine del contenuto -->
      <footer class="footer">
        <div class="Sort">
          <b-dropdown text="Sort by">
            <b-dropdown-item @click="sortByName">Name</b-dropdown-item>
            <b-dropdown-item @click="sortByDate">Date</b-dropdown-item>
          </b-dropdown>
          <button class="sugg_btn" @click="suggEvent">
            Suggest Event
          </button>
          <button class="sugg_btn" @click="viewSuggEvents">
            View Suggest Events
          </button>
        </div>
      </footer>
    </div>
  </div>
</template>

<style scoped>
/* Sfondo: l'immagine copre lo sfondo ma non forza altezze fisse */
.background {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.background img {
  position: absolute;
  width: 100%;
  object-fit: cover;
  z-index: -1;
  /* Rimuoviamo i vincoli di altezza per non forzare il layout */
  /* min-width, max-width, min-height, max-height possono essere omessi o regolati */
}

/* Il container ora non ha un'altezza fissa; crescerà in base al contenuto */
.container {
  display: flex;
  flex-direction: column;
  width: 95%;
  margin-top: 20px;
  padding: 20px;
  background: rgb(255, 245, 238);
  border-radius: 30px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1),
  0px -4px 6px rgba(0, 0, 0, 0.1),
  4px 0px 6px rgba(0, 0, 0, 0.1),
  -4px 0px 6px rgba(0, 0, 0, 0.1);
  gap: 20px;
  min-height: 100%;
}

/* Header: il Carousel in cima */
.header {
  width: 100%;
}

/* Main: le Cards si dispongono in base al contenuto */
.main {
  width: 100%;
  margin-top: 10px;
}

/* Footer: segue il contenuto senza essere forzato a un'altezza fissa */
.footer {
  width: 100%;
  padding: 5px;
}

/* Layout interno del footer */
.Sort {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-evenly;
}

/* Stili per i bottoni */
button {
  cursor: pointer;
  border: 0;
  border-radius: 10px;
  font-weight: 600;
  margin: 0 10px;
  width: 70%;
  padding: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1),
  0px -4px 6px rgba(0, 0, 0, 0.1),
  4px 0px 6px rgba(0, 0, 0, 0.1),
  -4px 0px 6px rgba(0, 0, 0, 0.1);
  transition: 0.4s;
}
.sugg_btn {
  width: 160px;
  height: 60px;
  border-radius: 20px;
  border: 1px solid rgba(104, 85, 224, 1);
  background-color: rgba(104, 85, 224, 1);
  color: rgb(255, 245, 238);
  font-size: medium;
  font-family: 'Roboto Light';
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;
}
.sugg_btn:hover {
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1),
  0px -4px 6px rgba(0, 0, 0, 0.1),
  4px 0px 6px rgba(0, 0, 0, 0.1),
  -4px 0px 6px rgba(0, 0, 0, 0.1);
  background-color: rgba(104, 85, 224, 1);
  transform: scale(1.1);
}
</style>
