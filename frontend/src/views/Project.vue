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
                  <label style="margin-right: 8%"
                    >Whitelisting Start Date:</label
                  >
                  <datepicker
                    v-model="project.fromDate"
                    name="uniquename"
                  ></datepicker>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label style="margin-right: 8%">Whitelisting End Date:</label>
                  <datepicker
                    v-model="project.toDate"
                    name="uniquename"
                  ></datepicker>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label style="margin-right: 8%"
                    >Project's Twitter Handle:</label
                  >
                  <input
                    type="text"
                    v-model="project.twitterHandle"
                    size="30"
                    placeholder="Enter twitter handle"
                    class="form-control"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label style="margin-right: 8%"
                    >Project's Telegram Handle:</label
                  >
                  <input
                    type="text"
                    v-model="project.telegramHandle"
                    size="30"
                    placeholder="Enter telegram channel"
                    class="form-control"
                  />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                
                <div class="form-group">
                  <label style="margin-right: 8%"
                    >Twitter Post: </label
                  >
                <textarea rows="5" cols="5" v-model="project.twitterPostFormat" class="form-control" />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <hr />
                <button
                  class="btn btn-outline-primary btn-sm"
                  @click="saveProject()"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row" v-if="whitelistingLink != ''" style="margin-top: 2%">
      <div class="col-md-12" style="text-align: left">
        <div class="card">
          <div class="card-body">
            <h4>
              Congratulations!!! Your project is successfully created, you can
              give this link to your investors for whitelisting.
              <a :href="whitelistingLink" target="_blank">{{
                whitelistingLink
              }}</a>
            </h4>
          </div>
        </div>
      </div>
    </div>

    <div class="row" style="margin-top: 2%">
      <div class="col-md-12" style="text-align: left">
        <table class="table table-striped">
          <thead>
            <tr>
              <th v-for="col in cols" v-bind:key="col">{{ col }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="project in projects" v-bind:key="project">
              <td>{{ project._id }}</td>
              <!-- <td>{{project.ownerDid}}</td> -->
              <td>{{ project.projectName }}</td>
              <td>{{ project.fromDate }}</td>
              <td>{{ project.toDate }}</td>
              <td><a :href="project.logoUrl" target="_blank">Url</a></td>
              <td><a :href="project.investors_link" target="_blank">Url</a></td>
              <td>
                <a :href="project.whitelisting_link" target="_blank">Url</a>
              </td>
              <td>
                <button
                  type="button"
                  class="btn btn-outline-primary"
                  @click="editProject(project)"
                >
                  Edit
                </button>
              </td>
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
import Datepicker from "vuejs-datepicker";
export default {
  name: "Investor",
  components: { Loading, Datepicker },
  data() {
    return {
      project: {
        _id: "",
        projectName: "",
        logoUrl: "",
        fromDate: "",
        toDate: "",
        ownerDid: "did:hs:QWERTlkasd090123SWEE12322",
        twitterHandle: "",
        telegramHandle: "",
        twitterPostFormat: "I am happy with #hypersign @hypersignchain"
      },
      isProjectEditing: false,
      projects: [],
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
      isLoading: false,
      fullPage: true,
    };
  },
  async mounted() {
    //const usrStr = localStorage.getItem("user");
    //this.user = null; JSON.parse(usrStr);
    this.project.ownerDid = "did:hs:QWERTlkasd090123SWEE12322";
    await this.fetchProjects();
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.prevRoute = from;
    });
  },
  methods: {
    async fetchProjects() {
      try {
        this.isLoading = true;

        if (!this.project.ownerDid) throw new Error("No project found");

        const url = `${this.$config.studioServer.BASE_URL}api/v1/project?onwer=${this.project.ownerDid}`;

        const resp = await fetch(url);

        if (!resp.ok) {
          return this.notifyErr(resp.statusText);
        }

        const json = await resp.json();
        this.projects = json;
        this.projects.map((x) => {
          x["whitelisting_link"] =
            window.location.origin + "/studio/form?projectId=" + x._id;
          x["investors_link"] =
            window.location.origin + "/studio/investors?projectId=" + x._id;
        });
        this.notifySuccess("No. of projects fetched " + this.projects.length);
      } catch (e) {
        this.notifyErr(e.message);
      } finally {
        this.isLoading = false;
      }
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
    editProject(project) {
      this.project = { ...project };
      this.isProjectEditing = true;
    },
    async saveProject() {
      try {
        this.isLoading = true;
        const url = `${this.$config.studioServer.BASE_URL}api/v1/project`;
        let headers = {
          "Content-Type": "application/json",
        };

        let method = "POST";

        if (this.isProjectEditing) {
          method = "PUT";
        }

        this.project.ownerDid = "did:hs:QWERTlkasd090123SWEE12322"; // need to remove this when we have login

        const resp = await fetch(url, {
          method,
          body: JSON.stringify(this.project),
          headers,
        });

        console.log(resp);

        if (!resp.ok) {
          return this.notifyErr(resp.statusText);
        }

        const json = await resp.json();
        this.whitelistingLink = `${window.location.origin}/studio/form?projectId=${json._id}`;
        setTimeout(() => {
          this.whitelistingLink = "";
        }, 10000);
        this.notifySuccess("Project is saved. Id = " + json._id);
        await this.fetchProjects();
      } catch (e) {
        this.notifyErr(e.message);
      } finally {
        this.isLoading = false;
        this.clear();
      }
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
      };
    },
  },
};
</script>
