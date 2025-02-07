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
  background: rgb(255, 245, 238);
  min-height: 100vh;
  position: relative;
}

.navbar {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 5px;
  margin-bottom: 5px;
  background-color: transparent;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav-buttons.centered {
  display: flex;
  gap: 20px;
  padding: 20px 0;
  background-color: rgb(255, 245, 238);
  width: 100%;
  justify-content: center;
}

.nav-button {
  padding: 10px 15px;
  background-color: transparent;
  border: 1px solid rgba(104, 85, 224, 1);
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: 0.4s;
}

.nav-button.active {
  background-color: rgba(104, 85, 224, 1);
  color: rgb(255, 245, 238);
}

.nav-button:hover {
  transform: scale(1.1);
}

.active-view-panel {
  width: 100%;
  max-width: 1200px;
  border: 1px solid rgba(104, 85, 224, 0.3);
  border-radius: 30px;
  padding: 20px;
  margin-top: 20px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1),
  0px -4px 6px rgba(0, 0, 0, 0.1),
  4px 0px 6px rgba(0, 0, 0, 0.1),
  -4px 0px 6px rgba(0, 0, 0, 0.1);
  flex: 1;
  overflow: auto;
}
</style>