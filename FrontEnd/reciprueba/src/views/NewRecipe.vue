<template>
  <v-form ref="form" v-model="valid" lazy- @submit.prevent="addRecipe">
    <v-title><h1>Add Recipe</h1></v-title>
    <v-text-field
      v-model="title"
      :counter="10"
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
      label="Difficulty"
      id="difficulty"
      required
    ></v-select>

    <div v-for="(textField, i) in ingredients" :key="i" class="text-fields-row">
      <v-text-field
        :v-model="textField.value1"
        label="Ingredient"
        required
        id="ingredient"
      ></v-text-field>
    </div>
    <v-btn @click="addIngrediente">Add Ingredient</v-btn>
    <div v-for="(textField2, j) in steps" :key="j" class="text-fields-row">
      <v-text-field
        v-model="textField2.value2"
        label="Step"
        id="step"
        required
      ></v-text-field>
    </div>
    <v-btn @click="addPaso">add step</v-btn>

    <v-btn :disabled="!valid" color="success" class="mr-4" type="submit">
      Save recipe
    </v-btn>
  </v-form>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

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
    valid: true,
    title: "",
    nameRules: [(v) => !!v || "Se necesita el nombre de la receta."],
    description: "",
    DescripcionRules: [(v) => !!v || "Se necesita una descripcion"],
    select: null,
    checkbox: false,
  }),

  methods: {
    displaySuccess() {
      Swal.fire("", "Recipe created successfully", "success");
    },
    displayError(error) {
      Swal.fire("", error, "error");
    },

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

    addRecipe(e) {
      const userid = this.$route.query.userid;

      this.recipe.title = e.target.elements.title.value;
      this.recipe.description = e.target.elements.description.value;
      this.recipe.difficulty = e.target.elements.difficulty.value;
      this.recipe.fromUser = userid;

      const ingredients = document.querySelectorAll("#ingredient");
      for (var i = 0; i < ingredients.length; i++) {
        this.recipe.ingredients.push(ingredients[i].value);
      }

      const steps = document.querySelectorAll("#step");
      for (var j = 0; j < steps.length; j++) {
        this.recipe.steps.push(steps[j].value);
      }

      const options = {
        method: "POST",
        url: "http://localhost:3000/recipe",
        data: this.recipe,
      };

      axios(options)
        .then((response) => {
          if (response.status == 201) {
            this.displaySuccess();
            this.$router.push(`/home?userid=${userid}`);
          }
        })
        .catch((error) => this.displayError(error.data));
    },
  },
};
</script>
