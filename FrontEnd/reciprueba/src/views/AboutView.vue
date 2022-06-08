<template>
  <HelloWorld />
      <v-app-bar app color="orange">
      <v-spacer/>
      <v-spacer/>
       <v-img
    class="mx-2"
    src="../assets/libro-de-recetas.png"
    max-height="40"
    max-width="40"
    contain
  ></v-img>
      <v-toolbar-title>Reciapp</v-toolbar-title>
      <v-spacer/>
    </v-app-bar>

    <v-main>
      <!--  -->

      ReciApp, creada por Iván Alejandro Rodríguez Quiroz y Roberto de Santiago Nájera como proyecto final para el curso de "Desarrollo Web Pila Completa 1" impartida por el docente Juan Carlos Rodríguez Ulloa en el Instituto Tecnológico de la Laguna, Torreón, Coahuila a 07 de junio de 2022.

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
</template>

<script>
import { defineComponent } from 'vue';

// Components


export default defineComponent({
  name: 'HomeView',

  components: {
    
  },
  data: () => ({
      loading: false,
      selection: 1,
    }),
    methods: {
      reserve () {
        this.loading = true
        setTimeout(() => (this.loading = false), 2000)
      },
    },
});
</script>
