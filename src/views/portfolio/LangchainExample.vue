<template>
  <v-container>
    <h1 class="text-center mt-10 mb-5 text-h3">
      Creating Vectorstore with PDFs and querying vector store on different ways
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
    <ParagraphSnippet
      :paragraph="'Langchain is the most used and well-known package for building software around LLMs. It provides an easy-to-use interface to load different data formats, store data into different vector database, use different Embeddings and query different LLMs. Therefore, this package is the logical start for a project in that direction. '">
    </ParagraphSnippet>
    <v-row justify="center" id="create">
      <h2 class="text-h4">Packages and prepare PDFs</h2>
    </v-row>
    <ParagraphSnippet
      :paragraph="'The embeddings will be queried from HuggingFace and as a vector store will be DeepLake used. DeepLake markets itself as a Data Lake for Deep Learning.'">
    </ParagraphSnippet>
    <CodeSnippet :code_array="packages"></CodeSnippet>
    <ParagraphSnippet
      :paragraph="'The API-Key to HuggingFace needs to be stored to the user environment so that it can be read from there.'">
    </ParagraphSnippet>
    <CodeSnippet :code_array="api"></CodeSnippet>
    <ParagraphSnippet
      :paragraph="'The reading of the PDFs is handled in short function. The PDFs are loaded by a preprogrammed function from Langchain. Then the PDFs will be stored in as a Document object.'">
    </ParagraphSnippet>
    <CodeSnippet :code_array="load_data"></CodeSnippet>
    <ParagraphSnippet
      :paragraph="'Because the PDFs have to much text, they must be split into smaller chunks. Therefore, chunks with length of 1000 are created.'">
    </ParagraphSnippet>
    <CodeSnippet :code_array="text"></CodeSnippet>
    <v-row justify="center" id="create">
      <h2 class="text-h4">Create Store</h2>
    </v-row>
    <ParagraphSnippet
      :paragraph="'Before the store can be created, embeddings need to be downloaded. The embeddings have a crucial job, because the determine the vector representation of the text. With the chunks of texts and the embeddings, the DeepLake vector store is created and saved to the computer.'">
    </ParagraphSnippet>
    <CodeSnippet :code_array="create"></CodeSnippet>
    <v-row justify="center" id="load">
      <h2 class="text-h4">Load Store</h2>
    </v-row>
    <ParagraphSnippet
      :paragraph="'The vector store can also be loaded from the computer. That makes it easy to seperat adding files and using it in production. Also, it allows to versioning the vector store.'">
    </ParagraphSnippet>
    <CodeSnippet :code_array="load"></CodeSnippet>
    <v-row justify="center" id="similarity">
      <h2 class="text-h4">Similarity</h2>
    </v-row>
    <ParagraphSnippet
      :paragraph="'The vector store can return the most similar chunk of text to an answer. For that, multiple distance functions can be used.'">
    </ParagraphSnippet>
    <CodeSnippet :code_array="similarity"></CodeSnippet>
    <v-row justify="center" id="vectorDBQA">
      <h2 class="text-h4">VectorDBQA</h2>
    </v-row>
    <ParagraphSnippet
      :paragraph="'A LLM can be used to answer in logical sentences. For that, the vector store is searched for the most similar chunk of text. With the text a LLM get called to answer the question. The LLM uses only the chunk of text as resource to answer.'">
    </ParagraphSnippet>
    <CodeSnippet :code_array="vectordbqa"></CodeSnippet>
    <v-row justify="center" id="qa_with_sources">
      <h2 class="text-h4">QA with Sources</h2>
    </v-row>
    <ParagraphSnippet
      :paragraph="'It is also possible, to let you return the source, from where the text originally comes from. That is especially helpful, if there are many documents in the vector store or try to check, whether the answer is correct.'">
    </ParagraphSnippet>
    <CodeSnippet :code_array="qa_with_sources"></CodeSnippet>
  </v-container>
</template>
<script>
import CodeSnippet from "../../components/CodeSnippet.vue";
import ParagraphSnippet from "../../components/ParagraphSnippet.vue";
import { useHead } from '@vueuse/head'
export default {
  components: { CodeSnippet, ParagraphSnippet },
  methods: {
    scroll(item) {
      //this.$vuetify.goTo("." + item.scroll);
      document.getElementById(item).scrollIntoView({ behavior: "smooth" })
    },
  },
  setup(){
    useHead({
      // Can be static or computed
      title: "Creating a vectorstore from PDFs and query the store in different ways",
      meta:{
        description:"This tutorial shows how to query a vector store in different ways with LLM. In the first step, vectorstore is created and loaded with the data from the PDF. Then different ways are shown to query the vectorstore.",
      }
    })
  },
  data() {
    return {
      list_inhalt: [
        { name: "Introduction", scroll: "introduction" },
        { name: "Packages and prepare PDFs", scroll: "create" },
        { name: "Load Store", scroll: "load" },
        { name: "Similarity", scroll: "similarity" },
        { name: "VectorDBQA", scroll: "vectorDBQA" },
        { name: "QA with Sources", scroll: "qa_with_sources" },
      ],
      packages: [
        'from langchain.embeddings import HuggingFaceEmbeddings',
        'from langchain.vectorstores import DeepLake',
        'from langchain.text_splitter import CharacterTextSplitter',
        'from langchain.document_loaders import PagedPDFSplitter'
      ],
      api: [
        'import os',
        'os.environ["HUGGINGFACEHUB_API_TOKEN"]="api_key"'
      ],
      load_data: [
        'def load_reports(urls):',
        '  pages = []',
        ' ',
        '  for url in urls:',
        '    loader = PagedPDFSplitter(url)',
        '    local_pages = loader.load_and_split()',
        '    pages.extend(local_pages)',
        '  return pages',
        '',
        'urls = ["1.pdf","2.pdf"]',
        'pages = load_reports(urls)'
      ],
      text: [
        'text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=50)',
        ' ',
        'texts =text_splitter.split_documents(pages)'
      ],
      create: [
        'model_name = "sentence-transformers/all-mpnet-base-v2"',
        'embeddings = HuggingFaceEmbeddings(model_name=model_name)',
        ' ',
        'db = DeepLake.from_documents(texts,embeddings, dataset_path="./db/")'
      ],
      load: [
        'db = DeepLake(dataset_path="./db/", embedding_function=embeddings)'
      ],
      similarity: [
        'query = "question"',
        'docs = db.similarity_search(query)',
        'print(docs[0].page_content)'
      ],
      vectordbqa: [
        'from langchain import VectorDBQA',
        'from langchain import HuggingFaceHub',
        'qa = VectorDBQA.from_chain_type(llm=HuggingFaceHub(repo_id="google/flan-t5-xl"),chain_type="stuff",vectorstore=db)',
        ' ',
        'print(qa.run("question"))'
      ],
      qa_with_sources: [
        'from langchain.chains.qa_with_sources import load_qa_with_sources_chain',
        ' ',
        'chain = load_qa_with_sources_chain(HuggingFaceHub(repo_id="google/flan-t5-xl"), chain_type="stuff")',
        'query = "question"',
        'print(chain({"input_documents": docs, "question": query}, return_only_outputs=True))'
      ]
    }
  }
}
</script>
