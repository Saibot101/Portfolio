<template>
  <v-container>
    <h1 class="text-center mt-10 mb-5 text-h3">
      Clustering messages from a german telegram channel
    </h1>
  </v-container>
</template>
<script>
import CodeSnippet from "../../components/CodeSnippet.vue";
import ParagraphSnippet from "../../components/ParagraphSnippet.vue";

export default {
  components: { CodeSnippet, ParagraphSnippet },
  methods: {
    scroll(item) {
      //this.$vuetify.goTo("." + item.scroll);
      document.getElementById(item).scrollIntoView()
    },
  },

  data() {
    return {


    }
  }
}
</script>