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
                          Registro
                        </h1>
                        <h4 class="text-center mt-4">
                          Ensure your email for registration
                        </h4>
                        <v-form
                          method="POST"
                          action="http://localhost:3000/user"
                        >
                          <v-text-field
                            id="name"
                            label="FirstName"
                            name="name"
                            prepend-icon="lock"
                            type="text"
                            color="teal accent-3"
                          />
                          <v-text-field
                            id="lastName"
                            label="LastName"
                            name="lastName"
                            prepend-icon="lock"
                            type="text"
                            color="teal accent-3"
                          />
                          <v-text-field
                            id="email"
                            label="email"
                            name="email"
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
                          <v-btn rounded color="orange" type="submit">
                            SIGN UP
                          </v-btn>
                        </v-form>
                        <div class="text-center mt-3">
                          <v-btn
                            rounded
                            color="orange"
                            @click="preventDefault(e)"
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
                          >Sign in</v-btn
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

export default {
  data: () => ({
    step: 1,
  }),
  mounted() {},
  props: {
    source: String,
  },
  methods: {
    preventDefault(e) {
      e.preventDefault();
    },
    Signup() {
      const user = {
        name: "vue",
        lastName: "user",
        email: `vue${Date.now()}@mail.com`,
        password: "vue",
      };

      const options = {
        method: "POST",
        url: "http://localhost:3000/user",
        headers: { "content-type": "application/json" },
        data: user,
      };

      axios(options)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => console.log(error.response.data));
    },
    // async IngresarGoogle() {
    //   try {
    //     const googleUser = await this.$gAuth.signIn();

    //     if (!googleUser) {
    //       return null;
    //     }

    //     this.user = googleUser.googleBasicProfile().getEmail();
    //   } catch (error) {
    //     console.log(error);
    //     return;
    //   }
    // },
  },
};
</script>
