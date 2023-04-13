<template>
  <v-app-bar flat dense class="px-3">
    <v-app-bar-title>Tobias Maas</v-app-bar-title>
    <v-btn to="/">Home</v-btn>
    <v-btn to="/portfolio">Portfolio</v-btn>
    <v-btn to="/cv">CV</v-btn>
    <v-btn to="/contact">Contact</v-btn>
  </v-app-bar>



  
</template>

<script>
export default {
  data: () => ({
    links: [
      { icon: "mdi-home", text: "Start", route: "/" },
      { icon: "mdi-dots-grid", text: "Portofolio", route: "/portfolio" },
      { icon: "mdi-account", text: "CV", route: "/cv" },
      { icon: "mdi-email", text: "Contact", route: "/contact" },
    ],
  })
}
</script>
<style>
.v-toolbar__content {
  border-bottom: 1px solid #E0E0E0;
}
</style>
