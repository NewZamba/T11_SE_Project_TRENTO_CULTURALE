<script>
import BTN_LOGIN from './Login/Login.vue';
import { EventBus } from './eventBus.js';

  export default {
    name: 'EventPage',
    components: {
      BTN_LOGIN
    },
    data() {
      return {
        _id: null,
        name_event: '',
        img_event: '',
        description_event: '',
        location_event: '',
        date_event: null,
        tags: 0,
        user: {}
      };
    },
    mounted() {
      this._id = this.$route.query._id;
      this.name_event = this.$route.query.name_event;
      this.img_event = this.$route.query.img_event;
      this.description_event = this.$route.query.description_event;
      this.location_event = this.$route.query.location_event;
      this.date_event = this.$route.query.date_event;
      this.tags = this.$route.query.tags;
    },
    methods: {
      backToHome() {
        this.$router.push('/UserHome');
      },
      subscribe() {
        try {

          this.user = {};

          fetch('http://localhost:3000/addBooking', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id_user: this.user._id,
              id_event: this._id,
              date_Prenotation: new Date().toISOString()
            }),
          }).then(res => {
            if (res.ok) {
              alert('Subscribed at ${this.name_event}!');
            } else {
              alert('Subscription failed!');
            }
          }).catch(err => {
            alert(err);
          });
        } catch (err) {
          alert(err);
        }
      }
    }
  };

</script>

<template>

  <div class="event-page">

    <header class="headerEP">
      <button class="back_btn" @click="backToHome">
        X
      </button>
    </header>

    <div class="event">
      <div class="details_img">
        <div class="details">
          <div class="info">NAME: {{ name_event }}</div>
          <div class="info">TAG: {{ tags }}</div>
          <div class="info">DATE: {{ date_event }}</div>
          <div class="info">LOCATION: {{ location_event }}</div>
        </div>
        <div class="img">
          ciao
        </div>
      </div>
      <div class="description">
        DESCRIPTION:
        <p>{{ description_event }}</p>
      </div>

    </div>

    <footer class="footerEP">
      <button class="subscribe_btn" @click="subscribe">
        Subscribe
      </button>
    </footer>

  </div>

</template>

<style scoped>

  .event-page {
    display: flex;
    flex-direction: column;
    width: 40%;
    height: 80%;
    border-radius: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    margin: auto auto;
    background-color: azure;
  }

  .event {
    background-color: #4cafa0;
  }

  .headerEP {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 5px;
  }

  .footerEP {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 7px;
  }

  .back_btn {
    width: 45px;
    height: 45px;
    border: none;
    border-radius: 50%;
    background-color: #4cafa0;
    color: white;
    font-size: x-large;
    font-family: 'Helvetica', sans-serif;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s;
  }

  .back_btn:hover {
    transform: scale(1.1);
  }

  .subscribe_btn {
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

  .subscribe_btn:hover {
    transform: scale(1.1);
  }


  .details_img {
    display: flex;
    flex-direction: row;
    flex: 1;
  }

  .details {
    justify-content: left;
    align-items: center;
  }

  .img {
    align-items: center;
    justify-content: center;
  }

  .description {

  }

  .info {
    border-radius: 30px;
    text-align: center;
    padding: 5px;
  }

</style>