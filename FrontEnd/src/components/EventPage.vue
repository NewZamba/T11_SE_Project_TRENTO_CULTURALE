<script>

  export default {
    name: 'EventPage',
    components: {},
    data() {
      return {
        _id: null,
        name_event: '',
        img_event: '',
        description_event: '',
        location_event: '',
        date_event: null,
        tags: 0
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
      }
    }
  };

</script>

<template>

  <!--
     bottone indietro
    -->
  <header class="header">
    <button class="back_btn" @click="backToHome"></button>
  </header>

  <div class="event-page">
    <!--
      dettagli evento
    -->
    <div class="event">
      <div class="details_img">
        <div class="details">
          <div class="info">NAME: {{ name_event }}</div>
          <div class="info">TAG: {{ tags }}</div>
          <div class="info">DATE: {{ date_event }}</div>
          <div class="info">LOCATION: {{ location_event }}</div>
        </div>
        <div class="img">
          <img />
        </div>
      </div>
      <div class="description">
        DESCRIPTION:
        <p>{{ description_event }}</p>
      </div>

    </div>
  </div>

</template>

<style scoped>

  .event-page {
    display: flex;
    width: 40%;
    height: 80%;
    border-radius: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    margin: auto auto;
  }

  .header {
    justify-items: left;
    padding: 5px;
  }

  .back_btn {
    width: 45px;
    height: 45px;
    border: none;
    border-radius: 50%;
    background-color: #4cafa0;
    color: white;
    font-size: 16px;
    line-height: 100px;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s;
  }

  .back_btn:hover {
    transform: scale(1.1);
  }

  .details_img img {

  }

  .details {

  }

  .img {

  }

  .description {

  }

  .info {
    border-radius: 30px;
    text-align: center;
    padding: 5px;
  }

</style>