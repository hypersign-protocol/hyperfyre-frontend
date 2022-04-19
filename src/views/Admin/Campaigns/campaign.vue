<template>
  <v-container class="py-0">
    <div class="overview__wrap">
      <v-row class="ma-0">
        <v-col cols="12" md="12" class="pa-0">
          <v-card flat color="black" v-if="!isSubmitted">
            <v-tabs
              :hide-slider="true"
              v-model="navigationTab"
              vertical
              class="campaign__tabs"
            >
              <p class="font-20 line-h-24 font-weight-bold color-grey-100">
                <span v-if="isEdit">Edit Campaign</span>
                <span v-if="!isEdit">Create Campaign</span>
              </p>
              <template v-for="(item, index) in navigation">
                <v-tab
                  class="font-16 line-h-19 font-weight--medium letter-s-0"
                  :ripple="false"
                  :href="`#${item.slug}`"
                  @click="next(item.name)"
                  :key="index"
                  :class="item.filled ? 'done' : ''"
                >
                  <template v-if="!isEdit">
                    <img
                      v-if="!item.filled"
                      class="mr-3"
                      src="@/assets/images/empty-circle.svg"
                    />
                    <img
                      v-if="item.filled"
                      class="mr-3"
                      src="@/assets/images/check-circle.svg"
                    />
                  </template>
                  <template v-if="isEdit">
                    <img class="mr-3" src="@/assets/images/check-circle.svg" />
                  </template>

                  {{ item.name }}
                </v-tab>
              </template>
            </v-tabs>
            <div class="tab__content__wrapper">
              <v-tabs-items v-model="navigationTab">
                <template v-for="(item, index) in navigation">
                  <v-tab-item :value="item.slug" :eager="true" :key="index">
                    <div class="content__text white--text">
                      <v-form
                        :ref="`${item.name.replace(/\s/g, '')}Form`"
                        class="width-600 ma-auto white--text"
                        v-model="item.valid"
                        lazy-validation
                      >
                        <component
                          :is="loadComponent(item)"
                          :campaign="campaign"
                          :isEdit="isEdit"
                          :list="loadList(item)"
                        ></component>
                        <div
                          class="d-flex flex-column align-center justify-center"
                        >
                          <v-btn
                            v-if="navigationTab !== 'review'"
                            :ripple="false"
                            color="primary"
                            block
                            class="mt-10 background-theme gradient width-440 height-35 letter-s-0 ma-auto border-r-2 text-capitalize font-16 line-h-19 font-weight-bold white--text"
                            depressed
                            rounded
                            x-large
                            :loading="loading"
                            @click="next(item.name)"
                          >
                            <span>Continue</span>
                          </v-btn>
                          <v-btn
                            v-else
                            :ripple="false"
                            color="primary"
                            block
                            class="mt-10 background-theme gradient width-440 height-35 letter-s-0 ma-auto border-r-2 text-capitalize font-16 line-h-19 font-weight-bold white--text"
                            depressed
                            rounded
                            x-large
                            :loading="loading"
                            @click="create"
                          >
                            <span>Submit</span>
                          </v-btn>
                          <v-btn
                            v-if="navigationTab !== 'basic-info'"
                            color="primary"
                            class="letter-s-0 ma-auto border-r-2 text-capitalize font-16 line-h-19 font-weight-bold color-primary-100"
                            depressed
                            text
                            :ripple="false"
                            rounded
                            x-large
                            @click="prev()"
                          >
                            Back
                          </v-btn>
                        </div>
                      </v-form>
                    </div>
                  </v-tab-item>
                </template>
              </v-tabs-items>
            </div>
          </v-card>
          <v-card
            flat
            color="black"
            class="width-500 ma-auto pt-100"
            v-if="isSubmitted"
          >
            <div class="mx-auto d-flex flex-column align-center justify-center">
              <v-img
                lazy-src="@/assets/images/done.png"
                max-width="115"
                max-height="115"
                src="@/assets/images/done.png"
              ></v-img>
              <p class="font-20 line-h-24 font-weight-bold white--text">
                Campaign {{ campaignStatusMessage }}
              </p>
              <p
                class="font-16 line-h-19 font-weight-regular white--text mb-48"
              >
                Thank you! You have successfully {{ campaignStatusMessage }} the
                Campaign
              </p>

              <v-btn
                :ripple="false"
                block
                class="mb-6 btn-gradient-outline width-440 height-35 letter-s-0 ma-auto border-r-2 text-capitalize font-16 line-h-19 font-weight-bold color-primary-100"
                depressed
                rounded
                x-large
                href="/create-campaign"
              >
                Create another Campaign
              </v-btn>
              <span class="font-16 line-h-19 font-weight-regular white--text"
                >Or</span
              >

              <v-btn
                :ripple="false"
                color="primary"
                block
                class="mt-10 background-theme gradient width-440 height-35 letter-s-0 ma-auto border-r-2 text-capitalize font-16 line-h-19 font-weight-bold white--text"
                depressed
                rounded
                x-large
                href="/campaigns"
              >
                <span>View Campaign</span>
              </v-btn>
              <v-btn
                color="primary"
                class="letter-s-0 ma-auto border-r-2 text-capitalize font-16 line-h-19 font-weight-bold color-primary-100"
                depressed
                text
                :ripple="false"
                rounded
                x-large
                href="/overview"
              >
                Take me to home page
              </v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <v-dialog v-model="confirmation" width="500">
        <v-card flat color="#26264F" class="width-500 ma-auto pt-100 px-30">
          <div class="mx-auto d-flex flex-column align-center justify-center">
            <v-img
              lazy-src="@/assets/images/confirmation.png"
              max-width="115"
              max-height="115"
              src="@/assets/images/confirmation.png"
              class="mb-25"
            ></v-img>
            <p class="font-18 line-h-22 font-weight-bold white--text">
              Add a Custom Campaign Script
            </p>
            <p class="font-16 line-h-19 font-weight-regular white--text mb-25">
              Would you like to add and customize your campaign?
            </p>

            <v-btn
              :ripple="false"
              color="primary"
              block
              class="mt-10 background-theme gradient width-440 height-35 letter-s-0 ma-auto border-r-2 text-capitalize font-16 line-h-19 font-weight-bold white--text"
              depressed
              rounded
              x-large
              @click="
                confirmation = false;
                navigationTab = 'prize';
              "
            >
              <span>Yes, please</span>
            </v-btn>
            <v-btn
              color="primary"
              class="letter-s-0 ma-auto border-r-2 text-capitalize font-14 line-h-7 font-weight-regular white--text"
              depressed
              text
              :ripple="false"
              rounded
              x-large
              @click="
                confirmation = false;
                navigationTab = 'review';
              "
            >
              <span class="white--text">Skip for now</span>
            </v-btn>
          </div>
        </v-card>
      </v-dialog>
    </div>
  </v-container>
