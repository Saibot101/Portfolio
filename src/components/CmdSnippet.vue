<template>
  <v-row justify="center">
    <v-card
      width="750"
      color="blue-grey darken-4"
      outlined
      elevation="8"
      rounded
      class="mb-5"
    >
      <v-row>
        <v-col class="mt-3">
          <v-avatar color="red" size="12" class="ml-5"></v-avatar>
          <v-avatar color="yellow" size="12" class="ml-2"></v-avatar>
          <v-avatar color="green" size="12" class="ml-2"></v-avatar>
        </v-col>
        <v-spacer></v-spacer>
        <v-btn icon class="mt-5 mr-5" @click="copyClipboard">
          <v-icon color="black" icon="mdi-content-copy">  </v-icon>
        </v-btn>
        <v-snackbar
          v-model="snackbar"
          timeout="2000"
          color="blue-grey darken-4 white--text"
        >
          Copied to Clipboard

          <template v-slot:action="{ attrs }">
            <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </v-row>
      <v-row justify="start" class="mb-3 ml-10 mr-4">
        <!--<code class="text-body-1 white--text blue-grey darken-4" v-for="codes in code"><p>{{code}}</p></code> -->
        <div class="mt-2 mb-4">
          <p
            class="text-body-1 white--text blue-grey darken-4 my-n1"
            v-for="(item, i) in codeArray"
            :key="i"
            style="white-space:pre-wrap;"
          >
            {{ item }}
          </p>
        </div>
      </v-row>
    </v-card>
  </v-row>
</template>
<script>
export default {
  props: {
    code_array: { required: true, type: Array },
  },
  data() {
    return {
      codeArray: this.code_array,
      snackbar: false,
    };
  },
  methods: {
    copyClipboard() {
      this.snackbar = true;
      let string = "";
      for (let item of this.codeArray) {
        string = string + item + " \n";
      }
      navigator.clipboard.writeText(string);
    },
  },
};
</script>
<style></style>
