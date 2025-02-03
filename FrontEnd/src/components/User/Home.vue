<script>
import CAROUSEL from './Carousel.vue';
import CARDS from './Cards.vue';
import Cookie from 'js-cookie';
import {RouterLink} from "vue-router";

export default {
  name: 'UserHome',
  components: {
    CAROUSEL,
    CARDS
  },
  data() {
    return {
      events: [],
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
  },
  computed: {
    sortedEvents() {
      return this.sortN ? this.arrSortN : this.arrSortD;
    },
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
        alert(`User: ${user_data.email_user || 'Unknown user'}, Type: ${user_data.type_user || 'Unknown type'}`);
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
    suggEvent() {
      this.$router.push({path: '/SuggestionEvent'});
    }
  }
};

</script>

<template>

  <div class="container">
    <div class="Carousel">
      <CAROUSEL :events="events" class="Carousel" />
    </div>
    <div class="Sort">
      <b-dropdown class="" text="Sort by">
        <b-dropdown-item @click="sortByName">Name</b-dropdown-item>
        <b-dropdown-item @click="sortByDate">Date</b-dropdown-item>
      </b-dropdown>
      <button class="sugg_btn" @click="suggEvent">
        Suggest Event
      </button>
    </div>
    <div class="Cards">
      <CARDS :events="sortedEvents" class="Card" />
    </div>
  </div>

</template>

<style scoped>

  .container {
    height: 100vh;
    width: 100vw;
    align-items: center;
    overflow-y: scroll;
    overflow-x: hidden;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto 1fr;
    grid-template-areas:
            "Carousel Carousel"
            "Sort Sort"
            "Cards Cards";
    gap: 30px 30px;
  }

  .Carousel {
    grid-area: Carousel;
    align-items: center;
    justify-content: center;
    display: flex;
  }

  .Sort {
    grid-area: Sort;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px
  }

  .Cards {
    grid-area: Cards;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .sugg_btn {
    border: none;
    width: 120px;
    height: 60px;
    border-radius: 30px;
    background-color: #4cafa0;
    color: white;
    font-size: medium;
    font-family: 'Helvetica', sans-serif;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s;
  }

  .sugg_btn:hover {
    transform: scale(1.1);
  }

</style>