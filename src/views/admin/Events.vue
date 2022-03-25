<style scoped>
.padding-0 {
  padding-right: 20px;
  /* padding-left:0px; */
}
.padding-1 {
  /* padding-right:20px; */
  padding-left: 20px;
}
.addmargin {
  margin-top: 10px;
  margin-bottom: 10px;
}

.vue-logo-back {
  background-color: black;
}

.logo {
  width: 144px;
}

.fullbody {
  width: 100%;
}

.floatLeft {
  float: left;
}
.floatRight {
  float: right;
}
.card-header {
  background: aliceblue;
  padding: 0px;
}
.sm-tiles {
  float: left;
  padding: 5px;
  border: 1px solid #8080807d;
  margin: 1%;
  border-radius: 5px;
  background: #f5dda71c;
  color: #888b8f;
}
.sm-tiles:hover {
  float: left;
  padding: 5px;
  border: 1px solid #8080807d;
  margin: 1%;
  border-radius: 5px;
  background: #f5dda7a3;
  font-style: bold;
  color: #888b8f;
}

label {
  font-weight: bold;
}
.card {
  border-radius: 10px;
}

i {
  color: grey;
  padding: 5px;
}
.paginationContainer {
  display: flex;
  list-style: none;

  justify-content: center;
}
.paginationContainer >>> li {
  padding: 2px 10px;
  margin: 0 2px;
  border-radius: 3px;
}
.paginationContainer >>> li.active {
  background-color: #f1b319;
  color: #fff;
}

.button-theme {
  background-color: #f1b319;
  border-collapse: #f1b319;
  color: black;
  border: 0;
}

.theme {
  background-color: #363740;
  border-collapse: #363740;
  color: whitesmoke;
  border: 0;
}

.event-card {
  float: left;
  max-width: 60rem;
  margin-right: 3%;
  margin-bottom: 2%;
  border: 0;
  border-radius: 20px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}
.card-body-custom {
  color: rgb(46, 46, 46);
}

.event-card-footer {
  padding: 7px;
  background-color: #f1b3193d;
  border-radius: 0px 0px 20px 20px;
}

.event-card-header {
  padding: 7px;
  background-color: white;
  color: black;
  font-size: larger;
  text-align: center;
  border-radius: 20px 20px 0px 0px;
}
.copy {
  padding: 3px;
  font-size: medium;
  cursor: pointer;
  color: grey;
}

.fixBanner {
  min-width: 400px;
  min-height: 200px;
  max-width: 400px;
  max-height: 200px;
}
</style>
<style>
.multiselect__tags {
  border-radius: 0.25rem;
  border: 1px solid #ced4da;
  background: #fff;
  font-weight: 400;
}

