<template>
  <v-container>
    <div class="overview__wrap">
      <div class="d-flex align-center justify-space-between">
        <p class="white--text mt-24 font-20 font-weight-medium line-h-24">
          Manage Campaigns
        </p>
        <div class="d-flex align-center">
          <!-- <v-btn
            :ripple="false"
            color="primary"
            class="background-theme gradient width-150 height-35 letter-s-0 ma-auto border-r-2 text-capitalize font-16 line-h-19 font-weight-bold white--text mr-4"
            depressed
            rounded
            x-large
          >
            Add Participant
          </v-btn> -->
          <v-btn
            :ripple="false"
            color="primary"
            class="background-theme gradient width-169 height-35 letter-s-0 ma-auto border-r-2 text-capitalize font-16 line-h-19 font-weight-bold white--text"
            depressed
            rounded
            x-large
            to="/create-campaign"
          >
            Create Campaign
          </v-btn>
        </div>
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
      authToken: localStorage.getItem("authToken"),
      user: JSON.parse(localStorage.getItem("user")),
    };
  },
  created() {},
  methods: {},
};
</script>
<style lang="css" scoped></style>
