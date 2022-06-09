<template>
  <v-form ref="form" v-model="valid" lazy- @submit.prevent="editRecipe">
    <v-title><h1>Edit Recipe</h1></v-title>
    <v-text-field
      v-model="title"
      :rules="nameRules"
      label="Title"
      required
      id="title"
    ></v-text-field>

    <v-text-field
      v-model="description"
      :rules="DescripcionRules"
      label="Description"
      id="description"
      required
    ></v-text-field>

    <v-select
      v-model="select"
      :items="difficulty"
      :rules="[(v) => !!v || 'Inserte la dificultad.']"
      label="Dificultad"
      id="difficulty"
      required
    ></v-select>

    <div v-for="(textField, i) in ingredients" :key="i" class="text-fields-row">
      <v-text-field
        :v-model="textField.value1"
        label="ingrediente"
        required
        id="ingredient"
      ></v-text-field>
    </div>
    <v-btn @click="addIngrediente">Añadir ingrediente</v-btn>
    <div v-for="(textField2, j) in steps" :key="j" class="text-fields-row">
      <v-text-field
        v-model="textField2.value2"
        label="Paso"
        id="step"
        required
      ></v-text-field>
    </div>
    <v-btn @click="addPaso">Añadir paso</v-btn>
    <v-btn
      :disabled="!valid"
      color="info"
      class="mr-4"
      @click="validate"
      type="submit"
    >
      Save
    </v-btn>
  </v-form>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    ingredients: [],
    steps: [],
    difficulty: ["1", "2", "3", "4", "5"],
    recipe: {
      title: "",
      description: "",
      ingredients: [],
      steps: [],
      difficulty: 0,
      fromUser: "",
    },
    editedRecipe: {
      title: "",
      description: "",
      ingredients: [],
      steps: [],
      difficulty: 0,
      fromUser: "",
    },
    valid: true,
    title: "",
    nameRules: [(v) => !!v || "Se necesita el nombre de la receta."],
    description: "",
    DescripcionRules: [(v) => !!v || "Se necesita una descripcion"],
    select: null,
    checkbox: false,
    recipeid: "",
  }),

  mounted() {
    this.recipeid = this.$route.query.recipeid;
    this.getRecipe();
  },

  methods: {
    validate() {
      this.$refs.form.validate();
    },

    addIngrediente() {
      this.ingredients.push({
        value1: "",
        label: "ingrediente",
        id: "ingredient",
      });
    },

    addPaso() {
      this.steps.push({
        value2: "",
        label: "Paso",
        id: "step",
      });
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
          this.editedRecipe = this.recipe;
        })
        .catch((error) => console.log(error));
    },

    editRecipe(e) {
      this.editedRecipe.title = e.target.elements.title.value;
      this.editedRecipe.description = e.target.elements.description.value;
      this.editedRecipe.difficulty = e.target.elements.difficulty.value;
      this.editedRecipe.fromUser = this.recipe.fromUser;

      // const ingredients = document.querySelectorAll("#ingredient");
      // for (var i = 0; i < ingredients.length; i++) {
      //   this.recipe.ingredients.push(ingredients[i].value);
      // }

      // const steps = document.querySelectorAll("#step");
      // for (var j = 0; j < steps.length; j++) {
      //   this.recipe.steps.push(steps[j].value);
      // }

      const options = {
        method: "PATCH",
        url: "http://localhost:3000/recipe",
        headers: {
          "content-type": "application/json",
          recipeid: this.recipeid,
        },
        data: this.editedRecipe,
      };
      axios(options)
        .then((response) => {
          if (response.status) {
            this.$router.push(`/home?userid=${this.recipe.fromUser}`);
          }
        })
        .catch((error) => console.log(error.response));
    },
  },
};
</script>
