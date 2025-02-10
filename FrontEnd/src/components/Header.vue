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
  <div class="header-container">
    <div class="text">
      <p>Trento Culturale</p>
    </div>

    <div class="buttons">
      <button class="back_btn" @click="backLogin">
        Back To Login Page
      </button>
    </div>
  </div>
</template>

<style scoped>
  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    color: rgba(104, 85, 224, 1);
    font-family: 'Roboto Light';
    font-size: 20px;
    font-weight: bold;
  }

  .text {
    display: flex;
    align-items: center;
  }

  .buttons {
    display: flex;
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

  .back_btn {
    width: 160px;
    height: 60px;
    border-radius: 20px;
    border: 1px solid rgba(104, 85, 224, 1);
    background-color: rgba(104, 85, 224, 1);
    color: rgb(255, 245, 238);
    font-size: medium;
    font-family: 'Roboto Light';
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s;
  }

  .back_btn:hover {
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1),
    0px -4px 6px rgba(0, 0, 0, 0.1),
    4px 0px 6px rgba(0, 0, 0, 0.1),
    -4px 0px 6px rgba(0, 0, 0, 0.1);
    background-color: rgba(104, 85, 224, 1);
    transform: scale(1.1);
  }

</style>