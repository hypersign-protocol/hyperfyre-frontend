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
          {{ item.tab }}
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
        { tab: "Overview", slug: "/overview" },
        { tab: "Campaigns", slug: "/campaigns" },
        { tab: "Participants", slug: "/participants" },
        { tab: "Teams", slug: "/teams" },
        { tab: "Subscriptions", slug: "/subscriptions" },
        { tab: "Referrals", slug: "referrals" },
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
