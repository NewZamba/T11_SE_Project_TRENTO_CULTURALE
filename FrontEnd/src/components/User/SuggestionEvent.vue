<script>
import Cookie from "js-cookie";

  export default {
    name: 'SuggestionEvent',
    data() {
      return {
        name_event: '',
        date_event: null,
        tag_event: null,
        description_event: '',
        img_event: '',
        guests_event: null
      }
    },
    methods: {
      backToHome() {
        this.$router.push('/UserHome');
      },
      addSuggestionEvent() {
        fetch('http://localhost:3000/addSuggEvent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id_user: Cookie.get('id_user'),
            name_event: this.name_event,
            date_event: this.date_event,
            tag_event: this.tag_event,
            description_event: this.description_event,
            img_event: this.img_event,
            guests_event: this.guests_event
          }),
        }).then(res => {
          if (res.status === 200) {
            this.name_event = '';
            this.date_event = '';
            this.description_event = '';
            this.tag_event = '';
            alert('Event Suggest Successfully');
          } else {
            alert(res.statusText);
          }
        });
      }
    }
  };

</script>

<template>

  <div class="container">

    <header class="headerEP">
      <button class="back_btn" @click="backToHome">
        X
      </button>
    </header>
    <div class="container2">
      <div class="event">
        <p>
          <input type="text" v-model="name_event" placeholder="Inserisci il nome dell'evento">
        </p>
        <p>
          <input type="datetime-local" v-model="date_event" placeholder="Inserisci la data dell'evento">
        </p>
        <p>
          <input type="text" v-model="tag_event" placeholder="Inserisci il tag dell'evento">
        </p>
        <p>
          <input type="text" v-model="img_event" placeholder="Inserisci il link dell'immagine dell'evento">
        </p>
        <p>
          <textarea v-model="description_event" placeholder="Inserisci la descrizione dell'evento" />
        </p>
        <p>
          <input type="Number" v-model="guests_event" placeholder="Inserisci partecipanti evento (0 se infiniti)">
        </p>
      </div>
    </div>
    <footer class="footerEP">
      <button class="sugg_btn" @click="addSuggestionEvent">
        Suggest
      </button>
    </footer>

  </div>

</template>

<style scoped>

  .container {
    display: flex;
    flex-direction: column;
    height: 80%;
    width: 45%;
    border-radius: 20px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1),
                0px -4px 6px rgba(0, 0, 0, 0.05),
                4px 0px 6px rgba(0, 0, 0, 0.05),
                -4px 0px 6px rgba(0, 0, 0, 0.05);
    margin: auto auto;
    background-color: azure;
  }

  .container2 {
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: #84d0d0;
    color: white;
    font-family: 'Helvetica', sans-serif;
    font-size: larger;
  }

  .event {
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: #84d0d0;
    color: white;
    font-family: 'Helvetica', sans-serif;
    font-size: larger;
    align-items: center;
    justify-content: center;
  }

  .event input {
    width: 420px;
  }

  .event textarea {
    width: 420px;
    height: 150px;
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

  .sugg_btn {
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

  .sugg_btn:hover {
    transform: scale(1.1);
  }

</style>