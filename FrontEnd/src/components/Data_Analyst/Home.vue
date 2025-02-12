<script>
import LISTEVENTS from './ListEvents.vue';
import BarChartTemplate from './BarChartTemplate.vue';
import _ from 'lodash';
import Cookie from "js-cookie";
import { EventBus } from '../../eventBus.js';


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
        expDataG1: [],
        num_prenotations: [],
        eventsLoaded: false,
        suggLoaded: false,
        prenotationsLoaded: false,
        numPrenotationsLoaded: false
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
          const response = await fetch('http://https://t11-se-project-trento-culturale.onrender.com//verificaUserType/is_data_analyst', {
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
          this.showModal();
          await this.$router.push('/');
        }
      },
      async fetchEvents() {
        try {
          const response = await fetch('http://https://t11-se-project-trento-culturale.onrender.com//events/get', {
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
        fetch('http://https://t11-se-project-trento-culturale.onrender.com//bookings/get', {
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
        fetch('http://https://t11-se-project-trento-culturale.onrender.com//suggEvents/get', {
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
        const months = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
        const arr = Array(12).fill(0);
        const stackArr = _.map(_.range(12), (i) => ({
          month: months[i],
          events: []
        }));

        if (this.events.length !== 0) {
          this.events.forEach((event) => {
            const month = new Date(event.date_event).getMonth();

            arr[month] += 1;

            stackArr[month].events.push(event.name_event);
          });

          this.arrData = arr;
          this.expDataG1 = stackArr;
        }
      },
      async countPrenotations(id, i) {
        try {
          const response = await fetch(`http://https://t11-se-project-trento-culturale.onrender.com//bookings?id=${id}`, {
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
      downloadJSON(data, labels, x) {
        switch (x) {
          case 1:
            const jsonData1 = JSON.stringify(this.expDataG1, null, 1);
            const blob1 = new Blob([jsonData1], { type: "application/json" });
            const downloadUrl1 = URL.createObjectURL(blob1);
            const link1 = document.createElement("a");

            link1.href = downloadUrl1;
            link1.download = "data.json";
            link1.click();

            break;
          case 2:
            const json = labels.map((label, index) => ({
              labels_asse_x: label,
              values_x_y: data[index]
            }));

            const jsonData2 = JSON.stringify(json, null, 2);
            const blob2 = new Blob([jsonData2], { type: "application/json" });
            const downloadUrl2 = URL.createObjectURL(blob2);
            const link2 = document.createElement("a");

            link2.href = downloadUrl2;
            link2.download = "data.json";
            link2.click();

            break;
          default: break;
        }
      },
      showModal(mess) {
        EventBus.$emit('open-global-modal', {
          title: '⚠️Attenzione⚠️',
          message: 'Non si dispone dei diritti necessari per accedere a questa pagina',
        });
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
                  @click="downloadJSON(arrData, ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], 1)">
            scarica dati
          </button>
        </div>

        <div class="chart-container" v-if="numPrenotationsLoaded && eventsLoaded">
          <BarChart :data="num_prenotations"
                    :labels="events.map(event => event.name_event)"
                    :titles="title2"
                    v-if="numPrenotationsLoaded && eventsLoaded"/>
          <button class="export"
                  @click="downloadJSON(num_prenotations, events.map(event => event.name_event), 2)">
            scarica dati
          </button>
        </div>
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
    height: 100%;

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
    flex-direction: row;
    flex-wrap: wrap;
    height: 90%;
    width: 90%;

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
    background-color:  rgb(255, 245, 238);
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
    background-color: rgb(255, 245, 238);
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
    background-color:  rgb(255, 245, 238);
    border: 1px solid rgba(104, 85, 224, 1);
    justify-self: center;
  }

  .export:hover {
    color:  rgb(255, 245, 238);
    box-shadow: 0 0 40px rgba(104, 85, 224, 0.6);
    background-color: rgba(104, 85, 224, 1);
  }

</style>


