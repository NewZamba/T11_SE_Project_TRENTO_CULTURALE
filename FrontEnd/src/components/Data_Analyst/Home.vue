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

      console.log('events' + this.events);
      console.log('prenotations' + this.prenotations);
      console.log('sugg_events' + this.sugg_events);
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

    <!--Lista eventi con nome-->
    <LISTEVENTS :events="events" :prenotations="prenotations" :sugg_events="sugg_events"/>

  </div>

</template>

<style scoped>

</style>