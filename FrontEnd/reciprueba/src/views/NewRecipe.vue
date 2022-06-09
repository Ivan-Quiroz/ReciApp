<template>

  <v-form
    ref="form"
    v-model="valid"
    lazy-
    @submit.prevent="addRecipe"
  >
  
    <v-title><h1>Añadir receta.</h1></v-title>
    <v-text-field
      v-model="title"
      :counter="10"
      :rules="nameRules"
      label="Nombre"
      required
    ></v-text-field>

    <v-text-field
      v-model="description"
      :rules="DescripcionRules"
      label="Descripción"
      required
    ></v-text-field>

    <v-select
      v-model="select"
      :items="difficulty"
      :rules="[v => !!v || 'Inserte la dificultad.']"
      label="Dificultad"
      required
    ></v-select>

    <div
     v-for="(textField, i) in ingredients"
     :key="i"
     class="text-fields-row"
    >
<v-text-field
      :v-model="textField.value1"
      label="ingrediente"
      required
    ></v-text-field>
    </div>
    <v-btn
      @click="addIngrediente"
    >Añadir ingrediente</v-btn>
<div
     v-for="(textField2, j) in steps"
     :key="j"
     class="text-fields-row"
    >
<v-text-field
      v-model="textField2.value2"
      label="Paso"
      required
    ></v-text-field>
</div>
      <v-btn
      @click="addPaso"
    >Añadir paso</v-btn>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      type="submit"
    >
      Ingresar Receta
    </v-btn>
    <v-btn
      :disabled="!valid"
      color="info"
      class="mr-4"
      @click="validate"
    >
      Editar
    </v-btn>
    <v-btn
      :disabled="!valid"
      color="warning"
      class="mr-4"
      @click="validate"
    >
      borrar receta
    </v-btn>
  </v-form>
</template>

<script>

import axios from "axios";

  export default {
    data: () => ({
      ingredients: [],
      steps: [],
       difficulty: [
        '1',
        '2',
        '3',
        '4',
        '5',
      ],
      recipe:{
      valid: true,
      title: '',
      nameRules: [
        v => !!v || 'Se necesita el nombre de la receta.',
      ],
      description: '',
      DescripcionRules: [
        v => !!v || 'Se necesita una descripcion',
      ],
      select: null,

      },
      checkbox: false,
          }),
    methods: {
      validate () {
        this.$refs.form.validate()
      },
      addIngrediente(){
        this.ingredients.push({
          value1:"",
          label:"ingrediente"
        })
      },
      addPaso(){
        this.steps.push({
          value2:"",
          label:"Paso"
        })
      },
        addRecipe(e){
            this.recipe.title = e.target.elements.title.value;
            this.recipe.description = e.target.elements.description;
            this.recipe.ingredients = e.target.elements.ingredients;
            this.recipe.steps = e.target.elements.steps;

            const options = {
              method:"POST",
              url: "http://localhost:3000/user/CreateRecipe",
              headers:{"content-type":"aplication/json"},
              data: this.recipe,
            };
            axios(options)
            .then((response) => {
              if(response.status == 201){
                  //insertar sweetalert
                  console.log('chido');
              }
            })
            .catch((error) => console.log(error.response.data));
        }
    },
  }
</script>