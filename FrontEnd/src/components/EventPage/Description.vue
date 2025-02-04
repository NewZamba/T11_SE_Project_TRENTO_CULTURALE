<script>

  export default {
    name: 'Description',
    components: {},
    data() {
      return {
        description_event: ''
      };
    },
    mounted() {
      this.description_event = this.$route.query.description_event;
    },
    methods: {}
  };

</script>

<template>

  <div class="description">
    <h1>Description</h1>
    <hr />
    <p>{{ description_event }}</p>
  </div>

</template>

<style scoped>

  .description {
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    text-align: left;
    padding: 2% 2% 2% 4%;
  }

  h1 {
    font-family: 'Roboto Light', sans-serif;
    font-size: x-large;
  }

  p {
    font-family: 'Roboto Light', sans-serif;
    font-size: large;
  }

</style>