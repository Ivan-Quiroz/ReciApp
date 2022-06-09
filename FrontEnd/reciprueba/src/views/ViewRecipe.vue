<template>
  <v-card>
    <v-title> {{ recipe.title }} </v-title>

    <v-list-item>
      <v-list-item-title>{{ recipe.creationDate }}</v-list-item-title>
    </v-list-item>

    <v-list-item>
      <v-list-item-title>{{ recipe.description }}</v-list-item-title>
    </v-list-item>
    <v-row align="center" class="mx-0">
      <v-rating
        :value="3"
        v-model="rating"
        color="amber"
        hover
        size="18"
      ></v-rating>
    </v-row>
    <v-list-item
      v-for="(ingredient, index) in recipe.ingredients"
      :key="'ingredients' + index"
    >
      <v-list-item-title>{{ ingredient }}</v-list-item-title>
    </v-list-item>

    <v-list-item v-for="(step, index) in recipe.steps" :key="'step' + index">
      <v-list-item-title>{{ step }}</v-list-item-title>
    </v-list-item>

    <v-btn color="info" class="mr-4" @click="goToEditRecipe">
      edit recipe
    </v-btn>
    <v-btn color="warning" class="mr-4" @click="deleteRecipe">
      delete recipe
    </v-btn>
  </v-card>
</template>

<script>
//import { defineComponent } from '@vue/composition-api'
import axios from "axios";
//const _=require("loadsh");

export default {
  data: () => ({
    userid: "",
    recipeid: "",
    recipe: {},
  }),

  mounted() {
    this.recipeid = this.$route.query.recipeid;
    this.getRecipe();
  },

  methods: {
    getRecipe() {
      const options = {
        method: "GET",
        url: "http://localhost:3000/recipe",
        headers: {
          recipeid: this.recipeid,
        },
      };

      axios(options)
        .then((response) => (this.recipe = response.data))
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
          this.$router.push(`/home?userid=${this.recipe.fromUser}`);
        })
        .catch((error) => console.log(error));
    },

    goToEditRecipe() {
      this.$router.push(`/editRecipe?recipeid=${this.recipeid}`);
    },
  },
};
</script>
