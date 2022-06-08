<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="name"
      :counter="10"
      :rules="nameRules"
      label="Nombre"
      required
    ></v-text-field>

    <v-text-field
      v-model="descripcion"
      :rules="DescripcionRules"
      label="Descripción"
      required
    ></v-text-field>

    <v-select
      v-model="select"
      :items="Dificultad"
      :rules="[v => !!v || 'Inserte la dificultad.']"
      label="Item"
      required
    ></v-select>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="validate"
    >
      Ingresar Receta
    </v-btn>
  </v-form>
</template>

<script>
  export default {
    data: () => ({
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Se el nombre de la receta.',
      ],
      email: '',
      DescripcionRules: [
        v => !!v || 'Se necesita una descripcion',
      ],
      select: null,
      Dificultad: [
        '1',
        '2',
        '3',
        '4',
        '5',
      ],
      checkbox: false,
    }),
    methods: {
      validate () {
        this.$refs.form.validate()
      },
    },
  }
</script>