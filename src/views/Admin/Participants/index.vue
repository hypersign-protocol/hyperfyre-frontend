<template>
  <v-container>
    <div class="overview__wrap">
      <div class="d-flex align-center justify-space-between mt-6">
        <div class="d-flex flex-column">
          <v-form ref="campaignForm">
            <label
              class="white--text font-14 line-h-17 font-weight-regular mb-2"
              >Select Campaigns</label
            >
            <v-select
              v-model="campaign_id"
              :items="campaigns"
              :rules="rules.campaign_id"
              item-text="projectName"
              item-value="_id"
              autocomplete="off"
              dark
              flat
              solo
              outlined
              class="form-input"
              placeholder="Please select campaign"
              @change="getParticipants"
            >
              <template slot="append">
                <v-icon>mdi-chevron-down</v-icon>
              </template>
            </v-select>
          </v-form>
        </div>
        <div class="d-flex align-center justify-center">
          <v-text-field
            @input="isTyping = true"
            v-model="search"
            prepend-inner-icon="mdil-magnify"
            hide-details="auto"
            dark
            flat
            solo
            outlined
            class="form-input mr-4"
            placeholder="Search for a participant…"
          ></v-text-field>
          <v-btn
            :ripple="false"
            class="background-theme gradient py-2 px-4 width-133 height-41 letter-s-0 text-capitalize font-16 line-h-19 font-weight--medium white--text mr-4"
            depressed
            rounded
            x-large
            :loading="isExporting"
            @click="handleExport"
          >
            Export All
          </v-btn>
          <v-btn
            :ripple="false"
            class="background-theme gradient py-2 px-4 width-133 height-41 letter-s-0 text-capitalize font-16 line-h-19 font-weight--medium white--text"
            depressed
            rounded
            x-large
            @click="showLotterPopup"
          >
            Lottery
          </v-btn>
        </div>
      </div>
      <template v-if="loading">
        <v-skeleton-loader type="table-row-divider@6"></v-skeleton-loader>
      </template>
      <v-data-table
        v-if="!loading"
        class="result-table mt-6"
        :headers="headers"
        :items="participants"
        :single-expand="singleExpand"
        :expanded.sync="expanded"
        item-key="name"
        show-expand
        dark
        :items-per-page="itemsPerPage"
        :footer-props="footerProps"
        :server-items-length="totalCount"
        :options.sync="options"
      >
        <template v-slot:item.score="{ item }">
          {{ item.numberOfReferals }}
        </template>
        <template v-slot:item.name="{ item }">
          {{ item.name }}
        </template>
        <template v-slot:item.actions="{ item }">
          Performed {{ item.actions.length }} actions
        </template>
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <div
              class="my-5 font-16 line-h-19 font-weight--regular white--text text-center"
            >
              {{ item.name }}'s event actions list
            </div>
            <v-simple-table dark>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Title</th>
                    <th class="text-left">Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in item.actions" :key="index">
                    <td>{{ item.title }}</td>
                    <td>{{ parseActionValue(item) }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </td>
        </template>
      </v-data-table>
      <v-dialog v-model="lotteryPopup">
        <v-card flat color="#26264F" width="450" class="ma-auto pa-6">
          <v-card-title
            class="px-0 pt-0 pb-5 white--text text-left d-flex align-center justify-space-between"
          >
            <h2
              class="font-24 line-h-31 white--text text-left font-weight--medium font"
            >
              Lottery
            </h2>
            <v-icon color="white" size="25" @click="lotteryPopup = false"
              >mdi-close</v-icon
            >
          </v-card-title>
          <v-card-text class="white--text px-0">
            <div
              class="border-r-4 font-13 line-h-19 white--text bg-blue-100 pa-5 mb-6"
            >
              Lottery is the process of selecting winners of an event. Upon
              clicking on "Execute button", the lottery process begins, which
              may take sometime and screen may freeze. Once done, you will get
              selected records in excel sheet. The winner selection is primarly
              based on their "score" unless checked "randomly".
            </div>
            <v-form>
              <div class="mb-6 d-flex align-center justify-space-between">
                <label class="font-14 line-h-17 font-weight-regular"
                  >Total Records
                </label>
                <span class="font-14 line-h-17 font-weight-regular">{{
                  participants.length
                }}</span>
              </div>
              <div class="mb-6">
                <label class="font-14 line-h-17 font-weight-regular mb-2"
                  >Number of winners to choose
                </label>
                <v-text-field
                  hide-details="auto"
                  v-model="noOfWinners"
                  :rules="rules.noOfWinners"
                  dark
                  flat
                  solo
                  outlined
                  class="form-input"
                  placeholder="Please enter no of records"
                ></v-text-field>
              </div>
              <div class="mb-6 d-flex align-center">
                <label class="font-14 line-h-17 font-weight-regular mr-4"
                  >Check to choose randomly (optional)</label
                >
                <v-switch
                  :ripple="false"
                  hide-details="auto"
                  v-model="isRandom"
                  flat
                  class="mt-0 pt-0 notification-switch"
                ></v-switch>
              </div>
              <div class="d-flex align-center justify-center">
                <v-btn
                  :ripple="false"
                  class="background-theme gradient py-2 px-4 width-133 height-41 letter-s-0 text-capitalize font-16 line-h-19 font-weight--medium white--text"
                  depressed
                  rounded
                  x-large
                  @click="handleLottery"
                >
                  Execute
                </v-btn>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
  </v-container>
</template>
<script>
import eventBus from "@/eventBus.js";
import FileDownload from "js-file-download";
import apiClientMixin from "@/mixins/apiClientMixin";
import Messages from "@/utils/messages/admin/en";
import _ from "lodash";
export default {
  data() {
    return {
      isRandom: false,
      noOfWinners: 0,
      loading: false,
      lotteryPopup: false,
      search: "",
      isTyping: false,
      campaign_id: null,
      isExporting: false,
      participants: [],
      authToken: localStorage.getItem("authToken"),
      campaigns: [],
      expanded: [],
      singleExpand: false,
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Email", value: "email" },
        { text: "DID", value: "did" },
        { text: "Actions", value: "actions" },
        { text: "Score", value: "score" },
        { text: "", value: "data-table-expand" },
      ],
      page: 1,
      totalCount: 0,
      itemsPerPage: 10,
      options: {},
      sortOrder: "desc",
      sortBy: "updated_at",
      footerProps: {
        itemsPerPageOptions: [10, 15, 20, 25, 50],
        showFirstLastPage: true,
        showCurrentPage: true,
      },
      rules: {
        campaign_id: [(v) => !!v || "Please select campaign"],
        noOfWinners: [],
      },
    };
  },

  watch: {
    options: {
      handler($event) {
        const sortOrder = $event.sortDesc[0] ? "ASC" : "DESC";
        if ($event.sortBy[0]) {
          this.sortBy = $event.sortBy[0];
          this.sortOrder = sortOrder;
          this.paginate($event);
        }
      },
      deep: true,
    },
    search: _.debounce(function () {
      this.isTyping = false;
    }, 1000),
    isTyping: function (value) {
      if (!value) {
        this.getParticipants();
      }
    },
  },

  mounted() {
    this.fetchSubscription();
    this.getCampaigns();
  },

  methods: {
    getCampaigns() {
      const result = JSON.parse(localStorage.getItem("userProjects"));
      this.campaigns = result.projects;
    },
    async paginate(e) {
      this.itemsPerPage = e.itemsPerPage;
      this.page = e.page;
      await this.getParticipants();
    },

    async getParticipants() {
      this.loading = true;
      if (!this.campaign_id) {
        this.$store.dispatch("snackbar/SHOW", {
          type: "error",
          message: "Please select the campaign",
        });
        this.loading = false;
      } else {
        const url = `${this.$config.studioServer.BASE_URL}api/v1/project/${this.campaign_id}?fetchInvestors=true&searchQuery=${this.search}`;
        // console.log(url);
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.authToken}`,
          AccessToken: `Bearer ${this.accessToken}`,
        };
        const resp = await fetch(url, {
          headers,
          method: "GET",
        });

        if (!resp.ok) {
          console.log(resp.statusText);
          this.loading = false;
        }
        const json = await resp.json();
        console.log(json);

        this.loading = false;

        this.participants = json.investors;
        this.totalCount = json.investors.length;
      }
    },
    async handleExport() {
      if (this.$refs.campaignForm.validate()) {
        this.isExporting = true;
        try {
          const url = `${this.$config.studioServer.BASE_URL}api/v1/project/${this.campaign_id}?fetchInvestors=true&isExport=true&limit=${this.participants.length}`;
          const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.authToken}`,
            AccessToken: `Bearer ${this.accessToken}`,
          };

          const res = await apiClientMixin.makeCall({
            method: "GET",
            url,
            header: headers,
            isFile: true,
          });

          FileDownload(res.data, `Participants_${this.campaign_id}.csv`);
          this.isExporting = false;
        } catch (e) {
          this.isExporting = false;
          this.$store.dispatch("snackbar/SHOW", {
            type: "error",
            message: e,
          });
        } finally {
          this.isExporting = false;
        }
      }
    },
    parseActionValue(action) {
      switch (action.type) {
        case "DISCORD_JOIN":
        case "TELEGRAM_JOIN":
        case "TWITTER_FOLLOW": {
          return JSON.parse(action.value).targetScreenName;
        }
        case "ETHEREUM_ERC20":
        case "MATIC_ERC20":
        case "BINANCE_ERC20":
        case "MOONRIVER_ERC20":
        case "MOONBEAM_ERC20":
        case "MOON_ERC20": {
          return JSON.parse(action.value).userWalletAddress;
        }
        case "ETHEREUM_ERC721":
        case "MATIC_ERC721":
        case "BINANCE_ERC721":
        case "MOONRIVER_ERC721":
        case "MOONBEAM_ERC721":
        case "MOON_ERC721": {
          return JSON.parse(action.value).userWalletAddress;
        }
        case "REEF_ERC20": {
          return JSON.parse(action.value).userWalletAddress.address;
        }
        case "REEF_ERC721": {
          return JSON.parse(action.value).userWalletAddress.address;
        }
        default:
          return action.value;
      }
    },
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
          console.log(resp.statusText);
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
          this.$router.push("/admin/subscription");
          eventBus.$emit("UpdateAdminNav", false);
        }

        if (usage && usage.totalAvailable > 0) {
          eventBus.$emit("UpdateAdminNav", true);
        } else {
          eventBus.$emit("UpdateAdminNav", false);
        }
      } catch (e) {
        this.$store.dispatch("snackbar/SHOW", {
          type: "error",
          message: e.message,
        });
      } finally {
        this.isLoading = false;
      }
    },

    showLotterPopup() {
      if (this.$refs.campaignForm.validate()) {
        this.lotteryPopup = true;
      }
    },
    async handleLottery() {
      if (this.$refs.campaignForm.validate()) {
        if (
          this.noOfWinners > this.participants.length ||
          this.noOfWinners <= 0
        ) {
          this.rules.noOfWinners = [
            (v) => !!v || Messages.PARTICIPANTS.LOTTERY.NO_OF_RECORDS,
          ];
          this.$store.dispatch("snackbar/SHOW", {
            type: "error",
            message: Messages.PARTICIPANTS.LOTTERY.NO_OF_RECORDS,
          });
        } else {
          try {
            let url = `${this.$config.studioServer.BASE_URL}api/v1/project/${this.campaign_id}/lottery?token=${this.authToken}&limitRecord=${this.noOfWinners}&isRandom=${this.isRandom}`;
            const headers = {
              Authorization: `Bearer ${this.authToken}`,
              AccessToken: `Bearer ${this.accessToken}`,
            };
            const res = await apiClientMixin.makeCall({
              method: "GET",
              header: headers,
              url,
              isFile: true,
            });
            FileDownload(res.data, `Lottery_${this.campaign_id}.csv`);
          } catch (e) {
            this.$store.dispatch("snackbar/SHOW", {
              type: "error",
              message: e,
            });
          } finally {
            this.isLoading = false;
          }
        }
      }
    },
  },
};
</script>
