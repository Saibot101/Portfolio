<template>
  <div>
    <!-- 
    <v-img src="../assets/skyline.jpg" cover height="100%">
      <h1 class="text-center mt-15 mb-5 display-3 white--text">
        Hi! I'm Tobias Maas and this is my personal website.
      </h1>
      <h3 class="text-center mt-15 mb-5 display-1 white--text">
        I proudly present here my projects and a short CV.
      </h3>
      <h3 class="text-center mb-5 display-1 white--text">
        I'm studying Data Science at a Master Degree Level at the moment.
      </h3>
    </v-img>-->
    <v-parallax src="../assets/skyline.jpg" height="78vh" class="mt-1">
      <div class="d-flex flex-column fill-height justify-center align-center text-white">
      <h1 class="text-h3 mb-4">
        Tobias Maas
      </h1>
      <h4 class="subheading">
        I'm studying Business Information Technology for my Master Degree.
      </h4>
    </div>
    </v-parallax>
  </div>
</template>

<script>
//import { EventBus } from "../event-bus";
import { useHead } from '@vueuse/head'
export default {
  name: "Home",
  data() {
    return {
    };
    
  },
  setup(){
    useHead({
      // Can be static or computed
      title: "Tobias Maas Home Site",
      meta:{
        description:"Landing page to the portfolio website from Tobias Maas.",
      }
    })
  }
  
};
</script>


