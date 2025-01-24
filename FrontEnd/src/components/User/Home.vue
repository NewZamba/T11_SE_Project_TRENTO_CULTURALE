<script>
import CAROUSEL from './Carousel.vue';
import CARDS from './Cards.vue';
import {RouterLink} from "vue-router";

  export default {
    name: 'UserHome',
    components: {
      CAROUSEL,
      CARDS
    },
    data() {
      return {
        events: []
      };
    },
    created() {
      this.verifyUserType();
    },
    mounted() {
      console.log('Component mounted.');
      this.fetchEvents();
      console.log(this.events);
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
          // Assuming 'user' is the key in the response object
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
          });
        } catch (err) {
          alert(err.message);
        }
      }
    }
  };

</script>

<template>

  <div class="container">
    <div class="Carousel">
      <CAROUSEL :events="events" class="Carousel" />
    </div>
    <div class="CARDS">
      <CARDS :events="events" class="CARDS"  />
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
      grid-template-rows: 1fr 1fr;
      grid-template-areas:
      "Carousel Carousel"
      "CARDS CARDS";
      gap: 30px 30px;
    }

    .Carousel {
      grid-area: Carousel;
      align-items: center;
      justify-content: center;
      display: flex;
    }

    .CARDS {
      grid-area: CARDS;
      display: flex;
      justify-content: center;
      align-items: center;
    }

</style>