<script>
import BTN_LOGIN from './components/btnLogin.vue';
import TITLE from './components/title.vue';

  export default {
    components: {
      BTN_LOGIN,
      TITLE
    }
  }
</script>

<template> 
  <div class="login"> 
    <TITLE />
    <BTN_LOGIN />
  </div>
</template>

<style scoped>
  .login {
    display: flex; 
    flex-direction: column; 
    justify-content: center; 
    align-items: center;
    background-color: #85daff;
    box-sizing: border-box; 
    padding: 20%;
    gap: 20px;
  }
</style>
