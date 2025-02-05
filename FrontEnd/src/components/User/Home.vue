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

  <div class="background">
    <img src="https://images.pexels.com/photos/571169/pexels-photo-571169.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />

    <div class="container">
      <div class="Carousel">
        <CAROUSEL :events="events" class="Carousel" />
      </div>

      <div class="Cards">
        <CARDS :events="sortedEvents" class="Card" />
      </div>

      <footer class="Footer">
        <div class="Sort">
          <b-dropdown class="" text="Sort by">
            <b-dropdown-item @click="sortByName">Name</b-dropdown-item>
            <b-dropdown-item @click="sortByDate">Date</b-dropdown-item>
          </b-dropdown>

          <button class="sugg_btn" @click="suggEvent">
            Suggest Event
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

  /*.container {
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
  }*/

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
  }
  /*.Carousel {
    grid-area: Carousel;
    align-items: center;
    justify-content: center;
    display: flex;
  }*/

  .Carousel {
    display: flex;
    flex: 2;
    width: 100%;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 0;
  }

  .Footer {
    display: flex;
    flex-direction: row;
    flex: 0.5;
    width: 100%;
    align-items: center;
    justify-content: center;
    padding: 5px;
  }

  /*.Sort {
    grid-area: Sort;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px
  }*/

  .Sort {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }

  /*.Cards {
    grid-area: Cards;
    display: flex;
    justify-content: center;
    align-items: center;

  }*/

  .Cards {
    display: flex;
    flex: 3;
    flex-direction: row;
    flex-wrap: wrap;
    overflow-x: auto;
    gap: 20px;
    width: 100%;
    justify-content: center;
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
    width: 120px;
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