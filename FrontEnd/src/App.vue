<script>
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

  <div id="App" class="container">
    <header class="header">Pippo</header>
    <main class="main">
      <router-view />
    </main>
    <footer class="footer">Pluto</footer>
  </div>

</template>

<style scoped>

  .container {  display: grid;
    width: 100%;
    height: 100%;
    grid-template-columns: 1fr;
    grid-template-rows: 0.2fr 2.6fr 0.2fr;
    grid-auto-columns: 1fr;
    gap: 0px 0px;
    grid-auto-flow: row;
    grid-template-areas:
      "header"
      "main"
      "footer";
  }

  .header { grid-area: header; }

  .footer { grid-area: footer; }

  .main { grid-area: main; }

</style>