</template>
<script>
import apiClientMixin from "../../../mixins/apiClientMixin";
export default {
  name: "CreateCampaign",

  data() {
    return {
      confirmation: false,
      isSubmitted: false,
      campaignStatusMessage: "Created",
      isEdit: false,
      authToken: localStorage.getItem("authToken"),
      navigationTab: "basic-info",
      loading: false,
      navigation: [
        {
          name: "Basic Info",
          slug: "basic-info",
          valid: true,
          filled: false,
        },
        {
          name: "Referral",
          slug: "referral",
          valid: true,
          filled: false,
        },
        {
          name: "Prize",
          slug: "prize",
          valid: true,
          filled: false,
          method: "loadList",
        },
        {
          name: "Custom",
          slug: "custom",
          valid: true,
          filled: false,
        },
        {
          name: "Social",
          slug: "social",
          valid: true,
          filled: false,
        },
        {
          name: "Wallet",
          slug: "wallet",
          valid: true,
          filled: false,
        },
        {
          name: "Smart Contract",
          slug: "smart-contract",
          valid: true,
          filled: false,
        },
        {
          name: "Review",
          slug: "review",
        },
      ],

      campaign: {},
    };
  },

  watch: {
    $route: function (val) {
      if (val.meta.slug === "create-campaign") {
        this.isEdit = false;
      } else if (val.meta.slug === "edit-campaign") {
        this.isEdit = true;
      }
    },
  },
  mounted() {
    this.$root.$on("getFilledData", this.captureCampaignData);
    this.$root.$on("updateEventActions", this.AddUpdateDelEventActions);
    this.$root.$on("setTab", this.setNavigation);
    // this.loadCampaign();
  },
  beforeMount() {
    this.loadCampaign();
  },
  methods: {
    loadList(item) {
      let list = [];
      if (item.slug === "prize") {
        if (this.campaign.actions && this.campaign.actions.length > 0) {
          list = this.campaign.actions.filter(
            (x) => x.type.indexOf("PRIZE_") > -1
          );
        }
      } else if (item.slug === "custom") {
        if (this.campaign.actions && this.campaign.actions.length > 0) {
          list = this.campaign.actions.filter(
            (x) =>
              x.type.indexOf("INPUT_") > -1 ||
              x.type.indexOf("HYPERLINK_URL") > -1 ||
              x.type.indexOf("INFO_TEXT") > -1
          );
        }
      } else if (item.slug === "social") {
        if (this.campaign.actions && this.campaign.actions.length > 0) {
          list = this.campaign.actions.filter(
            (x) =>
              x.type.indexOf("TWITTER_") > -1 ||
              x.type.indexOf("TELEGRAM_") > -1 ||
              x.type.indexOf("DISCORD_") > -1
          );
        }
      } else if (item.slug === "wallet") {
        if (this.campaign.actions && this.campaign.actions.length > 0) {
          list = this.campaign.actions.filter(
            (x) => x.type.indexOf("BLOCKCHAIN_") > -1
          );
        }
      } else if (item.slug === "smart-contract") {
        if (this.campaign.actions && this.campaign.actions.length > 0) {
          list = this.campaign.actions.filter(
            (x) =>
              x.type.indexOf("ETHEREUM_") > -1 ||
              x.type.indexOf("MATIC_") > -1 ||
              x.type.indexOf("BINANCE_") > -1 ||
              x.type.indexOf("REEF_") > -1 ||
              x.type.indexOf("MOONBEAM_") > -1 ||
              x.type.indexOf("MOONRIVER_") > -1 ||
              x.type.indexOf("MOON_") > -1
          );
        }
      }
      return list;
    },
    async loadCampaign() {
      if (this.$router.currentRoute.meta.slug === "create-campaign") {
        this.campaign = {
          projectName: "",
          logoUrl: "",
          fromDate: "",
          toDate: "",
          isNotificaionEnabled: false,
          ownerDid: "did:hs:QWERTlkasd090123SWEE12322",
          investorsCount: 0,
          social: {},
          projectStatus: true,
          actions: [],
          refereePoint: 10,
          referralPoint: 5,
          tags: [],
          themeColor: "#494949",
          fontColor: "#ffffff",
        };

        this.isEdit = false;
      } else if (this.$router.currentRoute.meta.slug === "edit-campaign") {
        this.isEdit = true;
        await this.getItemId();
      }
    },

    async getItemId() {
      const url = `${this.$config.studioServer.BASE_URL}api/v1/project/${this.$router.currentRoute.params.id}`;

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
      if (json) {
        this.campaign = json;
        console.log(this.campaign.tags);
      }
    },

    setNavigation(data) {
      this.navigationTab = data;
    },
    loadComponent(item) {
      return require(`@/components/campaign/actions/${item.name.replace(
        /\s/g,
        ""
      )}.vue`).default;
    },

    async next(name) {
      if (name !== "Review") {
        await this[`${name.replace(/\s/g, "")}`]();
      }
    },

    nextIndex() {
      const index = this.navigation.findIndex(
        (el) => el.slug === this.navigationTab
      );

      this.navigation[index].filled = true;

      if (index >= 0 && this.navigation.length - 1 > index) {
        const nextIndex = (index + 1) % this.navigation.length;
        this.navigationTab = this.navigation[nextIndex].slug;
      }
    },

    prev() {
      const index = this.navigation.findIndex(
        (el) => el.slug === this.navigationTab
      );

      const prevIndex =
        (index + this.navigation.length - 1) % this.navigation.length;
      this.navigationTab = this.navigation[prevIndex].slug;

      // this[`${name.replace(/\s/g, "")}`]();
    },

    async BasicInfo() {
      if (this.$refs.BasicInfoForm[0].validate()) {
        this.$root.$emit("getBasicInfoFormData");
        this.nextIndex();
      }
    },

    async Referral() {
      if (this.$refs.ReferralForm[0].validate()) {
        this.$root.$emit("getReferralFormData");
        this.nextIndex();
      }
    },

    async Custom() {
      this.nextIndex();
    },

    async Social() {
      this.nextIndex();
    },

    async Wallet() {
      this.nextIndex();
    },

    async Prize() {
      this.nextIndex();
    },

    async SmartContract() {
      this.nextIndex();
    },

    captureCampaignData(data) {
      console.log(data);
      console.log(this.campaign);
    },
    async create() {
      try {
        const url = `${this.$config.studioServer.BASE_URL}api/v1/project`;
        let headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.authToken}`,
          AccessToken: `Bearer ${this.accessToken}`,
        };

        let method = "POST";
        if (this.isEdit) {
          method = "PUT";
        }

        const resp = await apiClientMixin.makeCall({
          url,
          body: this.campaign,
          method,
          header: headers,
        });

        console.log(resp);
        this.isSubmitted = true;
        this.campaignStatusMessage = this.isEdit ? "Updated" : "Created";
      } catch (e) {
        if (e.errors) {
          console.log(e.errors);
        }
      } finally {
        // this.clear();
      }
    },

    AddUpdateDelEventActions(event) {
      const { type, data } = event;
      if (type) {
        switch (type) {
          case "ADD": {
            this.campaign.actions.push(data);
            break;
          }

          case "UPDATE": {
            const { id, _id } = data;
            this.campaign.actions.map((x) => {
              if (x._id === _id || x.id === id) {
                return data;
              }
            });
            break;
          }

          case "DELETE": {
            if (data._id) {
              const actionIndex = this.campaign.actions.findIndex(
                (x) => x._id == data._id
              );
              if (actionIndex > -1) {
                this.campaign.actions[actionIndex]["isDeleted"] = true;
              }
            } else {
              const actionIndex = this.campaign.actions.findIndex(
                (x) => x.id === data.id
              );
              if (actionIndex > -1) {
                this.campaign.actions.splice(actionIndex, 1);
              }
            }
            break;
          }
        }
      }
    },
  },
};
</script>
<style lang="css" scoped></style>
