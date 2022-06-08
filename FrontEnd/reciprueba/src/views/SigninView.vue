<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12">
              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row>
                    <v-col cols="12" md="11">
                      <v-card-text class="mt-12">
                        <h1
                          class="text-center display-2 teal--text text--accent-3"
                        >
                          Inicio de sesión
                        </h1>
                        <div class="text-center mt-4">
                          <v-btn class="mx-2" fab color="white" outlined>
                            <v-icon>mdi-facebook</v-icon>
                          </v-btn>

                          <v-btn
                            @click="IngresarGoogle"
                            class="mx-2"
                            fab
                            color="white"
                            outlined
                          >
                            <v-icon>mdi-google</v-icon>
                          </v-btn>
                          <v-btn class="mx-2" fab color="white" outlined>
                            <v-icon>mdi-linkedin</v-icon>
                          </v-btn>
                        </div>
                        <h4 class="text-center mt-4">
                          Ingrese correo y contraseña
                        </h4>
                        <v-form @submit.prevent="login">
                          <v-text-field
                            label="Email"
                            name="email"
                            id="email"
                            prepend-icon="email"
                            type="text"
                            color="teal accent-3"
                          />
                          <v-text-field
                            id="password"
                            label="Password"
                            name="password"
                            prepend-icon="lock"
                            type="password"
                            color="teal accent-3"
                          />
                          <div class="text-center mt-3">
                            <v-btn rounded color="orange" type="submit"
                              >SIGN IN</v-btn
                            >
                          </div>
                        </v-form>
                        <div class="text-center mt-3">
                          <v-btn rounded color="orange" @click="goToSignup"
                            >SIGN UP</v-btn
                          >
                        </div>
                      </v-card-text>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="2">
                  <v-row class="fill-height">
                    <v-col cols="12" md="4" class="teal accent-3">
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="step--"
                          >Ingresar</v-btn
                        >
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
//import {inject} from 'vue';
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data: () => ({
    user: {
      email: "",
      password: "",
    },
  }),
  props: {
    source: String,
  },
  methods: {
    login(e) {
      this.user.email = e.target.elements.email.value;
      this.user.password = e.target.elements.password.value;

      const options = {
        method: "POST",
        url: "http://localhost:3000/user/login",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: this.user,
      };

      axios(options)
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
    },

    goToSignup() {
      this.$swal({
        title: "Login Terminado",
        type: "success",
        icon: "",
        showCloseButton: true,
      });

      this.$router.push("signup");
    },
  },
};
</script>
