<style>
.addmargin {
  margin-top: 10px;
  margin-bottom: 10px;
}

.vue-logo-back {
  background-color: black;
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
* {
  font-family: "Montserrat", sans-serif;
}
</style>
<template>
  <div><Stepper /></div>
</template>

<script>
import fetch from "node-fetch";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import Web3 from "web3";
import Stepper from "./Stepper";

export default {
  name: "Investor",
  components: { Loading, Stepper },
  data() {
    return {
      showStepper: false,
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
    if (this.$route.query.projectId) {
      this.showStepper = true;
    } else {
      this.showStepper = false;
    }

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
