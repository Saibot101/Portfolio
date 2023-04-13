<template>
  <nav>
    <v-navigation-drawer
      v-model="drawer"
      app
      class="grey darken-4"
      :mini-variant.sync="drawer"
      permanent
    >
      <v-list class="mt-5">
        <v-app-bar-nav-icon
        color="white"
          @click="changeDrawer()"
          class="ml-2 mt-n8"
          bigger
        ></v-app-bar-nav-icon>

        <v-list-item class="ml-n2 mb-4">
          <v-list-item-avatar>
            <v-img src="../assets/hacker.png"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="pl-2 grey--text lighten-1">
              Tobias Maas
            </v-list-item-title>
            <v-list-item-title class="pl-2 mt-1 grey--text lighten-1">
              Data Science Student
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          v-for="link in links"
          :key="link.text"
          link
          :to="link.route"
        >
          <v-list-item-icon>
            <v-icon color="white">{{ link.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              v-text="`${link.text}`"
              class="grey--text lighten-1"
            ></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-card
        class="d-flex align-end px-10"
        height="60%"
        color="transparent"
        flat
      >
        <v-row justify="space-between" class="mt-auto mb-5" v-if="!drawer">
          <v-btn href="https://saibot101.github.io/portfolio/" icon
            ><v-icon color="white">mdi-web</v-icon></v-btn
          >
          <v-btn icon href="https://github.com/Saibot101/"
            ><v-icon color="white">mdi-github</v-icon></v-btn
          >
          <v-btn icon href="https://saibot101.github.io/portfolio/contact"
            ><v-icon color="white">mdi-email</v-icon></v-btn
          >
          <v-btn icon href="https://www.linkedin.com/in/tobias-maas-295825222/"
            ><v-icon color="white">mdi-linkedin</v-icon></v-btn
          >
        </v-row>
      </v-card>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { EventBus } from "@/event-bus";

export default {
  data() {
    return {
      drawer: false,
      links: [
        { icon: "mdi-home", text: "Start", route: "/" },
        { icon: "mdi-dots-grid", text: "Portofolio", route: "/portfolio" },
        { icon: "mdi-account", text: "CV", route: "/cv" },
        { icon: "mdi-email", text: "Contact", route: "/contact" },
      ],
    };
  },
  methods: {
    changeDrawer() {
      this.drawer = !this.drawer;
      EventBus.$emit("drawer", this.drawer);
    },
  },
};
</script>
