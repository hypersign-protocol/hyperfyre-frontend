<template>
  <div>
    <v-row
      no-gutters
      :class="$router.currentRoute.meta.slug === 'campaigns' ? '' : 'mt-8'"
    >
      <v-col cols="12" md="2"> </v-col>
      <v-col cols="12" md="10">
        <v-row no-gutters>
          <v-col cols="12" md="5">
            <label class="font-14 line-h-17 font-weight-regular white--text"
              >Search campaign by tag</label
            >
            <v-autocomplete
              v-model="tagsSearch"
              :items="tags"
              item-text="tagName"
              item-value="type"
              autocomplete="off"
              dark
              multiple
              small-chips
              flat
              solo
              outlined
              class="form-input mr-4"
              placeholder="Search campaign by tags"
              hide-details="auto"
              @input="searchCampaignByTags"
              :loading="loading"
            >
              <template v-slot:selection="data">
                <v-chip
                  class="height-25 font-12 px-3"
                  v-bind="data.attrs"
                  :input-value="data.selected"
                >
                  <span class="pr-2">
                    {{ data.item.tagName }}
                  </span>
                  <v-icon
                    color="white"
                    small
                    @click.stop="removeTags(data.item)"
                  >
                    mdi-close
                  </v-icon>
                </v-chip>
              </template>
              <template slot="append">
                <v-icon>mdi-chevron-down</v-icon>
              </template>
            </v-autocomplete>
          </v-col>
          <v-col cols="12" md="5">
            <label class="font-14 line-h-17 font-weight-regular white--text"
              >Search campaign by name</label
            >
            <v-text-field
              v-model="search"
              prepend-inner-icon="mdil-magnify"
              hide-details="auto"
              dark
              flat
              solo
              outlined
              class="form-input mr-4"
              placeholder="Search for a campaign by name…"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="2">
            <v-btn
              :ripple="false"
              color="primary"
              class="mt-28 background-theme gradient width-169 height-35 letter-s-0 border-r-2 text-capitalize font-16 line-h-19 font-weight-bold white--text"
              depressed
              rounded
              x-large
              to="/create-campaign"
            >
              Create Campaign
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
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
      :search="search"
      :loading="loading"
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
                      @click="copyContent(item.whitelisting_link)"
                      >mdi-content-copy</v-icon
                    >
                  </template>
                  <span>Copied to clipboard</span>
                </v-tooltip>
              </div>
              <div
                class="font-14 line-h-22 font-weight-bold color-grey-300 mr-32"
              >
                <span class="white--text mr-2">{{ item.investorsCount }}</span>
                Participants
              </div>
              <div class="d-flex">
                <v-btn icon @click="edit(item)">
                  <img src="@/assets/images/fe_edit.svg" />
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
      :search="search"
      :loading="loading"
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
                      @click="copyContent(item.whitelisting_link)"
                      >mdi-content-copy</v-icon
                    >
                  </template>
                  <span>Copied to clipboard</span>
                </v-tooltip>
              </div>
              <div
                class="font-14 line-h-22 font-weight-bold color-grey-300 mr-32"
              >
                <span class="white--text mr-2">{{ item.investorsCount }}</span>
                Participants
              </div>
              <div class="d-flex">
                <v-btn icon @click="edit(item)">
                  <img src="@/assets/images/fe_edit.svg" />
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
export default {
  name: "CampaignsList",
  mixins: [Vue2Filters.mixin, general],
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
      accessUser: JSON.parse(localStorage.getItem("accessuser")),
      authToken: localStorage.getItem("authToken"),
      accessToken: localStorage.getItem("accessToken"),
      campaigns: [],
      ongoing: [],
      completed: [],
      loading: false,
      search: null,
      tagsSearch: null,
      tags: [],
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
  mounted() {
    this.fetchProjects();
    this.getTags();
  },
  methods: {
    searchCampaignByTags() {
      if (this.tagsSearch.length > 0) {
        this.loading = true;

        const _this = this;
        _this.ongoing = _this.campaigns.filter((item) => {
          if (item.projectStatus === true) {
            return item.tags.some(function (el) {
              return _this.tagsSearch.includes(el.type);
            });
          }
        });

        _this.completed = _this.campaigns.filter((item) => {
          if (item.projectStatus === false) {
            return item.tags.some(function (el) {
              return _this.tagsSearch.includes(el.type);
            });
          }
        });

        this.loading = false;
      }
    },
    async getTags() {
      const url = `${this.$config.studioServer.BASE_URL}api/v1/tag`;
      const headers = {
        Authorization: `Bearer ${this.authToken}`,
      };
      const resp = await fetch(url, {
        headers,
        method: "GET",
      });

      if (!resp.ok) {
        return this.notifyErr(resp.statusText);
      } else {
        this.tags = await resp.json();
      }
    },

    async removeTags(item) {
      const index = this.tagsSearch.findIndex((x) => x.type === item.type);
      if (index >= 0) {
        this.tagsSearch.splice(index, 1);
      } else {
        const i = this.tagsSearch.findIndex((x) => x === item.type);
        if (i >= 0) this.tagsSearch.splice(i, 1);
      }
    },
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
        this.loading = true;
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

        this.completed = this.campaigns.filter(
          (campaign) => campaign.projectStatus === false
        );

        this.ongoing = this.campaigns.filter(
          (campaign) => campaign.projectStatus === true
        );

        this.loading = false;

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
      } catch (e) {
        this.loading = false;

        this.$store.dispatch("snackbar/SHOW", {
          type: "error",
          message: e.message,
        });
      } finally {
        this.loading = false;
        this.isLoading = false;
      }
    },
  },
};
</script>
<style lang="css" scoped></style>
