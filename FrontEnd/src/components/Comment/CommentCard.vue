<script>

import Cookies from "js-cookie";

export default {
  name: 'CommentCard',
  props: {
    comment: Object,
    zIndex: Number,
  },
  data() {
    return {
      newReplyText: "",
      replyingTo: null, // Track the comment we're replying to
      id_user: null,
    };
  },
  methods: {
    handleReply(parentId) {
      console.log("Entro in handler");
      this.replyingTo = parentId;
      this.$emit('reply', { parentId });
    },
    addReply() {
      console.log("Entro in addReply");
      if (this.newReplyText.trim()) {
        this.addComment();
        this.newReplyText = "";  // Clear the input after submitting
        this.replyingTo = null;  // Reset replyingTo
      }
    },
    async addComment() {
        const newComment = {
          id_event: this.comment.id_event,
          id_user: this.comment.id_user,
          id_Parent: this.comment._id,
          text: this.newReplyText,
          date: new Date().toISOString(),
          z_index:this.comment.z_index+1,
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
          const responseComment = await response.json();
          const savedComment = await responseComment.comment;
          savedComment.replies=[];
          this.comment.replies.push(savedComment);
        } catch (error) {
          console.error("Error adding comment:", error);
        }
    },
  },
  mounted() {
    this.id_user = Cookies.get("id_User");
  }
};
</script>

<template>
  <div :style="{ zIndex: zIndex }" class="comment-card p-3 mb-2 border">
    <!-- Dati del commento -->
    <div class="comment-header">
      <strong>{{ comment.user_name }}</strong>
      <span class="text-muted"> - {{ new Date(comment.date).toLocaleString() }}</span>
    </div>
    <p>{{ comment.text }}</p>

    <!-- Tasto Reply -->
    <b-button-group>
      <b-button variant="primary" @click="handleReply(comment._id)" class="p-0">
        Reply
      </b-button>
      <!-- Tasto ELimina -->
      <b-button
          v-if="comment.id_user === this.id_user"
          variant="danger"
          size="sm"
          @click="deleteComment(comment._id)"
      >
        Delete
      </b-button>
    </b-button-group>


    <!-- Input per la risposta -->
    <div v-if="replyingTo === comment._id" class="mt-3">
      <textarea
          v-model="newReplyText"
          class="form-control"
          rows="3"
          placeholder="Write a reply..."
      ></textarea>
      <b-button variant="primary" class="mt-2" @click="addReply(comment._id,zIndex)">Send</b-button>
    </div>

    <!-- Se ci sono risposte, le mostriamo -->
    <div v-if="comment.replies.length" class="mt-3">
      <div v-for="reply in comment.replies" :key="reply._id" class="reply p-2 border-top">
        <CommentCard :comment="reply" @reply="handleReply" :zIndex="reply.z_index" :id_user="id_user" @add-reply="addReply" />
      </div>
    </div>

  </div>
</template>

<style scoped>
.comment-card {
  position: relative;
}
.reply {
  margin-left: 20px;
}
</style>
