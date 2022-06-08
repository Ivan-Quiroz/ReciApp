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
                        >Inicio de sesión</h1>
                        <div class="text-center mt-4">
                          <v-btn class="mx-2" fab color="white" outlined>
                            <v-icon>mdi-facebook</v-icon>
                          </v-btn>

                          <v-btn @click='IngresarGoogle' class="mx-2" fab color="white" outlined>
                            <v-icon>mdi-google</v-icon>
                          </v-btn>
                          <v-btn class="mx-2" fab color="white" outlined>
                            <v-icon>mdi-linkedin</v-icon>
                          </v-btn>
                        </div>
                        <h4 class="text-center mt-4">Ingrese correo y contraseña</h4>
                        <v-form>
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
                        <v-btn rounded color="orange">SIGN IN</v-btn>
                        <v-btn rounded color="orange">SIGN UP</v-btn>
                      </div>
                      </v-card-text>
                      
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="2">
                  <v-row class="fill-height">
                    <v-col cols="12" md="4" class="teal accent-3">
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="step--">Ingresar</v-btn>
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