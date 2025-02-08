<script>
import CAROUSEL from './Carousel.vue';
import CARDS from './Cards.vue';
import Cookie from 'js-cookie';
import {RouterLink} from "vue-router";
import * as events from "node:events";

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
      arrSortD: [],
      userPrenotations: [],
      id_user: null
    };
  },
  created() {
    this.verifyUserType();
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
          credentials: 'include',
        });

        if (response.status === 401) {
          throw new Error('utente non loggato');
        } else if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.message || 'Server error');
        }

        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.message || 'Server error');
        }

        const user_data = await response.json();
        Cookie.set('id_user', user_data._id);
        this.id_user = Cookie.get('id_user');
      } catch (error) {
        // Display the error message in case of issues
        alert(`Error: ${error.message}`);
      }
    },
    fetchEvents() {
      try {
        fetch('http://localhost:3000/events', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        }).then(response => {
          if (!response.ok) {
            throw new Error('Error fetching events');
          }
          return response.json();
        }).then(data => {
          this.events = data;
          Promise.all([this.sortByName(), this.sortByDate()]);
        });
      } catch (err) {
        alert(err.message);
      }
    },
    async fetchSuggEvents() {
      try {
        fetch('http://localhost:3000/suggEvents', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        }).then(response => {
          if (!response.ok) {
            throw new Error('Error fetching events');
          }
          return response.json();
        }).then(data => {
          this.suggEvents = data;
        });
      } catch (err) {
        alert(err.message);
      }
    },
    async sortByName() {
      this.arrSortN = this.events.sort((a, b) => {return a.name_event.localeCompare(b.name_event)});
      this.sortN = true;
      this.sortD = false;
    },
    async sortByDate() {
      this.arrSortD = this.events.sort((a, b) => {return a.date_event.localeCompare(b.date_event)});
      this.sortD = true;
      this.sortN = false;
    },
    async suggEvent() {
      this.$router.push({path: '/SuggestionEvent'});
    },
    viewSuggEvents() {
      this.$router.push({
        path: '/SuggEvents',
        query: {
          events: this.suggEvents
        }
      });
    },
    async fetchUserPrenotations() {
      try {
        const response = await fetch(`http://localhost:3000/prenotations2?id=${Cookie.get('id_user')}`);
        if (!response.ok) {
          const errorMessage = await response.text();
          alert(`Errore dal server: ${errorMessage}`);
          return [];
        }

        const data = await response.json();
        this.userPrenotations = data;
      } catch (err) {
        alert(`Errore: ${err.message}`);
        return [];
      }
    },
    async viewForm() {

      await Promise.all([
        this.fetchUserPrenotations()
      ]);

      const today = new Date();

      const f1 = this.userPrenotations.filter(p => {
        return new Date(p.date_event) < today
      });

      this.$router.push({
        path: '/FormEvents',
        query: {
          events: f1
        }
      });
    }
  }
};

</script>

<template>

  <div class="background">
    <img src="https://images.pexels.com/photos/571169/pexels-photo-571169.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />

    <div class="container">
      <div class="Carousel">
        <CAROUSEL :events="events" class="Carousel" />
      </div>

      <div class="Cards">
        <CARDS :events="sortedEvents" />
      </div>

      <footer>
        <div class="Sort">
          <b-dropdown class="" text="Sort by">
            <b-dropdown-item @click="sortByName">Name</b-dropdown-item>
            <b-dropdown-item @click="sortByDate">Date</b-dropdown-item>
          </b-dropdown>

          <button class="sugg_btn" @click="suggEvent">
            Suggest Event
          </button>

          <button class="sugg_btn" @click="viewSuggEvents">
            View Suggest Events
          </button>

          <button class="sugg_btn" @click="viewForm">
            Form
          </button>
        </div>
      </footer>
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
    display: flex;
    flex-direction: column;
    height: 90%;
    width: 95%;
    align-items: center;
    justify-content: center;
    border-radius: 30px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1),
                0px -4px 6px rgba(0, 0, 0, 0.1),
                4px 0px 6px rgba(0, 0, 0, 0.1),
               -4px 0px 6px rgba(0, 0, 0, 0.1);
    margin-top: 0;
    padding: 0;
    background: rgb(255, 245, 238);
    gap: 20px;
  }

  .Carousel {
    display: flex;
    width: 100%;
    height: 40%;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 0;
  }

  .Cards {
    display: flex;
    height: 50%;
    width: 100%;
    margin-top: 10px;
    scroll-behavior: smooth;
  }

  footer {
    height: 10%;
    width: 100%;
    align-items: center;
    justify-content: center;
    padding: 5px;
  }

  .Sort {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: space-evenly;
  }

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