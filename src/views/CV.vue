<template>
  <div>
    <h1 class="text-center mt-10 mb-5 text-h3">CV</h1>

    <h2 class="text-center text-h5 font-weight-medium mt-10">Education</h2>
    <h5 class="text-center text-subtitle-1 mt-5">
      At the moment: Master in Business Information System at the Frankfurt University
    </h5>
    <h5 class="text-center text-subtitle-1 mt-2">
      Bachelor in Computer Science at the Frankfurt University
    </h5>
    <h5 class="text-center text-subtitle-1 mt-2">
      Technical Diploma at the Johann-Philip Reis School in Friedberg
    </h5>

    <v-divider class="mx-5 mt-5"></v-divider>
    <h2 class="text-center font-weight-medium mt-5 text-h5">Experience</h2>
    <h5 class="text-center text-subtitle-1 mt-5">
      Working Student as Data Scientist at SKS Data Vision
    </h5>
    <h5 class="text-center text-subtitle-1 mt-5">
      Working Student as Fullstack Developer at msg systems AG
    </h5>
    <h5 class="text-center text-subtitle-1 mt-2">
      Working Student as Backend Developer at ING Germany in the area Payment transactions
    </h5>
    <h5 class="text-center text-subtitle-1 mt-2">
      Intern as Backend Developer at ING Germany in the area Payment transactions
    </h5>

    <v-divider class="mx-5 mt-5"></v-divider>
    <h2 class="text-center font-weight-medium mt-5 text-h5">Additional</h2>
    <h5 class="text-center text-subtitle-1 mt-5">Programming Languages:</h5>
    <v-row justify="center" class="justify-center mt-3">
      <v-icon x-large class="mx-2">mdi-language-python</v-icon>
      <v-icon x-large class="mx-2">mdi-database</v-icon>
      <v-icon x-large class="mx-2">mdi-language-java</v-icon>
      <v-icon x-large class="mx-2">mdi-language-javascript</v-icon>
      <v-icon x-large class="mx-2">mdi-nodejs</v-icon>
      <v-icon x-large class="mx-2">mdi-vuejs</v-icon>
    </v-row>
    <h5 class="text-center text-subtitle-1 mt-9">Spoken Languages:</h5>
    <h5 class="text-center text-subtitle-1 mt-2">German and English</h5>
  </div>
</template>
<script>
export default {
  name: "CV",
};
</script>
