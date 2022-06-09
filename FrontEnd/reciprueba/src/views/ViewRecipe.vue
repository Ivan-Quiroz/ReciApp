<template>
<v-card>
    <v-title>
        {{recipe.title}}
    </v-title>

    <v-title>
        {{recipe.creationDate}}
    </v-title>


    <v-title>
        {{recipe.fromUser}}
    </v-title>


    <v-list-item>
        <v-list-item-title>{{recipe.description}}</v-list-item-title>
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
    <v-list-item v-for="(ingredient,index) in ingredients" :key="'ingredients' + index"> 
        <v-list-item-title>{{recipe.ingredients}}</v-list-item-title>
    </v-list-item>

    <v-list-item v-for="(step,index) in ingredients" :key="'steps' + index"> 
        <v-list-item-title>{{recipe.steps}}</v-list-item-title>
    </v-list-item>

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

</v-card>
</template>

<script>
//import { defineComponent } from '@vue/composition-api'
//import axios from "axios";
//const _=require("loadsh");


export default{
    data: () => ({
        userid:"",
        recipeid:"",
        recipes: [],
    }),

    mouthed(){
        this.userid = this.$route.query.userid;
        this.recipeid = this.$route.query.recipeid;
        //getRecipe();
    },
    methods:{
        // getRecipe(){
        //     const options ={
        //         method: "GET",
        //         url: "http://localhost:3000/recipe/"+this.userid+"/"+this.recipeid,
        //         headers:{
        //             userid: this.userid,
        //             Authorization: localStorage.getItem("accessToken"),
        //         }
        //     };

        //     axios(options)
        //     .then((response) => (this.recipes = response.data))
        //     .catch((error) => console.log(error));
        // }
    }
};
</script>
