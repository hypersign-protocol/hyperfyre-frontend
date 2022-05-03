<template>
  <v-container class="py-0">
    <div class="overview__wrap">
      <p
        class="font-16 line-h-19 font-weight--medium color-primary-100 text-center pt-56"
      >
        Our Pricing
      </p>
      <div
        class="font-40 line-h-48 font-weight--bold white--text text-center width-625 ma-auto pb-30"
      >
        Unlimited promotions & entries. No contracts. Cancel anytime.
      </div>
      <div class="ma-auto d-flex align-center pb-30">
        <template v-for="plan in plans">
          <v-btn
            dark
            outlined
            depressed
            :elavation="0"
            class="ma-auto btn-primary-outline letter-s-0 mt-19 height-54 border-r-8 px-86 text-capitalize font-16 line-h-19 font-weight--regular"
            v-if="plan.price === 0"
            :key="plan._id"
            :disabled="subscriptions.find((el) => el.planId === plan._id)"
            @click="subscribe(plan._id)"
            :color="
              subscriptions.find((el) => el.planId === plan._id)
                ? 'red'
                : 'white'
            "
          >
            {{
              subscriptions.find((el) => el.planId === plan._id)
                ? "You are already subscribed"
                : "Free Plan"
            }}
          </v-btn>
        </template>
      </div>
      <v-tabs
        dark
        color="white"
        centered
        background-color="black"
        v-model="tab"
        class="subscription-tabs"
      >
        <v-tabs-slider color="#6966FB"></v-tabs-slider>
        <v-tab
          class="font-18 line-h-22 font-weight--medium text-capitalize letter-s-0"
          v-for="(item, index) in subscriptionTypes"
          :key="index"
        >
          {{ item.label }}
        </v-tab>
      </v-tabs>
      <v-tabs-items dark v-model="tab">
        <v-tab-item v-for="(item, index) in subscriptionTypes" :key="index">
          <v-row
            class="ma-0 pt-54"
            v-for="chunk in Math.ceil(plans.length / 4)"
            :key="'chunk-' + chunk"
          >
            <v-col
              cols="12"
              md="3"
              :key="plan._id"
              v-for="plan in plans.slice((chunk - 1) * 4, chunk * 4)"
            >
              <v-card
                flat
                color="black"
                class="subscription-card"
                v-if="plan.price !== 0"
                :class="plan.planName === 'Lambo' ? 'popular' : ''"
              >
                <h1
                  class="font-24 line-h-29 font-weight--bold white--text mb-2"
                >
                  <span v-html="getEmoji(plan.planName)"></span>
                  {{ plan.planName }}
                </h1>
                <p
                  class="font-56 line-h-68 font-weight--medium color-primary-100"
                >
                  <span>$</span>
                  {{ plan.price }}
                </p>
                <ul
                  class="mb-4 font-13 line-h-40 font-weight--medium white--text list-none pl-0"
                >
                  <li>
                    <v-icon color="green" class="mr-2"
                      >mdi-checkbox-marked-circle</v-icon
                    >Unlimited Active Campaigns
                  </li>
                  <li>
                    <v-icon color="green" class="mr-2"
                      >mdi-checkbox-marked-circle</v-icon
                    >
                    <span class="number color-primary-100 font-weight--bold"
                      >{{ plan.totalNoOfRequests }}
                    </span>
                    Winners Selection
                  </li>
                  <li>
                    <v-icon color="green" class="mr-2"
                      >mdi-checkbox-marked-circle</v-icon
                    ><span class="number color-primary-100 font-weight--bold">{{
                      plan.noOfWinners
                    }}</span>
                    Credits [Signup Capacity]
                  </li>
                  <li>
                    <v-icon color="green" class="mr-2"
                      >mdi-checkbox-marked-circle</v-icon
                    ><span class="number color-primary-100 font-weight--bold">{{
                      plan.noOfRepeatitiveActions
                    }}</span>
                    Repeated Actions (Social/Inputs)
                  </li>
                </ul>
                <v-expansion-panels accordion class="mb-5">
                  <v-expansion-panel class="subscription-accordion">
                    <v-expansion-panel-header color="black"
                      >See all features</v-expansion-panel-header
                    >
                    <v-expansion-panel-content color="black">
                      <ul
                        class="font-14 line-h-40 font-weight--medium white--text list-none pl-0"
                      >
                        <li
                          v-for="(item, index) in plan.otherFeatures"
                          :key="index"
                        >
                          <v-icon color="green" class="mr-2"
                            >mdi-checkbox-marked-circle</v-icon
                          >
                          {{ item }}
                        </li>
                      </ul>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
                <v-btn
                  outlined
                  depressed
                  :elavation="0"
                  class="btn-primary-outline letter-s-0 mt-19 height-54 border-r-8 px-86 white--text text-capitalize font-16 line-h-19 font-weight--regular"
                  @click="ViewSubscription(plan)"
                  >Choose Plan</v-btn
                >
              </v-card>
            </v-col>
          </v-row>
        </v-tab-item>
      </v-tabs-items>
      <v-data-table
        class="result-table campaign"
        :headers="headers"
        :hide-default-header="true"
        :items="subscriptions"
        item-key="_id"
        dark
        :search="search"
        :loading="loading"
      >
        <template v-slot:item.subscription="{ item }">
          <v-row class="ma-0 bg-blue-100 border-r-8 result-row">
            <v-col cols="12" md="6">
              <div class="d-flex align-center">
                <div
                  class="profile-icon width-47 height-47 bg-blue-200 border-r-50 mr-2"
                >
                  <span class="white--text text-capitalize">
                    {{ getPlanName(item.planId).charAt(0) }}
                  </span>
                </div>
                <div class="d-flex flex-column">
                  <div class="white--text font-14 line-h-22 font-weight-bold">
                    {{ getPlanName(item.planId) }}
                  </div>
                  <div
                    class="color-grey-300 font-12 line-h-14 font-weight-regular"
                  >
                    {{
                      item.subscriptionDate | moment("MMMM Do YYYY, h:mm:ss a")
                    }}
                  </div>
                </div>
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <div class="d-flex align-center justify-end">
                <div
                  class="font-14 line-h-22 font-weight-bold color-grey-300 mr-32"
                >
                  <input
                    :id="item._id"
                    :value="`${item._id}`"
                    type="text"
                    hidden
                  />
                  <a
                    :href="item._id"
                    target="_blank"
                    class="text-decoration-none font-14 line-h-22 font-weight-bold color-grey-300"
                  >
                    Subcription ID
                  </a>

                  <v-tooltip
                    content-class="copy-tooltip"
                    :open-on-hover="false"
                    :open-on-click="true"
                    color="#000"
                    text-color="#fff"
                    top
                  >
                    <template v-slot:activator="{ on }">
                      <v-icon
                        size="20"
                        color="primary"
                        v-on="on"
                        @click="copyContent(item._id)"
                        >mdi-content-copy</v-icon
                      >
                    </template>
                    <span>Copied to clipboard</span>
                  </v-tooltip>
                </div>
                <div
                  class="font-14 line-h-22 font-weight-bold color-grey-300 mr-32"
                >
                  <v-chip
                    dark
                    outlined
                    color="#2AD798"
                    class="height-25 letter-s-0 text-capitalize font-14 line-h-17 font-weight--bold px-3 mr-2 mt-2"
                  >
                    Active
                  </v-chip>
                </div>
              </div>
            </v-col>
          </v-row>
        </template>
      </v-data-table>
    </div>
  </v-container>
