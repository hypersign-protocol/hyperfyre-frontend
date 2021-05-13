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
</style>
<template>
  <div class="home marginLeft marginRight">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    ></loading>

    <div class="row" v-if="!projectFetched">
      <div class="col-md-12" style="text-align: left;">
        <div class="card" style="padding:10px; background: #ff000029">
          <div class="card-body">
            <h3>Oops! Some error occurred.</h3>
          </div>
        </div>
      </div>
    </div>

    <div class="row" v-if="projectFetched">
      <div class="col-md-12" style="text-align: left;">
        <div class="card" style="padding:10px">
          <div class="card-body">
            <div class="row">
              <div class="col-md-6">
                <h2>{{ project.projectName.toUpperCase() }}</h2>
                <h4>WHITELISTING</h4>
              </div>
            </div>
            <div class="row" style="margin-top: 5%">
              <div class="col-md-6">
                <h5>From: {{ project.fromDate }}</h5>
                <h5>To: {{ project.toDate }}</h5>
              </div>
              <div class="col-md-6">
                <img
                  :src="project.logoUrl"
                  style="float:right;max-width: 176.86px; max-height: 42px;"
                />
              </div>
            </div>
          </div>
        </div>
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
    <div
      class="row"
      style="margin-top: 2%"
      v-if="!isDataSaved && projectFetched"
    >
      <div class="col-md-12" style="text-align: left">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label style="margin-right: 8%">Name:</label>
                  <input
                    type="text"
                    v-model="investor.name"
                    size="30"
                    placeholder="Enter your name"
                    class="form-control"
                    disabled
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label style="margin-right: 8%">Email:</label>
                  <input
                    type="text"
                    v-model="investor.email"
                    size="30"
                    placeholder="Enter your email address"
                    class="form-control"
                    disabled
                  />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label style="margin-right: 8%">Did:</label>
                  <input
                    type="text"
                    v-model="investor.did"
                    size="30"
                    placeholder="Enter did"
                    class="form-control"
                    disabled
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <div class="row">
                    <div class="col-md-12">
                      <label style="margin-right: 8%">Ethereum Address:</label>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-10">
                      <input
                        type="text"
                        v-model="investor.ethAddress"
                        size="30"
                        placeholder="Enter ethereum address"
                        class="form-control"
                      />
                    </div>
                    <div class="col-md-2">
                      <img
                        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fyt3.ggpht.com%2Fa-%2FAAuE7mC1z-HXEKxL4YhAhc7WDHWA6Rnly1I592T5ag%3Ds900-mo-c-c0xffffffff-rj-k-no&f=1&nofb=1"
                        style="max-width: 50px;max-height: 60px;cursor:pointer;"
                        @click="getCurrentAccount()"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label style="margin-right: 8%">Twitter Handle:</label>
                  <input
                    type="text"
                    v-model="investor.twitterHandle"
                    size="30"
                    placeholder="Enter your twitter handle"
                    class="form-control"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label style="margin-right: 8%">Telegram Handle:</label>
                  <input
                    type="text"
                    v-model="investor.telegramHandle"
                    size="30"
                    placeholder="Enter your telegram handle"
                    class="form-control"
                  />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <div class="row">
                  <div class="col-sm-3">
                    <a
                      href="https://twitter.com/hypersignchain?ref_src=twsrc%5Etfw"
                      class="twitter-follow-button"
                      data-size="large"
                      data-show-screen-name="false"
                      data-show-count="false"
                      >Follow @hypersignchain</a
                    >
                  </div>
                  <div class="col-sm-3">
                    <a
                      href="https://twitter.com/intent/tweet?text=I%20am%20happy%20with%20%23hypersign%20%23pollkadot%20%40hypersignchain%20"
                      class="twitter-share-button"
                      data-size="large"
                      data-show-count="false"
                      title="Tweet about this project tagging two of your friends"
                      >Tweet</a
                    >
                  </div>
                  <div class="col-sm-3">
                    <a
                      href="https://telegram.im/@hypersignchain"
                      target="_blank"
                      class="telegramim_button telegramim_shadow"
                      style="font-size:12px;width:113px;background:#27A5E7;box-shadow:1px 1px 5px #27A5E7;color:#FFFFFF;border-radius:7px;"
                      title="Join our telegram channel for latest updates"
                      ><i></i> Join Us</a
                    >
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label style="margin-right: 8%">Tweet Url:</label>
                  <input
                    type="text"
                    v-model="investor.tweetUrl"
                    size="30"
                    placeholder="Enter tweet url"
                    class="form-control"
                  />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <hr />
                <button
                  class="btn btn-outline-primary btn-sm"
                  @click="saveInvestor()"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import fetch from "node-fetch";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import Web3 from "web3";
