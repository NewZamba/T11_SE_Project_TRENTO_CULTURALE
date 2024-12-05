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
    methods: {}
  };

</script>

<template>

  <div>

  </div>

</template>

<style scoped>

</style>