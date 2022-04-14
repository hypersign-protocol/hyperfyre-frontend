<template>
  <v-container class="bg-black py-0">
    <v-toolbar color="black" class="menu" flat max-height="64px">
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          :ripple="false"
          class="white--text text-capitalize"
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
        { tab: "Account", slug: "account" },
        { tab: "Referrals", slug: "referrals" },
        { tab: "Participants", slug: "/participants" },
      ],
    };
  },
  computed: {
    routeName() {
      return this.$router.currentRoute.meta.slug;
    },
  },
};
</script>
<style lang="css" scoped></style>
