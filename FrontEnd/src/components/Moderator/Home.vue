<script>

export default {
  components: {
  },
  data() {
    return {

    };
  },
  // chiama verifyUserType appena la pagina viene creata
  created() {
    this.verifyUserType();
  },
  methods: {
    verifyUserType() {
      fetch('http://localhost:3000/verificaUserType/mod-home', {
        method: 'GET',
        credentials: 'include'
      }).then(response => {
        if (!response.ok) {
          throw new Error('User non loggato');
        }
        return response.json()
      }).then(data => {
        if (data.type_user !== 1) {
          throw new Error('User non autorizzato');
        }
      })
    }
  }
};

</script>

<template>
  <h1>ciao da mod home</h1>
</template>

<style scoped>

</style>