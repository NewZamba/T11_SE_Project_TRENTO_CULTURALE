<script>
  export default {
    name: 'TITLE'
  };
</script>

<template>

  <div>
    <p class="tit">
      Trento Culturale
    </p>
    <p class="tit2">
      Made by Group T11:
    </p>
    <p class="tit3">
      Buscardo F. - Cocquio F. - Marasca G.
    </p>
    
    <img src="https://www.saral.it/img/logo-unitn.png">
  </div>

</template>

<style scoped>

  div {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-content: center;
    justify-content: center;
  }

  .tit {
    text-align: center;
    font-family: 'Roboto Light';
    color: rgb(255, 245, 238);
    font-size: xxx-large;
    font-weight: bold;
  }

  .tit2 {
    text-align: center;
    font-family: 'Roboto Light';
    font-style: italic;
    color: rgb(255, 245, 238);
    font-size: x-large;
  }

  .tit3 {
    text-align: center;
    font-family: 'Roboto Light';
    font-style: italic;
    color: rgb(255, 245, 238);
    font-size: x-large;
    font-weight: bold;
  }

  img {
    width: 200px;
    height: auto;
    display: block;
    margin: 0 auto;
  }

</style>