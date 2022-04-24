<template>
  <v-container>
    <div class="overview__wrap">
      <div class="d-flex align-center justify-space-between">
        <p class="white--text mt-24 font-20 font-weight-medium line-h-24">
          Manage Campaigns
        </p>
      </div>
      <campaignList></campaignList>
    </div>
  </v-container>
</template>
<script>
import Vue2Filters from "vue2-filters";
import campaignList from "@/components/campaign/list";
export default {
  name: "Campaigns",
  mixins: [Vue2Filters.mixin],
  components: {
    campaignList,
  },
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
      accessUser: JSON.parse(localStorage.getItem("accessuser")),
      authToken: localStorage.getItem("authToken"),
      accessToken: localStorage.getItem("accessToken"),
    };
  },
  created() {},
  methods: {},
};
</script>
<style lang="css" scoped></style>