</template>
<script>
import fetch from "node-fetch";
import eventBus from "../../eventBus";
import Messages from "../../utils/messages/admin/en";
import general from "@/mixins/general";
import slider from "@/mixins/slider";
export default {
  name: "Subscription",
  mixins: [general, slider],
  data() {
    return {
      subscriptionTypes: [{ label: "Monthly" }, { label: "Annually" }],
      tab: null,
      emojis: {
        Lambo: "&#128665;",
        Moon: "&#127773;",
        Degen: "&#128176;",
        Satoshi: "&#128373;",
      },
      search: null,
      user: JSON.parse(localStorage.getItem("user")),
      accessUser: JSON.parse(localStorage.getItem("accessuser")),
      authToken: localStorage.getItem("authToken"),
      accessToken: localStorage.getItem("accessToken"),
      plans: [],
      subscriptions: [],
      activeSubscriptions: [],
      loading: false,
      headers: [
        {
          text: "Subscription",
          align: "start",
          sortable: false,
          value: "subscription",
        },
      ],
    };
  },
  created() {
    this.fetchPlan();
    this.fetchSubscription();
  },
  methods: {
    getEmoji(item) {
      return this.emojis[item];
    },

    getPlanName(subPlanId) {
      const subPlan = this.plans.find((plan) => plan["_id"] === subPlanId);
      return subPlan ? subPlan["planName"] : "";
    },
    async fetchPlan() {
      try {
        this.loading = true;
        const url = `${this.$config.studioServer.BASE_URL}api/v1/plan?authToken=${this.authToken}`;
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
        let json = await resp.json();
        json = json.map(function (el) {
          let item = Object.assign({}, el);
          item.visible = false;
          return item;
        });
        // console.log(json);
        this.plans = json;
        // localStorage.setItem("plans", JSON.stringify(json));
      } catch (e) {
        this.notifyErr(e.message);
      } finally {
        this.loading = false;
      }
    },
    async subscribe(planId) {
      try {
        if (!planId) {
          return;
        }
        var planbody = {};
        this.plan.selectedCurrency = "HIDD";
        this.plan.selectedNetwork = "MATICC";
        this.plan.coupon_code = "Free120";
        this.plan.grandTotal = "0";
        this.plan.price = "0";

        planbody = Object.assign(planbody, this.plan);
        // console.log(planId);

        this.isLoading = true;

        // Payment Type
        // Crypto or Fiat ?
        // MOOPAY  ( SOLANA, ETHE, POLYGON )
        // PAYU

        /**
         * {
         *  "planId":"2222",
         *  "curr" : "HID|USDT|USDC|INR|USD",
         *  "network": "ETH|SOL|MATIC|BSC|ONE",
         *  "currType": "FIAT|CRYPTO",
         *  "coupon": "HID302022"
         * }
         */

        const url = `${this.$config.studioServer.BASE_URL}api/v1/subscription`;
        let headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.authToken}`,
          AccessToken: `Bearer ${this.accessToken}`,
        };
        const resp = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            planId,
            planbody,
          }),
          headers,
        });

        const json = await resp.json();
        if (json) {
          if (!resp.ok) {
            return this.notifyErr(json);
          } else {
            this.fetchSubscription();

            this.notifySuccess(
              Messages.SUBSCRIPTIONS.YOU_ARE_SUBSCRIBED + json["newSub"]["_id"]
            );
          }
        } else {
          throw new Error("Error while subscritption");
        }
      } catch (e) {
        this.notifyErr(e.message);
      } finally {
        this.isLoading = false;
      }
    },
    async fetchSubscription() {
      try {
        this.loading = true;

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
        this.subscriptions = json["subscriptions"];
        this.activeSubscriptions = this.subscriptions.filter((x) =>
          x.paymentData ? true : x.isActive === true
        );
        this.paidSubscriptions = this.subscriptions.filter((x) => {
          return x.paymentData ? true : x.isPaid === true;
        });

        const usage = json["usage"];

        if (usage && usage.totalUsed >= usage.totalAvailable) {
          eventBus.$emit("UpdateAdminNav", false);
          throw new Error(Messages.SUBSCRIPTIONS.SUBSCRIPTION_EXHAUSTED);
        }

        if (usage && usage.totalAvailable > 0) {
          eventBus.$emit("UpdateAdminNav", true);
        } else {
          eventBus.$emit("UpdateAdminNav", false);
        }
        // localStorage.setItem("subscriptions", JSON.stringify(json));
        // this.notifySuccess("No. of projects fetched " + this.projects.length);
      } catch (e) {
        this.notifyErr(e.message);
      } finally {
        this.loading = false;
      }
    },

    ViewSubscription(data) {
      data.emoji = this.getEmoji(data.planName);
      this.openDrawer("edit", "900", "subscriptions/edit", data);
    },
  },
};
</script>
<style lang="css" scoped></style>
