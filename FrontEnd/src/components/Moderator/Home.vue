<script>
import HANDLEUSER from './HandleUsers.vue';
import APPROVEEVENT from './ApproveEvent.vue';
import CREATEEVENT from './CreateEvent.vue';

export default {
  components: {
    HANDLEUSER,
    APPROVEEVENT,
    CREATEEVENT
  },
  data() {
    return {
      activeView: 'users'
    };
  },
  created() {
    // this.verifyUserType();
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
        alert(`User: ${user_data.email_user || 'Unknown user'}, Type: ${user_data.type_user || 'Unknown type'}`);
      } catch (error) {
        alert(`Error: ${error.message}`);
      }
    }
  },
};
</script>

<template>
  <div class="container">
    <nav class="navbar">
      <div class="nav-buttons centered">
        <button @click="activeView = 'users'" class="nav-button" :class="{ active: activeView === 'users' }">Handle Users</button>
        <button @click="activeView = 'approve'" class="nav-button" :class="{ active: activeView === 'approve' }">Approve Events</button>
        <button @click="activeView = 'create'" class="nav-button" :class="{ active: activeView === 'create' }">Create an Event</button>
      </div>
    </nav>

    <div class="active-view-panel">
      <HANDLEUSER v-if="activeView === 'users'" />
      <APPROVEEVENT v-if="activeView === 'approve'" />
      <CREATEEVENT v-if="activeView === 'create'" />
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.navbar {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 10px;
  margin-bottom: 20px;
  background-color: #f4f4f4;
}

.nav-buttons.centered {
  display: flex;
  gap: 20px;
}

.nav-button {
  padding: 10px 15px;
  background-color: #e0e0e0;
  border: none;
  cursor: pointer;
}

.nav-button.active {
  background-color: #4cafa0;
  color: white;
}

.active-view-panel {
  width: 100%;
  max-width: 1200px;
  border: 1px solid #e0e0e0;
  padding: 20px;
  margin-top: 10px;
}
</style>