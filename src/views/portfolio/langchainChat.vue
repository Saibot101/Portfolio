<template>
  <v-container>
    <v-row justify="center">
      <h1 class="text-center mt-10 mb-5 text-h3">Ask Joe Biden some Questions</h1>
    </v-row>
    <v-row justify="center">
      <h5 class="text-center text-h5 mt-2 mb-5">
        In his speech from the March 26, 2022 he talked about the effort of the United States to support Ukraine in their
        war.
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
      <p>
        {{ response }}
      </p>
    </v-row>

  </v-container>
</template>
<script>
import axios from 'axios';
export default {
  methods:{
    request(){
      this.loading = true
      axios({
        method:"post",
        url:"http://localhost:3001/test",
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
  }
}
</script>