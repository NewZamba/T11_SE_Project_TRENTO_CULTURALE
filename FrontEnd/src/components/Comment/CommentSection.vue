<script>
import CommentCard from "./CommentCard.vue";
import Cookies from "js-cookie";

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
        const sortComments = (comments) => {
          return comments
              .sort((a, b) => new Date(b.date) - new Date(a.date)) // Ordine decrescente
              .map(comment => ({
                ...comment,
                replies: comment.replies ? sortComments(comment.replies) : []
              }));
        };

        this.comments = data.comments;
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
          await this.fetchComments();
          this.newCommentText = ""; // Resetta il campo di input
        } catch (error) {
          console.error("Error adding comment:", error);
        }
      }
    },
  },
  mounted() {
    this.id_event = this.$route.query.id_event;
    this.id_user = Cookies.get('id_user');
    this.fetchComments();
    console.log(this.comments);
  },
};
</script>

<template>
  <div class="p-4  overflow-y-auto">
    <div class="mb-4">
      <h2 class="text-primary font-weight-bold">Comments</h2>
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

    <!-- Sezione commenti -->
    <div v-for="comment in comments" :key="comment._id" class="mb-3">
      <CommentCard
          :comment="comment"
          :zIndex="comment.z_index"
          @refresh-comments="fetchComments"
      />
    </div>

  </div>
</template>

