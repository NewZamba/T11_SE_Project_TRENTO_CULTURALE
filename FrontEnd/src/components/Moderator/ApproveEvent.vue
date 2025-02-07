<script>
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
        alert(err.message);
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
    async approveEvent(eventId) {
      try {
        // Prompt for location
        const location = prompt("Please enter the event location:");
        if (!location) return; // User cancelled or empty input

        const response = await fetch('http://localhost:3000/convertEvent/sug-to-off', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            suggEventId: eventId,
            location_event: location
          })
        });

        if (!response.ok) {
          throw new Error('Error approving event');
        }

        alert('Event approved successfully!');
        // Refresh the events list
        await this.fetchSuggEvents();
      } catch (err) {
        alert(err.message);
      }
    }
  }
};
</script>

<template>
  <div class="event-list">
    <nav class="navbar">
      <div v-for="event in events" :key="event._id" class="event-container">
        <div class="ec2">
          <label @click="toggleMenu(event._id)">
            <span>{{ event.name_event }}</span>
          </label>

          <button @click="approveEvent(event._id)" class="approveBtn">
            Approve
          </button>
        </div>

        <ul class="slide" v-show="isEventOpen(event._id)">
          <li><strong><i>Date:</i></strong> {{ event.date_event }}</li>
          <hr />
          <li><strong><i>Description:</i></strong> {{ event.description_event }}</li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<style scoped>
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
  cursor: pointer;
  border: 0;
  border-radius: 4px;
  font-weight: 600;
  margin: 0 10px;
  width: 15%;
  padding: 10px;
  color: rgb(104, 85, 224);
  background-color: rgba(255, 255, 255, 1);
  border: 1px solid rgba(104, 85, 224, 1);
  transition: 0.4s;
}

.approveBtn:hover {
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1),
  0px -4px 6px rgba(0, 0, 0, 0.1),
  4px 0px 6px rgba(0, 0, 0, 0.1),
  -4px 0px 6px rgba(0, 0, 0, 0.1);
  transform: scale(1.1);
}
</style>