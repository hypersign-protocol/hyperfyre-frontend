<template>
  <v-container class="bg-black py-0">
    <v-toolbar color="black" class="menu mt-6" flat max-height="64px">
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          :ripple="false"
          class="white--text text-capitalize"
          :class="isRouteMatched(item)"
          text
          v-for="item in items"
          :key="item.tab"
          :to="item.slug"
        >
          <v-icon class="mr-1">{{ item.icon }}</v-icon>
          <span class="hidden-sm-and-down"> {{ item.tab }} </span>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </v-container>
</template>
<script>
export default {
  name: "TheMenu",

  data() {
    return {
      items: [
        { tab: "Overview", slug: "/overview", icon: "mdil-home" },
        { tab: "Campaigns", slug: "/campaigns", icon: "mdil-calendar" },
        {
          tab: "Participants",
          slug: "/participants",
          icon: "mdi-account-group-outline",
        },
        { tab: "Teams", slug: "/teams", icon: "mdi-account-plus-outline" },
        {
          tab: "Subscriptions",
          slug: "/subscriptions",
          icon: "mdil-credit-card",
        },
        // { tab: "Referrals", slug: "referrals" },
      ],
      routeName: null,
    };
  },

  watch: {
    $route: function (val) {
      this.routeName = val.meta.slug;
    },
  },

  mounted() {
    this.loadTitle();
  },
  methods: {
    loadTitle() {
      this.routeName = this.$router.currentRoute.meta.slug;
    },
    isRouteMatched(item) {
      if (
        item.tab === "Campaigns" &&
        ["create-campaign", "edit-campaign"].includes(this.routeName)
      ) {
        return "v-btn--active";
      } else {
        return "";
      }
    },
  },
};
</script>
<style lang="css" scoped></style>
