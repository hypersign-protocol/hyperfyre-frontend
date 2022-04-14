<template>
  <v-app dark class="black">
    <the-header />
    <v-main class="black pt-0">
      <v-container class="py-0">
        <div class="overview__wrap">
          <v-row class="ma-0">
            <v-col cols="12" md="3" class="pa-0">
              <Metrics
                v-if="!loading"
                :startDate="eventData.fromDate"
                :endDate="eventData.toDate"
                :userEventData="userEventData"
              />
            </v-col>
            <v-divider vertical class="task-border"></v-divider>
            <v-col cols="12" md="9" class="pa-0">
              <div class="pt-42 pl-146">
                <div class="d-flex align-center mb-6 cursor-pointer">
                  <p
                    class="ml-1 mb-0 font-14 line-h-17 font-weight-bold white--text"
                  >
                    {{ eventData.projectName }}
                  </p>
                </div>
                <v-card flat color="black" class="task-card">
                  <div class="bg-blue-100 py-58 px-120 border-r-4">
                    <div class="d-flex align-center justify-center">
                      <img :src="eventData.logoUrl" />
                    </div>
                  </div>
                </v-card>
                <template v-if="authToken !== '' && authToken !== null">
                  <template v-if="!eventData.projectStatus">
                    <p
                      class="color-grey-100 font-14 line-h-17 font-weight-medium"
                    >
                      Event is over
                    </p>
                  </template>
                  <Actions
                    v-if="eventData.projectStatus"
                    :userProfile="user"
                    :ActionSchema="eventActionsToShow"
                    :prizeData="prizeData"
                    @UserUpdateEvent="updateUserData"
                  />
                </template>
                <template v-if="authToken === '' || authToken === null">
                  <Login @AuthTokenUpdateEvent="updateAuthentication" />
                </template>
              </div>
            </v-col>
          </v-row>
        </div>
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
import Messages from "../../utils/messages/participants/en";
import apiClient from "../../mixins/apiClientMixin";
import eventBus from "../../eventBus.js";
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
      prizeData: [],
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
    async updateAuthentication(authToken) {
      try {
        this.authToken = authToken;
        eventBus.$emit("getAuthToken", authToken);
        await this.fetchUserDetails();
        this.fetchUserInfoOnLogin();
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

          this.user.referalLink = `${
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname
          }?referrer=${btoa(this.user.email)}`;
          localStorage.setItem("user", JSON.stringify(this.user));
          this.userProfileData = JSON.parse(localStorage.getItem("user"));
        } else {
          this.notifyErr(Messages.EVENT.INVALID_RESPONSE);
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
        this.notifyErr(Messages.EVENT.INVALID_PROJECT_SLUG);
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
