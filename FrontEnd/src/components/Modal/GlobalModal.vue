<!-- src/components/GlobalModal.vue -->
<template>
  <b-modal ref="modal" :title="title" hide-footer>
    <div>
      <p>{{ message }}</p>
    </div>
  </b-modal>
</template>

<script>
import { EventBus } from '@/eventBus';

export default {
  name: 'GlobalModal',
  data() {
    return {
      title: '',
      message: '',
      showInput: false  // per decidere se mostrare l'input
    };
  },
  methods: {
    // Funzione per aprire il modal e impostare i dati passati
    open(payload) {
      this.title = payload.title || 'Titolo di default';
      this.message = payload.message || '';
      // Se si vuole mostrare la casella di testo, controlla la proprietà showInput
      this.showInput = payload.showInput || false;
      this.$refs.modal.show();
    }
  },
  created() {
    // Ascolta l'evento "open-global-modal" sull'Event Bus
    EventBus.$on('open-global-modal', this.open);
  },
  beforeDestroy() {
    // Rimuovi il listener prima di distruggere il componente
    EventBus.$off('open-global-modal', this.open);
  }
};
</script>
