<script>
export default {
  name: 'Header',
  components: {},
  data() {
    return {};
  },
  computed: {
    isLoginPage() {
      return this.$route.path === '/';
    }
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
      <button v-if="!isLoginPage" class="back_btn" @click="backLogin" title="Back to Login">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 12H5"/>
          <path d="M12 19l-7-7 7-7"/>
        </svg>
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
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 1px solid rgba(104, 85, 224, 1);
    background-color: rgba(104, 85, 224, 1);
    color: rgb(255, 245, 238);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s;
  }

  .back_btn svg {
    width: 24px;
    height: 24px;
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