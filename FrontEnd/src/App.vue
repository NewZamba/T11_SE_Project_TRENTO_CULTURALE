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
    display: grid;
  }

  .container {
    min-width: 100vw;
    height: 100vh;
    margin: 0 0 0 0;
    padding: 0 0 0 0;
    overflow: hidden;
    justify-content: center;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 0.2fr 2.7fr 0.1fr;
    grid-template-areas:
     "header" "header"
      "mains" "mains"
      "footer" "footer";

  }

  .mains {
    grid-area: mains;
    height: 90%;
    overflow: auto;
    min-width: 100vw;
    max-width: 100vw;
  }
  .header {
    grid-area: header;
    height: 5%;
  }
  .footer {
    grid-area: footer;
    height: 2%;
    justify-content: center;
    align-items: center;
    display: flex;
  }
  #app{
    height: 1080px;
    width: 1920px;
    overflow: hidden;
    align-items: center;
    display: block;
  }

</style>
