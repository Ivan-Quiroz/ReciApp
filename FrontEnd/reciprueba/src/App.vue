 
<template>
  <v-app>
    <div class="main-Component">
    <router-view></router-view>
    </div>
  </v-app>
</template>

<script>


  export default {
    data: () => ({ drawer: null }),
  }
</script>