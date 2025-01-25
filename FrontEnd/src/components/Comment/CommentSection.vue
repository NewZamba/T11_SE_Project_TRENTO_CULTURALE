<script>
import CommentCard from "./CommentCard.vue";

export default {
  components: { CommentCard },
  data() {
    return {
      comments: [],
      newCommentText: "",
      id_event: null,
      id_user: null,
    };
  },
  methods: {
    async fetchComments() {
      try {
        const response = await fetch("http://localhost:3000/getComment",{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({id: this.id_event}),
        });
        if (!response.ok) throw new Error("Failed to fetch comments");
        const data = await response.json();
        this.comments = data.comments;
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    },
    async addComment() {
      if (this.newCommentText.trim()) {
        const newComment = {
          id_event: this.id_event,
          id_user: "6792655f15ee2db12a34f696", //da modificare
          id_Parent: null,
          text: this.newCommentText,
          date: new Date().toISOString(),
          user_name : this.id_user + " mpm ep ",
          z_index:0,
        };
        try {
          const response = await fetch("http://localhost:3000/addComment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newComment),
          });

          if (!response.ok) throw new Error("Failed to add comment");
          const savedComment = await response.json();
          this.comments.push(savedComment.comment); // Aggiungi il nuovo commento alla lista
          this.newCommentText = ""; // Resetta il campo di input
        } catch (error) {
          console.error("Error adding comment:", error);
        }
      }
    },
  },
  mounted() {
    this.id_event = this.$route.query.id_event;
    this.id_user = this.$route.query.id_user;
    this.fetchComments();
  },
};
</script>

<template>
  <div class="p-4  overflow-y-auto">
    <div class="mb-4">
      <h2 class="text-primary font-weight-bold">Comments</h2>
    </div>

    <!-- Sezione commenti -->
    <div v-for="comment in comments" :key="comment._id" class="mb-3">
      <CommentCard :comment="comment" :zIndex="comment.z_index"/>
    </div>

    <!-- Sezione per aggiungere un nuovo commento -->
    <div class="mt-4">
      <textarea
          v-model="newCommentText"
          class="form-control"
          rows="3"
          placeholder="Add a comment..."
      ></textarea>
      <b-button variant="primary" class="mt-2" @click="addComment">Send</b-button>
    </div>
  </div>
</template>

