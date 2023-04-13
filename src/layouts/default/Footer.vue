<template>
  <v-footer class="white">
    <v-row justify="center" no-gutters>
      <v-divider></v-divider>
      <v-btn v-for="link in links" :key="link" color="black" variant="text" class="mx-2" rounded="xl" :href="link.to">
        {{ link.name }}
      </v-btn>
      <v-col class="text-center mt-4" cols="12">
        {{ new Date().getFullYear() }} — <strong>Tobias Maas</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    links: [
    {"name":"Website", "to":"https://saibot101.github.io/portfolio/", "icon":"mdi-web"},
    {"name":"Github", "to":"https://github.com/Saibot101/", "icon":"mdi-github"},
    {"name":"Contact", "to":"https://saibot101.github.io/portfolio/contact", "icon":"mdi-email"},
    {"name":"LinkedIn", "to":"https://www.linkedin.com/in/tobias-maas-295825222/", "icon":"mdi-linkedin"},
    ],
  }),
}
</script>