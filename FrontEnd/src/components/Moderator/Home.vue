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
    async verifyUserType() {
      try {
        const response = await fetch('http://localhost:3000/verificaUserType/test', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.status === 401) {
          throw new Error('utente non loggato');
        } else if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.message || 'Server error');
        }

        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.message || 'Server error');
        }

        const user_data = await response.json();
        // Assuming 'user' is the key in the response object
        alert(`User: ${user_data.email_user || 'Unknown user'}, Type: ${user_data.type_user || 'Unknown type'}`);
      } catch (error) {
        // Display the error message in case of issues
        alert(`Error: ${error.message}`);
      }
    },
  },
};

</script>

<template>
  <h1>ciao da mod home</h1>
</template>

<style scoped>

</style>