.multiselect__tag {
  background: #f1b319;
}
</style>
<template>
  <div class="home marginLeft marginRight">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    ></loading>

    <div class="row">
      <div class="col-md-3">
        <div class="form-group" style="width: 925px">
          <input
            v-if="projects.length"
            @keyup="handleSearch"
            type="text"
            class="form-control w-25"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Search events by name"
          />
        </div>
      </div>

      <div class="col-md-3">
        <div>
          <multiselect
            v-model="selected"
            placeholder="Search events by tags"
            label="text"
            track-by="value"
            :options="this.tagToSearch"
            :multiple="true"
            :taggable="false"
            :close-on-select="false"
            :clear-on-select="false"
            @input="onInputTag"
          >
          </multiselect>
        </div>
      </div>
      <div class="col-md-6">
        <div class="text-right">
          <button
            @click="openCreateSidebar"
            class="btn btn-primary button-theme"
          >
            Create <i class="fas fa-plus text-white"></i>
          </button>
        </div>

        <div>
          <create-project-slide
            :isProjectEditing="isProjectEditing"
            :project="project"
            @UpdateColors="UpdateColors"
            :themeColor="themeColor"
            :themeColorDefault="themeColorDefault"
            :fontColor="fontColor"
            :fontColorDefault="fontColorDefault"
            :blockChainType="blockchainType"
            :contractType="contractType"
            :eventActionType="eventActionType"
            :saveProject="saveProject"
            :addedSocialMedias="addedSocialMedias"
            :selectedSocialMedia="selectedSocialMedia"
            :socialOptions="socialOptions"
            :actionList="project.actions"
            :tagList="project.tags"
            :tagFdb="tagFdb"
            @updateEventActions="AddUpdateDelEventActions"
            @updateTagActions="AddUpdateDelTagActions"
          />
        </div>
      </div>
    </div>

    <div class="row" v-if="whitelistingLink != ''" style="margin-top: 2%">
      <div class="col-md-12" style="text-align: left">
        <div class="card">
          <div class="card-body">
            <h4>
              Congratulations!!! Your event is successfully created, you can
              give this link to your users for whitelisting.
              <a :href="whitelistingLink" target="_blank">{{
                whitelistingLink
              }}</a>
            </h4>
          </div>
        </div>
      </div>
    </div>

    <div>
      <div v-if="!this.projectsToShow.length">
        <h3>
          No events found, click on "create" button to create a new event!
        </h3>
      </div>
    </div>
    <div class="row" style="margin-top: 2%">
      <div
        class="col-md-4"
        v-for="project in projectsToShow"
        v-bind:key="project.projectName"
      >
        <div>
          <b-card
            :title="truncate1(project.projectName, 25)"
            :img-src="project.logoUrl"
            img-alt="Image"
            img-top
            img-height="150"
            tag="article"
            style="max-width: 20rem; margin-top: 20px"
            class="mb-2"
            @error="onBannerError($event)"
          >
            <ul style="list-style-type: none; padding-left: 0px">
              <li data-toggle="tooltip" data-placement="bottom" title="EventId">
                <i class="far fa-id-card"></i
                ><span class="card-title">{{ project._id }}</span>
                <span @click="copy(project._id, 'EventId')" class="copy"
                  ><i class="far fa-copy"></i
                ></span>
              </li>
              <li
                data-toggle="tooltip"
                data-placement="bottom"
                title="Start Date"
              >
                <i class="fas fa-hourglass-start"></i>
                {{ formateDate(project.fromDate) }}
              </li>
              <li
                data-toggle="tooltip"
                data-placement="bottom"
                title="End Date"
              >
                <i class="fas fa-hourglass-end"></i>
                {{ formateDate(project.toDate) }}
              </li>

              <li
                data-toggle="tooltip"
                data-placement="bottom"
                title="Event Url"
              >
                <i class="fas fa-calendar-alt"></i>
                <a
                  :href="project.whitelisting_link"
                  target="_blank"
                  class="card-body-custom"
                >
                  Event Url</a
                ><span
                  @click="copy(project.whitelisting_link, 'Form Url')"
                  class="copy"
                  ><i class="far fa-copy"></i
                ></span>
              </li>

              <li
                data-toggle="tooltip"
                data-placement="bottom"
                title="Participants List"
              >
                <i class="fas fa-users"></i
                ><a
                  class="card-body-custom"
                  :href="`/admin/participants?projectId=${project._id}`"
                  >Participants ({{ project.investorsCount }})</a
                >
              </li>
              <li
                data-toggle="tooltip"
                data-placement="bottom"
                title="Edit Event"
              >
                <i class="fas fa-pencil-alt"></i>
                <b-link href="#" variant="primary" @click="editProject(project)"
                  >Edit Event
                </b-link>
              </li>
            </ul>
            <footer>
              <small>
                <b-badge
                  v-for="tag in project.tags"
                  :key="tag.id"
                  pill
                  variant="secondary"
                  >{{ tag.type.split("_")[0] }}</b-badge
                >
              </small>
              <small style="float: right">
                <span
                  v-if="project.projectStatus == true"
                  data-toggle="tooltip"
                  title="Active"
                >
                  <i class="fas fa-signal" style="color: green"></i>
                </span>
                <span
                  v-if="
                    !project.projectStatus || project.projectStatus == false
                  "
                  data-toggle="tooltip"
                  title="Inactive"
                >
                  <i class="fas fa-signal" style="color: red"></i>
                </span>
              </small>
            </footer>
          </b-card>
        </div>
      </div>
    </div>
    <paginate
      v-if="projectsToShow.length"
      :pageCount="Math.ceil(this.projects.length / this.perPage)"
      :clickHandler="paginateChange"
      :prevText="'Prev'"
      :nextText="'Next'"
      :force-page="currentPage"
      :containerClass="'paginationContainer'"
      :page-class="'paginationItem'"
    >
    </paginate>
  </div>
