<template>
  <v-container>
    <div class="overview__wrap">
      <v-row class="mt-5 align-center">
        <v-col cols="12" md="4">
          <div>
            <label class="white--text font-14 line-h-17 font-weight-regular"
              >Select Campaigns</label
            >
            <v-select
              v-model="campaign_id"
              :items="campaigns"
              item-text="projectName"
              item-value="_id"
              autocomplete="off"
              dark
              flat
              solo
              outlined
              class="form-input"
              @change="getParticipants"
            >
              <template slot="append">
                <v-icon>mdi-chevron-down</v-icon>
              </template>
            </v-select>
          </div>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            @input="isTyping = true"
            v-model="search"
            prepend-inner-icon="mdil-magnify"
            hide-details="auto"
            dark
            flat
            solo
            outlined
            class="form-input mb-2"
            placeholder="Search for a participant…"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-btn
            :ripple="false"
            class="btn-gradient-outline height-35 letter-s-0 text-capitalize font-16 line-h-19 font-weight--medium white--text mr-4"
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
            class="btn-gradient-outline height-35 letter-s-0 text-capitalize font-16 line-h-19 font-weight--medium white--text mr-4"
            depressed
            rounded
            x-large
          >
            Lottery
          </v-btn>
        </v-col>
      </v-row>
      <v-data-table
        :headers="headers"
        :items="participants"
        :single-expand="singleExpand"
        :expanded.sync="expanded"
        item-key="name"
        show-expand
        class="elevation-1"
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
                    <td>{{ item.value }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </td>
        </template>
      </v-data-table>
    </div>
  </v-container>
</template>
<script>
import eventBus from "@/eventBus.js";
import FileDownload from "js-file-download";
import apiClientMixin from "@/mixins/apiClientMixin";
import _ from "lodash";
export default {
  data() {
    return {
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
      if (!this.campaign_id) {
        this.$store.dispatch("snackbar/SHOW", {
          type: "error",
          message: "Please select the campaign",
        });
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
        }
        const json = await resp.json();
        console.log(json);

        this.participants = json.investors;
        this.totalCount = json.investors.length;
      }
    },
    async handleExport() {
      if (!this.campaign_id) {
        this.$store.dispatch("snackbar/SHOW", {
          type: "error",
          message: "Please select the campaign",
        });
      } else {
        this.isExporting = true;
        try {
          const url = `${this.$config.studioServer.BASE_URL}api/v1/project/${this.campaign_id}?fetchInvestors=true&isExport=true&limit=1`;
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
          this.notifyErr(e);
        } finally {
          this.isExporting = false;
        }
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
        this.notifyErr(e.message);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
