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
      <div class="d-flex align-center" v-if="authToken">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="#6966FB"
              rounded
              class="ml-2 white--text text-capitalize letter-s-0"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-account</v-icon>
              <span v-if="user && user.name">{{ user.name }} </span>
              <span v-else-if="user && user.email">{{ user.email }} </span>
              <v-icon>mdil-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list class="pa-0" color="#323549">
            <v-list-item color="#fff" dark @click="logout">
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
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
      user: JSON.parse(localStorage.getItem("user")),
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
