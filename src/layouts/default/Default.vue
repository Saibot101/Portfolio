<template>
  <v-app>
    <default-bar />

    <default-view />

    <default-footer></default-footer>
  </v-app>
</template>

<script setup>
import DefaultBar from './AppBar.vue'
import DefaultView from './View.vue'
import DefaultFooter from './Footer.vue'
import { onMounted } from 'vue';
import { v4 as uuidv4 } from 'uuid'

onMounted(()=>{
  if (localStorage.getItem("uuid") === null) {
    localStorage.setItem("uuid",uuidv4())
  }
})

</script>
