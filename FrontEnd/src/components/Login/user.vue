<script>  
  export default {
    data() {
      return {
        user_name: '',
      };
    },
    methods: {
      getUser() {
        return this.user_name;
      }
    }
  };
</script>

<template>

  <form> 
    <div> 
      <label class="user">USER:</label>
      <input type="email" v-model="user_name" />
    </div>
  </form>
    
</template>

<style scoped> 
  .user {
    font-family: 'Helvetica';
    font-weight: bold;
    font-size: medium;
    color: white;
  }
</style>