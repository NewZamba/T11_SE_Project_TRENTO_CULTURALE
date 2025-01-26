<script>
import DETAILS_IMG from './Details_Img.vue';
import DESCRIPTION from './Description.vue';
import Cookie from 'js-cookie';
import data from "bootstrap/js/src/dom/data.js";

  export default {
    name: 'EventPage',
    components: {
      DETAILS_IMG,
      DESCRIPTION
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
        guests: 0,
        id_user: null
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
      this.guests = this.$route.query.guests_event;
    },
    methods: {
      backToHome() {
        this.$router.push('/UserHome');
      },
      subscribe() {
        try {
          this.id_user = Cookie.get('id_user');

          fetch('http://localhost:3000/addBooking', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id_user: this.id_user,
              id_event: this._id,
              date_Prenotation: new Date(this.date_event).toISOString(),
              guests_event: this.guests,
            }),
          }).then(res => {
            if (res.ok) {
              alert('Subscribed at ' + this.name_event + '!');
            } else if (res.status === 405) {
              alert('Max partecipanti');
            } else {
              alert(res.statusText);
            }
          });
        } catch (err) {
          alert(err);
        }
      },
      showComment() {
        this.$router.push({
          path: `/Comment`,
          query: {
            id_event : this._id,
          }
        });
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
      <DETAILS_IMG />
      <DESCRIPTION />
    </div>

    <footer class="footerEP">
      <button class="subscribe_btn" @click="subscribe">
        Subscribe
      </button>
      <button class="subscribe_btn" @click="showComment">
        Comment
      </button>
    </footer>

  </div>

</template>

<style scoped>

  .event-page {
    display: flex;
    flex-direction: column;
    width: 45%;
    height: 80%;
    border-radius: 20px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1),
                0px -4px 6px rgba(0, 0, 0, 0.05),
                4px 0px 6px rgba(0, 0, 0, 0.05),
                -4px 0px 6px rgba(0, 0, 0, 0.05);
    margin: auto auto;
    background-color: azure;
  }

  .event {
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: #84d0d0;
    color: white;
    font-family: 'Helvetica', sans-serif;
    font-size: larger;

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

</style>