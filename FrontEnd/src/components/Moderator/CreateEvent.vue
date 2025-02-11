<script>
import {EventBus} from "../../eventBus.js";

export default {
  name: 'CreateEventPage',
  data() {
    return {
      name_event: '',
      location_event: '',
      date_event: '',
      description_event: '',
      img_event: '',
      guests_event: '',
      tagInput: '',
      selectedTags: [],
      allTags: [],
      filteredTags: [],
      showAutocomplete: false
    };
  },
  mounted() {
    this.fetchTags();
  },
  methods: {
    async fetchTags() {
      try {
        const response = await fetch('http://localhost:3000/tags/get');
        this.allTags = await response.json();
      } catch (error) {
        console.error('Error fetching tags:', error);
        alert('Failed to fetch tags');
      }
    },
    filterTags() {
      if (!this.tagInput) {
        this.filteredTags = [];
        this.showAutocomplete = false;
        return;
      }

      this.filteredTags = this.allTags.filter(tag =>
          tag.name_tag.toLowerCase().includes(this.tagInput.toLowerCase())
      );
      this.showAutocomplete = true;
    },
    selectTag(tag) {
      if (!this.selectedTags.some(t => t._id === tag._id)) {
        this.selectedTags.push(tag);
      }
      this.tagInput = '';
      this.showAutocomplete = false;
    },
    removeTag(tagToRemove) {
      this.selectedTags = this.selectedTags.filter(tag => tag._id !== tagToRemove._id);
    },
    async createEvent() {
      try {
        const response = await fetch('http://localhost:3000/events/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name_event: this.name_event,
            img_event: this.img_event,
            description_event: this.description_event,
            location_event: this.location_event,
            date_event: this.date_event,
            tags_event: this.selectedTags.map(tag => tag._id),
            guests_event: this.guests_event
          }),
        });

        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.message || 'Errore nel Backend');
        }

        this.showModal('Evento creato');
      } catch (error) {
        this.showModal(error.message);
      }
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
  <div class="event-page">
    <div class="event">
      <input type="text" v-model="name_event" placeholder="Inserisci il nome dell'evento">
      <input type="text" v-model="img_event" placeholder="Inserisci il link dell'immagine dell'evento">
      <textarea v-model="description_event" placeholder="Inserisci la descrizione dell'evento" />
      <input v-model="location_event" placeholder="Inserisci il luogo dell'evento" />
      <input type="date" v-model="date_event" />
      <input type="Number" v-model="guests_event" placeholder="Inserisci partecipanti evento (0 se infiniti)">
      <div class="tags-section">
        <div class="selected-tags">
          <span v-for="tag in selectedTags" :key="tag._id" class="tag"
                :style="{ backgroundColor: tag.color_tag }">
            {{ tag.name_tag }}
            <button @click="removeTag(tag)" class="remove-tag">×</button>
          </span>
        </div>
        <div class="tag-input-container">
          <input v-model="tagInput"
                 @input="filterTags"
                 @focus="showAutocomplete = true"
                 placeholder="Type to search tags" />
          <div v-if="showAutocomplete && filteredTags.length > 0" class="autocomplete-dropdown">
            <div v-for="tag in filteredTags"
                 :key="tag._id"
                 @click="selectTag(tag)"
                 class="autocomplete-item"
                 :style="{ borderLeft: `4px solid ${tag.color_tag}` }">
              {{ tag.name_tag }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer class="footerEP">
      <button class="subscribe_btn" @click="createEvent">Create Event</button>
    </footer>
  </div>
</template>

<style scoped>
.event-page {
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 80%;
  border-radius: 30px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1),
  0px -4px 6px rgba(0, 0, 0, 0.1),
  4px 0px 6px rgba(0, 0, 0, 0.1),
  -4px 0px 6px rgba(0, 0, 0, 0.1);
  margin: auto auto;
  background-color: rgb(255, 245, 238);
  padding: 20px;
}

.event {
  display: flex;
  flex-direction: column;
  gap: 15px;
  background: rgba(104, 85, 224, 1);
  color: rgba(255, 245, 238);
  font-family: "Roboto Light", sans-serif;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1),
  0px -4px 6px rgba(0, 0, 0, 0.1),
  4px 0px 6px rgba(0, 0, 0, 0.1),
  -4px 0px 6px rgba(0, 0, 0, 0.1);
}

input, textarea {
  padding: 12px;
  border-radius: 4px;
  border: 1px solid rgba(104, 85, 224, 0.3);
  background-color: rgba(255, 245, 238);
  font-family: "Roboto Light", sans-serif;
  font-size: 1em;
}

input:focus, textarea:focus {
  outline: none;
  border-color: rgba(104, 85, 224, 1);
  box-shadow: 0 0 5px rgba(104, 85, 224, 0.5);
}

.tags-section {
  margin: 10px 0;
}

.selected-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 15px;
}

.tag {
  padding: 6px 12px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  gap: 5px;
  color: rgba(255, 245, 238);
  font-size: 0.9em;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.remove-tag {
  background: none;
  border: none;
  color: rgba(255, 245, 238);
  cursor: pointer;
  font-size: 16px;
  padding: 0 5px;
}

.remove-tag:hover {
  transform: scale(1.2);
}

.tag-input-container {
  position: relative;
}

.autocomplete-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(255, 245, 238);
  border: 1px solid rgba(104, 85, 224, 0.3);
  border-radius: 4px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.autocomplete-item {
  padding: 10px 15px;
  cursor: pointer;
  color: #2d2f31;
  background-color: rgba(255, 245, 238);
  font-family: "Roboto Light", sans-serif;
}

.autocomplete-item:hover {
  background-color: rgba(104, 85, 224, 0.1);
}

.subscribe_btn {
  cursor: pointer;
  border: 0;
  border-radius: 4px;
  font-weight: 600;
  width: 200px;
  padding: 10px 20px;
  color: rgba(104, 85, 224, 1);
  background-color: rgba(255, 245, 238);
  border: 1px solid rgba(104, 85, 224, 1);
  box-shadow: 0 0 20px rgba(104, 85, 224, 0.2);
  transition: 0.4s;
  align-self: center;
  margin-top: 20px;
}

.subscribe_btn:hover {
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1),
  0px -4px 6px rgba(0, 0, 0, 0.1),
  4px 0px 6px rgba(0, 0, 0, 0.1),
  -4px 0px 6px rgba(0, 0, 0, 0.1);
  transform: scale(1.1);
}

.footerEP {
  display: flex;
  justify-content: center;
  padding: 20px 0;
}
</style>