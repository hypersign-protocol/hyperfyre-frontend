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
  background-color: #007bff;
  color: #fff;
}
.dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  border: 1px solid #007bff;
  background-color: #007bff;
  margin: 1px 0;
}
</style>
<template>
  <div class="home marginLeft marginRight">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    ></loading>

    <!-- <div class="row" v-if="!projectFetched">
      <div class="col-md-12" style="text-align: left;">
        <div class="card" style="padding:10px; background: #ff000029">
          <div class="card-body">
            <h3>Oops! Some error occurred.</h3>
          </div>
        </div>
      </div>
    </div> -->

    <div class="row">
      <div class="col-md-12" style="text-align: left;">
        <select @change="fetchProjectInvestors">
          <option value="">Select Project</option>
          <option
            v-for="project in projects"
            :key="project._id"
            :value="project._id"
            >{{ project.projectName }}</option
          >
        </select>
      </div>
    </div>

    <div class="row" v-if="isDataSaved" style="margin-top: 2%">
      <div class="col-md-12" style="text-align: left;">
        <div class="card" style="padding:10px; background: #0080004f">
          <div class="card-body">
            <h3>
              Your data has been successfully saved and is under verfication.
              Once verified, you will receive whitelisting credential in your
              email. Thank you!
            </h3>
          </div>
        </div>
      </div>
    </div>

    <div class="row " style="margin-top: 2%">
      <div class="d-flex justify-content-between col-md-12">
        <div>
          <b-form-input
            @input.native="handleTableSearch"
            v-model="tableSearch"
            placeholder="Search"
            type="search"
          ></b-form-input>
        </div>
        <div>
          <button class="btn btn-primary btn-sm">Export</button>
        </div>
      </div>
    </div>

    <div class="row mb-3" style="margin-top: 2%">
      <div class="col-md-12" style="text-align: left">
        <div>
          <ve-table
            :border-x="true"
            :border-y="true"
            :border-around="true"
            :sort-option="sortOption"
            :columns="columns"
            :table-data="project.investors"
          />
        </div>
      </div>
    </div>

    <paginate
      :pageCount="Math.ceil(this.project.count / this.perPage)"
      :clickHandler="paginateChange"
      :prevText="'Prev'"
      :nextText="'Next'"
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

const issuedImgLink = require("../assets/issued-icon.png");

