<template>
  <v-app-bar app color="black" flat>
    <v-container class="py-0 fill-height">
      <a href="https://fyre.hypersign.id/" target="__blank">
        <v-img
          max-width="180"
          lazy-src="@/assets/images/logo.png"
          src="@/assets/images/logo.png"
        ></v-img>
      </a>
      <v-spacer></v-spacer>
      <div class="d-flex align-center">
        <v-btn
          v-if="authToken"
          color="primary"
          rounded
          class="ml-2 text-capitalize letter-s-0"
          @click="logout"
        >
          <v-icon>mdi-account</v-icon>
          Logout
        </v-btn>
      </div>
    </v-container>
  </v-app-bar>
</template>
<script>
export default {
  name: "TheHeader",

  data() {
    return {
      authToken: localStorage.getItem("authToken"),
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.go();
    },
  },
};
</script>
<style lang="css" scoped></style>
