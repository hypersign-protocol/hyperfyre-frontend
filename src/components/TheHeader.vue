<template>
  <v-app-bar app color="black" flat>
    <v-container class="py-0 fill-height">
      <v-img
        max-width="180"
        lazy-src="@/assets/images/logo.png"
        src="@/assets/images/logo.png"
      ></v-img>
      <v-spacer></v-spacer>
      <div class="d-flex align-center">
        <!--  <v-img
          max-width="16"
          lazy-src="@/assets/images/logo-icon.svg"
          src="@/assets/images/logo-icon.svg"
        ></v-img>
        <span class="ml-2 white--text font-weight-medium">$0.0004</span> -->
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
          <v-list color="#323549">
            <v-list-item
              :to="item.link"
              color="#fff"
              dark
              v-for="(item, index) in items"
              :key="index"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
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
      items: [{ title: "Subscription", link: "subscriptions" }],
      user: JSON.parse(localStorage.getItem("user")),
      accessUser: JSON.parse(localStorage.getItem("accessuser")),
      authToken: localStorage.getItem("authToken"),
      accessToken: localStorage.getItem("accessToken"),
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      localStorage.removeItem("credentials");
      localStorage.removeItem("userData");
      this.$router.push("login");
    },
  },
};
</script>
<style lang="css" scoped></style>
