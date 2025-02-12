<script>
import {EventBus} from "../../eventBus.js";

export default {
  data() {
    return {
      searchQuery: '',
      users: [],
      suspendedUsers: []
    };
  },
  computed: {
    filteredUsers() {
      return this.users.filter(user =>
          user.email_user.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await fetch('http://localhost:3000/users/public_for_mod');
        const allUsers = await response.json();

        this.suspendedUsers = allUsers.filter(user =>
            user.ban_until_date && new Date(user.ban_until_date) > new Date()
        );

        this.users = allUsers.filter(user =>
            !user.ban_until_date || new Date(user.ban_until_date) <= new Date()
        );
      } catch (error) {
        console.error('Error fetching users:', error);
        this.showModal('Failed to fetch users');
      }
    },
    async suspendUser(user) {
      try {
        const oneWeek = 7 * 24 * 60 * 60 * 1000;
        const suspensionDate = new Date(Date.now() + oneWeek).toISOString();
        const response = await fetch('http://localhost:3000/users/suspend', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ban_until_date: suspensionDate,
            user_id: user._id,
          }),
        });

        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.message || 'Suspension failed');
        }

        await this.fetchUsers();
      } catch (error) {
        this.showModal(error);
      }
    },
    async banUser(user) {
      try {
        const aLot = 99 * 365 * 24 * 60 * 60 * 1000;
        const suspensionDate = new Date(Date.now() + aLot).toISOString();
        const response = await fetch('http://localhost:3000/users/suspend', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ban_until_date: suspensionDate,
            user_id: user._id,
          }),
        });

        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.message || 'Suspension failed');
        }

        await this.fetchUsers();
      } catch (error) {
        this.showModal(error);
      }
    },
    async unsuspendUser(user_id) {
      try {
        const response = await fetch('http://localhost:3000/users/unsuspend', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id: user_id }),
        });

        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.message || 'Unsuspension failed');
        }

        await this.fetchUsers();
      } catch (error) {
        this.showModal(error);
      }
    },
    viewUserDetails(user) {
      this.showModal(`
      Email: ${user.email_user}\n
      Nome: ${user.name_user}\n
      Cognome: ${user.surname_user}\n
      Eta': ${user.age_user}
      `);
    },
    formatDate(date) {
      return date ? new Date(date).toLocaleDateString() : 'N/A';
    },
    isUserBanned(user) {
      if (!user.ban_until_date) return false;
      const banDate = new Date(user.ban_until_date);
      const now = new Date();
      const tenYearsInMs = 10 * 365 * 24 * 60 * 60 * 1000;
      return (banDate.getTime() - now.getTime()) > tenYearsInMs;
    },
    showModal(mess) {
      EventBus.$emit('open-global-modal', {
        title: '⚠️Attenzione⚠️',
        message: mess,
      });
    }
  }
};
</script>

<template>
  <div class="users-layout">
    <div class="search-bar">
      <input
          type="text"
          v-model="searchQuery"
          placeholder="Cerca un utente"
      />
    </div>

    <div class="users-container">
      <div class="suspended-users">
        <h2>Suspended Users</h2>
        <ul>
          <li v-for="user in suspendedUsers" :key="user._id" class="suspended-user-item">
            <div class="user-info">
              <span>{{ user.email_user }}</span>
              <span class="suspension-time">Suspended until: {{ formatDate(user.ban_until_date) }}</span>
            </div>
            <button
                @click="unsuspendUser(user._id)"
                :class="isUserBanned(user) ? 'unban-btn' : 'unsuspend-btn'"
            >
              {{ isUserBanned(user) ? 'Unban' : 'Unsuspend' }}
            </button>
          </li>
        </ul>
      </div>

      <div class="users-list">
        <h2>All Users</h2>
        <table>
          <thead>
          <tr>
            <th>Email</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="user in filteredUsers" :key="user._id">
            <td>{{ user.email_user }}</td>
            <td>
              <button @click="suspendUser(user)" class="suspend-btn">Suspend</button>
              <button @click="banUser(user)" class="ban-btn">Ban</button>
              <button @click="viewUserDetails(user)" class="details-btn">Details</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.users-layout {
  display: flex;
  flex-direction: column;
}

.search-bar {
  width: 100%;
  margin-bottom: 15px;
}

.search-bar input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
}

.users-container {
  display: flex;
  gap: 20px;
}

.suspended-users, .users-list {
  flex: 1;
  background-color: #f9f9f9;
  padding: 15px;
}

.users-list table {
  width: 100%;
  border-collapse: collapse;
}

.users-list th, .users-list td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.suspended-user-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.suspension-time {
  color: #888;
  font-size: 0.8em;
  margin-left: 10px;
}

.unsuspend-btn, .unban-btn, .suspend-btn, .ban-btn, .details-btn {
  padding: 5px 10px;
  margin: 0 5px;
}
</style>