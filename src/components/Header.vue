<template>
  <v-app-bar class="app-bar" app color="primary" dark>
    <div class="d-flex align-center">
      <img class="logo" src="@/assets/contactlist.png" height="10px" />
      <span class="mr-2">CONTACT LIST</span>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
img {
  height: 45px !important;
}

.app-bar {
  display: flex;
  justify-content: start;
}
</style>
