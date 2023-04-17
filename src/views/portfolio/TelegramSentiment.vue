<template>
  <v-container>
    <h1 class="text-center mt-10 mb-5 text-h3">
      Clustering messages from a german telegram channel
    </h1>
    <v-row justify="center" id="introduction" class="mt-10">
      <h2 class="text-h4">Contents</h2>
    </v-row>
    <v-row justify="center">
      <v-list dense>
        <v-list-item v-for="(item, i) in list_inhalt" :key="i" @click="scroll(item.scroll)">
          {{ i + 1 }}. {{ item.name }}
        </v-list-item>
      </v-list>
    </v-row>

    <ParagraphSnippet :paragraph="'The last step in the text preparation step is to filter the empty messages.'">
    </ParagraphSnippet>
    <CodeSnippet :code_array="text_preparation_3"></CodeSnippet>
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
      document.getElementById(item).scrollIntoView({ behavior: "smooth" })
    },
  },
  data() {
    return {
      list_inhalt: [
        { name: "Introduction", scroll: "introduction" },
        { name: "Preparation", scroll: "preperation" },
        { name: "Visualization", scroll: "visualization" },
      ],
      json: [
      '[',
      '  {',
      '    "channel":"channel_name",',
      '    "user":[',
      '      {',
      '        "id":1234,',
      '        "user":"name",',
      '        "is_bot":true,',
      '      },',
      '    ]',
      '  },',
      ']'
      ],
    }
  }
}
</script>