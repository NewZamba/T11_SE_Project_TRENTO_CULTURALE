<script>
import LISTEVENTS from './ListEvents.vue';
import BarChartTemplate from './BarChartTemplate.vue';
import {values} from "lodash";

  export default {
    components: {
      BarChart: BarChartTemplate,
      LISTEVENTS
    },
    data() {
      return {
        titile1: 'Eventi nel Tempo',
        title2: 'Numero Prenotazioni Eventi',
        events: [],
        sugg_events: [],
        prenotations: [],
        arrData: [],
        num_prenotations: [],
        eventsLoaded: false,
        suggLoaded: false,
        prenotationsLoaded: false,
        numPrenotationsLoaded: false
      };
    },
    props: {
      x: this.$router.query.x,
      y: this.$router.query.y
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
        } catch (error) {
          // Display the error message in case of issues
          alert(`Error: ${error.message}`);
        }
      },
      async fetchEvents() {
        try {
          const response = await fetch('http://localhost:3000/events', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          });

          if (!response.ok) {
            throw new Error('Error fetching events');
          }

          const data = await response.json();
          this.events = data;
          this.countEventPerMonth();
          this.eventsLoaded = true;

          this.num_prenotations = new Array(this.events.length).fill(0);

          await Promise.all(this.events.map((event, i) => this.countPrenotations(event._id, i)));

          this.numPrenotationsLoaded = true;
        } catch (err) {
          alert(`Error: ${err.message}`);
        }
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
      },
      async countPrenotations(id, i) {
        try {
          const response = await fetch(`http://localhost:3000/addBooking?id=${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          });

          if (!response.ok) {
            throw new Error(response.statusText);
          }

          const data = await response.json();
          this.$set(this.num_prenotations, i, data);
        } catch (error) {
          console.log(error);
        }
      },
      downloadJSON(data, labels) {
        const json = labels.map((label, index) => ({
          labels_asse_x: label,
          values_x_y: data[index]
        }));

        const jsonData = JSON.stringify(json, null, 2);
        const blob = new Blob([jsonData], { type: "application/json" });
        const downloadUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = "data.json";
        link.click();
      },
      goCreategraphic() {
        this.$router.push('/CreateGraphic');
      }
    }
  };

</script>

<template>

  <div class="background">
    <img src="https://images.pexels.com/photos/571169/pexels-photo-571169.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />

    <div class="container">
      <div class="charts-container">
        <div class="chart-container" v-if="eventsLoaded">
          <BarChart :data="arrData"
                    :labels="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']"
                    :titles="titile1"
                    v-if="eventsLoaded"/>
          <button class="export"
                  @click="downloadJSON(arrData, ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'])">
            data.json
          </button>
        </div>

        <div class="chart-container" v-if="numPrenotationsLoaded && eventsLoaded">
          <BarChart :data="num_prenotations"
                    :labels="events.map(event => event.name_event)"
                    :titles="title2"
                    v-if="numPrenotationsLoaded && eventsLoaded"/>
          <button class="export"
                  @click="downloadJSON(num_prenotations, events.map(event => event.name_event))">
            data.json
          </button>
        </div>

        <button class="createGraphic" @click="goCreategraphic">
          Create Graphic
        </button>
      </div>

      <div class="events-list">
        <LISTEVENTS
            :events="events"
            :prenotations="prenotations"
            :sugg_events="sugg_events"
            v-if="suggLoaded && eventsLoaded && prenotationsLoaded"/>
      </div>
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
    object-fit: cover;
    z-index: -1;
    min-width: 100%;
    max-width: 100%;
    min-height: 100%;
    max-height: 100%;
  }

  .container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
    z-index: 1;
  }

  .charts-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 15px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1),
    0px -4px 6px rgba(0, 0, 0, 0.1),
    4px 0px 6px rgba(0, 0, 0, 0.1),
    -4px 0px 6px rgba(0, 0, 0, 0.1);
    gap: 5px;
  }

  .chart-container {
    display: flex;
    justify-content: space-between;
    border-radius: 8px;
    text-align: center;
    width: 100%;
    height: 300px;
    align-items: center;
    border: 1px solid #ddd;
    margin: 0;
    padding: 0;
    gap: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .events-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    min-height: 300px;
    max-height: 400px;
    overflow-y: auto;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 15px;
  }

  p {
    text-align: center;
    font-size: 16px;
    color: #555;
  }

  button {
    cursor: pointer;
    border: 0;
    border-radius: 4px;
    font-weight: 600;
    margin: 0 10px;
    width: 200px;
    padding: 10px 0;
    box-shadow: 0 0 20px rgba(115, 99, 238, 0.2);
    transition: 0.4s;
  }

  .export {
    color: rgb(104, 85, 224);
    background-color: rgba(255, 255, 255, 1);
    border: 1px solid rgba(104, 85, 224, 1);
    justify-self: center;
  }

  .export:hover {
    color: white;
    box-shadow: 0 0 40px rgba(104, 85, 224, 0.6);
    background-color: rgba(104, 85, 224, 1);
  }

  .createGraphic {
    color: rgba(255, 255, 255, 1);
    background-color: rgb(104, 85, 224);
    border: 1px solid rgba(255, 255, 255, 1);
    justify-self: center;
  }

  .createGraphic:hover {
    color: white;
    box-shadow: 0 0 40px rgba(104, 85, 224, 0.6);
    background-color: rgba(104, 85, 224, 1);
    transform: scale(1.1);
  }


</style>


