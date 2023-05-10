<template>
  <v-container>
    <h1 class="text-center mt-10 mb-5 text-h3">
      Creating a Q&A Chatbot with langchain.js and Cohere
    </h1>
    <v-row justify="center" class="mt-10">
      <h2 class="text-h4">Contents</h2>
    </v-row>
    <v-row justify="center">
      <v-list dense>
        <v-list-item v-for="(item, i) in list_inhalt" :key="i" @click="scroll(item.scroll)">
          {{ i + 1 }}. {{ item.name }}
        </v-list-item>
      </v-list>
    </v-row>
    <!-- 1 -->
    <v-row justify="center" id="introduction">
      <h2 class="text-h4">Introduction</h2>
    </v-row>
    <v-row justify="center">
      <v-card width="1000" flat class="mt-5">
        <p class="text-subtitle-1">This blogpost descibes the behind the scene of the Q&A chatbot, which you can find
          <v-btn append-icon="mdi-arrow-right-bold" variant="text" to="/portfolio/chatbot">here</v-btn>. The chatbot is primarily build with the help from langchain.js and Cohere. Langchain.js makes it easy to read files and to connect to different language models. Cohere is a Canadian startup, that let you build your own language model and although offers a pre-build language model.
        </p>
      </v-card>
    </v-row>
    <v-row justify="center" id="prepare">
      <h2 class="text-h4">Prepare Speech</h2>
    </v-row>
    <v-row justify="center">
      <v-card width="1000" flat class="mt-5">
        <p class="text-subtitle-1">The speech was downloaded from the website of the white house as a txt file, which you
          can find <a
            href="https://www.whitehouse.gov/briefing-room/speeches-remarks/2022/03/26/remarks-by-president-biden-on-the-united-efforts-of-the-free-world-to-support-the-people-of-ukraine/">here</a>
          . After that, some empty rows of the txt file were removed. That was the complete preparation. Now, the first rows of the final speech look as follow.</p>
      </v-card>
    </v-row>
    <CmdSnippet :code_array="first_rows"></CmdSnippet>
    <v-row justify="center" id="chatbot">
      <h2 class="text-h4">Create Q&A Chatbot</h2>
    </v-row>
    <ParagraphSnippet paragraph="Langchain.js provides an abstract interface to access Cohere. Prior to the first run, the API-Key from Cohere needs to added to a .dotenv file, as a environment variable or to the function call. The speech needs to be separated into smaller chunks, for that the Textsplitter from langchain.js will be used. The queries will be done with the RetrievelQAChain from langchain. HNSWLib is a in-memory vectorstore, where the speech will be stored."></ParagraphSnippet>
    <CodeSnippet :code_array="packages"></CodeSnippet>
    <ParagraphSnippet paragraph="The speech is loaded with the fs package and then split into chunks with a max size of thousand words per chunk. The resulting document is then stored in the HNSWLib vector store."></ParagraphSnippet>
    <CodeSnippet :code_array="create_vector_store"></CodeSnippet>
    <ParagraphSnippet paragraph="To initialize the chain, an Cohere model object and the vectorstore are used. Then the chain can be queried with any question."></ParagraphSnippet>
    <CodeSnippet :code_array="query"></CodeSnippet>
    <v-row justify="center" id="deploy">
      <h2 class="text-h4">Deploy</h2>
    </v-row>
    <ParagraphSnippet :paragraph="'The code modified, so that it is now possible to do a REST-call to a express.js backend server and query the model with the help of the chain.'">
    </ParagraphSnippet>
  </v-container>
</template>
<script>
import { useHead } from '@vueuse/head'
import CodeSnippet from "../../components/CodeSnippet.vue";
import ParagraphSnippet from "../../components/ParagraphSnippet.vue";
import CmdSnippet from "../../components/CmdSnippet.vue";
export default {
  components: { CodeSnippet, ParagraphSnippet, CmdSnippet },
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
        { name: "Prepare Speech", scroll: "prepare" },
        { name: "Langchain.js & Cohere", scroll: "cohere" },
        { name: "Deploy", scroll: "deploy" },
      ],
      first_rows: [
        'Thank you, thank you, thank you. Please, if you have a seat, be seated. If you don’t, come up on stage. ',
        'Thank you very much. It’s a great honor to be here. Mr. President, they tell me you’re over there somewhere. There you are. Thank you, Mr. President. '
      ],
      packages: [
        'import { CohereEmbeddings } from "langchain/embeddings/cohere"',
        'import { Cohere } from "langchain/llms/cohere";',
        'import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";',
        'import { RetrievalQAChain } from "langchain/chains";',
        'import { HNSWLib } from "langchain/vectorstores/hnswlib";',
        'import * as fs from "fs";'
      ],
      create_vector_store: [
        'const text = fs.readFileSync("speech.txt", "utf8");',
        'const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });',
        'const docs = await textSplitter.createDocuments([text]);',
        'const vectorStore = await HNSWLib.fromDocuments(docs, new CohereEmbeddings())'
      ],
      query: [
        'const model = new Cohere();',
        'const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());',
        'const response = await chain.call({',
        '  query: question',
        '});',
      ]
    }
  },
  setup() {
    useHead({
      // Can be static or computed
      title: "Cohere Q&A Chatbot",
      meta: {
        description: "This usecase shows a Proof of Concept of a Q&A Chatbot implemented with Cohere and langchain.js.",
      }
    })
  },
}
</script>