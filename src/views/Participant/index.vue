<template>
  <v-app dark class="black">
    <the-header />
    <v-main class="black pt-0">
      <v-container class="py-0">
        <div
          class="overview__wrap"
          :class="$vuetify.breakpoint.xsOnly ? 'pt-6' : ''"
        >
          <v-row class="ma-0">
            <v-col
              cols="12"
              md="12"
              :class="$vuetify.breakpoint.xsOnly ? 'pa-0' : ''"
            >
              <v-card
                color="black"
                class="participant__card ma-auto"
                :class="$vuetify.breakpoint.xsOnly ? 'pa-0' : 'pa-4'"
                flat
                :elevation="0"
                width="600"
              >
                <Metrics
                  v-if="!loading"
                  :startDate="eventData.fromDate"
                  :endDate="eventData.toDate"
                  :userEventData="userEventData"
                  @getLeaderBoard="fetchLeaderBoard"
                />
                <div class="image__wrap ma-auto">
                  <v-img
                    v-if="!brokenUrl"
                    @error="onBannerError($event)"
                    class="banner-image"
                    :laz-src="eventData.logoUrl"
                    :src="eventData.logoUrl"
                  ></v-img>
                  <div
                    class="font-20 line-h-22 white--text font-weight-medium"
                    v-if="brokenUrl"
                  >
                    {{ eventData.projectName }}
                  </div>
                </div>

                <template v-if="authToken !== '' || authToken !== null">
                  <template v-if="!eventData.projectStatus">
                    <div
                      class="font-20 line-h-24 font-weight-medium text-center py-8 bg-blue-100 mt-8 refer__wrap white--text"
                    >
                      Event is over
                    </div>
                  </template>
                  <Actions
                    v-if="eventData.projectStatus"
                    :userProfile="user"
                    :campaignActions="eventActionsToShow"
                    :prizeData="prizeData"
                    @UserUpdateEvent="updateUserData"
                  />
                </template>
                <template v-if="authToken === '' || authToken === null">
                  <Login @AuthTokenUpdateEvent="updateAuthentication" />
                </template>
              </v-card>
            </v-col>
          </v-row>
        </div>
        <v-dialog v-model="leaderBoardPopup" :elevation="0">
          <v-card flat color="#26264F" width="450" class="ma-auto pa-6">
            <v-card-title
              class="px-0 pt-0 pb-5 white--text text-left d-flex align-center justify-space-between"
            >
              <h2
                class="font-24 line-h-31 white--text text-left font-weight--medium font"
              >
                Leader Board
              </h2>
              <v-icon color="white" size="25" @click="leaderBoardPopup = false"
                >mdi-close</v-icon
              >
            </v-card-title>
            <v-card-text class="white--text pa-0">
              <template v-if="leaderBoardData">
                <div
                  class="border-r-4 font-13 bg-blue-100 line-h-19 white--text pa-0 mb-6"
                >
                  <v-list color="transparent" class="pa-0">
                    <v-list-item
                      v-for="(item, index) in leaderBoardData"
                      :key="index"
                      class="pa-0"
                    >
                      <v-list-item-avatar>
                        <v-img
                          :src="`https://avatars.dicebear.com/api/identicon/${item.name}.svg`"
                        ></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title
                          class="white--text"
                          v-text="item.name"
                        ></v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-action class="white--text">
                        {{ item.numberOfReferals }}
                      </v-list-item-action>
                    </v-list-item>
                  </v-list>
                </div>
              </template>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import TheHeader from "@/components/Participant/TheHeader";
