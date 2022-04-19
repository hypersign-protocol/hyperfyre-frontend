<template>
  <div>
    <p class="color-grey-100 mt-40 font-14 font-weight-bold line-h-17">
      On Going ( {{ ongoing.length }} )
    </p>
    <v-data-table
      class="result-table campaign"
      :headers="headers"
      :hide-default-header="true"
      :items="ongoing"
      item-key="_id"
      dark
      :items-per-page="itemsPerPage"
      :footer-props="footerProps"
      :server-items-length="ongoing.length"
      :options.sync="options"
    >
      <template v-slot:item.projectName="{ item }">
        <v-row class="ma-0 bg-blue-100 border-r-8 result-row">
          <v-col cols="12" md="6">
            <div class="d-flex align-center">
              <div
                class="profile-icon width-47 height-47 bg-blue-200 border-r-50 mr-2"
              >
                <span class="white--text text-capitalize">
                  {{ item.projectName.charAt(0) }}
                </span>
              </div>
              <div class="d-flex flex-column">
                <div class="white--text font-14 line-h-22 font-weight-bold">
                  {{ item.projectName }}
                </div>
                <div
                  class="color-grey-300 font-12 line-h-14 font-weight-regular"
                >
                  {{ item.fromDate | moment("MMMM Do YYYY, h:mm:ss a") }}
                  -
                  {{ item.toDate | moment("MMMM Do YYYY, h:mm:ss a") }}
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
                  :id="item.whitelisting_link"
                  :value="`${item.whitelisting_link}`"
                  type="text"
                  hidden
                />
                <a
                  :href="item.whitelisting_link"
                  target="_blank"
                  class="text-decoration-none font-14 line-h-22 font-weight-bold color-grey-300"
                >
                  Event URL
                </a>
                <v-icon
                  size="20"
                  color="primary"
                  @click="copyContent(item.whitelisting_link)"
                  >mdi-content-copy</v-icon
                >
              </div>
              <div
                class="font-14 line-h-22 font-weight-bold color-grey-300 mr-32"
              >
                <span class="white--text mr-2">{{ item.investorsCount }}</span>
                Participants
              </div>
              <div class="d-flex">
                <v-btn icon @click="deleteCampaign(item)">
                  <v-icon color="primary">mdi-close</v-icon>
                </v-btn>
                <v-btn icon @click="edit(item)">
                  <v-icon color="primary">mdi-circle-edit-outline</v-icon>
                </v-btn>
              </div>
            </div>
          </v-col>
        </v-row>
      </template>
    </v-data-table>
    <p class="color-grey-100 mt-40 font-14 font-weight-bold line-h-17">
      Completed ( {{ completed.length }} )
    </p>

    <v-data-table
      class="result-table campaign"
      :headers="headers"
      :hide-default-header="true"
      :items="completed"
      item-key="_id"
      dark
      :items-per-page="itemsPerPage"
      :footer-props="footerProps"
      :server-items-length="completed.length"
      :options.sync="options"
    >
      <template v-slot:item.projectName="{ item }">
        <v-row class="ma-0 bg-blue-100 border-r-8 result-row">
          <v-col cols="12" md="6">
            <div class="d-flex align-center">
              <div
                class="profile-icon width-47 height-47 bg-blue-200 border-r-50 mr-2"
              >
                <span class="white--text text-capitalize">
                  {{ item.projectName.charAt(0) }}
                </span>
              </div>
              <div class="d-flex flex-column">
                <div class="white--text font-14 line-h-22 font-weight-bold">
                  {{ item.projectName }}
                </div>
                <div
                  class="color-grey-300 font-12 line-h-14 font-weight-regular"
                >
                  {{ item.fromDate | moment("MMMM Do YYYY, h:mm:ss a") }}
                  -
                  {{ item.toDate | moment("MMMM Do YYYY, h:mm:ss a") }}
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
                  :id="item.whitelisting_link"
                  :value="`${item.whitelisting_link}`"
                  type="text"
                  hidden
                />
                <a
                  :href="item.whitelisting_link"
                  target="_blank"
                  class="text-decoration-none font-14 line-h-22 font-weight-bold color-grey-300"
                >
                  Event URL
                </a>
                <v-icon
                  size="20"
                  color="primary"
                  @click="copyContent(item.whitelisting_link)"
                  >mdi-content-copy</v-icon
                >
              </div>
              <div
                class="font-14 line-h-22 font-weight-bold color-grey-300 mr-32"
              >
                <span class="white--text mr-2">{{ item.investorsCount }}</span>
                Participants
              </div>
              <div class="d-flex">
                <v-btn icon @click="deleteCampaign(item)">
                  <v-icon color="primary">mdi-close</v-icon>
                </v-btn>
                <v-btn icon @click="edit(item)">
                  <v-icon color="primary">mdi-circle-edit-outline</v-icon>
                </v-btn>
              </div>
            </div>
          </v-col>
        </v-row>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import Vue2Filters from "vue2-filters";
import general from "@/mixins/general";
import _ from "lodash";
export default {
  name: "CampaignsList",
  mixins: [Vue2Filters.mixin, general],
  data() {
    return {
      authToken: localStorage.getItem("authToken"),
      user: JSON.parse(localStorage.getItem("user")),
      campaigns: [],
      headers: [
        {
          text: "Project",
          align: "start",
          sortable: false,
          value: "projectName",
        },
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

  created() {
    this.fetchProjects();
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
    edit(item) {
      this.$router.push({
        name: "Edit Campaign",
        params: {
          id: item._id,
          data: item,
        },
      });
    },
    async deleteCampaign(item) {
      const url = `${this.$config.studioServer.BASE_URL}api/v1/project/${item._id}`;

      const headers = {
        Authorization: `Bearer ${this.authToken}`,
      };
      const resp = await fetch(url, {
        headers,
        method: "DELETE",
      });

      if (!resp.ok) {
        console.log(resp.statusText);
      }

      const json = await resp.json();
      if (json) {
        await this.fetchProjects();
      }
    },
    async fetchProjects() {
      try {
        if (!this.user.id) throw new Error("No project found");

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
          // return this.notifyErr(resp.statusText);
        }

        const json = await resp.json();
        this.campaigns = json;
        localStorage.removeItem("userProjects");
        localStorage.setItem(
          "userProjects",
          JSON.stringify({
            projects: this.campaigns,
            count: this.campaigns.length,
          })
        );
        // this.projectsToShow = this.projects.slice(0, this.perPage);
        this.campaigns.map((item) => {
          item["whitelisting_link"] =
            window.location.origin +
            (item.slug && item.slug != ""
              ? "/form/" + item.slug
              : "/form?projectId=" + item._id);
          item["investors_link"] =
            window.location.origin +
            "/admin/participants?projectId=" +
            item._id;
        });
        // this.notifySuccess(
        //   Messages.EVENTS.CREATE_EDIT_EVENT.PROJECT_FETCHED_NO +
        //     this.projects.length
        // );
      } catch (e) {
        // this.notifyErr(e.message);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
<style lang="css" scoped></style>
