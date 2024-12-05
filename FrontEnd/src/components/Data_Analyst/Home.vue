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
      fetch('http://localhost:3000/verificaUserType/data-analyst-home', {
        method: 'GET',
        credentials: 'include'
      }).then(response => {
        if (!response.ok) {
          throw new Error('User non loggato');
        }
        return response.json()
      }).then(data => {
        if (data.type_user !== 2) {
          throw new Error('User non autorizzato');
        }
      })
    }
  }
};

</script>

<template>
  <h1>ciao da da home</h1>
</template>

<style scoped>

</style>