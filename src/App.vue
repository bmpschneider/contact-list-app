<template>
  <v-app>
    <!-- <Header /> -->
    <v-main>
      <Home />
    </v-main>
  </v-app>
</template>

<script>
// import Header from "./components/Header.vue";
import Home from "./views/Home";

export default {
  name: "App",

  components: {
    Home,
    // Header,
  },
};
</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
}

main {
  background-color: #f1f1f1;
  background-image: url("assets/background.jpg");
  background-repeat: repeat;
}
</style>
