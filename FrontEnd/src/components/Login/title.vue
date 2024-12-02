<script>
  export default {
    components: {
    },
    data() {
      return {

      };
    },
    methods: {
    }
  };

</script>

<template>
  <button class="slide">TRENTO CULTURALE</button>
</template>

<style scoped lang="scss">
button {
  height: 100px;
    width: 400px;
    padding: 2%; 
    position: relative;
    margin: 10px;
    border: 3px solid white;
    border-radius: 20px;
    background: steelblue;

    transition: all 1000ms;
    z-index: 1;
    overflow: hidden;
    
    font-family: 'Helvetica';
    font-weight: bold;
    font-size: x-large;
    color: white;

    &:hover {
      border-color: steelblue;
      background-color: white;
      color: steelblue;
    }
      
    &:after {
      content: "";
      position: absolute;
      z-index: -1;
      top: 0; bottom: 0; left: 0; right: 0;
      transition: all 300ms;
      background-color: white;
    }
  }

  .slide::after {
    height: 100%;
    width: 0;
  }
  .slide:hover::after {
    width: 100%;
  }
</style>