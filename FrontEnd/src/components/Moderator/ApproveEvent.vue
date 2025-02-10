<script>
import {EventBus} from "../../eventBus.js";

export default {
  name: 'ApproveEvent',
  data() {
    return {
      events: [],
      openEvents: [],
      location: ''
    };
  },
  mounted() {
    this.fetchSuggEvents();
  },
  methods: {
    showModal(mess) {
      EventBus.$emit('open-global-modal', {
        title: '⚠️Attenzione⚠️',
        message: mess,
      });
    },
    async fetchSuggEvents() {
      try {
        const response = await fetch('http://localhost:3000/suggEvents', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error('Error fetching events');
        }

        this.events = await response.json();
      } catch (err) {
        this.showModal(err.message);
      }
    },
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
    async approveEvent(event) {
      try {
        if (!this.location) {
          alert("Please enter a location for the event");
          return;
        }

        const response = await fetch('http://localhost:3000/convertEvent/sug-to-off', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            suggEventId: event._id,
            location_event: this.location
          })
        });

        if (!response.ok) {
          throw new Error('Error approving event');
        }

        alert('Event approved successfully!');
        // Remove the event from the list and close the collapse
        this.events = this.events.filter(e => e._id !== event._id);
        this.openEvents = this.openEvents.filter(id => id !== event._id);
        // Reset location
        this.location = '';
      } catch (err) {
        this.showModal(err.message);
      }
    },
    backToHome() {
      this.$router.push('/ModeratorHome');
    }
  }
};
</script>

<template>
  <div class="background">
    <img src="https://images.pexels.com/photos/571169/pexels-photo-571169.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />

    <div class="container">
      <nav class="navbar">
        <div
            v-for="event in events"
            :key="event._id"
            class="event-container"
            v-if="events.length > 0"
        >
          <div class="ec2">
            <b-button variant="link" @click="toggleMenu(event._id)">
              <span>{{ event.name_event }}</span>
            </b-button>
          </div>

          <b-collapse :visible="isEventOpen(event._id)" class="slide">
            <b-form @submit.prevent="approveEvent(event)">
              <b-form-group label="Event Location:" label-for="location">
                <b-form-input
                    id="location"
                    v-model="location"
                    placeholder="Enter event location"
                    required
                ></b-form-input>
              </b-form-group>
              <div class="event-details">
                <p><strong>Date:</strong> {{ new Date(event.date_event).toLocaleDateString() }}</p>
                <p><strong>Description:</strong> {{ event.description_event }}</p>
              </div>
              <b-button type="submit" class="approveBtn">
                Approve Event
              </b-button>
            </b-form>
          </b-collapse>
        </div>
      </nav>

      <footer></footer>
    </div>
  </div>
</template>

<style scoped>
background {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  min-height: 100vh;
}

.background img {
  position: absolute;
  width: 100%;
  object-fit: fill;
  z-index: -1;
  min-width: 100%;
  max-width: 100%;
  min-height: 100%;
}

.container {
  padding: 0;
  display: flex;
  flex-direction: column;
  width: 70%;
  min-height: 60vh;
  justify-content: center;
  align-items: flex-start;
  border-radius: 30px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1),
  0px -4px 6px rgba(0, 0, 0, 0.1),
  4px 0px 6px rgba(0, 0, 0, 0.1),
  -4px 0px 6px rgba(0, 0, 0, 0.1);
  background-color: rgb(255, 245, 238);
  z-index: 1;
}

.event-details {
  margin: 15px 0;
  padding: 10px;
  background-color: rgba(104, 85, 224, 0.1);
  border-radius: 5px;
}

.event-list {
  width: 100%;
  height: 100%;
  padding: 20px;
}

.navbar {
  height: 90%;
  overflow-y: auto;
  border: none;
  padding: 2px;
  scroll-behavior: smooth;
  background: rgba(104, 85, 224, 1);
  border-radius: 10px;
}

.event-container {
  margin: 0;
  font-family: "Roboto Light", sans-serif;
  width: 100%;
  justify-content: space-between;
}

.ec2 {
  display: flex;
  height: 100%;
  width: 100%;
  margin: 0;
  align-items: center;
  justify-content: space-between;
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
  border: 1px solid rgba(255, 245, 238);
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

.approveBtn {
  height: 10%;
  color: rgb(104, 85, 224);
  background-color: rgba(255, 255, 255, 1);
  border: 1px solid rgba(104, 85, 224, 1);
  margin-top: 10px;
}

.approveBtn:hover {
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1),
  0px -4px 6px rgba(0, 0, 0, 0.1),
  4px 0px 6px rgba(0, 0, 0, 0.1),
  -4px 0px 6px rgba(0, 0, 0, 0.1);
  transform: scale(1.1);
}
</style>