<script>
import LISTEVENTS from './ListEvents.vue';
import BarChartEventiProposti from './BarChartEventiProposti.vue';

  export default {
    components: {
      BarChart: BarChartEventiProposti,
      LISTEVENTS
    },
    data() {
      return {
        events: [],
        sugg_events: [],
        prenotations: [],
        arrData: [],
        eventsLoaded: false,
        suggLoaded: false,
        prenotationsLoaded: false
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
            this.countEventPerMonth();
            this.eventsLoaded = true;
        }).catch(err => {
            alert(`Error: ${err.message}`);
        });
      },
      fetchPrenotations() {
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
          this.prenotationsLoaded = true;
        }).catch(err => {
          alert(err.message);
        });
      },
      fetchSuggEvents() {
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
          this.suggLoaded = true;
        }).catch(err => {
          alert(err.message);
        });
      },
      countEventPerMonth() {
        const arr = Array(12).fill(0);

        if (this.events.length !== 0) {
          this.events.forEach(event => {
            if (event.date_event) {
              const month = new Date(event.date_event).getMonth();
              arr[month] += 1;
            }
          });
          this.arrData = arr;
        }
      }
    }
  };

</script>

<template>

  <div class="container">
    <div class="chart-container" v-if="eventsLoaded">
      <BarChart :data="arrData" />
    </div>

    <!-- Lista eventi -->
    <div class="events-list">
      <LISTEVENTS
          :events="events"
          :prenotations="prenotations"
          :sugg_events="sugg_events"
          v-if="suggLoaded && eventsLoaded && prenotationsLoaded"/>
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
    min-height: 100vh;
    padding: 10px;
    box-sizing: border-box;
    gap: 20px;
  }

  .chart-container {
    width: 100%;
    max-width: 1000px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
  }

  .events-list {
    width: 100%;
    max-width: 1000px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    box-sizing: border-box;
    min-height: 300px;
    max-height: 400px;
    overflow-y: auto;
  }

  p {
    text-align: center;
    font-size: 16px;
    color: #555;
  }

</style>


