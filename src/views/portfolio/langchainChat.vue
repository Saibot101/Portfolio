<template>
  <v-container>
    <v-row justify="center">
      <h1 class="text-center mt-10 mb-5 text-h3">Ask Joe Biden some Questions</h1>
    </v-row>
    <v-row justify="center">
      <h5 class="text-center text-h5 mt-2 mb-5">
        In his speech from the March 26, 2022 he talked about the effort of the United States to support Ukraine in their
        war. His speech can you find <a href="https://www.whitehouse.gov/briefing-room/speeches-remarks/2022/03/26/remarks-by-president-biden-on-the-united-efforts-of-the-free-world-to-support-the-people-of-ukraine/">here</a>. <br>
        The corresponding post can you find <v-btn append-icon="mdi-arrow-right-bold" variant="text" to="/portfolio/cohere">here</v-btn>.
      </h5>
    </v-row>
    <v-row justify="center">
      <v-textarea variant="outlined" rows="2" bg-color="grey-lighten-2" label="question" v-model="question">
        </v-textarea>
    </v-row>
    <v-row>
      <v-btn width="100%" @click="request()" :loading="loading">
          Ask
        </v-btn>
    </v-row>
    <v-row>
      <h5 class="text-center text-h5 mt-5">
        {{ response }}
      </h5>
    </v-row>
    <v-row>
      <h5 class="text-center text-h5 mt-5">
        Possible Questions:
      </h5>
    </v-row>
    <v-row>
      <h5 class="text-center text-h5">
        What did Joe Biden said about the pope?
      </h5>
    </v-row>
    <v-row>
      <h5 class="text-center text-h5">
        Where did Biden held his speech?
      </h5>
    </v-row>
    <v-row>
      <h5 class="text-center text-h5  mb-5">
        What did Joe Biden said about Madeleine Korbel Albright?
      </h5>
    </v-row>
    <v-row>
      <h5 class="text-center text-h5 mt-2">
        Thanks to Cohere for providing the LLM.
      </h5>
    </v-row>

  </v-container>
</template>
<script>
import axios from 'axios';
import { useHead } from '@vueuse/head'
export default {
  methods:{
    request(){
      this.loading = true
      axios({
        method:"post",
        url:"https://portfolio-backend-8tl9.onrender.com/chatbot",
        data:{
          "question":this.question
        }
      }).then((res)=>{
        this.response = res.data.response.text.split("\n")[0]
        this.loading=false
      })
    }
  },
  data(){
    return{
      question:"",
      response:"",
      loading:false
    }
  },
  setup(){
    useHead({
      // Can be static or computed
      title: "Cohere Q&A Chatbot",
      meta:{
        description:"This usecase shows a Proof of Concept of a Q&A Chatbot implemented with Cohere and langchain.js.",
      }
    })
  },
}
</script>