<script>
import LISTEVENTS from './ListEvents.vue';
import BarChart from './BarChart.vue';

  export default {
    components: {
      BarChart,
      LISTEVENTS
    },
    data() {
      return {
        events: [],
        sugg_events: [],
        prenotations: [],
        arrData: []
      };
    },
    created() {
      this.verifyUserType();
    },
    mounted() {
      this.fetchEvents();
      this.fetchPrenotations();
      this.fetchSuggEvents();
      this.countEventPerMonth();
      console.log(this.arrData);
      console.log(this.events);
    },
    methods: {
      verifyUserType: async function () {
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
          }).then(data => {
            console.log(data);
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
      },
      countEventPerMonth() {
        var arr = Array(12).fill(0);

        if (this.events.length !== 0) {
          this.events.forEach((event) => {
            if (event.date_event) {
              console.log(event.date_event);
              const month = new Date(event.date_event).getMonth();
              arr[month] ++;
            }
          });
        }
        this.arrData = arr;
      },
    }
  };
</script>

<template>

  <div class="container">
    <div class="chart-container">
      <BarChart :data="arrData" />
    </div>

    <!-- Lista eventi -->
    <div class="events-list">
      <LISTEVENTS
          :events="events"
          :prenotations="prenotations"
          :sugg_events="sugg_events" />
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


