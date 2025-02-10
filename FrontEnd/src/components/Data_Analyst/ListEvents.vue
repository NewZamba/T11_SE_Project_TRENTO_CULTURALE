<script>

  export default {
    name: 'ListEvents',
    components: {},
    data() {
      return {
        t_event: null,
        graphicOn: false,
        formEvent: []
      };
    },
    props: {
      events: {
        type: Array,
        required: true
      },
      prenotations: {
        type: Array,
        required: true
      },
      sugg_events: {
        type: Array,
        required: true
      }
    },
    methods: {
      showDetails(event) {
        this.t_event = event;
      },
      async fetchForm(id) {
        try {
          const response = await fetch(`http://localhost:3000/addForm?id_event=${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id: id
            })
          });

          if (!response.ok) {
            alert(response.statusText || "Error fetching form");
            return;
          }

          const data = await response.json();
          this.formEvent = data;

        } catch (error) {
          console.error("Fetch error:", error);
        }
      },
      async downloadJSON(label, id) {
        await this.fetchForm(id);

        if(this.formEvent.length > 0) {
          // Format feedback data
          const feedbackData = this.formEvent.map(form => ({
            user_id: form.id_user,
            feedback: form.feedback
          }));

          const json = {
            event_name: label,
            feedback: feedbackData
          };

          const jsonData = JSON.stringify(json, null, 2);
          const blob = new Blob([jsonData], { type: "application/json" });
          const downloadUrl = URL.createObjectURL(blob);
          const link = document.createElement("a");

          link.href = downloadUrl;
          link.download = `feedback_${label}.json`;  // More descriptive filename
          link.click();

          // Cleanup
          URL.revokeObjectURL(downloadUrl);
        } else {
          alert ('No feedback data available for this event!');
        }
      }
    }
  };

</script>

<template>

  <div class="container">
    <div class="left-column">
      <button
          v-for="event in events"
          :key="event._id"
          :title="event.name_event"
          @click="showDetails(event)"
          class="btn_event">
        <span> {{ event.name_event }} </span>
      </button>
    </div>

    <div class="right-column">
      <div class="nothing" v-if="t_event === null">
        <p> Nessun evento selezionato </p>
      </div>

      <div v-else class="graphics">
        <div class="info">
          <p class="p1">Name:</p>
          <p class="p2">{{ t_event.name_event }} </p>
          <hr />
          <p class="p1">Location: </p>
          <p class="p2">{{ t_event.location_event }} </p>
          <hr />
          <p class="p1">Date:</p>
          <p class="p2">{{ t_event.location_event }} </p>
          <hr />
          <p class="p1">Tag:</p>
          <p class="p2">{{ t_event.location_event }} </p>
          <hr />
          <p class="p1">Description:</p>
          <p class="p2">{{ t_event.location_event }} </p>
          <hr />
          <button class="export"
                  @click="downloadJSON(t_event.name_event, t_event._id)">
            feedback_and_vote.json
          </button>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

  .container {
    display: flex;
    gap: 20px;
    height: 100%;
    padding: 5px;
  }

  .left-column {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }

  .right-column {
    display: flex;
    flex: 3;
    flex-direction: column;
    gap: 20px;
    font-family: "Roboto Light", sans-serif;
  }

  .graphics {
    display: flex;
    gap: 20px;
    padding: 20px;
    background-color: rgba(104, 85, 224, 1);
  }

  .nothing {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
  }

  .info {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    color: rgb(255, 245, 238);
  }

  hr {
    border: none;
    height: 1.5px;
    width: 100%;
    align-self: center;
    background-color: rgb(255, 245, 238);
  }

  h1 {
    font-size: 35px;
  }

  .p1 {
    font-size: 25px;
    font-style: italic;
  }

  .p2 {
    font-size: 25px;
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

  .btn_event {
    color: rgb(104, 85, 224);
    background-color: rgb(255, 245, 238);
    border: 1px solid rgba(104, 85, 224, 1);
  }

  .btn_event:hover {
    color:  rgb(255, 245, 238);
    box-shadow: 0 0 40px rgba(104, 85, 224, 0.6);
    background-color: rgba(104, 85, 224, 1);
  }

  .export {
    color: rgb(104, 85, 224);
    background-color:  rgb(255, 245, 238);
    border: 1px solid rgba(104, 85, 224, 1);
    justify-self: center;
  }

  .export:hover {
    box-shadow: 0 0 40px rgba(104, 85, 224, 0.6);
    transform: scale(1.1);
  }

</style>