<script>
import CAROUSEL from './Carousel.vue';
import CARDS from './Cards.vue';
import Cookie from 'js-cookie';

// Importiamo i componenti necessari di Bootstrap Vue
import {
  BNavbar,
  BNavbarBrand,
  BNavbarToggle,
  BCollapse,
  BNavbarNav,
  BNavItem,
  BNavItemDropdown,
  BDropdownItem
} from 'bootstrap-vue';
import {EventBus} from "../../eventBus.js";

export default {
  name: 'UserHome',
  components: {
    CAROUSEL,
    CARDS,
    BNavbar,
    BNavbarBrand,
    BNavbarToggle,
    BCollapse,
    BNavbarNav,
    BNavItem,
    BNavItemDropdown,
    BDropdownItem
  },
  data() {
    return {
      events: [],
      suggEvents: [],
      sortN: true,
      sortD: false,
      arrSortN: [],
      arrSortD: [],
      userPrenotations: [],
      id_user: null,
      allTags: [],
      selectedFilterTags: [],
    };
  },
  created() {
    this.verifyUserType();
    this.fetchEvents();
    this.fetchSuggEvents();
    this.fetchUserPrenotations(1);
    this.fetchTags();
  },
  computed: {
    sortedEvents() {
      let filteredEvents = this.sortN ? this.arrSortN : this.arrSortD;

      // If there are selected filter tags, filter the events
      if (this.selectedFilterTags.length > 0) {
        filteredEvents = filteredEvents.filter(event => {
          return this.selectedFilterTags.every(filterTag =>
              event.tags_event.includes(filterTag._id)
          );
        });
      }
      return filteredEvents;
    }
  },
  methods: {
    async fetchTags() {
      try {
        const response = await fetch('http://localhost:3000/tags/get');
        if (!response.ok) {
          throw new Error('Error fetching tags');
        }
        this.allTags = await response.json();
      } catch (error) {
        console.error('Error fetching tags:', error);
        alert('Failed to fetch tags');
      }
    },
    toggleTagFilter(tag) {
      const index = this.selectedFilterTags.findIndex(t => t._id === tag._id);
      if (index === -1) {
        this.selectedFilterTags.push(tag);
      } else {
        this.selectedFilterTags.splice(index, 1);
      }
    },
    isTagSelected(tag) {
      return this.selectedFilterTags.some(t => t._id === tag._id);
    },
    clearTagFilters() {
      this.selectedFilterTags = [];
    },
    async verifyUserType() {
      try {
        const response = await fetch('http://localhost:3000/verificaUserType/is_logged', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.status === 401) {
          throw new Error('utente non loggato');
        } else if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.message || 'Server error');
        }
        const user_data = await response.json();
        Cookie.set('id_user', user_data._id);
        this.id_user = Cookie.get('id_user');
      } catch (error) {
        this.showModal();
        await this.$router.push('/');
      }
    },
    fetchEvents() {
      try {
        fetch('http://localhost:3000/events/not_expired', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
            .then(response => {
              if (!response.ok) {
                throw new Error('Error fetching events');
              }
              return response.json();
            })
            .then(data => {
              this.events = data;
              Promise.all([this.sortByName(), this.sortByDate()]);
            });
      } catch (err) {
        alert(err.message);
      }
    },
    async fetchSuggEvents() {
      try {
        fetch('http://localhost:3000/suggEvents/get', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
            .then(response => {
              if (!response.ok) {
                throw new Error('Error fetching events');
              }
              return response.json();
            })
            .then(data => {
              this.suggEvents = data;
            });
      } catch (err) {
        alert(err.message);
      }
    },
    async sortByName() {
      this.arrSortN = this.events.slice().sort((a, b) =>
          a.name_event.localeCompare(b.name_event)
      );
      this.sortN = true;
      this.sortD = false;
    },
    async sortByDate() {
      this.arrSortD = this.events.slice().sort((a, b) =>
          a.date_event.localeCompare(b.date_event)
      );
      this.sortD = true;
      this.sortN = false;
    },
    suggEvent() {
      this.$router.push({ path: '/SuggestionEvent' });
    },
    viewSuggEvents() {
      this.$router.push({
        path: '/SuggEvents',
        query: {
          events: this.suggEvents
        }
      });
    },
    async fetchUserPrenotations(x) {
      switch (x) {
        case 1:
          try {
            const response = await fetch(`http://localhost:3000/bookings/get/${Cookie.get("id_user")}` );
            if (!response.ok) {
              return [];
            }
            const data = await response.json();
            console.log(data);
            this.userPrenotations = data.filter(p => {
              return new Date(p.date_event) > new Date();
            });
          } catch (err) {
            alert(`Errore: ${err.message}`);
            return [];
          }
        break;
        case 2:
          try {
            const response = await fetch(`http://localhost:3000/bookings/get/${Cookie.get("id_user")}` );
            if (!response.ok) {
              return [];
            }
            const data = await response.json();
            console.log(data);
            this.userPrenotations = data;
          } catch (err) {
            alert(`Errore: ${err.message}`);
            return [];
          }
          break;
      }
    },
    async viewForm() {
      await Promise.all([
        this.fetchUserPrenotations(2)
      ]);
      const today = new Date();
      const f1 = this.userPrenotations.filter(p => new Date(p.date_event) > today);
      this.$router.push({
        path: '/FormEvents',
        query: {
          events: f1
        }
      });
    },
    // Nuovo metodo per il logout
    logout() {
      Cookie.remove('id_user');
      this.$router.push('/login');
    },
    goViewBookings() {
      console.log(this.userPrenotations);
      this.$router.push({
        path: '/BookingsPage',
        query: {
          bookings: this.userPrenotations
        }
      });
    },
    showModal() {
      EventBus.$emit('open-global-modal', {
        title: '⚠️Attenzione⚠️',
        message: "L'Utente non è loggato",
      });
    }
  }
};