</template>

<script>
import fetch from "node-fetch";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import Paginate from "vuejs-paginate";
import notificationMixins from "../../mixins/notificationMixins";
import apiClientMixin from "../../mixins/apiClientMixin";
import {
  isValidURL,
  truncate,
  checkTitle,
  checkValue,
} from "../../mixins/fieldValidationMixin.js";
import CreateProjectSlide from "../../components/admin/createProjectSlider/CreateProjectSlide.vue";
import dayjs from "dayjs";
import eventBus from '../../eventBus';

import Messages from "../../utils/messages/admin/en";

export default {
  name: "Investor",
  components: { Loading, Paginate, CreateProjectSlide },

  data() {
    return {
      requiredColumn: 2,
      project: {
        _id: "",
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
      },
      selected: [],
      tagToSearch: [
        // {text: 'Select Tag To filter events', value: null,},
      ],
      tagFdb: [],
      projects: [],
      tagsTemp: [],
      selectedSocialMedia: null,
      addedSocialMedias: [],
      eventActionList: [],
      socialOptions: [
        { value: null, label: "Select a Social Profile" },
        {
          label: "Twitter",

          value: {
            media: "twitter",
            icon: "fab fa-twitter",
            fields: [
              {
                name: "twitterHandle",
                type: "text",
                placeholder: "Twitter Handle",
                value: "",
              },
              {
                name: "twitterPostFormat",
                type: "text",
                placeholder: "Twitter Post Format",
                value: "",
              },
            ],
          },
        },
        {
          label: "Telegram",
          value: {
            media: "telegram",
            icon: "fab fa-telegram-plane",
            fields: [
              {
                name: "telegramHandle",
                type: "text",
                placeholder: "Telegram Handle",
                value: "",
              },
              {
                name: "telegramAnnouncementChannel",
                type: "text",
                placeholder: "Telegram Announcement Channel",
                value: "",
                optional: true,
              },
            ],
          },
        },
      ],

      searchQuery: "",
      projectsToShow: [],
      perPage: 10,
      projectStatus: true,
      blockchainType: "ETHEREUM",
      contractType: "ERC20",
      eventActionType: "ETHEREUM",
      currentPage: 1,
      themeColor: "#494949",
      themeColorDefault: "#494949",
      fontColor: "#ffffff",
      fontColorDefault: "#ffffff",

      isProjectEditing: false,

      cols: [
        "Project Id",
        "Project Name",
        "WL Start Date",
        "WL End Date",
        "Logo Url",
        "Investor List",
        "Whitelisting Form",
        "",
      ],
      whitelistingLink: "",
      active: 0,
      host: location.hostname,
      authToken: localStorage.getItem("authToken"),
      accessToken: localStorage.getItem("accessToken"),
      isLoading: false,
      fullPage: true,
      user: {},
      errors: [],
    };
  },

  async mounted() {
    //const usrStr = localStorage.getItem("user");
    //this.user = null; JSON.parse(usrStr);
    this.fetchSubscription();
    const usrStr = localStorage.getItem("user");

    this.user = {
      ...JSON.parse(usrStr),
    };
    this.project.ownerDid = this.user.id; // : "did:hs:QWERTlkasd090123SWEE12322";
    await this.fetchProjects();
    await this.getTags();
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.prevRoute = from;
    });
  },

  methods: {
    async fetchSubscription() {
      try {
        this.isLoading = true;

        // if (!this.user.id) throw new Error("No project owner found");

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
          this.$router.push("/admin/subscription");
          eventBus.$emit("UpdateAdminNav", false);
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
        this.isLoading = false;
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
        this.tagFdb = await resp.json();
        if (this.tagFdb && this.tagFdb.length > 0) {
          for (let index = 0; index < this.tagFdb.length; index++) {
            this.tagToSearch.push({
              text: this.tagFdb[index].tagName,
              value: this.tagFdb[index].type,
            });
          }
          return this.tagToSearch;
        }
      }
    },
    onBannerError(e) {
      //console.log(e.target);
      e.target.src = require("../../assets/default-banner.png");
    },
    copy(textToCopy, contentType) {
      if (textToCopy) {
        navigator.clipboard
          .writeText(textToCopy)
          .then(() => {
            this.notifySuccess(
              `${contentType}, ${Messages.EVENTS.CREATE_EDIT_EVENT.COPIED_TO_CLIPBOARD}`
            );
          })
          .catch((err) => {
            this.notifyErr(
              Messages.EVENTS.CREATE_EDIT_EVENT.ERROR_WHILE_COPYING,
              err
            );
          });
      }
    },
    openCreateSidebar() {
      this.isProjectEditing = false;
      this.$root.$emit("bv::toggle::collapse", "sidebar-right");

      this.resetAllValues();
      this.$root.$emit("callClearFromProject");
    },
    AddUpdateDelTagActions(event) {
      const { type, data } = event;
      if (type) {
        switch (type) {
          case "ADD": {
            this.tagsTemp.push(data);
            break;
          }

          case "DELETE": {
            if (data._id) {
              const actionIndex = this.tagsTemp.findIndex(
                (x) => x._id == data._id
              );
              if (actionIndex > -1) {
                this.tagsTemp[actionIndex]["isDeleted"] = true;
              }
            } else {
              const actionIndex = this.tagsTemp.findIndex(
                (x) => x.id == data.id
              );
              if (actionIndex > -1) {
                this.tagsTemp.splice(actionIndex, 1);
              }
            }

            break;
          }
        }
      }
    },
    AddUpdateDelEventActions(event) {
      const { type, data } = event;
      if (type) {
        switch (type) {
          case "ADD": {
            this.eventActionList.push(data);
            break;
          }

          case "UPDATE": {
            const { id, _id } = data;
            this.eventActionList.map((x) => {
              if (x._id === _id || x.id === id) {
                return data;
              }
            });
            break;
          }

          case "DELETE": {
            if (data._id) {
              const actionIndex = this.eventActionList.findIndex(
                (x) => x._id == data._id
              );
              if (actionIndex > -1) {
                this.eventActionList[actionIndex]["isDeleted"] = true;
              }
            } else {
              const actionIndex = this.eventActionList.findIndex(
                (x) => x.id === data.id
              );
              if (actionIndex > -1) {
                this.eventActionList.splice(actionIndex, 1);
              }
            }
            break;
          }
        }
      }
    },
    handleSearch(e) {
      if (e.target.value.length) {
        this.searchQuery = e.target.value.trim();
        return (this.projectsToShow = this.projects.filter((x) =>
          x.projectName.toLowerCase().includes(e.target.value.toLowerCase())
        ));
      } else {
        this.searchQuery = "";
        this.paginateChange(this.currentPage);
      }
    },
    // handleSearchByTag(){
    //    if(this.selected){
    //  return this.projectsToShow =
    //      this.projectsToShow.filter((x) =>{
    //       return x.tags.find((y)=>{
    //       if(y.type==this.selected){
    //         return x
    //       }
    //       })
    //     })
    //   }else{
    //       this.searchQuery = ""
    //       this.paginateChange(this.currentPage)
    //   }
    // },
    onInputTag() {
      let temp = this.selected.map((k) => {
        return k.value;
      });

      let selectedSet = new Set(temp);

      if (this.selected.length) {
        return (this.projectsToShow = this.projects.filter((x) => {
          const temp1 = x.tags.map((l) => {
            return l.type;
          });

          let TagSet = new Set(temp1);

          let a = [...selectedSet].filter((p) => {
            return TagSet.has(p); //o(n)+
          });

          if (a.length === [...selectedSet].length) {
            return true;
          } else {
            return false;
          }
        }));
      } else {
        this.selected = [];
        this.paginateChange(this.currentPage);
      }
    },
    UpdateColors(e) {
      this.fontColor = e.fontColor;
      this.themeColor = e.themeColor;
    },
    paginateChange(e) {
      this.currentPage = e;
      const skip = this.perPage * (e - 1);

      this.projectsToShow = this.projects.slice(skip, this.perPage + skip);
    },

    handleThemeChange(e) {
      this.themeColor = e.target.value;
    },
    openCreateModal() {
      this.isProjectEditing = false;
      this.project = {};
      this.eventActionList = this.eventActionList;
      this.blockchainType = "ETHEREUM";
      this.contractType = "ERC20";
      this.fontColor = this.fontColorDefault;
      this.themeColor = this.themeColorDefault;
      this.projectStatus = true;
      this.$bvModal.show("create-project-modal");
    },
    changeProjectStatus(event) {
      this.project.projectStatus =
        event.target.options[event.target.options.selectedIndex].value ===
        "false"
          ? false
          : true;
    },
    async fetchProjects() {
      try {
        this.isLoading = true;
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
          return this.notifyErr(resp.statusText);
        }

        const json = await resp.json();
        this.projects = json;
        localStorage.removeItem("userProjects");
        localStorage.setItem(
          "userProjects",
          JSON.stringify({
            projects: this.projects,
            count: this.projects.length,
          })
        );
        this.projectsToShow = this.projects.slice(0, this.perPage);
        this.projects.map((x) => {
          x["whitelisting_link"] =
            window.location.origin +
            (x.slug && x.slug != ""
              ? "/form/" + x.slug
              : "/form?projectId=" + x._id);
          x["investors_link"] =
            window.location.origin + "/admin/participants?projectId=" + x._id;
        });
        this.notifySuccess(
          Messages.EVENTS.CREATE_EDIT_EVENT.PROJECT_FETCHED_NO +
            this.projects.length
        );
      } catch (e) {
        this.notifyErr(e.message);
      } finally {
        this.isLoading = false;
      }
    },

    gotosubpage: (id) => {
      this.$router.push(`${id}`);
    },
    formateDate(d) {
      if (d) {
        let date = new Date(d);
        return (
          date.toDateString() +
          " " +
          date.toLocaleString("en-US", { hour: "numeric", hour12: true })
        );
      } else {
        return new Date();
      }

      // return new Date(d).toLocaleString();
    },
    editProject(project) {
      this.resetAllValues();
      this.isProjectEditing = true;
      this.project = { ...project };

      this.project.fromDate = dayjs(project.fromDate).format(
        "YYYY-MM-DD hh:mm:ss"
      );
      this.project.toDate = dayjs(project.toDate).format("YYYY-MM-DD hh:mm:ss");

      // CHECK IF TELEGRAM AND TWITTER EXISTS AND UPDATE THE DATA STRUCTURE
      this.project.social = {
        twitter: {
          isEnabled: true,
          twitterHandle: this.project.twitterHandle,
          twitterPostFormat: this.project.twitterPostFormat,
        },
        telegram: {
          isEnabled: true,
          telegramHandle: this.project.telegramHandle,
          telegramAnnouncementChannel: this.project.telegramAnnouncementChannel,
        },
      };

      this.socialOptions.forEach((media) => {
        if (media.value) {
          media.value.fields.map((field) => {
            field.value = this.project[field.name];
          });
        }
      });

      this.socialOptions.map((x) => {
        if (x.value) {
          this.addedSocialMedias.push(x.value);
        }
      });

      this.blockchainType =
        project.blockchainType !== undefined
          ? project.blockchainType
          : this.blockchainType;
      this.contractType = project.contractType;
      this.themeColor =
        project.themeColor !== undefined ? project.themeColor : this.themeColor;
      this.fontColor =
        project.fontColor !== undefined ? project.fontColor : this.fontColor;
      this.projectStatus = project.projectStatus;
      // console.log(project.actions)
      this.eventActionList = project.actions;
      this.tagsTemp = project.tags;

      this.$root.$emit("bv::toggle::collapse", "sidebar-right");
      this.$root.$emit("callClearFromProject");
    },

    async saveProject() {
      try {
        if (this.checkIfEverythingIsFilled() !== true) {
          return this.notifyErr(this.checkIfEverythingIsFilled());
        }

        if (this.isProjectNameValid() !== true) {
          return this.notifyErr(this.isProjectNameValid());
        }

        if (this.isLogoUrlValid() !== true) {
          return this.notifyErr(this.isLogoUrlValid());
        }

        if (
          isNaN(parseInt(this.project.refereePoint)) ||
          isNaN(parseInt(this.project.referralPoint))
        ) {
          return this.notifyErr(Messages.EVENTS.REF_POINT.NOT_VALID_INP);
        }
        if (
          parseInt(this.project.refereePoint) < 0 ||
          parseInt(this.project.referralPoint) < 0
        ) {
          return this.notifyErr(Messages.EVENTS.REF_POINT.NOT_POS_INP);
        }

        this.isLoading = true;
        const url = `${this.$config.studioServer.BASE_URL}api/v1/project`;
        let headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.authToken}`,
          AccessToken: `Bearer ${this.accessToken}`,
        };

        let method = "POST";

        if (this.isProjectEditing) {
          method = "PUT";
        }

        this.project.toDate = new Date(this.project.toDate).toISOString();
        this.project.fromDate = new Date(this.project.fromDate).toISOString();

        this.project.themeColor = this.themeColor.trim().length
          ? this.themeColor
          : this.themeColorDefault;
        this.project.fontColor = this.fontColor.trim().length
          ? this.fontColor
          : this.fontColorDefault;
        this.project.blockchainType = this.blockchainType;
        this.project.contractType = this.contractType;
        this.project.actions = this.eventActionList;
        this.project.tags = this.tagsTemp;
        this.project.refereePoint = this.project.refereePoint.toString();
        this.project.referralPoint = this.project.referralPoint.toString();

        const resp = await apiClientMixin.makeCall({
          url,
          body: this.project,
          method,
          header: headers,
        });

        if (!this.isProjectEditing) {
          ////  not using this for the time being just  to test
          // this.whitelistingLink =  window.location.origin + ( resp.data.slug && resp.data.slug != "" ?  "/form/" + resp.data.slug :  "/form?projectId=" + resp.data._id )
          this.whitelistingLink =
            window.location.origin +
            (resp.data.slug && resp.data.slug != ""
              ? "/form/" + resp.data.slug
              : "/form?projectId=" + resp.data._id);
        }

        setTimeout(() => {
          this.whitelistingLink = "";
        }, 10000);
        this.notifySuccess(
          Messages.EVENTS.CREATE_EDIT_EVENT.PROJECT_SAVED + resp.data._id
        );
        this.resetAllValues();

        if (this.isProjectEditing) {
          await this.fetchProjects();
          this.$root.$emit("bv::toggle::collapse", "sidebar-right");
          return;
        }

        /// WARNING:: This code is redundant it seems.
        /// Not removing but handling the condition.
        const userProjects = JSON.parse(localStorage.getItem("userProjects"));
        if (userProjects) {
          userProjects.count += 1;
          userProjects.projects.push(resp.data);
          localStorage.setItem("userProjects", JSON.stringify(userProjects));
        }

        await this.fetchProjects();
        this.$bvModal.hide("create-project-modal");
        this.$root.$emit("bv::toggle::collapse", "sidebar-right");
      } catch (e) {
        if (e.errors) {
          this.errors = e.errors;
          this.$bvModal.show("err-modal");
        }
        this.notifyErr(e || e.message || e.msg);
      } finally {
        this.isLoading = false;
        // this.clear();
      }
    },

    checkIfEverythingIsFilled() {
      for (let index = 0; index < this.eventActionList.length; index++) {
        if (
          this.eventActionList[index].score === null ||
          this.eventActionList[index].score === ""
        ) {
          return Messages.EVENTS.ACTIONS.SCORE_IS_NUM_ANY_LEFT;
        }
      }
      for (let index = 0; index < this.eventActionList.length; index++) {
        if (this.eventActionList[index].type === null) {
          return Messages.EVENTS.CHECK_ALL_TYPE;
        }
      }
      const eventActionTitle = checkTitle(this.eventActionList, "title");

      if (eventActionTitle.includes(false)) {
        return Messages.EVENTS.CHECK_ALL_TITLE_EMPTY;
      }
      let eventActionValue = this.eventActionList;
      eventActionValue = eventActionValue.filter(
        (x) =>
          x.type !== "INPUT_TEXT" &&
          x.type !== "INPUT_NUMBER" &&
          x.type !== "INPUT_DATE" &&
          x.type !== "INPUT_HYPERLINK" &&
          x.type !== "BLOCKCHAIN_ETH" &&
          x.type !== "BLOCKCHAIN_MATIC" &&
          x.type !== "BLOCKCHAIN_BSC" &&
          x.type !== "BLOCKCHAIN_ONE" &&
          x.type !== "BLOCKCHAIN_AVAX" &&
          x.type !== "BLOCKCHAIN_REEF" &&
          x.type !== "BLOCKCHAIN_TEZ" &&
          x.type !== "PRIZE_CARD" &&
          x.type !== "PUSH_NOTIFICATION"&&
          x.type!=="SUMSUB_KYC"
      );
      const filteredValueList = checkValue(eventActionValue, "value");
      if (filteredValueList.includes(false)) {
        return Messages.EVENTS.CHECK_ALL_VALUE_EMPTY;
      }

      if (!this.project.projectName) {
        return Messages.EVENTS.CREATE_EDIT_EVENT.PROJECT_NAME;
      }
      if (!this.project.logoUrl) {
        return Messages.EVENTS.CREATE_EDIT_EVENT.PROJECT_LOGO_URL;
      }
      if (!(this.project.fromDate && this.project.toDate)) {
        return Messages.EVENTS.CREATE_EDIT_EVENT.PROJECT_DATE_TIME;
      }
      if (this.tagsTemp.length < 1) {
        return Messages.EVENTS.CREATE_EDIT_EVENT.CHOOSE_ATLEAST_ONE_TAG;
      }

      if (!this.blockchainType) {
        return Messages.EVENTS.CREATE_EDIT_EVENT.PROJECT_BLOCKCHAIN_TYPE;
      }

      if (this.themeColor == "#ffffff") {
        return Messages.EVENTS.CREATE_EDIT_EVENT.THEME_NOT_WHITE;
      }

      if (
        this.themeColor == this.fontColor &&
        this.themeColor.trim().length &&
        this.themeColor.trim().length
      ) {
        return Messages.EVENTS.CREATE_EDIT_EVENT.THEME_COLOR_NOT_SAME;
      }
      return true;
    },

    isProjectNameValid() {
      if (isValidURL(this.project.projectName)) {
        return Messages.EVENTS.VALIDATION.INVALID_PROJECT_NAME;
      }
      return true;
    },
    isLogoUrlValid() {
      if (!isValidURL(this.project.logoUrl)) {
        return Messages.EVENTS.VALIDATION.INVALID_LOGO_URL;
      }
      return true;
    },

    clear() {
      this.isProjectEditing = false;
      this.project = {
        _id: "",
        projectName: "",
        logoUrl: "",
        fromDate: "",
        toDate: "",
        onwerDid: "",
        twitterHandle: "",
        telegramHandle: "",
        isNotificaionEnabled: false,
      };
    },

    resetAllValues() {
      (this.project = {
        _id: "",
        projectName: "",
        logoUrl: "",
        fromDate: "",
        toDate: "",
        ownerDid: "did:hs:QWERTlkasd090123SWEE12322",
        investorsCount: 0,
        social: {},
        projectStatus: true,
        actions: [],
        isNotificaionEnabled: false,
        refereePoint: 10,
        referralPoint: 5,
        tags: [],
      }),
        (this.eventActionList = []),
        (this.tagsTemp = []),
        (this.selectedSocialMedia = null),
        (this.addedSocialMedias = []),
        // TODO:  This is agian bad way
        //  need to use /api/v1/action API
        (this.socialOptions = [
          { value: null, label: "Select a Social Profile" },
          {
            label: "Twitter",
            value: {
              media: "twitter",
              icon: "fab fa-twitter",
              fields: [],
            },
          },
          {
            label: "Telegram",
            value: {
              media: "telegram",
              icon: "fab fa-telegram-plane",
              fields: [],
            },
          },
          {
            label: "Discord",
            value: {
              media: "discord",
              icon: "fab fa-discord",
              fields: [],
            },
          },
        ]);
    },
    truncate1(str, number) {
      return truncate(str, number);
    },
  },
  computed: {
    columns() {
      let columns = [];

      let mid = Math.ceil(this.projectsToShow.length / this.requiredColumn);
      for (let col = 0; col < this.requiredColumn; col++) {
        //console.log(this.projectsToShow.slice(col * mid, col * mid + mid));
        columns.push(this.projectsToShow.slice(col * mid, col * mid + mid));
      }
      return columns;
    },
  },
  mixins: [notificationMixins],
};
</script>
