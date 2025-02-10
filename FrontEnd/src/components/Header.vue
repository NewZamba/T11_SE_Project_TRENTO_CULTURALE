<script>

export default {
  name: 'Header',
  components: {},
  data() {
    return {};
  },
  methods: {
    backLogin() {
      this.$router.push('/');
    }
  }
};

</script>

<template>

  <div class="container">
    <div class="text">
      <p>Trento Culturale</p>
    </div>
  </div>

</template>

<style scoped>

  .container {
    color: rgba(104, 85, 224, 1);
    font-family: 'Roboto Light';
    font-size: 20px;
    font-weight: bold;
    width: 100%;
    align-items: center;
    justify-content: center;
    height: 10vh;
  }

  .text {
    display: flex;
    flex: 1;
    width: 100%;
    align-items: center;
    justify-content: flex-end;
  }

  button {
    justify-self: flex-end;
    cursor: pointer;
    border: 0;
    border-radius: 10px;
    font-weight: 600;
    margin: 0 10px;
    width: 70%;
    padding: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1),
    0px -4px 6px rgba(0, 0, 0, 0.1),
    4px 0px 6px rgba(0, 0, 0, 0.1),
    -4px 0px 6px rgba(0, 0, 0, 0.1);
    transition: 0.4s;
  }

</style>