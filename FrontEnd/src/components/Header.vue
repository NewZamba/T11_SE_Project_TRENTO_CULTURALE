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
    async backLogin() {
      try {
        const response = await fetch(import.meta.env.VITE_APP_API_URL + '/auth/logout', {
          method: 'POST',
          credentials: 'include', // Important for sending cookies
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Logout failed');
        }

        await this.$router.push('/');
      } catch (error) {
        console.error(error);
        await this.$router.push('/');
      }
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
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
          <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
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
    background-color: rgb(255, 245, 238);
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