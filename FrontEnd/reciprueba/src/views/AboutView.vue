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
<v-container class="my-3">
      <v-card
    :loading="loading"
    class="mx-auto my-12"
    max-width="374"
  >
    <v-card-title>ejemplo</v-card-title>
    
    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
        <v-rating
          :value="4.5"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>
      </v-row>

      <div class="my-4 text-subtitle-1">
      </div>

      <div>Small plates, salads and sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="orange"
        text
        @click="reserve"
      >
       Ver
      </v-btn>
    </v-card-actions>
  </v-card>
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
