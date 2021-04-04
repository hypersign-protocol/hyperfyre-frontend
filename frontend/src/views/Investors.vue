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

    <div class="row" v-if="!projectFetched" >
      <div class="col-md-12" style="text-align: left;">
        <div class="card" style="padding:10px; background: #ff000029"> 
          <div class="card-body" >
            <h3>Oops! Some error occurred.</h3>
          </div>
        </div>
      </div>
    </div>

    

    <div class="row" v-if="projectFetched" >
      <div class="col-md-12" style="text-align: left;">
        <div class="card" style="padding:10px">
          <div class="card-body">
            <div class="row">
              <div class="col-md-6"><h2>{{project.projectName.toUpperCase()}}</h2>
              <h4>WHITELISTING</h4>
              </div>
            </div>
            <div class="row" style="margin-top: 5%">
              <div class="col-md-6">
                <h5>From: {{project.fromDate}}</h5>
                <h5>To: {{project.toDate}}</h5>
              </div>
              <div class="col-md-6">
                <img :src="project.logoUrl" style="float:right; max-width: 176.86px; max-height: 42px;"/>
              </div>
            </div>            
          </div>
        </div>
      </div>
    </div>

    <div class="row" v-if="isDataSaved" style="margin-top: 2%">
      <div class="col-md-12" style="text-align: left;">
        <div class="card" style="padding:10px; background: #0080004f"> 
          <div class="card-body" >
            <h3>Your data has been successfully saved and is under verfication. Once verified, you will receive whitelisting credential in your email. Thank you! </h3>
          </div>
        </div>
      </div>
    </div>

    <div class="row" style="margin-top: 2%">
      <div class="col-md-12" style="text-align: left">
        <table class="table table-striped">
            <thead>
              <tr><th v-for="col in cols" v-bind:key="col">{{col}}</th></tr>
            </thead>
            <tbody>
              <tr v-for="investor in project.investors" v-bind:key="investor">
                <td>{{investor.did}}</td>
                <td>{{investor.name}}</td>
                <td>{{investor.email}}</td>                
                <td><a :href="'https://etherscan.io/address/' + investor.ethAddress" target="_blank">{{investor.ethAddress}}</a></td>
                <td><a :href="'https://twitter.com/' + investor.twitterHandle" target="_blank">@{{investor.twitterHandle}}</a></td>
                <td><a :href="'https://t.me/' + investor.telegramHandle" target="_blank">@{{investor.telegramHandle}}</a></td>
                <td><a :href="investor.tweetUrl" target="_blank">Tweet</a></td>
                <td><button type="button" class="btn btn-outline-primary">Verify</button></td>
              </tr>
            </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import fetch from "node-fetch";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
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
        isVerfiedByHypersign: false,
        isVerificationComplete: false,
        tweetUrl: "",
      },
      project: {
        projectName: "",
        logoUrl: "",
        fromDate: "",
        toDate: "",
        ownerDid: "",
        investors: []
      },
      cols: ["Investor Did", "Name", "Email", "EthAddress", "Twitter Handle", "Telegram Handle", "Tweet Url", ""],
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
     this.investor.projectId = this.$route.query.projectId ?  this.$route.query.projectId : "60676b4f09baec1befb5f469"; // if projectId is not passed, hardcoding hypersign project Id
    console.log(this.investor.projectId)
    await this.fetchProjectData();
    //const usrStr = localStorage.getItem("user");
    //this.user = null; JSON.parse(usrStr);
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

    gotosubpage: (id) => {
      this.$router.push(`${id}`);
    },
    formateDate(d) {
      return new Date(d).toLocaleString();
    },
    async fetchProjectData(){
      try {
        this.isLoading = true;
        
        if(!this.investor.projectId) throw new Error("No project found");

        const url = `${this.$config.studioServer.BASE_URL}api/v1/project/${this.investor.projectId}?fetchInvestors=true&limit=100`;
        
        const resp = await fetch(url);
        
        if (resp.status !== 200) {
          throw new Error(resp.statusText);
        }

        const json = await resp.json();
        this.project = {...json};
        this.project.fromDate = this.formateDate(this.project.fromDate)
        this.project.toDate = this.formateDate(this.project.toDate)
        this.projectFetched = true;
        this.notifySuccess("Project is fetched. ProjectName " + json.projectName);
      } catch (e) {
        this.notifyErr(e.message);
      } finally {
        this.isLoading = false;
      }
    },
    formateDate(dateStr){
      const d =  new Date(dateStr);
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
        };
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


