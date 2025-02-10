<script>
import DESCRIPTION from './Description.vue';
import Cookies from 'js-cookie';
import CommentSection from "../Comment/CommentSection.vue";

  export default {
    name: 'EventPage',
    components: {
      CommentSection,
      DESCRIPTION,
    },
    data() {
      return {
        id_event : null,
        _id: null,
        name_event: '',
        img_event: '',
        description_event: '',
        location_event: '',
        date_event: null,
        tags: [],
        tagDetails: [],
        guests: 0,
        user: {}
      };
    },
    async created() {
      this._id = this.$route.query._id;
      this.id_event = this._id;
      this.name_event = this.$route.query.name_event;
      this.img_event = this.$route.query.img_event;
      this.description_event = this.$route.query.description_event;
      this.location_event = this.$route.query.location_event;
      this.date_event = this.$route.query.date_event;
      this.guests = this.$route.query.guests_event;
      this.tags = JSON.parse(this.$route.query.tags);
      await this.fetchTagDetails();
    },
    methods: {
      async fetchTagDetails() {
        try {
          const response = await fetch('http://localhost:3000/tags');
          const allTags = await response.json();
          // Filter to get only the tags that belong to this event
          this.tagDetails = allTags.filter(tag => this.tags.includes(tag._id));
        } catch (error) {
          console.error('Error fetching tag details:', error);
        }
      },
      backToHome() {
        this.$router.push('/UserHome');
      },
      subscribe() {
        try {
          this.user = Cookies.get('id_user');

          fetch('http://localhost:3000/addBooking', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id_user: this.user,
              id_event: this._id,
              name_event: this.name_event,
              date_Prenotation: new Date().toISOString(),
              date_event: this.date_event,
              form: false,
              guests_event: this.guests
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

  <div class="background">
    <div class="container">
      <div class="imgEvent">
        <img :src="img_event" alt="Event Image" />
      </div>

      <div class="infoEvent">
        <div class="details">
          <p class="info1">Name:</p>
          <p class="info2">{{ name_event }}</p>
          <hr class="hr_info"/>
          <p class="info1">Tag:</p>
          <p class="info2">
            {{ tagDetails.map(tag => tag.name_tag).join(', ') }}
          </p>
          <hr class="hr_info"/>
          <p class="info1">Date:</p>
          <p class="info2">{{ new Date(date_event).toLocaleString() }}</p>
          <hr class="hr_info"/>
          <p class="info1">Location:</p>
          <p class="info2">{{ location_event }}</p>
        </div>

        <div class="description">
          <DESCRIPTION />

          <hr class="hr_desc"/>

          <div class="btns">
            <button class="subscribe_btn" @click="subscribe">
              Subscribe
            </button>

            <button class="subscribe_btn" @click="showComment">
              Comments
            </button>

            <button class="back_btn" @click="backToHome">
              <b-icon icon="arrow-left"/>
            </button>
          </div>
        </div>
      </div>
      <CommentSection :id_event="id_event"/>
    </div>
  </div>

</template>

<style scoped>

  /*.event-page {
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
    background-color: rgba(104, 85, 224, 1);
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
  } */

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

  .container {
    display: flex;
    flex-direction: column;
    height: 85%;
    width: 85%;
    border: 3px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1),
                0px -4px 6px rgba(0, 0, 0, 0.1),
                4px 0px 6px rgba(0, 0, 0, 0.1),
                -4px 0px 6px rgba(0, 0, 0, 0.1);
    background-color: rgba(0, 0, 0, 0.45);
    z-index: 1;
    padding: 0;
    margin: 0;
  }

  .imgEvent {
    display: flex;
    flex: 1;
  }

  .imgEvent img {
    position: absolute;
    object-fit: cover;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  .hr_info {
    border: none;
    height: 1.5px;
    width: 95%;
    align-self: center;
    background-color: rgb(255, 245, 238);
  }

  .hr_desc {
    border: none;
    height: 1.5px;
    width: 95%;
    align-self: center;
    background-color: black;
  }

  .infoEvent {
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    background: rgba(104, 85, 224, 1);
    border-radius: 15px;
  }

  .btns {
    display: flex;
    flex-direction: row;
    flex: 1;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 0;
    margin: 0;
  }

  .details {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: left;
    padding: 3%;
  }

  .info1 {
    font-size: 25px;
    font-family: 'Roboto Light', sans-serif;
    font-style: italic;
    color: rgb(255, 245, 238);
    text-align: left;
    padding: 2px;
  }

  .info2 {
    font-size: 25px;
    font-family: 'Roboto Light', sans-serif;
    color: rgb(255, 245, 238);
    text-align: left;
    padding: 2px;
  }

  .description {
    display: flex;
    flex: 2;
    flex-direction: column;
    background-color: rgb(255, 245, 238);
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
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

  .back_btn {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 1px solid rgba(104, 85, 224, 1);
    background-color: rgba(104, 85, 224, 1);
    color: rgb(255, 245, 238);
    font-size: xx-large;
    font-family: 'Roboto Light';
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s;
  }

  .subscribe_btn {
    width: 120px;
    height: 60px;
    border-radius: 30px;
    border: 1px solid rgba(104, 85, 224, 1);
    background-color: rgba(104, 85, 224, 1);
    color: rgb(255, 245, 238);
    font-size: large;
    font-family: 'Roboto Light', sans-serif;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s;
  }

  .back_btn:hover, .subscribe_btn:hover {
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1),
                0px -4px 6px rgba(0, 0, 0, 0.1),
                4px 0px 6px rgba(0, 0, 0, 0.1),
                -4px 0px 6px rgba(0, 0, 0, 0.1);
    background-color: rgba(104, 85, 224, 1);
    transform: scale(1.1);
  }

</style>