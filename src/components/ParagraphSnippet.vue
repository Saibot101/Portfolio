<template>
  <v-row justify="center">
    <v-card width="1000" flat class="mt-5">
      <p class="text-subtitle-1">{{ text }}</p>
    </v-card>
  </v-row>
</template>
<script>
export default {
  props: {
    paragraph: { required: true },
  },
  data() {
    return {
      text: this.paragraph,
    };
  },
  methods: {},
};
</script>
<style>
p {
  font-size: x-large;
}
</style>
