<script>  
  export default {
    name: 'USER',
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

  <div class="form_group field">
    <input type="email" class="form_field" v-model="user_name" placeholder="E-mail utente" />
  </div>
    
</template>

<style scoped>

  .form_group {
    position: relative;
    padding: 15px 0 0;
    margin-top: 10px;
    width: 50%;
  }

  .form_field {
    font-family: 'Roboto Light';
    width: 100%;
    border: 0;
    border-bottom: 2px solid #9b9b9b;
    outline: 0;
    font-size: 1.3rem;
    color: black;
    padding: 7px 0;
    background: transparent;
    transition: border-color 0.2s;


    &:placeholder-shown {
      font-size: 1.3rem;
      cursor: text;
      top: 20px;
    }
  }

  .form_field:focus {
    padding-bottom: 6px;
    font-weight: bold;
    border-width: 3px;
    border-image: linear-gradient(to right, #0fbbae, rgba(104, 85, 224, 1));
    border-image-slice: 1;
  }

  .form_field{
    &:required,&:invalid {
      box-shadow:none;
    }
  }

</style>