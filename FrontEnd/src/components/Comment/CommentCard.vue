<template>
  <div
      class="comment-card card mb-3"
      :style="{ marginLeft: level * 20 + 'px', zIndex: zIndex }"
  >
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center mb-2">
        <strong>{{ comment.user_name }}</strong>
        <small class="text-muted">
          {{ new Date(comment.date).toLocaleString() }}
        </small>
      </div>
      <p class="card-text">{{ comment.text }}</p>
      <div class="d-flex">
        <b-button-group>
          <b-button variant="outline-primary" size="sm" @click="toggleReply">
            Reply
          </b-button>
          <b-button
              v-if="comment.id_user === id_user"
              variant="outline-danger"
              size="sm"
              @click="deleteComment(comment._id)"
          >
            Delete
          </b-button>
        </b-button-group>
      </div>

      <!-- Form per aggiungere una risposta -->
      <div v-if="showReplyForm" class="mt-3">
        <textarea
            v-model="newReplyText"
            class="form-control"
            rows="2"
            placeholder="Write a reply..."
        ></textarea>
        <b-button-group>
          <b-button variant="primary" class="mt-2" size="sm" @click="addReply">
            Send
          </b-button>
          <b-button variant="warning" class="mt-2" size="sm" @click="toggleReply">
            Hide
          </b-button>
        </b-button-group>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";

export default {
  name: "CommentCard",
  props: {
    comment: Object,
    level: {
      type: Number,
      default: 0,
    },
    // Per gestire eventuali z-index personalizzati, se necessario
    zIndex: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      newReplyText: "",
      showReplyForm: false,
      id_user: null,
    };
  },
  methods: {
    toggleReply() {
      this.showReplyForm = !this.showReplyForm;
    },
    async addReply() {
      if (this.newReplyText.trim()) {
        const newComment = {
          id_event: this.comment.id_event,
          id_user: this.id_user,
          id_Parent: this.comment._id,
          text: this.newReplyText,
          date: new Date().toISOString(),
          // Incrementa lo z_index se vuoi differenziare graficamente le risposte
          z_index: this.comment.z_index + 1,
        };

        try {
          const response = await fetch(import.meta.env.VITE_APP_API_URL + "/comments/add", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newComment),
          });
          if (!response.ok) throw new Error("Failed to add comment");
          this.$emit("refresh-comments");
          this.newReplyText = "";
          this.showReplyForm = false;
        } catch (error) {
          console.error("Error adding comment:", error);
        }
      }
    },
    async deleteComment(commentId) {
      if (confirm("Sei sicuro di voler eliminare questo commento e tutte le risposte correlate?")) {
        try {
          const response = await fetch(import.meta.env.VITE_APP_API_URL + `comments/del/${commentId}`, {
            method: "DELETE",
          });
          if (!response.ok) throw new Error("Failed to delete comment");
          this.$emit("refresh-comments");
        } catch (error) {
          console.error("Error deleting comment:", error);
        }
      }
    },
  },
  mounted() {
    this.id_user = Cookies.get("id_user");
  },
};
</script>

<style scoped>
.comment-card.card {
  transition: box-shadow 0.3s;
}
.comment-card.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
.card-body {
  padding: 1rem;
}
</style>
