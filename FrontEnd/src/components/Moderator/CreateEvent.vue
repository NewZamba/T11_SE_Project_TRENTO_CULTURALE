<script>
// import user from "@/components/Login/user.vue";

export default {
  name: 'CreateEventPage',
  data() {
    return {
      name_event: '',
      img_event: '',
      description_event: '',
      location_event: '',
      date_event: '',
      tags: '',
      user: {}
    };
  },
  methods: {
    async createEvent() {
      // console.log(user._id)
      // console.log(user.email_user)
      try {
        // this.user = cookie.get('User');

        const response = await fetch('http://localhost:3000/addEvent', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name_event: this.name_event,
            img_event: this.img_event,
            description_event: this.description_event,
            location_event: this.location_event,
            date_event: this.date_event,
            tags: this.tags,
            // created_by: this.user
          }),
        });

        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.message || 'Errore nel Backend');
        }

      } catch (error) {
        alert(error);
      }
    }
  }
};
</script>

<template>
  <div class="event-page">
    <div class="event">
      <input v-model="name_event" placeholder="Event Name" />
      <input v-model="img_event" placeholder="Image URL" />
      <textarea v-model="description_event" placeholder="Event Description"></textarea>
      <input v-model="location_event" placeholder="Location" />
      <input type="date" v-model="date_event" />
      <input v-model="tags" placeholder="Tags" />
    </div>

    <footer class="footerEP">
      <button class="subscribe_btn" @click="createEvent">Create Event</button>
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
  padding: 20px;
}

.event {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #84d0d0;
  color: white;
  font-family: 'Helvetica', sans-serif;
  font-size: larger;
  padding: 20px;
}

input, textarea {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
</style>
