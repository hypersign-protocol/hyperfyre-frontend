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

    <div class="row" style="margin-top: 2%">
      <div
        class="col-md-12 my-5 w-100"
        style="text-align: left;"
      >
        <div
          class="card"
          v-for="plan in plans"
          v-bind:key="plan"
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
            <span style="">{{ plan.planName }}</span>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-12">
                <p>{{plan.description}}</p>
                <p>Get {{plan.totalNoOfRequests}} requests</p>
                <p>Only for ${{plan.price}} !!</p>
                <p>
                  <button class="btn btn-outline-primary"  @click="subscribe(plan)">Subscribe</button>
                </p>
              </div>
            </div>
          </div>
          <div
            class="card-header"
            style="padding: 5px; background-color: #8080801f"
          >
          </div>
        </div>
      </div>
    </div>

    <div class="row" style="margin-top: 2%">
      <div class="col-md-12">

      </div>
    </div>
  </div>
</template>

<script>
import fetch from "node-fetch";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import notificationMixins from "../mixins/notificationMixins";
import apiClientMixin from "../mixins/apiClientMixin";

export default {
  name: "Subscription",
  components: { Loading },

  data() {
    return {
      authToken: localStorage.getItem("authToken"),
      isLoading: false,
      fullPage: true,
      plans: [],
    };
  },

  created() {
    const plansInStorage = localStorage.getItem("plans");
    if (!plansInStorage) {
      return;
    }
    this.plans = JSON.parse(plansInStorage);
  },
  async mounted() {},

  methods: {
    async fetchProjectData(skip, limit) {
      try {
        this.isLoading = true;

        // if (!this.investor.projectId) throw new Error("No project found");

        // const url = `${this.$config.studioServer.BASE_URL}api/v1/project/${this.investor.projectId}?fetchInvestors=true&limit=${limit}&skip=${skip}&searchQuery=${this.tableSearch}`;
        // // console.log(url);
        // const headers = {
        //   "Content-Type": "application/json",
        //   Authorization: `Bearer ${this.authToken}`,
        // };
        // const resp = await fetch(url, {
        //   headers,
        //   method: "GET",
        // });

        // if (!resp.ok) {
        //   return this.notifyErr(resp.statusText);
        // }
        // const json = await resp.json();

        // this.project = { ...json };
        // this.sourceData = { ...json };
        // this.project.fromDate = this.formateDate(this.project.fromDate);
        // this.project.toDate = this.formateDate(this.project.toDate);
        // this.projectFetched = true;

        // this.pageSelectDropdown = Array.from({length: Math.ceil(this.project.count / this.perPage)}, (_, i) => i + 1)

        // this.notifySuccess(
        //   "Project is fetched. ProjectName " + json.projectName
        // );
      } catch (e) {
        this.notifyErr(e.message);
      } finally {
        this.isLoading = false;
      }
    },

    async subscribe() {
      try {
        this.isLoading = true;

        // const url = `${this.$config.studioServer.BASE_URL}api/v1/investor`;
        // let headers = {
        //   "Content-Type": "application/json",
        //   "Authorization": `Bearer ${this.authToken}`,
        // };
        // const resp = await fetch(url, {
        //   method: "POST",
        //   body: JSON.stringify(this.investor),
        //   headers,
        // });

        // if (!resp.ok) {
        //   return this.notifyErr(resp.statusText);
        // }

        // const json = await resp.json();
        // this.isDataSaved = true;
        // this.notifySuccess("Your data is saved. Id = " + json._id);
      } catch (e) {
        this.notifyErr(e.message);
      } finally {
        this.isLoading = false;
        this.clear();
      }
    },
  },

  mixins: [notificationMixins],
};
</script>
