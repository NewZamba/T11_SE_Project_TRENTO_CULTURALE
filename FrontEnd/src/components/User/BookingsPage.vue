<script>

  export default {
    name: "BookingsPage",
    data() {
      return {
        bookings: [],
        openEvents: []
      };
    },
    created() {
      this.bookings = this.$route.query.bookings;
    },
    methods: {
      toggleMenu(eventId) {
        const i = this.openEvents.indexOf(eventId);
        if (i > -1) {
          this.openEvents.splice(i, 1);
        } else {
          this.openEvents.push(eventId);
        }
      },
      isEventOpen(eventId) {
        return this.openEvents.includes(eventId);
      },
      backToHome() {
        this.$router.push('/UserHome');
      }
    }
  };

</script>

<template>

  <div class="background">
    <img src="https://images.pexels.com/photos/571169/pexels-photo-571169.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />

    <div class="container">
      <header>
        <button class="backBtn" @click="backToHome">
          <b-icon icon="arrow-left" />
        </button>
      </header>

      <nav class="navbar">
        <div v-for="event in bookings" :key="event._id" class="event-container">
          <div class="ec2">
            <label @click="toggleMenu(event._id)">
              <span>{{ event.name_event }}</span>
            </label>
          </div>

          <ul class="slide" v-show="isEventOpen(event._id)">
            <li><strong><i>Event Date:</i></strong> {{ new Date(event.date_event).toLocaleDateString() }}</li>
            <hr />
            <li><strong><i>Booking Date:</i></strong> {{ new Date(event.date_Prenotation).toLocaleDateString() }}</li>
          </ul>
        </div>
      </nav>

      <footer />
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
    width: 100%;
    height: 100%;
  }

  .background img {
    position: absolute;
    min-width: 100vw;
    max-width: 100vw;
    min-height: 100vh;
    max-height: 100vh;
    object-fit: fill;
    z-index: -1;
  }

  .container {
    padding: 0;
    display: flex;
    flex-direction: column;
    height: 60vh;
    width: 60%;
    justify-content: space-between;
    align-items: center;
    border-radius: 30px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1),
    0px -4px 6px rgba(0, 0, 0, 0.1),
    4px 0px 6px rgba(0, 0, 0, 0.1),
    -4px 0px 6px rgba(0, 0, 0, 0.1);
    background-color: rgb(255, 245, 238);
    z-index: 1;
    position: relative;
  }

  header {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 8%;
    width: 100%;
    margin: 0;
    padding: 2px;
  }

  footer {
    display: flex;
    flex-direction: column;
    height: 8%;
    width: 100%;
  }

  nav {
    background: rgba(104, 85, 224, 1);
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1),
    0px -4px 6px rgba(0, 0, 0, 0.1),
    4px 0px 6px rgba(0, 0, 0, 0.1),
    -4px 0px 6px rgba(0, 0, 0, 0.1);
  }

  .event-container {
    margin: 0;
    padding: 0;
    font-family: "Roboto Light", sans-serif;
    width: 100%;
  }

  .navbar {
    height: 100%;
    overflow-y: scroll;
    border: none;
    scroll-behavior: smooth;
    gap: 0;
  }

  .ec2 {
    display: flex;
    height: 100%;
    width: 100%;
    margin: 0;
    align-items: center;
    justify-items: flex-start;
    border: 2px solid rgba(255, 245, 238);
  }

  span {
    padding: 20px;
    background: rgba(104, 85, 224, 1);
    color: rgba(255, 245, 238);
    font-size: 1.2em;
    font-variant: small-caps;
    cursor: pointer;
    display: block;
  }

  .slide {
    clear: both;
    width: 100%;
    overflow: hidden;
    text-align: left;
    background: rgba(255, 245, 238);
    list-style: none;
    margin: 0;
    padding: 10px;
    border: 1px solid  rgba(255, 245, 238);
    font-family: "Roboto Light", sans-serif;
  }

  .slide li {
    padding: 8px 0;
    color: #2d2f31;
  }

  hr {
    border: none;
    height: 2px;
    width: 95%;
    align-self: center;
    background-color: rgb(104, 85, 224);
  }

  button {
    cursor: pointer;
    border: 0;
    border-radius: 4px;
    font-weight: 600;
    margin: 0 10px;
    width: 15%;
    padding: 10px;
    box-shadow: 0 0 20px rgba(115, 99, 238, 0.2);
    transition: 0.4s;
  }

  .backBtn {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: solid 1px rgba(104, 85, 224, 1);
    background-color: rgba(104, 85, 224, 1);
    color: whitesmoke;
    font-family: "Roboto Light";
    font-size: 1.2em;
  }

  button:hover {
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1),
    0px -4px 6px rgba(0, 0, 0, 0.1),
    4px 0px 6px rgba(0, 0, 0, 0.1),
    -4px 0px 6px rgba(0, 0, 0, 0.1);
    transform: scale(1.1);
  }

</style>