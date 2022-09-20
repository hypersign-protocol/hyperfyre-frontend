<style scoped>
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
  background-color: var(--button-bg-color);
  color: #fff;
}
.dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  border: 1px solid var(--button-bg-color);;
  background-color: var(--button-bg-color);;
  margin: 1px 0;
}
.projectSelector {
  min-width: 220px;
  max-width: 220px;
}
.lotteryImage {
  -webkit-filter: brightness(0) invert(1);
  filter: brightness(0) invert(1);
}
.cta_btns {
  display: flex;
  align-items: center;
}
.cta_btns i {
  font-size: 22px;
  margin-left: 10px;
}
.paginationItem.active a {
  color: #fff;
}

.button-theme {
  background-color:var(--button-bg-color);
  border-collapse: var(--button-bg-color);
  color: var(--button-text-color);
  border: 0;
}
</style>
<template>
  <div class="home marginLeft marginRight">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    ></loading>
  <hf-pop-up
    Header="Lottery"
    >
    <hf-notes :notes="notes"></hf-notes>
      <div class="d-flex mx-auto justify-content-between px-4">
        <div class="bold">Total Records</div>
        <div class="bold">{{ project.count }}</div>
      </div>
      <div class="d-flex mx-auto justify-content-between px-4 mt-4">
        <div class="bold">Number of winners to choose</div>
        <div class="bold">
          <input
            v-model="recordsForLottery"
            type="number"
            class="form-control"
            placeholder="No. of records"
          />
        </div>
      </div>
      <div class="d-flex mx-auto justify-content-between px-4 mt-4">
        <div class="bold">Check to choose randomly (optional)</div>
        <div class="bold">
          <input
            v-model="isRandom"
            type="checkbox"
            class=""
            title="Check to choose randomly"
          />
        </div>
      </div>
      <div class="mt-5 text-center">
    <hf-buttons
    name="Execute"
    @executeAction="handleLottery"
    />
      </div>
  </hf-pop-up>
    <div class="row" style="margin-top: 2%">
      <div class="d-flex justify-content-between col-md-12  ">
        <div class="projectSelector">
          <hf-select-drop-down
          placeholder="Select an Event"
          :options="projects"
          textField="projectName"
          valueField="_id"
          @selected=" e => fetchProjectInvestors(e)"
          ></hf-select-drop-down>
        </div>
        <div class="d-flex ml-auto align-items-center">
            <hf-search-box
            @executeSearch="handleTableSearch"
            v-model="tableSearch"
            placeholder="Search participants"            
            ></hf-search-box>
          <div class="mx-3">  
            <hf-buttons
            :disabled="project.investors.length ? false : true"
            name="Export All"
            @executeAction="handleExport"
            iconClass="fas fa-file-export"
            ></hf-buttons>
          </div>
          <div>
            <hf-buttons
            class="openBtn"
            :disabled="project.investors.length ? false : true"
            name="Lottery"
            @executeAction="openModal()"
            iconClass="fas fa-dharmachakra"
            ></hf-buttons>
          </div>
        </div>
      </div>
    </div>

    <div class="card event-card" style="margin-top: 2%; padding: 10px">
      <div v-if="project.investors.length > 0">

      
        <div class="row mb-3" >
          <div class="col-md-12" style="text-align: left">
            <div>
              <ve-table
                :border-x="true"
                :border-y="true"
                :border-around="true"
                :sort-option="sortOption"
                :columns="columns"
                :table-data="project.investors"
                :expand-option="expandOption"
                row-key-field-name="_id"
              />
            </div>
          </div>
        </div>

        <div class="d-flex mt-5">
          <paginate
            :pageCount="Math.ceil(this.project.count / this.perPage)"
            :clickHandler="paginateChange"
            :prevText="'Prev'"
            v-model="paginateValue"
            :nextText="'Next'"
            :containerClass="'paginationContainer'"
            :page-class="'paginationItem '"
            :style="buttonThemeCss"
          >
          </paginate>
          <div class="ml-auto">
            <b-form-select
              v-model="paginateValue"
              :options="this.pageSelectDropdown"
              @change="paginateChange"
            ></b-form-select>
          </div>
        </div>
        
      </div>
      <div v-else>
        <hf-page-message :message="msg"></hf-page-message>
      </div>
    </div>
  </div>
