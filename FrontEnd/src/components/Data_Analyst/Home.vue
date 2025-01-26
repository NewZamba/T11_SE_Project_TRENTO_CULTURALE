<script>
import LISTEVENTS from './ListEvents.vue'

  export default {
    components: {
      LISTEVENTS
    },
    data() {
      return {
        events: [],
        prenotations: [],
        sugg_events: []
      };
    },
    created() {
      this.verifyUserType();
    },
    mounted() {
      this.fetchEvents();
      this.fetchPrenotations();
      this.fetchSuggEvents();
      },
    methods: {
      verifyUserType() {
        fetch('http://localhost:3000/verificaUserType/data-analyst-home', {
          method: 'GET',
          credentials: 'include'
        }).then(response => {
          if (!response.ok) {
            throw new Error('User non loggato');
          }
          return response.json()
        }).then(data => {
          if (data.type_user !== 2) {
            throw new Error('User non autorizzato');
          }
        })
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
      },
      fetchPrenotations() {
        try {
          fetch('http://localhost:3000/prenotations', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          }).then(response => {
            if (!response.ok) {
              throw new Error('Error fetching prenotations');
            }
            return response.json();
          }).then(data => {
            this.prenotations = data;
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
              'Content-Type': 'application/json',
            }
          }).then(response => {
            if (!response.ok) {
              throw new Error('Error fetching suggested events');
            }
            return response.json();
          }).then(data => {
            this.sugg_events = data;
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

    <!-- Grafico -->
    <div class="chart-container">
    </div>

    <div class="events-list">
      <LISTEVENTS v-if="events" :events="events" :prenotations="prenotations" :sugg_events="sugg_events"/>
      <p v-else>Nessun evento trovato.</p>
    </div>

  </div>

</template>

<style scoped>

  .container {
    font-family: Arial, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: 100vh;
    padding: 20px;
    box-sizing: border-box;
  }

  .chart-container {
    width: 80%;
    max-width: 1000px;
    margin-bottom: 30px;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    height: 400px;
  }

  .events-list {
    width: 80%;
    max-width: 1000px;
    margin-top: 20px;
  }

  p {
    text-align: center;
    font-size: 16px;
    color: #555;
  }

</style>