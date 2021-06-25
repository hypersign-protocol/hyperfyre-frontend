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
</style>
<template>
  <div class="home marginLeft marginRight">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    ></loading>

     <b-modal  hide-footer size="lg"  id="create-project-modal" title="Create a Project">
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
                      input-class="form-control"
                    ></datepicker>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label style="margin-right: 8%"
                      >Whitelisting End Date:</label
                    >
                    <datepicker
                      v-model="project.toDate"
                      name="uniquename"
                      input-class="form-control"
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
                <div class="col-md-6">
                  <div class="form-group">
                    <label style="margin-right: 8%"
                      >Project Status:</label
                    >
                    <select class="form-control" v-model="project.projectStatus"  @change="changeProjectStatus($event)">
                      <option value="true">OPEN</option>
                      <option value="false">CLOSE</option>
                    </select >
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label style="margin-right: 8%">Twitter Post: </label>
                    <textarea
                      rows="5"
                      cols="5"
                      v-model="project.twitterPostFormat"
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
                    @click="saveProject()"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
    </b-modal>

    <div class="row">
      <div class="col-md-12" style="text-align: left">
        <div class="">
          <div class="text-right">
            <button v-b-modal.create-project-modal   class="btn btn-primary ">Create <i class="fas fa-plus text-white"></i> </button>
          </div>
          <b-collapse id="collapse-1" class="mt-2">
          
          </b-collapse>
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
      <div class="col-md-12 w-100" style="text-align: left">
        <div
          class="card"
          v-for="project in projects"
          v-bind:key="project"
          style="
            float: left;
            max-width: 60rem;
            margin-right: 3%;
            margin-bottom: 1%;
          "
        >
          <div
            class="card-header"
            style="padding: 5px; text-align: center; font-weight: bold"
          >
            <span style="">{{ project.projectName }}</span>
            <span data-toggle="tooltip"
                    data-placement="bottom"
                    title="Project Status" style="float:right">

              
              <span v-if="project.projectStatus == true">
                <i class="fas fa-signal" style="color:green"></i> 
              </span>
              <span  v-if="!project.projectStatus ||  project.projectStatus == false" >
                <i class="fas fa-signal" style="color:red"></i>
              </span>

            </span>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-4">
                <img :src="project.logoUrl" style="max-width: 150px" />
              </div>
              <div class="col-md-8">
                <ul style="list-style-type: none">
                  <li
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="ProjectId"
                  >
                    <i class="far fa-id-card"></i
                    ><span class="card-title">{{ project._id }}</span>
                  </li>
                  <li
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Start Date"
                  >
                    <i class="fas fa-hourglass-start"></i>
                    {{ project.fromDate }}
                  </li>
                  <li
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="End Date"
                  >
                    <i class="fas fa-hourglass-end"></i> {{ project.toDate }}
                  </li>

                  <li
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Whitelisting Form"
                  >
                    <i class="fas fa-file-alt"></i>
                    <a :href="project.whitelisting_link" target="_blank"
                      >Whitelisting Form</a
                    >
                  </li>

                  <li
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Investor List"
                  >
                    <i class="fas fa-users"></i
                    ><a :href="`/admin/investors?projectId=${project._id}`"
                      >Investor List</a
                    >
                  </li>

                </ul>
              </div>
            </div>
          </div>
          <div
            class="card-header"
            style="padding: 5px; background-color: #8080801f"
          >
            <span
              data-toggle="tooltip"
              data-placement="bottom"
              title="Twitter handle"
            >
              <a
                :href="`https://twitter.com/${project.twitterHandle}`"
                target="__blank"
              >
                <i class="fab fa-twitter"></i
              ></a>
            </span>
            <span
              data-toggle="tooltip"
              data-placement="bottom"
              title="Telegram handle"
            >
              <a
                :href="`https://t.me/${project.telegramHandle}`"
                target="__blank"
                ><i class="fab fa-telegram-plane"></i
              ></a>
            </span>
            <span
              style="float: right; cursor: pointer"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Edit this project"
              ><i class="fas fa-pencil-alt" v-b-modal.create-project-modal  @click="editProject(project)"></i
            ></span>
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
import Datepicker from "vuejs-datepicker";
import notificationMixins from '../mixins/notificationMixins';
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
        twitterPostFormat: "I am happy with #hypersign @hypersignchain",
        projectStatus: true,
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
      user: {},
    };
  },
  async mounted() {
    //const usrStr = localStorage.getItem("user");
    //this.user = null; JSON.parse(usrStr);

    const usrStr = localStorage.getItem("user");
    this.user = {
      ...JSON.parse(usrStr),
    };
    this.project.ownerDid = this.user.id; // : "did:hs:QWERTlkasd090123SWEE12322";
    await this.fetchProjects();
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.prevRoute = from;
    });
  },
  methods: {
    changeProjectStatus (event) {
      this.project.projectStatus = event.target.options[event.target.options.selectedIndex].value === "false" ? false : true ;
    },
    async fetchProjects() {
      try {
        this.isLoading = true;

        if (!this.project.ownerDid) throw new Error("No project found");

        const url = `${this.$config.studioServer.BASE_URL}api/v1/project?onwer=${this.project.ownerDid}`;

        const headers = {
          Authorization: `Bearer ${this.authToken}`,
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
        this.projects.map((x) => {
          x["whitelisting_link"] =
            window.location.origin + "/form?projectId=" + x._id;
          x["investors_link"] =
            window.location.origin +
            "/admin/investors?projectId=" +
            x._id;
        });
        this.notifySuccess("No. of projects fetched " + this.projects.length);
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
          Authorization: `Bearer ${this.authToken}`,
        };

        let method = "POST";

        if (this.isProjectEditing) {
          method = "PUT";
        }



        const resp = await fetch(url, {
          method,
          body: JSON.stringify(this.project),
          headers,
        });

        console.log("RESP", resp);

        if (!resp.ok) {
          return this.notifyErr(resp.statusText);
        }
        const json = await resp.json();
        this.whitelistingLink = `${window.location.origin}/form?projectId=${json._id}`;
        setTimeout(() => {
          this.whitelistingLink = "";
        }, 10000);
        this.notifySuccess("Project is saved. Id = " + json._id);
      
        console.log("PROEJCT", json)
        const userProjects = JSON.parse(localStorage.getItem("userProjects"));
        userProjects.count += 1
        userProjects.projects.push(json)
        localStorage.setItem("userProjects", JSON.stringify(userProjects))
        await this.fetchProjects();
        this.$bvModal.hide("create-project-modal");
          
      

       
       
      } catch (e) {
        console.log("ERROR", e);
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
  mixins: [notificationMixins]
};
</script>
