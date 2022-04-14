<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="px-0 font-12 line-h-15 white--text">
      <div class="d-flex align-center">
        <v-icon size="22" color="#313540" class="mr-2"> mdi-circle</v-icon>
        Prize Details
      </div>
      <template v-slot:actions>
        <v-chip class="black--text font-weight-bold" color="green" small label>
          +15
        </v-chip>
        <v-icon color="#fff"> mdi-chevron-down </v-icon>
      </template>
    </v-expansion-panel-header>
    <v-expansion-panel-content class="font-14 line-h-32 color-grey-100">
      <div class="d-flex flex-column align-center justify-center">
        <v-btn icon class="bg-blue-400 mb-2">
          <v-icon color="#fff">mdi-twitter</v-icon>
        </v-btn>
        <p class="font-14 line-h-17 white--text mb-2">Follow us on:</p>
        <a
          class="font-14 line-h-17 color-primary-100 text-decoration-none"
          href="https://twitter.com/awesome"
          >https://twitter.com/awesome</a
        >
      </div>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>
<script>
export default {
  name: "PrizeCard",

  data() {
    return {};
  },
};
</script>
<style lang="css" scoped></style>
