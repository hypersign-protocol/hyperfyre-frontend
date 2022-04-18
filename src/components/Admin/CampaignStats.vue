<template>
  <div>
    <p class="mt-40 font-16 font-weight-bold line-h-19 color-grey-100">
      Subscriptions
    </p>
    <v-row v-if="loading">
      <v-col cols="12" md="4">
        <div class="campaign-card">
          <v-skeleton-loader type="image"></v-skeleton-loader>
        </div>
      </v-col>
      <v-col cols="12" md="4">
        <div class="campaign-card">
          <v-skeleton-loader type="image"></v-skeleton-loader>
        </div>
      </v-col>
      <v-col cols="12" md="4">
        <div class="campaign-card">
          <v-skeleton-loader type="image"></v-skeleton-loader>
        </div>
      </v-col>
    </v-row>
    <v-row v-if="!loading">
      <v-col cols="12" md="4">
        <div class="campaign-card">
          <div class="content">
            <div class="white--text font-32 font-weight-medium line-h-32">
              {{ campaigns.length }}
            </div>
            <div class="font-20 font-weight-regular line-h-32 color-grey-200">
              Total
            </div>
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="4">
        <div class="campaign-card">
          <div class="content">
            <div class="white--text font-32 font-weight-medium line-h-32">
              {{ ongoing.length }}
            </div>
            <div class="font-20 font-weight-regular line-h-32 color-grey-200">
              Ongoing
            </div>
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="4">
        <div class="campaign-card">
          <div class="content">
            <div class="white--text font-32 font-weight-medium line-h-32">
              {{ completed.length }}
            </div>
            <div class="font-20 font-weight-regular line-h-32 color-grey-200">
              Completed
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  name: "CampaignStats",

  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
      accessuser: JSON.parse(localStorage.getItem("accessuser")),
      authToken: localStorage.getItem("authToken"),
      accessToken: localStorage.getItem("accessToken"),
      campaigns: {},
      loading: false,
    };
  },
  mounted() {
    this.getCampaigns();
  },

  computed: {
    ongoing() {
      if (this.campaigns && this.campaigns.length > 0) {
        return this.campaigns.filter(
          (campaign) => campaign.projectStatus === true
        );
      } else {
        return [];
      }
    },

    completed() {
      if (this.campaigns && this.campaigns.length > 0) {
        return this.campaigns.filter(
          (campaign) => campaign.projectStatus === false
        );
      } else {
        return [];
      }
    },
  },

  methods: {
    async getCampaigns() {
      this.loading = true;
      try {
        if (!this.user.id) {
          this.$store.dispatch("snackbar/SHOW", {
            type: "error",
            message: "No campaigns found",
          });
        } else {
          const url = `${this.$config.studioServer.BASE_URL}api/v1/project?onwer=${this.user.id}`;

          const headers = {
            Authorization: `Bearer ${this.authToken}`,
            AccessToken: `Bearer ${this.accessToken}`,
          };
          const resp = await fetch(url, {
            headers,
            method: "GET",
          });

          if (!resp.ok) {
            console.log(resp.statusText);
          }

          const json = await resp.json();
          this.campaigns = json;
          this.loading = false;
        }
      } catch (e) {
        this.loading = false;
        this.$store.dispatch("snackbar/SHOW", {
          type: "error",
          message: e.message,
        });
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
<style lang="css" scoped></style>
