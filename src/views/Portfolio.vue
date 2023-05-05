<template>
  <div>
    <h1 class="text-center mt-10 mb-5 text-h3">Portfolio</h1>
    <h5 class="text-center text-h5 mt-2 mb-5">
      In this section I present my projects from university and my self learning
      adventures. <br />
      Behind the newer tiles are blog entries and behind older tiles links to my github page.
      <br />
      On my Github page are more projects uploaded.
    </h5>
    <v-container>
      <v-row class="mx-5">
        <v-col lg="4" xl="3" md="6" sm="12">
          <v-card class="pa-4 mb-6" outlined tile to="/portfolio/langchain" :ripple="false" height="250px" width="320px">
            <v-img src="../assets/langchain.png" height="165"> </v-img>
            <v-divider class="mt-4"></v-divider>
            <v-card-title class="text-center">Creating own Chatbot</v-card-title>
          </v-card>
        </v-col>
        <v-col lg="4" xl="3" md="6" sm="12">
          <v-card class="pa-4 mb-6" outlined tile to="/portfolio/geoportal" :ripple="false" height="250px" width="320px">
            <v-img src="../assets/gdi.jpeg" height="165"> </v-img>
            <v-divider class="mt-4"></v-divider>
            <v-card-title class="text-center">Scraping Frankfurt Geoportal</v-card-title>
          </v-card>
        </v-col>
        <v-col lg="4" xl="3" md="6" sm="12">
          <v-card class="pa-4 mb-6" outlined tile to="/portfolio/sentiment" :ripple="false" height="250px" width="320px">
            <v-img src="../assets/spacy.png" height="165"> </v-img>
            <v-divider class="mt-4"></v-divider>
            <v-card-title class="text-center">Determine sentiment from telegram messages</v-card-title>
          </v-card>
        </v-col>
        <v-col lg="4" xl="3" md="6" sm="12">
          <v-card class="pa-4 mb-6" outlined tile to="/portfolio/cluster" :ripple="false" height="250px" width="320px">
            <v-img src="../assets/telegram.jpeg" height="165"> </v-img>
            <v-divider class="mt-4"></v-divider>
            <v-card-title class="text-center">Clustering telegram messages</v-card-title>
          </v-card>
        </v-col>
        <v-col lg="4" xl="3" md="6" sm="12">
          <v-card class="pa-4 mb-6" outlined tile to="/portfolio/history" :ripple="false" height="250px" width="320px">
            <v-img src="../assets/telemtrio.png" height="165"> </v-img>
            <v-divider class="mt-4"></v-divider>
            <v-card-title class="text-center">Visualizing Telegram user data</v-card-title>
          </v-card>
        </v-col>
        <v-col lg="4" xl="3" md="6" sm="12">
          <v-card class="pa-4 mb-6" outlined tile to="/portfolio/telegram" :ripple="false" height="250px" width="320px">
            <v-img src="../assets/telegram.jpeg" height="165"> </v-img>
            <v-divider class="mt-4"></v-divider>
            <v-card-title class="text-center">Visualizing Telegram Network</v-card-title>
          </v-card>
        </v-col>
        <v-col lg="4" xl="3" md="6" sm="12">
          <v-card class="pa-4 mb-6" outlined tile to="/portfolio/cloud" :ripple="false" height="250px" width="320px">
            <v-img src="../assets/openfaas.jpeg" height="165"> </v-img>
            <v-divider class="mt-4"></v-divider>
            <v-card-title class="text-center">CI /CD of a Cloud Functions Service</v-card-title>
          </v-card>
        </v-col>
        <v-col lg="4" xl="3" md="6" sm="12">
          <v-card class="pa-4" outlined tile href="https://github.com/orgs/cloud-computing-projekt/repositories"
            :ripple="false" height="250px" width="320px">
            <v-img src="../assets/Terraform.png" height="165"> </v-img>
            <v-divider class="mt-4"></v-divider>
            <v-card-title class="text-center">Bachelor Seminar</v-card-title>
          </v-card>
        </v-col>
        <v-col lg="4" xl="3" md="6" sm="12">
          <v-card class="pa-4 mb-6" outlined tile href="https://github.com/Saibot101/bachelor_thesis" :ripple="false"
            height="250px" width="320px">
            <v-img src="../assets/fra-uas_2.png" height="165"> </v-img>
            <v-divider class="mt-4"></v-divider>
            <v-card-title class="text-center">Bachelor Thesis</v-card-title>
          </v-card>
        </v-col>
        <v-col lg="4" xl="3" md="6" sm="12">
          <v-card class="pa-4" outlined tile href="https://github.com/orgs/Blockchain-IoT-Project/repositories"
            :ripple="false" height="250px" width="320px">
            <v-img src="../assets/hyperledger-fabric_2.jpeg" height="165"> </v-img>
            <v-divider class="mt-4"></v-divider>
            <v-card-title class="text-center">Bachelor Project</v-card-title>
          </v-card>
        </v-col>
        <v-col lg="4" xl="3" md="6" sm="12">
          <v-card class="pa-4" outlined tile href="https://github.com/Saibot101/UniProgrammingExercise" :ripple="false"
            height="250px" width="320px">
            <v-img src="../assets/java_2.jpg" height="165"> </v-img>
            <v-divider class="mt-4"></v-divider>
            <v-card-title class="text-center">Bachelor Java Project</v-card-title>
          </v-card>
        </v-col>

      </v-row>
    </v-container>
  </div>
</template>
<script>
import { useHead } from '@vueuse/head'
export default{
  setup(){
    useHead({
      // Can be static or computed
      title: "Portfolio overview from Tobias Maas",
      meta:{
        description:"This site shows all the portfolio entries from Tobias Maas.",
      }
    })
  },
}
</script>