import Metrics from "@/components/Participant/Metrics";
import Actions from "@/components/Participant/Actions";
import Login from "@/components/Participant/Login";
import notificationMixins from "../../mixins/notificationMixins";
import Messages from "@/utils/messages/admin/en";
import apiClient from "@/mixins/apiClientMixin";
import eventBus from "@/eventBus.js";
export default {
  components: {
    TheHeader,
    Metrics,
    Actions,
    Login,
  },
  mixins: [notificationMixins],
  data() {
    return {
      loading: false,
      leaderBoardPopup: false,
      leaderBoardData: null,
      user: JSON.parse(localStorage.getItem("user")),
      authToken: localStorage.getItem("authToken"),
      accessToken: localStorage.getItem("accessToken"),
      value: "",
      eventSlug: null,
      QRRefresh: false,
      eventData: {},
      userEventData: null,
      eventStartDate: null,
      eventEndDate: null,
      eventActionsToShow: [],
      userProfileData: {},
      prizeData: [],
      brokenUrl: false,
    };
  },

  mounted() {
    this.$root.$on("AuthTokenUpdateEvent", this.updateAuthentication);
  },

  async created() {
    this.checkUser();
    this.fetchEventData();
  },

  methods: {
    onBannerError(e) {
      console.log(e.message);
      this.brokenUrl = true;
    },
    async updateAuthentication(authToken) {
      try {
        this.authToken = authToken;
        eventBus.$emit("getAuthToken", authToken);
        await this.fetchUserDetails();
        await this.fetchUserInfoOnLogin();
      } catch (e) {
        console.log(e);
      }
    },

    async checkUser() {
      if (!this.user) {
        await this.fetchUserDetails();
      }

      if (this.$router.currentRoute.params.slug) {
        this.eventSlug = this.$router.currentRoute.params.slug;
        document.title =
          "Solawind - " + this.eventSlug.replace(/-/g, " ").toUpperCase();
        await this.fetchEventData();
        await this.fetchUserInfoOnLogin();
      }
    },

    async fetchUserDetails() {
      this.isLoading = true;
      if (this.authToken) {
        const url = `${this.$config.studioServer.BASE_URL}hs/api/v2/auth/protected`;
        let headers = {
          Authorization: `Bearer ${this.authToken}`,
        };
        const res = await apiClient.makeCall({
          url,
          body: {},
          header: headers,
          method: "POST",
        });

        if (res && res.data) {
          this.user = {
            ...res.data.message,
          };

          localStorage.setItem("user", JSON.stringify(this.user));
          this.user = JSON.parse(localStorage.getItem("user"));
          eventBus.$emit("getUserData", this.user);
        } else {
          this.$store.dispatch("snackbar/SHOW", {
            type: "error",
            message: Messages.EVENT.INVALID_RESPONSE,
          });
        }
      } else {
        //this.notifyErr("Authentication token missing")
      }
      this.isLoading = false;
    },

    async fetchEventData() {
      if (this.$router.currentRoute.params.slug) {
        this.loading = true;
        const url = `${this.$config.studioServer.BASE_URL}api/v1/project/${this.$router.currentRoute.params.slug}?isPublic=true`;

        const headers = {
          Authorization: `Bearer ${this.authToken}`,
        };
        const resp = await fetch(url, {
          headers,
          method: "GET",
        });

        if (!resp.ok) {
          console.log(resp.statusText);
        }

        const json = await resp.json();

        this.eventData = json;

        this.loading = false;
      } else {
        this.$store.dispatch("snackbar/SHOW", {
          type: "error",
          message: Messages.EVENT.INVALID_PROJECT_SLUG,
        });
      }
    },

    updateUserData(userEventData) {
      if (userEventData) {
        this.userEventData = {
          ...userEventData,
        };
        this.fetchEventData();
      }
    },

    async fetchLeaderBoard() {
      if (this.eventSlug && this.eventSlug != "" && this.authToken) {
        let url = `${this.$config.studioServer.BASE_URL}api/v1/project/${this.eventData._id}/participants/score?limit=100`;
        let headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.authToken}`,
        };
        const resp = await apiClient.makeCall({
          method: "GET",
          url: url,
          header: headers,
        });
        this.leaderBoardPopup = true;
        console.log(resp.data);
        this.leaderBoardData = resp.data;
      } else {
        this.$store.dispatch("snackbar/SHOW", {
          type: "error",
          message: Messages.EVENT.INVALID_AUTH_TOKEN,
        });
      }
    },

    async fetchUserInfoOnLogin() {
      try {
        this.isLoading = true;
        if (this.authToken != "" && this.authToken && this.user.email) {
          this.userProfileData = this.user;
          const url = `${this.$config.studioServer.BASE_URL}api/v1/investor?email=${this.user.email}&projectId=${this.eventData._id}`;
          let headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.authToken}`,
          };
          const res = await apiClient.makeCall({
            url,
            header: headers,
            method: "GET",
          });

          //   console.log(res);
          if (res.data.length == 0) {
            console.log("heree");
            // a user can participate in event
            // Participate in event
            try {
              const hypersignAuthAction = this.eventData.actions.find(
                (x) => x.type == "HYPERSIGN_AUTH"
              );
              console.log(hypersignAuthAction);
              if (hypersignAuthAction) {
                eventBus.$emit("UpdateUserInfoFromEvent", {
                  actionItem: hypersignAuthAction,
                  value: "Authorized",
                });
              }
            } catch (e) {
              console.error(e);
            }
          }

          this.userEventData = {
            ...res.data[0],
          };

          this.prizeData = this.eventData.actions.filter((x) => {
            return x.type === "PRIZE_CARD";
          });
          const actionWithoutPrize = this.eventData.actions.filter((x) => {
            return x.type !== "PRIZE_CARD";
          });
          const eventActions = actionWithoutPrize;

          if (
            this.userEventData.actions &&
            this.userEventData.actions.length > 0
          ) {
            this.eventActionsToShow = eventActions.map((ea) => {
              const doneAction = this.userEventData.actions.find(
                (ua) => ua._id == ea._id
              );
              if (doneAction) {
                ea["isDone"] = true;
                ea.value = doneAction.value;
              } else {
                ea["isDone"] = false;
              }
              return ea;
            });
          } else {
            this.eventActionsToShow = eventActions;
          }
        }
      } catch (e) {
        localStorage.clear();
        this.$router.go();
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