export default {
  name: "Investor",
  components: { Loading },
  data() {
    return {
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
        tweetUrl:
          "https://twitter.com/VishwasBAnand1/status/1378516089466843137?s=20",
      },
      project: {
        projectName: "",
        logoUrl: "",
        fromDate: "",
        toDate: "",
        ownerDid: "",
        twitterHandle: "",
        telegramHandle: "",
        projectId: "",
      },
      projectFetched: false,
      isDataSaved: false,
      active: 0,
      host: location.hostname,
      authToken: localStorage.getItem("authToken"),
      isLoading: false,
      fullPage: true,
      user: null,
    };
  },
  async created() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      window.ethereum.enable();
    }

    console.log(this.$route.query);
    this.project.projectId = this.$route.query.projectId
      ? this.$route.query.projectId
      : "60676b4f09baec1befb5f469"; // if projectId is not passed, hardcoding hypersign project Id

    this.fetchProjectData();

    // const usrStr = localStorage.getItem("user");
    // this.user = JSON.parse(usrStr);
    // this.investor = {...this.user};
    // this.investor.did = this.user.id;

    // await this.getCurrentAccount();
    // alert(JSON.stringify(this.user))
    //await this.fetchProcurment();
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.prevRoute = from;
    });
  },
  methods: {
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

    async getCurrentAccount() {
      const accounts = await window.web3.eth.getAccounts();
      console.log(accounts[0]);
      if (accounts.length == 0) {
        alert("No Account found..");
        return;
      }
      this.investor.ethAddress = accounts[0];
    },

    gotosubpage: (id) => {
      this.$router.push(`${id}`);
    },
    formateDate(d) {
      return new Date(d).toLocaleString();
    },
    async fetchProjectData() {
      try {
        this.isLoading = true;

        if (!this.$route.query.projectId) throw new Error("No project found");

        const url = `${this.$config.studioServer.BASE_URL}api/v1/project/${this.$route.query.projectId}`;

        console.log(url);

        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.authToken}`,
        };
        const resp = await fetch(url, headers);

        console.log("RESP", resp);
        if (resp.status != 200) {
          throw new Error(resp.statusText);
        }

        const json = await resp.json();
        this.project = { ...json };
        this.project.fromDate = this.formateDate(this.project.fromDate);
        this.project.toDate = this.formateDate(this.project.toDate);
        this.projectFetched = true;
        this.notifySuccess(
          "Project is fetched. ProjectName " + json.projectName
        );
      } catch (e) {
        console.log(e);
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
        const url = `${this.$config.studioServer.BASE_URL}api/v1/investor`;
        let headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.authToken}`,
        };

        console.log(this.investor);
        this.investor.projectId = this.$route.query.projectId;
        const resp = await fetch(url, {
          method: "POST",
          body: JSON.stringify(this.investor),
          headers,
        });

        if (resp.status !== 200) {
          throw new Error(resp.statusText);
        }

        const json = await resp.json();
        this.isDataSaved = true;

        localStorage.removeItem("authToken");
        localStorage.removeItem("projectId");
        localStorage.removeItem("user");

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
        did: this.user.id,
        email: this.user.email,
        name: this.user.name,
        ethAddress: "",
        twitterHandle: "",
        telegramHandle: "",
        hasTwitted: false,
        hasJoinedTGgroup: false,
        projectId: this.$route.query.projectId,
      };
    },
  },
};
</script>
