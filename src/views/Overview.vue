<template>
  <v-container>
    <the-overview />
  </v-container>
</template>
<script>
import TheOverview from "@/components/TheOverview";
import eventBus from "../eventBus";
export default {
  name: "Overview",
  components: {
    TheOverview,
  },
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
      accessuser: JSON.parse(localStorage.getItem("accessuser")),
      authToken: localStorage.getItem("authToken"),
      accessToken: localStorage.getItem("accessToken"),
    };
  },
  created() {
    this.fetchSubscription();
  },
  methods: {
    async fetchSubscription() {
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
        const usage = json["usage"];

        if (usage && usage.totalUsed >= usage.totalAvailable) {
          this.$router.push("/subscription");
          eventBus.$emit("UpdateAdminNav", false);
        }

        if (usage && usage.totalAvailable > 0) {
          eventBus.$emit("UpdateAdminNav", true);
        } else {
          eventBus.$emit("UpdateAdminNav", false);
        }
      } catch (e) {
        this.notifyErr(e.message);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
<style lang="css" scoped></style>
