<template>
  <div class="comments-container p-4 overflow-y-auto">
    <div class="mb-4">
      <h2 class="title">Comments</h2>
    </div>
    <!-- Sezione per aggiungere un nuovo commento -->
    <div class="mb-4">
      <textarea
          v-model="newCommentText"
          class="form-control new-comment-text"
          rows="3"
          placeholder="Add a comment..."
      ></textarea>
      <b-button variant="primary" class="mt-2" @click="addComment">Send</b-button>
    </div>

    <!-- Lista piatta dei commenti -->
    <div v-for="comment in flatComments" :key="comment._id" class="mb-3">
      <CommentCard
          :comment="comment"
          :level="comment.level"
          @refresh-comments="fetchComments"
      />
    </div>
  </div>
</template>

<script>
import CommentCard from "./CommentCard.vue";
import Cookies from "js-cookie";

export default {
  components: {CommentCard},
  props: {
    id_event: {type:String},
  },
  data() {
    return {
      comments: [],
      newCommentText: "",
      id_user: null,
    };
  },
  computed: {
    // Appiattisce la struttura ad albero dei commenti, aggiungendo il livello per l'indentazione
    flatComments() {
      const flatten = (comments, level = 0) => {
        return comments.reduce((acc, comment) => {
          comment.level = level;
          acc.push(comment);
          if (comment.replies && comment.replies.length) {
            acc.push(...flatten(comment.replies, level + 1));
          }
          return acc;
        }, []);
      };
      return flatten(this.comments);
    },
  },
  methods: {
    async fetchComments() {
      try {
        const response = await fetch(process.env.DEPLOY_API + '/comments/get', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({id: this.id_event}),
        });
        if (!response.ok) throw new Error("Failed to fetch comments");
        const data = await response.json();

        // Ordina i commenti per data in ordine decrescente, applicando la stessa logica ai figli
        const sortComments = (comments) => {
          return comments
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((comment) => ({
                ...comment,
                replies: comment.replies ? sortComments(comment.replies) : [],
              }));
        };

        this.comments = sortComments(data.comments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    },
    async addComment() {
      if (this.newCommentText.trim()) {
        const newComment = {
          id_event: this.id_event,
          id_user: this.id_user,
          id_Parent: null,
          text: this.newCommentText,
          date: new Date().toISOString(),
          z_index: 0,
        };
        try {
          const response = await fetch(process.env.DEPLOY_API + '/comments/add', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newComment),
          });
          if (!response.ok) throw new Error("Failed to add comment");
          await this.fetchComments();
          this.newCommentText = "";
        } catch (error) {
          console.error("Error adding comment:", error);
        }
      }
    },
  },
  mounted() {
    this.id_user = Cookies.get("id_user");
    this.fetchComments();
  },
};
</script>

<style scoped>
.comments-container {
  background: rgb(255, 245, 238);
  border-radius: 8px;
}

.title {
  color: #333;
  font-weight: bold;
}

.new-comment-text {
  resize: none;
}
</style>