</template>

<script>
import config from "../../config";
import fetch from "node-fetch";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import Paginate from "vuejs-paginate";
import notificationMixins from "../../mixins/notificationMixins";
import apiClientMixin from "../../mixins/apiClientMixin";
import FileDownload from "js-file-download";
const issuedImgLink = require("../../assets/issued-icon.png");
import Messages from "../../utils/messages/admin/en";
import eventBus from "../../eventBus";
import HfNotes from '../../components/elements/HfNotes.vue';
const {LOTTERY_NOTES} = require("../../utils/messages/admin/Notes");
import HfButtons from "../../components/elements/HfButtons.vue"
import HfSearchBox from "../../components/elements/HfSearchBox.vue"
import HfPopUp from "../../components/elements/HfPopUp.vue"
import HfSelectDropDown from "../../components/elements/HfSelectDropDown.vue";
import HfPageMessage from '../../components/elements/HfPageMessage.vue';
export default {
  name: "Investor",
  components: { 
  Loading, Paginate, HfNotes,HfButtons, 
  HfSearchBox, HfPopUp,HfSelectDropDown, HfPageMessage },
computed:{
 buttonThemeCss() {
      return {
        '--button-bg-color': config.app.buttonBgColor,
        '--button-text-color':config.app.buttonTextColor
      }
     }
},
  data() {
    return {
      paginateValue: 1,
      selectedProject: null,
      recordsForLottery: 0,
      issuedImgLink: issuedImgLink,
      cancelToken: undefined,
      msg: "No participants found",
      sortOption: {
        sortChange: (params) => {
          // console.log("sortChange::", params);
          this.sortChange(params);
        },
      },
      tableSearch: "",
      perPage: 10,
      currentPage: 2,
      computed: {
        rows() {
          return this.items.length;
        },
      },
      isRandom: false,
      pageSelectDropdown: [],
      expandOption: {
        trigger: "row",
        render: ({ row }) => {
          return (
            <div style="text-align:center; background-color: whitesmoke">
              <h6>Event Actions</h6>
              <table class="table" style="text-align:left ">
                <thead>
                  <tr>
                    <th>Field Title</th>
                    <th>Field Value</th>
                  </tr>
                </thead>
                <tbody>
                  {row.actions.map((action) => (
                    <tr>
                      <td>{action.title}</td>
                      <td>{this.parseActionValue(action)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        },
      },
      columns: [
        {
          field: "",
          key: "a",
          // 设置需要显示展开图标的列
          type: "expand",
          title: "",
          width: 50,
          align: "center",
        },
        {
          field: "name",
          key: "b",
          title: "Name",
          align: "left",
          sortBy: "",
          width: 400,
        },
        {
          field: "email",
          key: "c",
          title: "Email",
          align: "left",
          sortBy: "asc",
          width: 400,
        },
        {
          field: "actions",
          key: "e",
          title: "Actions",
          align: "left",
          width: 400,
          renderBodyCell: ({ row, column }) => {
            const actions = row[column.field];
            return <span>Performed {actions.length} actions</span>;
          },
        },
        {
          field: "numberOfReferals",
          key: "h",
          title: "Score",
          align: "right",
          sortBy: "desc",
          width: 100,
        },
      ],

      investor: {
        did: "did:hs:TEqweqweqwe12",
        email: "",
        name: "",
        ethAddress: "",
        twitterHandle: "",
        telegramHandle: "",
        hasTwitted: false,
        hasJoinedTGgroup: false,
        projectId: "",
        isVerfiedByHypersign: false,
        isVerificationComplete: false,
        tweetUrl: "",
        numberOfReferals: 0,
        actions: [],
      },
      project: {
        count: 20,
        projectName: "",
        logoUrl: "",
        fromDate: "",
        toDate: "",
        ownerDid: "",
        investors: [],
      },

      projects: [],

      projectFetched: false,
      isDataSaved: false,
      active: 0,
      host: location.hostname,
      authToken: localStorage.getItem("authToken"),
      accessToken: localStorage.getItem("accessToken"),
      isLoading: false,
      fullPage: true,
      notes:LOTTERY_NOTES
    };
  },

  async mounted() {
    if (this.$route.query.projectId) {
      this.selectedProjectId = this.$route.query.projectId;
      this.selectedProject = this.$route.query.projectId;
      eventBus.$emit("setForParticipant",this.selectedProject);
      this.investor.projectId = this.$route.query.projectId;
      await this.fetchProjectData(0, this.perPage);
      this.holdInvestors = this.project.investors;
    }

    const userProjectStr = localStorage.getItem("userProjects");
    const userProjectsData = JSON.parse(userProjectStr);
    this.projects = userProjectsData.projects;
    this.projects.unshift({
      _id: null,
      projectName: "Select an event",
    });
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.prevRoute = from;
    });
  },

  methods: {
    openModal(){
      this.$root.$emit('modal-show')
    },
    parseActionValue(action) {
      console.log(action)
      switch (action.type) {
        case "DISCORD_JOIN":
        case "TELEGRAM_JOIN":
        case "TWITTER_FOLLOW": {
          return JSON.parse(action.value).targetScreenName;
        }
         case "GITHUB_PR":{
          return action.value.url
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
        case "ETHEREUM_NETWORK":
        case "BINANCE_NETWORK":
        case "MATIC_NETWORK": {
          return JSON.parse(action.value).paramsList[0].value;
        }
        default:
          return action.value;
      }
    },
    async handleExport() {
      try {
        this.isLoading = true;
        const url = `${this.$config.studioServer.BASE_URL}api/v1/project/${this.project._id}?fetchInvestors=true&isExport=true&limit=${this.project.count}`;
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.authToken}`,
          AccessToken: `Bearer ${this.accessToken}`,
        };
        if(!this.selectedProject){
          throw Error(Messages.PARTICIPANTS.SELECT_EVENT)
        }
        const res = await apiClientMixin.makeCall({
          method: "GET",
          url,
          header: headers,
          isFile: true,
        });

        FileDownload(res.data, `Participants_${this.selectedProject}.csv`);
        this.isLoading = false;
      } catch (e) {
        this.isLoading = false;
        this.notifyErr(e.message);
      } finally {
        this.isLoading = false;
      }
    },
    async handleLottery() {
      if(!this.recordsForLottery){
        return this.notifyErr(Messages.PARTICIPANTS.LOTTERY.ENTER_NUMBER_OF_WINNERS)
      }
      if (
        this.recordsForLottery > this.project.count ||
        this.recordsForLottery <= 0
      ) {
        return this.notifyErr(Messages.PARTICIPANTS.LOTTERY.NO_OF_RECORDS);
      }
      try {
        this.isLoading = true;
        let url = `${this.$config.studioServer.BASE_URL}api/v1/project/${this.project._id}/lottery?token=${this.authToken}&limitRecord=${this.recordsForLottery}&isRandom=${this.isRandom}`;

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
        FileDownload(res.data, `Lottery_${this.project._id}.csv`);
        this.isLoading = false;
        this.clear();
      } catch (e) {
        this.isLoading = false;
        this.notifyErr(e);
      } finally {
        this.isLoading = false;
        this.$root.$emit('modal-close');
      }
    },
    sortChange(params) {
      this.project.investors.sort((a, b) => {
        if (params.name) {
          if (params.name === "asc") {
            return a.name.localeCompare(b.name);
          } else if (params.name === "desc") {
            return b.name.localeCompare(a.name);
          } else {
            return 0;
          }
        } else if (params.email) {
          if (params.email === "asc") {
            return a.email.localeCompare(b.email);
          } else if (params.email === "desc") {
            return b.email.localeCompare(a.email);
          } else {
            return 0;
          }
        } else if (params.did) {
          if (params.did === "asc") {
            return a.did.localeCompare(b.did);
          } else if (params.did === "desc") {
            return b.did.localeCompare(a.did);
          } else {
            return 0;
          }
        } else if (params.ethAddress) {
          if (params.ethAddress === "asc") {
            return a.ethAddress.localeCompare(b.ethAddress);
          } else if (params.ethAddress === "desc") {
            return b.ethAddress.localeCompare(a.ethAddress);
          } else {
            return 0;
          }
        } else if (params.twitterHandle) {
          if (params.twitterHandle === "asc") {
            return a.twitterHandle.localeCompare(b.twitterHandle);
          } else if (params.twitterHandle === "desc") {
            return b.twitterHandle.localeCompare(a.twitterHandle);
          } else {
            return 0;
          }
        } else if (params.telegramHandle) {
          if (params.telegramHandle === "asc") {
            return a.telegramHandle.localeCompare(b.telegramHandle);
          } else if (params.telegramHandle === "desc") {
            return b.telegramHandle.localeCompare(a.telegramHandle);
          } else {
            return 0;
          }
        }
      });
    },

    async handleTableSearch(e) {
      if (e.target.value.length) {
        this.searchQuery = e.target.value.trim();
        this.temp = [];
        this.holdInvestors.forEach((x) => {
          if (
            x.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            x.name.toLowerCase().includes(this.searchQuery.toLowerCase())
          ) {
            this.temp.push(x);
          }
        });
        this.project.investors = this.temp;
      } else {
        this.project.investors = this.holdInvestors;
      }
    },
    async fetchProjectInvestors(e) {
      if (e) {
        this.selectedProject = e
        this.tableSearch = "";
        this.investor.projectId = e;
        await this.fetchProjectData(0, this.perPage);
        this.holdInvestors = this.project.investors;
      } else {
        this.holdInvestors = []
        this.project.investors = [];
      }
    },

    filterVerified(label) {
      // console.log(label);

      if (label == "onlyVerified") {
        this.project.investors = this.sourceData.investors.filter(
          (x) => x.isVerificationComplete
        );
      } else if (label == "onlyNotVerified") {
        this.project.investors = this.sourceData.investors.filter(
          (x) => !x.isVerificationComplete
        );
      } else {
        this.project = this.sourceData;
      }
    },

    filterIssued(label) {
      // console.log(label);

      if (label == "onlyIssued") {
        this.project.investors = this.sourceData.investors.filter(
          (x) => x.isVerfiedByHypersign
        );
      } else if (label == "onlyNotIssued") {
        this.project.investors = this.sourceData.investors.filter(
          (x) => !x.isVerfiedByHypersign
        );
      } else {
        this.project = this.sourceData;
      }
    },

    paginateChange(e) {
      if (typeof e == "number") {
        this.currentPage = e;
        this.paginateValue = e;
      } else {
        this.currentPage = e.target.value;
        this.paginateValue = e;
      }

      const skip = this.perPage * (this.currentPage - 1);

      this.fetchProjectData(skip, this.perPage);
    },

    gotosubpage: (id) => {
      this.$router.push(`${id}`);
    },
    formateDate(d) {
      return new Date(d).toLocaleString();
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
          return this.notifyErr(Messages.EVENTS.CREATE_EDIT_EVENT.PROJECT_DELETED)
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

        this.notifySuccess(
          Messages.EVENTS.CREATE_EDIT_EVENT.PROJECT_FETCHED + json.projectName
        );
      } catch (e) {
        this.notifyErr(e.message);
      } finally {
        this.isLoading = false;
      }
    },

    clear() {
      this.investor = {
        did: "did:hs:TEqweqweqwe12",
        email: "",
        name: "",
        ethAddress: "",
        twitterHandle: "",
        telegramHandle: "",
        hasTwitted: false,
        hasJoinedTGgroup: false,
        projectId: "606742855244b589bc100083",
      };
      this.recordsForLottery = 0;
      this.isRandom = false;
    },
  },

  mixins: [notificationMixins],
};
</script>
