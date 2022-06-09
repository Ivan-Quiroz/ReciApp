 
<template>
  <v-app id="reciapp">
    
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
<v-container class="my-3">
      <v-card
    :loading="loading"
    class="mx-auto my-12"
    max-width="374"
  >
    
    <v-card-title>Reciapp</v-card-title>
    <v-card-text>
    ReciApp, creada por Iván Alejandro Rodríguez Quiroz y Roberto de Santiago Nájera como proyecto final para el curso de "Desarrollo Web Pila Completa 1" impartida por el docente Juan Carlos Rodríguez Ulloa en el Instituto Tecnológico de la Laguna, Torreón, Coahuila a 07 de junio de 2022.
      </v-card-text>
      <v-img
    class="mx-2"
    src="../assets/logo-itl.png"
    max-height="40"
    max-width="40"
    contain
  ></v-img>
  </v-card>
</v-container>
    </v-main>

    <v-bottom-navigation v-model="value">
    <v-btn @click="goToAbout" value="About">
      <span>Home</span>

      <v-icon>mdi-information</v-icon>
    </v-btn>

    <v-btn value="NewRecipe">
      <span>Nueva Receta</span>

      <v-icon>mdi-plus</v-icon>
    </v-btn>

  </v-bottom-navigation>
  </v-app>
</template>
<script>
export default{
   data: () => ({
    userid: "",
  }),

  mounted() {
    this.userid = this.$route.query.userid;
  },
  methods:{
    goToNewRecipe(){
      this.$router.push(`/newRecipe?userid=${this.userid}`);
    },
    goToAbout(){
      this.$router.push(`/home?userid=${this.userid}`);
    },
  }
}
//import { defineComponent } from '@vue/composition-api'

// export default defineComponent({
//   setup() {
    
//   },
// })
</script>
