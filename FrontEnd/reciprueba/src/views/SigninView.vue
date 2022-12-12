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
                          Login
                        </h1>
                        <div class="text-center mt-4">
                          <v-btn
                            class="mx-2"
                            fab
                            color="white"
                            outlined
                            href="http://localhost:3000/user/auth/facebook"
                          >
                            <v-icon>mdi-facebook</v-icon>
                          </v-btn>
                        </div>
                        <h4 class="text-center mt-4">
                          Enter your email and password
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
                          <v-text>
                            <h4>Not registered yet?</h4>
                          </v-text>
                          <v-btn rounded color="orange" @click="goToSignup"
                            >SIGN UP</v-btn
                          >
                        </div>
                      </v-card-text>
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
// import { inject, toRefs } from "vue";
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data: () => ({
    user: {
      email: "",
      password: "",
    },
  }),

  mounted() {},

  props: {
    source: String,
  },

  methods: {
    displaySuccess() {
      Swal.fire("", "Welcome", "success");
    },
    displayError(error) {
      Swal.fire("", error, "error");
    },

    login(e) {
      console.log(e.target.elements.email);
      if (!e.target.elements.email.value || !e.target.elements.password.value) {
        this.displayError("All fields are required");
        return;
      }

      this.user.email = e.target.elements.email.value;
      this.user.password = e.target.elements.password.value;

      const options = {
        method: "POST",
        url: "http://localhost:3000/user/login",
        auth: { username: this.user.email, password: this.user.password },
      };

      axios(options)
        .then((response) => {
          if (response.status === 200) {
            localStorage.setItem(
              "accessToken",
              `Bearer ${response.data.token}`
            );
            this.displaySuccess();
            this.$router.push(`/home?userid=${response.data._id}`);
          }
        })
        .catch((error) => {
          console.log(error);
          this.displayError("Incorrect username and/or password.");
        });
    },

    goToSignup() {
      this.$router.push("signup");
    },
  },
};
</script>
