<script>
import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";

export default {
    name: 'app',
    components: {
      Footer,
      Header
    },
    data() {
      return {};
      },
    methods: {}
  };

</script>

<template>

  <div id="app" class="container">
    <Header class="header" />
    <main class="mains">
      <router-view />
    </main>
    <Footer class="footer"/>
  </div>

</template>

<style scoped>


  * {
    margin: 0 0 0 0;
    padding: 0 0 0 0;
    overflow-y: hidden;
    display: flex;
  }

  .container {
    min-width: 100vw;
    height: 100vh;
    margin: 0 0 0 0;
    padding: 0 0 0 0;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;

  }

  .header {
    height: 5%;
  }

  .mains {
    height: 90%;
    overflow: auto;
    min-width: 100vw;
    max-width: 100vw;
  }

  .footer {
    height: 5%;
  }
  #app{
    height: 1080px;
    width: 1920px;
    overflow: hidden;
    align-items: center;
    display: flex;
  }

</style>
