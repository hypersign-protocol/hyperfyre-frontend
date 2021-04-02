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

    <div class="row">
      <div class="col-md-12" style="text-align: left">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label style="margin-right: 8%">Project Name:</label>
                  <input
                    type="text"
                    v-model="project.projectName"
                    size="30"
                    placeholder="Enter project name"
                    class="form-control"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label style="margin-right: 8%">LogoUrl:</label>
                  <input
                    type="text"
                    v-model="project.logoUrl"
                    size="30"
                    placeholder="Enter logo url"
                    class="form-control"
                  />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label style="margin-right: 8%">From Date:</label>
                  <datepicker v-model="project.fromDate" name="uniquename"></datepicker>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label style="margin-right: 8%">To Date:</label>
                  <datepicker v-model="project.toDate" name="uniquename"></datepicker>
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
import Datepicker from 'vuejs-datepicker';
export default {
  name: "Investor",
  components: { Loading, Datepicker },
  data() {
    return {
      project: {
        projectName: "Hypersign Project",
        logoUrl: "https://thumb.tildacdn.com/tild3065-3765-4865-b331-393637653931/-/resize/150x/-/format/webp/hypersign_Yellow.png",
        fromDate: "",
        toDate: "",
        ownerDid: "did:hs:QWERTlkasd090123SWEE"
      },
      active: 0,
      host: location.hostname,
      authToken: localStorage.getItem("authToken"),
      isLoading: false,
      fullPage: true,
    };
  },
  async mounted() {
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
    async saveInvestor() {
      try {
        this.isLoading = true;

        // if (this.vehiclNumber == "")
        //   return this.notifyErr("Error: Vehicle Number can not be blank");
        // if (this.typOfMaterial == "")
        //   return this.notifyErr("Error: typeOfMaterial can not be blank");
        // if (this.numprOfSacks == "")
        //   return this.notifyErr("Error: Number Of Sacks can not be blank");

        
        const url = `${this.$config.studioServer.BASE_URL}api/v1/project`;
        let headers = {
          "Content-Type": "application/json",
        };
        const resp = await fetch(url, {
          method: "POST",
          body: JSON.stringify(this.project),
          headers,
        });
        
        if (resp.status !== 200) {
          throw new Error(resp.statusText);
        }

        const json = await resp.json();
        this.notifySuccess("Project is saved. Id = " + json._id);
      } catch (e) {
        this.notifyErr(e.message);
      } finally {
        this.isLoading = false;
        this.clear();
      }
    },
    clear() {
      this.project = {
        projectName: "",
        logoUrl: "",
        fromDate: "",
        toDate: "",
        onwerDid: ""
      };
    },
  },
};
</script>


