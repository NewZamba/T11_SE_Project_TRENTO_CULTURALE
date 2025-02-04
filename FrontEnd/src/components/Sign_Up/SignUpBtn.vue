<script>
import ROUTER from '../../router.js';

  export default {
    name: 'SIGN_UP_BTN',
    components: {
    },
    data() {
      return {

      };
    },
    methods: {
      SignUpUtente() {
        ROUTER.push('/SignUp');
      }
    }
  };
</script>

<template>

  <div>
    <button class="reg" @click="SignUpUtente">Sign Up</button>
  </div>

</template>

<style scoped>

  button {
    cursor: pointer;
    border: 0;
    border-radius: 4px;
    font-weight: 600;
    margin: 0 10px;
    width: 200px;
    padding: 10px 0;
    box-shadow: 0 0 20px rgba(115, 99, 238, 0.2);
    transition: 0.4s;
  }

  .reg {
    color: white;
    background-color: rgba(104, 85, 224, 1);
  }

  button:hover {
    color: white;
    box-shadow: 0 0 40px rgba(104, 85, 224, 0.6);
    background-color: rgba(104, 85, 224, 1);
  }

</style>