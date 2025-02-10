<script>
import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";

export default {
  name: 'app',
  components: {
    Footer,
    Header
  }
};
</script>

<template>
  <div id="app" class="container">
    <Header class="header" />

    <main class="mains">
      <router-view />
    </main>

    <Footer class="footer" />
  </div>
</template>

<style scoped>
/* Reset di base */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-width: 100vw;
  width: 100%;
  height: 100%;

}

.header {
  width: 100%;
  height: auto;
}

.mains {
  width: 100%;
  overflow-y: auto;
}

.footer {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#app {
  width: 100%;
  height: 100vh;
}
</style>