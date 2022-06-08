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
                        >Registro</h1>
                        <h4 class="text-center mt-4">Ensure your email for registration</h4>
                        <v-form>
                          <v-text-field
                            id="FirstName"
                            label="FirstName"
                            name="FirstName"
                            prepend-icon="lock"
                            type="text"
                            color="teal accent-3"
                          />
                          <v-text-field
                            id="LastName"
                            label="LastName"
                            name="LastName"
                            prepend-icon="lock"
                            type="text"
                            color="teal accent-3"
                          />
                          <v-text-field
                            label="Email"
                            name="Email"
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
                        </v-form>
                        <div class="text-center mt-3">
                        <v-btn rounded color="orange">Resgistrarse</v-btn>
                      </div>
                      </v-card-text>
                      
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="2">
                  <v-row class="fill-height">
                    <v-col cols="12" md="4" class="teal accent-3">
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="step--">Sign in</v-btn>
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


export default {
  data: () => ({
    step: 1
  }),
  props: {
    source: String
  },
    methods: {
    async IngresarGoogle(){
      try{

      const googleUser = await this.$gAuth.signIn();

      if(!googleUser){
        return null
      }

       this.user = googleUser.googleBasicProfile().getEmail();
      } catch (error) {
        console.log(error);
        return
    }
    }
  },
};
</script>