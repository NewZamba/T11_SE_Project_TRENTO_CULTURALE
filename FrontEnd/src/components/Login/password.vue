<script>
  export default {
    name:'PASSWORD',
    data() {
      return {
        pass: '',
      };
    },
    methods: {
      getPass() {
        return this.pass;
      }
    }
  };
</script>

<template> 

  <form> 
    <div> 
      <label class="pass">PASSWORD:</label>
      <input type="password" v-model="pass" />
    </div>
  </form>
</template>

<style scoped> 
  .pass {
    font-family: 'Helvetica';
    font-weight: bold;
    font-size: medium;
    color: white;
  }
</style>