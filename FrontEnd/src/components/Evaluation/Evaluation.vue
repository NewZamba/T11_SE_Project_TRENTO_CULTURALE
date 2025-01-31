<template>
  <div class="container mt-5">
      <b-form-group label="Dai un voto:" label-for="rating" style="background-color: transparent">
        <b-form-rating id="rating" v-model="rating" inline @change="submitRating" variant="warning"></b-form-rating>
      </b-form-group>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import {almostWhole} from "chart.js/helpers";

export default {
  props: {
    id_event : String,
  },
  data() {
    return {
      rating: 0, // Valore iniziale
      id_user:null,
      old_evaluation:null,
    };
  },
  methods: {
    async submitRating() {
        if(!this.old_evaluation||this.old_evaluation.rating!=this.rating){
          this.addRating()
        }
    },
    async addRating() {
        try {
          const response = await fetch("http://localhost:3000/addEvaluation", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(
                {
                  id_event: this.id_event,
                  id_user :this.id_user,
                  rating: this.rating
                }),
          });
          if (!response.ok) throw new Error("Failed to add comment");
          else {
            const data = await response.json();
            this.old_evaluation = data.evaluation;
            console.log(this.old_evaluation);
          }
        }catch(error) {
          console.log(error)}
      },
    async getEvaluation() {
      try {
        const response = await fetch("http://localhost:3000/getEvaluation", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
              {
                id_event: this.id_event,
                id_user :this.id_user,
              }),
        });
        if (!response.ok) throw new Error("Failed to add comment");
        else {
          const data = await response.json();
          console.log(data);
          this.old_evaluation = data;
          console.log(this.old_evaluation);
          this.rating = this.old_evaluation.rating;
        }
      }catch(error) {
        console.log(error)}
    },
  },
  mounted() {
    console.log("ID evento ricevuto:", this.id_event);
    this.id_user = Cookies.get("id_User");
    this.getEvaluation();
  }
};
</script>

<style>
.container {
  max-width: 200px;
  background-color: transparent;
}
</style>
