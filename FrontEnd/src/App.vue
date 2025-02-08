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

/* Assicuriamoci che html e body occupino il 100% della viewport */
html, body {
  width: 100%;
  height: 100%;
}

/* Il container principale usa una grid a 3 righe:
   - header (auto)
   - main (1fr, si espande e può scrollare)
   - footer (auto)
   Insieme a min-width e min-height, il container occupa almeno l'intera viewport */
.container {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-width: 100vw;
  min-height: 100vh;
  width: 100%;
  height: 100%;
}

/* Header: occupa tutta la larghezza */
.header {
  width: 100%;
}

/* Main: occupa tutto lo spazio disponibile e abilita lo scrolling interno se necessario */
.mains {
  width: 100%;
  overflow: auto;
}

/* Footer: centrato orizzontalmente e verticalmente */
.footer {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* #app: per sicurezza, ci assicuriamo che l'elemento radice occupi tutto lo spazio */
#app {
  width: 100%;
  height: 100%;
}
</style>
