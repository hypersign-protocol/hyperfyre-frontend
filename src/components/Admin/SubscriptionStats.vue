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
              {{ subscriptionStats.totalAvailable }}
            </div>
            <div class="font-20 font-weight-regular line-h-32 color-grey-200">
              Limit
            </div>
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="4">
        <div class="campaign-card">
          <div class="content">
            <div class="white--text font-32 font-weight-medium line-h-32">
              {{ subscriptionStats.totalUsed }}
            </div>
            <div class="font-20 font-weight-regular line-h-32 color-grey-200">
              Consumed
            </div>
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="4">
        <div class="campaign-card">
          <div class="content">
            <div class="white--text font-32 font-weight-medium line-h-32">
              {{
                subscriptionStats.totalAvailable - subscriptionStats.totalUsed
              }}
            </div>
            <div class="font-20 font-weight-regular line-h-32 color-grey-200">
              Remaining
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  name: "SubscriptionStats",

  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
      accessuser: JSON.parse(localStorage.getItem("accessuser")),
      authToken: localStorage.getItem("authToken"),
      accessToken: localStorage.getItem("accessToken"),
      loading: false,
      subscriptionStats: {},
    };
  },
  mounted() {
    this.fetchSubscription();
  },

  methods: {
    async fetchSubscription() {
      this.loading = true;
      try {
        const url = `${this.$config.studioServer.BASE_URL}api/v1/subscription?usage=true`;
        const headers = {
          Authorization: `Bearer ${this.authToken}`,
          AccessToken: `Bearer ${this.accessToken}`,
        };
        const resp = await fetch(url, {
          headers,
          method: "GET",
        });

        if (!resp.ok) {
          return this.notifyErr(resp.statusText);
        }
        const json = await resp.json();
        this.subscriptionStats = json["usage"];
        this.loading = false;
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
