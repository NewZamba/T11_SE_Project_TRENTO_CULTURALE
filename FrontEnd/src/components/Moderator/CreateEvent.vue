<script>
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
        const response = await fetch('http://localhost:3000/tags');
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
        const response = await fetch('http://localhost:3000/addEvent', {
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

        alert('Evento creato');
      } catch (error) {
        alert(error.message);
      }
    },
    resetForm() {
      this.name_event = '';
      this.img_event = '';
      this.description_event = '';
      this.location_event = '';
      this.date_event = '';
      this.selectedTags = [];
      this.tagInput = '';
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

      <!-- Tags Section -->
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
  width: 45%;
  height: 80%;
  border-radius: 20px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1),
  0px -4px 6px rgba(0, 0, 0, 0.05),
  4px 0px 6px rgba(0, 0, 0, 0.05),
  -4px 0px 6px rgba(0, 0, 0, 0.05);
  margin: auto auto;
  background-color: azure;
  padding: 20px;
}

.event {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #84d0d0;
  color: white;
  font-family: 'Helvetica', sans-serif;
  font-size: larger;
  padding: 20px;
  border-radius: 10px;
}

input, textarea {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.tags-section {
  margin: 10px 0;
}

.selected-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 10px;
}

.tag {
  padding: 5px 10px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  gap: 5px;
  color: white;
  font-size: 14px;
}

.remove-tag {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 16px;
  padding: 0 5px;
}

.tag-input-container {
  position: relative;
}

.autocomplete-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
}

.autocomplete-item {
  padding: 8px 12px;
  cursor: pointer;
  color: #333;
  background-color: white;
}

.autocomplete-item:hover {
  background-color: #f5f5f5;
}

.subscribe_btn {
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  background-color: #84d0d0;
  color: white;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
}

.subscribe_btn:hover {
  background-color: #6ab3b3;
}
</style>