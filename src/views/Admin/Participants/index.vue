<template>
  <v-container>
    <div class="overview__wrap">
      <v-row class="mt-5">
        <v-col cols="12" md="4">
          <v-select
            :items="campaigns"
            item-text="projectName"
            item-value="_id"
            autocomplete="off"
            dark
            flat
            solo
            outlined
            class="form-input"
          >
            <template slot="append">
              <v-icon>mdi-chevron-down</v-icon>
            </template>
          </v-select>
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
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">More info about {{ item.name }}</td>
        </template>
      </v-data-table>
    </div>
  </v-container>
</template>
<script>
import eventBus from "../../../eventBus.js";
export default {
  data() {
    return {
      authToken: localStorage.getItem("authToken"),
      accessToken: localStorage.getItem("accessToken"),
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
        { text: "Actions", value: "actions" },
        { text: "Score", value: "score" },
        { text: "", value: "data-table-expand" },
      ],
      participants: [],
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
      await this.readTheDataFromApi();
    },
    async readTheDataFromApi() {
      this.loading = true;
      await this.fetchProjectData(this.page, this.itemsPerPage);
      this.loading = false;
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

    async fetchProjectInvestors(e) {
      if (e) {
        this.tableSearch = "";
        this.investor.projectId = e;
        await this.fetchProjectData(0, this.perPage);
        this.holdInvestors = this.project.investors;
      } else {
        this.project.investors = [];
      }
    },

    async fetchProjectData(skip, limit) {
      try {
        this.isLoading = true;

        if (!this.investor.projectId) throw new Error("No project found");

        const url = `${this.$config.studioServer.BASE_URL}api/v1/project/${this.investor.projectId}?fetchInvestors=true&limit=${limit}&skip=${skip}&searchQuery=${this.tableSearch}`;
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
          return this.notifyErr(resp.statusText);
        }
        const json = await resp.json();

        this.project = { ...json };
        this.sourceData = { ...json };
        this.project.fromDate = this.formateDate(this.project.fromDate);
        this.project.toDate = this.formateDate(this.project.toDate);
        this.projectFetched = true;

        this.pageSelectDropdown = Array.from(
          { length: Math.ceil(this.project.count / this.perPage) },
          (_, i) => i + 1
        );

        // this.notifySuccess(
        //   Messages.EVENTS.CREATE_EDIT_EVENT.PROJECT_FETCHED + json.projectName
        // );
      } catch (e) {
        this.notifyErr(e.message);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