export default {
  name: "Investor",
  components: { Loading, Paginate },

  data() {
    return {
      issuedImgLink: issuedImgLink,
      cancelToken: undefined,
      sortOption: {
        sortChange: (params) => {
          console.log("sortChange::", params);
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

      columns: [
        {
          field: "did",
          key: "a",
          title: "Investor DID",
          align: "left",
          sortBy: "",
        },
        { field: "name", key: "b", title: "Name", align: "left", sortBy: "" },
        {
          field: "email",
          key: "c",
          title: "Email",
          align: "left",
          sortBy: "asc",
          width: 10,
        },
        {
          field: "ethAddress",
          key: "d",
          title: "Eth Address",
          align: "left",

          renderBodyCell: ({ row, column, rowIndex }, h) => {
            return (
              <span class="text-bold" style="color:#1890ff;">
                <a href={`https://etherscan.io/address/${row.ethAddress}`}>
                  {row.ethAddress}
                </a>
              </span>
            );
          },
        },
        {
          field: "twitterHandle",
          key: "e",
          title: "Twitter Handle",
          align: "left",
          sortBy: "",

          renderBodyCell: ({ row, column, rowIndex }, h) => {
            return (
              <span class="text-bold" style="color:#1890ff;">
                <a href={`https://twitter.com/${row.twitterHandle}`}>
                  @{row.twitterHandle}
                </a>
              </span>
            );
          },
        },
        {
          field: "telegramHandle",
          key: "f",
          title: "Telegram Handle",
          align: "left",
          sortBy: "",

          renderBodyCell: ({ row, column, rowIndex }, h) => {
            return (
              <span class="text-bold" style="color:#1890ff;">
                <a href={`https://t.me/${row.telegramHandle}`}>
                  @{row.telegramHandle}
                </a>
              </span>
            );
          },
        },
        {
          field: "tweetUrl",
          key: "g",
          title: "Tweet Url",
          align: "left",

          renderBodyCell: ({ row, column, rowIndex }, h) => {
            return (
              <span class="text-bold" style="color:#1890ff;">
                <a href={`${row.tweetUrl}`}>Tweet</a>
              </span>
            );
          },
        },
        {
          field: "isVerificationComplete",
          key: "h",
          title: "Verification",
          align: "left",
          width: 120,
          filter: {
            filterList: [
              {
                value: "onlyVerified",
                label: "Only Verified",
                selected: false,
              },
              {
                value: "onlyNotVerified",
                label: "Only Not Verified",
                selected: false,
              },
            ],
            filterConfirm: (filterList) => {
              const labels = filterList
                .filter((x) => x.selected)
                .map((x) => x.value);
              this.filterVerified(labels[0]);
            },
            filterReset: (filterList) => {
              this.filterVerified("");
            },
          },

          renderBodyCell: ({ row, column, rowIndex }, h) => {
            return (
              <span class="text-bold d-flex justify-content-center">
                {row.isVerificationComplete ? (
                  <span class="d-flex align-items-center justify-content-center">
                    <img
                      width="16"
                      class="ml-2"
                      src="https://cdn.worldvectorlogo.com/logos/twitter-verified-badge.svg"
                      alt="verified-img"
                    />{" "}
                  </span>
                ) : (
                  <button
                    class="btn btn-primary btn-sm"
                    on-click={() => this.verifyInvestor(row)}
                  >
                    Verify Now
                  </button>
                )}
              </span>
            );
          },
        },
        {
          field: "Issue",
          key: "i",
          title: "Issue",
          align: "left",
          width: 70,
          filter: {
            filterList: [
              {
                value: "onlyIssued",
                label: "Only Issued",
                selected: false,
              },
              {
                value: "onlyNotIssued",
                label: "Only Not Issued",
                selected: false,
              },
            ],
            filterConfirm: (filterList) => {
              const labels = filterList
                .filter((x) => x.selected)
                .map((x) => x.value);
              this.filterIssued(labels[0]);
            },
            filterReset: (filterList) => {
              this.filterIssued("");
            },
          },

          renderBodyCell: ({ row, column, rowIndex }, h) => {
            return (
              <span class="text-bold d-flex justify-content-center">
                {row.isVerfiedByHypersign ? (
                  <span class="text-bold">
                    <img width="23px" alt="issue-ico" src={issuedImgLink} />
                  </span>
                ) : (
                  <button
                    class="btn btn-white border border-1 btn-sm"
                    on-click={() => this.issueCredential(row)}
                  >
                    <img
                      width="23px"
                      alt="issue-ico"
                      src="https://static.thenounproject.com/png/1837652-200.png"
                    />
                  </button>
                )}
              </span>
            );
          },
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
      isLoading: false,
      fullPage: true,
    };
  },
  async mounted() {
    const userProjectStr = localStorage.getItem("userProjects");
    const userProjectsData = JSON.parse(userProjectStr);
    this.projects = userProjectsData.projects;
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.prevRoute = from;
    });
  },
  methods: {
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

    async handleTableSearch() {
      this.fetchProjectData(0, this.perPage);
    },
    async fetchProjectInvestors(e) {
      // this.investor.projectId = this.projects[1]._id;
      this.investor.projectId = e.target.value;
      await this.fetchProjectData(0, this.perPage);
    },

    filterVerified(label) {
      console.log(label);

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
      console.log(label);

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
      this.currentPage = e;

      const skip = this.perPage * (this.currentPage - 1);

      this.fetchProjectData(skip, this.perPage);
    },

    notifySuccess(msg) {
      this.isLoading = false;
      this.$notify({
        group: "foo",
        title: "Information",
        type: "success",
        text: msg,
      });
    },

    notifyErr(msg) {
      this.isLoading = false;
      this.$notify({
        group: "foo",
        title: "Error",
        type: "error",
        text: msg,
      });
    },

    gotosubpage: (id) => {
      this.$router.push(`${id}`);
    },
    formateDate(d) {
      return new Date(d).toLocaleString();
    },

    async verifyInvestor(investor) {
      try {
        this.isLoading = true;

        const url = `${this.$config.studioServer.BASE_URL}api/v1/investor/${investor.did}?projectId=${this.investor.projectId}`;

        investor.hasJoinedTGgroup = true;
        investor.isVerificationComplete = true;
        investor.hasTwitted = true;

        if (investor["_id"]) delete investor["_id"];

        const headers = {
          "Content-Type": "application/json",
        };

        const resp = await fetch(url, {
          method: "PUT",
          body: JSON.stringify(investor),
          headers,
        });

        if (!resp.ok) {
          return this.notifyErr(resp.statusText);
        }

        const json = await resp.json();
        this.notifySuccess("Investor verified successfully");
      } catch (e) {
        this.notifyErr(e.message);
      } finally {
        this.isLoading = false;
      }
    },
    async issueCredential(investor) {
      try {
        this.isLoading = true;
        const url = `${this.$config.studioServer.BASE_URL}api/v1/investors/issue`;
        const body = {
          did: investor.did,
          projectId: this.investor.projectId,
        };

        const headers = {
          "Content-Type": "application/json",
        };

        const resp = await fetch(url, {
          method: "POST",
          body: JSON.stringify(body),
          headers,
        });

        if (!resp.ok) {
          return this.notifyErr(resp.statusText);
        }

        const json = await resp.json();
        this.notifySuccess(json.message);
      } catch (e) {
        this.notifyErr(e.message);
      } finally {
        this.isLoading = false;
      }
    },
    async fetchProjectData(skip, limit) {
      try {
        this.isLoading = true;

        if (!this.investor.projectId) throw new Error("No project found");

        const url = `${this.$config.studioServer.BASE_URL}api/v1/project/${this.investor.projectId}?fetchInvestors=true&limit=${limit}&skip=${skip}&searchQuery=${this.tableSearch}`;
        console.log(url);
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.authToken}`,
        };
        const resp = await fetch(url, headers);

        if (!resp.ok) {
          return this.notifyErr(resp.statusText);
        }
        const json = await resp.json();

        this.project = { ...json };
        this.sourceData = { ...json };
        this.project.fromDate = this.formateDate(this.project.fromDate);
        this.project.toDate = this.formateDate(this.project.toDate);
        this.projectFetched = true;

        console.log(this.project);

        this.notifySuccess(
          "Project is fetched. ProjectName " + json.projectName
        );
      } catch (e) {
        this.notifyErr(e.message);
      } finally {
        this.isLoading = false;
      }
    },
    formateDate(dateStr) {
      const d = new Date(dateStr);
      return d.toDateString();
    },
    async saveInvestor() {
      try {
        this.isLoading = true;

        // if (this.vehiclNumber == "")
        //   return this.notifyErr("Error: Vehicle Number can not be blank");
        // if (this.typOfMaterial == "")
        //   return this.notifyErr("Error: typeOfMaterial can not be blank");
        // if (this.numprOfSacks == "")
        //   return this.notifyErr("Error: Number Of Sacks can not be blank");

        const url = `${this.$config.studioServer.BASE_URL}api/v1/investor`;
        let headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.authToken}`,
        };
        const resp = await fetch(url, {
          method: "POST",
          body: JSON.stringify(this.investor),
          headers,
        });

        if (!resp.ok) {
          return this.notifyErr(resp.statusText);
        }

        const json = await resp.json();
        this.isDataSaved = true;
        this.notifySuccess("Your data is saved. Id = " + json._id);
      } catch (e) {
        this.notifyErr(e.message);
      } finally {
        this.isLoading = false;
        this.clear();
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
    },
  },
};
</script>