</script>

<template>

  <div>
    <!-- Contenuto principale -->
    <div class="background">
      <img
          src="https://images.pexels.com/photos/571169/pexels-photo-571169.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Background"
      />

      <!-- Il container si adatta in altezza al contenuto -->
      <div class="container">
        <!-- Header: il Carousel -->
        <header class="header">
          <CAROUSEL :events="events" />
        </header>

        <!-- Navbar di Bootstrap Vue -->
        <b-navbar toggleable="lg" type="dark" variant="primary" class="custom-navbar-bg">
          <b-navbar-toggle target="nav-collapse" />
          <b-collapse is-nav id="nav-collapse">
            <b-navbar-nav class="center-navbar" style="width: 100%">
              <b-nav-item-dropdown text="Sort" right>
                <b-dropdown-item @click="sortByName">By Name</b-dropdown-item>
                <b-dropdown-item @click="sortByDate">By Date</b-dropdown-item>
              </b-nav-item-dropdown>
              <div class="separator" />
              <b-nav-item-dropdown text="Filter by Tags" right>
                <div class="tags-dropdown-content">
                  <b-dropdown-item
                      v-for="tag in allTags"
                      :key="tag._id"
                      @click="toggleTagFilter(tag)"
                      :class="{ 'tag-selected': isTagSelected(tag) }"
                  >
                    <span class="tag-indicator" :style="{ backgroundColor: tag.color_tag }"></span>
                    {{ tag.name_tag }}
                  </b-dropdown-item>
                  <b-dropdown-divider v-if="selectedFilterTags.length > 0" />
                  <b-dropdown-item v-if="selectedFilterTags.length > 0" @click="clearTagFilters">
                    Clear Filters
                  </b-dropdown-item>
                </div>
              </b-nav-item-dropdown>
              <div class="separator" />
              <b-nav-item @click="suggEvent">Suggest Event</b-nav-item>
              <div class="separator" />
              <b-nav-item @click="viewSuggEvents">View Suggest Events</b-nav-item>
              <div class="separator" />
              <b-nav-item @click="goViewBookings">View Bookings</b-nav-item>
              <div class="separator" />
              <b-nav-item @click="viewForm">Form</b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>

        <!-- Main: le Cards (la griglia degli eventi) -->
        <main class="main">
          <CARDS :events="sortedEvents" />
        </main>

        <!-- Footer (se necessario) -->
        <footer class="footer">
          <!-- Ulteriori contenuti del footer -->
        </footer>
      </div>
    </div>
  </div>
</template>

<style scoped>
  /* Sfondo: l'immagine copre lo sfondo ma non forza altezze fisse */
  .background {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .background img {
    position: absolute;
    width: 100%;
    object-fit: cover;
    z-index: -1;
    min-width: 100%;
    max-width: 100%;
    min-height: 100%;
    max-height: 100%;
  }

  /* Il container ora non ha un'altezza fissa; crescerà in base al contenuto */
  .container {
    display: flex;
    flex-direction: column;
    width: 95%;
    margin-top: 20px;
    padding: 20px;
    background: rgb(255, 245, 238);
    border-radius: 30px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1),
    0px -4px 6px rgba(0, 0, 0, 0.1),
    4px 0px 6px rgba(0, 0, 0, 0.1),
    -4px 0px 6px rgba(0, 0, 0, 0.1);
    gap: 20px;
    min-height: 100%;
  }

  /* Header: il Carousel in cima */
  .header {
    width: 100%;
  }

  /* Main: le Cards si dispongono in base al contenuto */
  .main {
    width: 100%;
    margin-top: 10px;
  }

  /* Footer: segue il contenuto senza essere forzato a un'altezza fissa */
  .footer {
    width: 100%;
    padding: 5px;
  }

  /* Esempio di stili per eventuali bottoni personalizzati */
  button {
    cursor: pointer;
    border: 0;
    border-radius: 10px;
    font-weight: 600;
    margin: 0 10px;
    width: 70%;
    padding: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1),
    0px -4px 6px rgba(0, 0, 0, 0.1),
    4px 0px 6px rgba(0, 0, 0, 0.1),
    -4px 0px 6px rgba(0, 0, 0, 0.1);
    transition: 0.4s;
  }

  .custom-navbar-bg {
    font-family: "Roboto Light", sans-serif;
    font-weight: bold;
    font-size: larger;
    background-color: rgba(104, 85, 224, 1) !important;
  }

  .center-navbar {
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 15px;
  }

  .separator {
    height: 25px;
    width: 1px;
    background-color: rgba(255, 245, 238, 0.3);
  }

  tags-dropdown-content {
    max-height: 300px;
    overflow-y: auto;
  }

  .tag-selected {
    background-color: rgba(104, 85, 224, 0.1);
  }

  .tag-indicator {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-right: 8px;
  }
</style>
