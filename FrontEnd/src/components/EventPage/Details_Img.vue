<script>

  export default {
    name: 'Description',
    components: {},
    data() {
      return {
        _id: null,
        name_event: '',
        img_event: '',
        location_event: '',
        date_event: null,
        tags: 0
      };
    },
    mounted() {
      this._id = this.$route.query._id;
      this.name_event = this.$route.query.name_event;
      this.img_event = this.$route.query.img_event;
      this.location_event = this.$route.query.location_event;
      this.date_event = this.$route.query.date_event;
      this.tags = this.$route.query.tags;
    },
    methods: {}
  };

</script>

<template>

  <div class="details_img">
    <div class="details">
      <div class="info">Name: {{ name_event }}</div>
      <div class="info">Tag: {{ tags }}</div>
      <div class="info">Date: {{ date_event }}</div>
      <div class="info">Location: {{ location_event }}</div>
    </div>
    <div class="img">
      ciao
    </div>
  </div>

</template>

<style scoped>
  .details_img {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 3%;
  }

  .details {
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: left;
  }

  .img {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    object-fit: contain;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1),
    0px -4px 6px rgba(0, 0, 0, 0.05),
    4px 0px 6px rgba(0, 0, 0, 0.05),
    -4px 0px 6px rgba(0, 0, 0, 0.05);
    border-radius: 15px;
  }

  .info {
    border-radius: 30px;
    text-align: left;
    padding: 2%;
  }
</style>