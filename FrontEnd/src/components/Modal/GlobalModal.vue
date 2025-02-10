<template>
  <b-modal ref="modal" hide-footer centered>
    <!-- Custom Header -->
    <template #modal-header="{ close }">
      <div class="custom-header">
        <h5 class="modal-title">{{ title }}</h5>
        <span class="custom-close" @click="close()">×</span>
      </div>
    </template>

    <!-- Corpo del modal -->
    <div>
      {{ message }}
    </div>
  </b-modal>
</template>

<script>
import { EventBus } from '../../eventBus.js';

export default {
  name: 'GlobalModal',
  data() {
    return {
      title: '',
      message: '',
    };
  },
  methods: {
    open(payload) {
      this.title = payload.title || 'Titolo di default';
      this.message = payload.message || '';
      this.$refs.modal.show();
    }
  },
  created() {
    EventBus.$on('open-global-modal', this.open);
  },
  beforeDestroy() {
    EventBus.$off('open-global-modal', this.open);
  }
};
</script>

<style scoped>
/* Stile per la barra del titolo */
.custom-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

/* Stile per la X di chiusura */
.custom-close {
  font-size: 24px;  /* Grandezza simile a quella dell'immagine */
  font-weight: bold;
  cursor: pointer;
  user-select: none;
  line-height: 1;
  color: #333; /* Colore simile */
}

.custom-close:hover {
  color: #000; /* Cambia colore al passaggio del mouse */
}
</style>
