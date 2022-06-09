<template>
  <v-app id="reciapp">
    <v-app-bar app color="orange">
      <v-spacer />
      <v-spacer />
      <v-img
        class="mx-2"
        src="../assets/libro-de-recetas.png"
        max-height="40"
        max-width="40"
        contain
      ></v-img>
      <v-toolbar-title>Reciapp</v-toolbar-title>
      <v-spacer />
    </v-app-bar>

    <v-main>
      <!--  -->
      <v-container class="my-3">
        <v-row v-for="(recipes, index) in groupedRecipes" :key="index">
          <v-col v-for="recipe in recipes" :key="recipe._id">
            <v-card
              :loading="loading"
              class="mx-auto my-12"
              max-width="374"
              :id="recipe._id"
            >
              <v-card-title>{{ recipe.title }}</v-card-title>

              <v-card-text>
                <v-row align="center" class="mx-0">
                  <v-rating
                    :value="3"
                    v-model="rating"
                    color="amber"
                    hover
                    size="18"
                  ></v-rating>
                </v-row>

                <div class="my-4 text-subtitle-1"></div>

                <div>
                  {{ recipe.description }}
                </div>
              </v-card-text>
              <v-card-actions>
                <v-btn color="orange" text @click="ViewRecipe(recipe._id)">
                  See Recipe
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-bottom-navigation v-model="value">
      <v-btn value="About">
        <span>Info</span>

        <v-icon>mdi-information</v-icon>
      </v-btn>

      <v-btn value="NewRecipe">
        <span>Nueva Receta</span>

        <v-icon>mdi-plus</v-icon>
      </v-btn>

      <v-btn value="User">
        <span>Usuario</span>

        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
import axios from "axios";
const _ = require("lodash");

export default {
  data: () => ({
    userid: "",
    recipes: [],
    // rating: 3,
  }),

  mounted() {
    this.userid = this.$route.query.userid;
    this.getRecipes();
  },

  methods: {
    getRecipes() {
      const options = {
        method: "GET",
        url: "http://localhost:3000/recipe/home",
        headers: {
          userid: this.userid,
          Authorization: localStorage.getItem("accessToken"),
        },
      };

      axios(options)
        .then((response) => (this.recipes = response.data))
        .catch((error) => console.log(error));
    },

    ViewRecipe(recipeId) {
      console.log(recipeId);
      const options = {
        method: "GET",
        url: "http://localhost:3000/recipe",
        headers: {
          recipeid: recipeId,
        },
      };

      axios(options)
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
    },
  },

  computed: {
    groupedRecipes() {
      return _.chunk(this.recipes, 3);
    },
  },
};
</script>
