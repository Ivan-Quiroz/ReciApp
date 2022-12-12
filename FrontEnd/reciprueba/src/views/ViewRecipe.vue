<template>
  <div class="text-center my-4">
    <h1>{{ recipe.title }}</h1>

    <div class="d-flex flex-column align-center">
      <v-list-item>
        <v-list-item-title>{{ recipe.creationDate }}</v-list-item-title>
      </v-list-item>

      <div>
        <h2>Description</h2>
        <v-card width="400" height="auto" class="overflow-auto my-4">
          <v-card-text>
            {{ recipe.description }}
          </v-card-text>
        </v-card>
      </div>

      <div class="my-0">
        <h2>Difficulty</h2>
        <v-rating
          readonly
          v-model="rating"
          :value="3"
          color="amber"
          hover
          size="18"
        ></v-rating>
      </div>

      <div>
        <h2>Ingredients</h2>
        <ul>
          <li
            v-for="(ingredient, index) in recipe.ingredients"
            :key="'ingredients' + index"
          >
            <v-list-item-title>{{ ingredient }}</v-list-item-title>
          </li>
        </ul>
      </div>

      <div>
        <h2>Ingredients</h2>
        <ol>
          <li v-for="(step, index) in recipe.steps" :key="'step' + index">
            <v-list-item-title>{{ step }}</v-list-item-title>
          </li>
        </ol>
      </div>
    </div>
  </div>
  <div class="d-flex justify-center my-8">
    <v-btn color="info" class="mr-4 mx-4" @click="goToEditRecipe">
      edit recipe
    </v-btn>
    <v-btn color="warning" class="mr-4" @click="deleteRecipe">
      delete recipe
    </v-btn>
    <v-btn color="info" class="mr-4 mx-4" @click="goToHome">
      back to home
    </v-btn>
  </div>
</template>

<script>
//import { defineComponent } from '@vue/composition-api'
import axios from "axios";
import Swal from "sweetalert2";
//const _=require("loadsh");

export default {
  data: () => ({
    userid: "",
    recipeid: "",
    recipe: {},
    options: {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    },
    rating: 0,
  }),

  mounted() {
    this.recipeid = this.$route.query.recipeid;
    this.getRecipe();
  },

  methods: {
    displaySuccess() {
      Swal.fire("", "Recipe deleted successfully", "success");
    },
    displayError(error) {
      Swal.fire("", error, "error");
    },

    getRecipe() {
      const options = {
        method: "GET",
        url: "http://localhost:3000/recipe",
        headers: {
          recipeid: this.recipeid,
        },
      };

      axios(options)
        .then((response) => {
          this.recipe = response.data;
          this.rating = this.recipe.difficulty;
        })
        .catch((error) => console.log(error));
    },

    deleteRecipe() {
      const options = {
        method: "DELETE",
        url: "http://localhost:3000/recipe",
        headers: {
          recipeid: this.recipeid,
        },
      };

      axios(options)
        .then((response) => {
          console.log(response);
          this.displaySuccess();
          this.$router.push(`/home?userid=${this.recipe.fromUser}`);
        })
        .catch((error) => this.displayError(error.data));
    },

    goToEditRecipe() {
      this.$router.push(`/editRecipe?recipeid=${this.recipeid}`);
    },

    goToHome() {
      this.$router.push(`/home?userid=${this.recipe.fromUser}`);
    },
  },
};
</script>
