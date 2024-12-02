<script>
import BTN_LOGIN from './Login/btnLogin.vue';
import TITLE from './Login/title.vue';
import BTN_SIGN_UP from './Sign_Up/SignUpBtn.vue';

  export default {
    name: 'App',
    components: {},
    data() {
      return {};
      },
    methods: {}
  };

</script>

<template>

  <div id="app">
    <router-view />
  </div>

  <!--<div class="login">

    <TITLE />
    <BTN_LOGIN />
    <BTN_SIGN_UP />

  </div>-->

</template>

<style scoped>

</style>
