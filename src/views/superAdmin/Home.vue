<template>
  <div class="home marginLeft marginRight">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    ></loading>
    <h1>Super Admin Portal</h1>
    <hr />
    <div
      class="accordion"
      role="tablist"
      v-for="resource in resources"
      v-bind:key="resource.name"
    >
      <b-card no-body class="mb-1">
        <b-card-header
          header-tag="header"
          class="p-1 border-0 accordin-header accordion-header-theme"
          :style="headerThemeCss"
          role="tab"
        >
          <div class="row" style="padding-left: 5px; padding-right: 5px">
            <div class="col-md-10">
              <b-button
                block
                v-b-toggle="'accordion-' + resource.id"
                class="bg-transparent border-0 text-left"
                style="color: black"
              >
                <i :class="resource.icon" aria-hidden="true"></i>
                {{ resource.name }}
              </b-button>
            </div>
            <div class="col-md-2">
              <b-button
                variant="info"
                class="bg-transparent border-0 text-left"
                style="float: right; color: black"
                disabled
                title="Allow your teammate to perform this action by adding their DID. Feature coming soon..."
              >
                <i class="fa fa-user-plus" aria-hidden="true"></i>
              </b-button>
            </div>
          </div>
        </b-card-header>
        <b-collapse
          :id="`accordion-${resource.id}`"
          visible
          accordion="my-accordion"
          role="tabpanel"
        >
          <b-card-body>
            <div
              class="row g-3 w-100"
              v-if="resource.inputLabel && resource.id != 5"
              style="padding: 10px"
            >
              <div class="col-lg-2 col-md-9 px-0">
                <label class="col-form-label"
                  >{{ resource.inputLabel }}:
                </label>
              </div>
              <div class="col-lg-6 col-md-9 px-0">
                <input
                  type="text"
                  class="form-control w-100"
                  :placeholder="resource.inputPlaceholder"
                  v-model="resource.value"
                />
              </div>
              <div class="col-lg-4 col-md-3 slight-align">
                <button
                  type="button"
                  class="btn btn-outline-primary button-theme"
                  :style="buttonThemeCss"
                  @click="execute(resource)"
                >
                  Execute
                </button>
              </div>
            </div>

            <div
              class="row g-3 w-100"
              v-if="resource.id === 5"
              style="padding: 10px"
            >
              <div class="col-lg-4 col-md-9 px-0">
                <label class="col-form-label"
                  >{{ resource.inputLabel.couponName }}:
                </label>
              </div>
              <div class="col-lg-6 col-md-9 px-0 py-1">
                <input
                  type="text"
                  class="form-control w-100"
                  :placeholder="resource.inputPlaceholder.couponNamePlaceholder"
                  v-model="resource.value.name"
                />
              </div>
              <div class="col-lg-4 col-md-9 px-0">
                <label class="col-form-label"
                  >{{ resource.inputLabel.expiryTime }}:
                </label>
              </div>
              <div class="col-lg-6 col-md-9 px-0 py-1 datepicker">
                <datepicker
                  v-model='resource.value.expiredAt'
                  format="YYYY-MM-DD h:i:s"
                />
              </div>

              <div class="col-lg-4 col-md-9 px-0">
                <label class="col-form-label"
                  >{{ resource.inputLabel.maxLimit }}:
                </label>
              </div>
              <div class="col-lg-6 col-md-9 px-0 py-1">
                <input
                  type="number"
                  class="form-control w-100"
                  :placeholder="resource.inputPlaceholder.maxLimitPlaceholder"
                  v-model="resource.value.maxClaimCount"
                />
              </div>

              <div class="col-lg-4 col-md-9 px-0">
                <label class="col-form-label"
                  >{{ resource.inputLabel.valueField }}:
                </label>
              </div>
              <div class="col-lg-6 col-md-9 px-0 py-1">
                <input
                  type="number"
                  class="form-control w-100"
                  :placeholder="resource.inputPlaceholder.valuePlaceholder"
                  v-model="resource.value.discount"
                />
              </div>
              
              <div class="col-lg-4 col-md-9 px-0"></div>
              <div class="col-lg-6 col-md-3 px-0 py-1">
                <button
                  type="button"
                  class="btn btn-outline-primary button-theme"
                  :style="buttonThemeCss"
                  @click="execute(resource)"
                >
                  Execute
                </button>
        
                <button
                  type="button"
                  class="btn btn-outline-primary button-theme"
                  :style="buttonThemeCss"
                  @click="clearAll()"
                >
                  Cancel
                </button>
              </div>
            </div>

            <div
              class="row g-3 w-100"
              v-if="resource.id == 4 && schedules.length > 0"
              style="padding: 10px; max-height: 300px; overflow-y: auto"
            >
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Schedule Id</th>
                    <th scope="col">Time (UTC)</th>
                    <th scope="col">EmailId</th>
                    <th scope="col">Event Id</th>
                    <th scope="col">Total Mails</th>
                    <th scope="col">Passed Mails</th>
                    <th scope="col">Failed Mails</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="schedule in schedules" v-bind:key="schedule._id">
                    <td>{{ schedule._id }}</td>
                    <td>
                      {{ new Date(schedule.scheduledAt).toLocaleString() }}
                    </td>
                    <td>{{ schedule.userId }}</td>
                    <td>{{ schedule.eventId }}</td>
                    <td>{{ schedule.totalEmailsToSend }}</td>
                    <td>{{ schedule.totalPassedEmails }}</td>
                    <td>{{ schedule.totalFailedEmails }}</td>
                    <td>{{ schedule.status }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Coupon Table -->
            <div
              class="row g-3 w-100"
              v-if="resource.id == 5 && couponTable.length > 0"
              style="padding: 10px; max-height: 300px; overflow-y: auto"
            >
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Coupon Code</th>
                    <th scope="col">Discount (%)</th>
                    <th scope="col">Expires At</th>
                    <th scope="col">Limit</th>
                    <th scope="col">Usage</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="coupon in couponTable" v-bind:key="coupon._id">
                    <td>{{ coupon.name }} 
                        <span @click="copy(coupon.name, 'Coupon Code')" class="copy"><i class="far fa-copy"></i></span>
                    </td>
                    <td>{{ coupon.discount }}</td>
                    <td>{{ new Date(coupon.expiredAt).toLocaleString() }}</td>
                    <td>{{ coupon.maxClaimCount }}</td>
                    <td>{{ coupon.usageCount }}</td>
                    <td>
                      <span>
                        <i
                        class="fas fa-pencil-alt"
                        style="padding:2px; cursor: pointer;"
                        title="Click to edit the coupon"
                        @click="update(resource.id,coupon)"
                      > </i> 
                      
                      </span>
                      
                      <span>
                        <i
                        class="fas fa-trash"
                        style="padding:2px; cursor: pointer;"
                        title="Click to delete the coupon"
                        @click="remove(resource.id,coupon)"
                      >
                      </i>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
    <hr />
    <div class="accordion" role="tablist">
      <b-card no-body class="mb-1">
        <b-card-header
          header-tag="header"
          class="p-1 border-0 accordin-header accordion-header-theme"
          :style="headerThemeCss"
          role="tab"
        >
          <b-button
            block
            v-b-toggle.accordian-logs
            class="bg-transparent border-0 text-left text-primary"
          >
            <!-- <i class="fas fa-cog"></i> -->
            <i class="fa fa-database" aria-hidden="true"></i>
            Logs
          </b-button>
        </b-card-header>
        <b-collapse
          id="accordian-logs"
          visible
          accordion="my-accordion"
          role="tabpanel"
        >
          <b-card-body> </b-card-body>
        </b-collapse>
      </b-card>
    </div>
  </div>
</template>

<style scoped>
.copy {
    padding: 3px;
    font-size: medium;
    cursor: pointer;
    color: grey;
}
@media only screen and (max-width: 599px) {
  .slight-align {
    padding-left: 0px;
    padding-top: 10px;
  }
}
.text-primary {
  color: black;
}

.accordion > .card {
  overflow: inherit !important;
}

.button-theme {
  background-color: var(--button-bg-color);
  border-collapse: var(--button-bg-color);
  color: var(--button-text-color);
  border: 0;
  margin-left:5px
}

.accordion-header-theme {
  background-color: var(--header-bg-color);
  border: 0;
}
</style>

<script>
import config from "../../config";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import notificationMixins from "../../mixins/notificationMixins";
import Datepicker from "vuejs-datetimepicker";
import { isValidSlug } from "../../mixins/fieldValidationMixin";
import masterKeyPopupMixin from "../../mixins/masterKeyPopupMixin.js";
import dayjs from "dayjs";
export default {
  components: {
    Loading,
    Datepicker,
  },
  computed: {
    buttonThemeCss() {
      return {
        "--button-bg-color": config.app.buttonBgColor,
        "--button-text-color": config.app.buttonTextColor,
      };
    },
    headerThemeCss() {
      return {
        "--header-bg-color": config.app.headerBGColor,
        "--header-text-color": config.app.headerTextColor,
      };
    },
  },
  mixins: [notificationMixins, masterKeyPopupMixin],
  data() {
    return {
      isEdit: false,
      isDelete: false,
      isLoading: false,
      fullPage: true,
      origin: "",
      masterKey: "StageKey1",
      response: null,
      authToken: localStorage.getItem("authToken"),
      schedules: [],
      couponTable: [],
      resources: [
        {
          id: 1,
          name: "Promote An Event",
          path: "api/v1/project/promote?notificationKey=<SECRET_KEY>",
          method: "POST",
          icon: "fa fa-bullhorn",
          inputLabel: "Event Id (s)",
          inputPlaceholder:
            "Comma separated eventId (62b307ae54b0af3b2aa0877e, 62b307ae54b0af3b2aa0877e,...)",
          value: "",
        },
        {
          id: 2,
          name: "Activate A Subscription",
          path: "api/v1/subscription/activate/<PARAM>?activationKey=<SECRET_KEY>",
          method: "GET",
          icon: "fa fa-credit-card",
          inputLabel: "Subscrption Id",
          inputPlaceholder: "62f37b7fa6b75d2018c14e84",
          value: "",
        },
        {
          id: 3,
          name: "Send Push Notification",
          path: "api/v1/notification/push/sendNotification/<PARAM>?webPushkey=<SECRET_KEY>",
          method: "GET",
          icon: "fa fa-bell",
          inputLabel: "Event Id",
          inputPlaceholder: "62f37b7fa6b75d2018c14e84",
          value: "",
        },
        {
          id: 4,
          name: "Send Email Notification",
          path: "api/v1/notification/email/send/<PARAM>?notificationKey=<SECRET_KEY>",
          method: "GET",
          icon: "fa fa-envelope",
          inputLabel: "Event Id",
          inputPlaceholder: "62f37b7fa6b75d2018c14e84",
          value: "",
        },
        {
          id: 5,
          name: "Generate Coupon",
          path: "api/v1/subscription/coupon?notificationKey=<SECRET_KEY>",
          method: "POST",
          icon: "fa fa-tag",
          inputLabel: {
            couponName: "Coupon Code",
            valueField: "Discount",
            expiryTime: "Expiry Time",
            maxLimit: "Limit",
          },
          inputPlaceholder: {
            couponNamePlaceholder: "FYRE-10",
            valuePlaceholder: "Enter discount in percentage",
            expiryTimePlaceholder: "Enter expiry Time",
            maxLimitPlaceholder: "Enter max limit",
          },
          value: {
            _id: "",
            name: "",
            discount: 0,
            expiredAt: null,
            maxClaimCount: 0,
            usageCount: 0,
          },
        },
      ],
    };
  },
  created() {
    /// TODO: Temporary fix
    this.getAllSchedules();
    this.getAllCoupon();
  },
  methods: {
    update(id, coupon) {
      this.isEdit = true;
      this.resources.map(x => {
        if(x.id === id){
            Object.assign(x.value, { ...coupon })
            if(id === 5) x.value.expiredAt = dayjs(x.value.expiredAt).format("YYYY-MM-DD hh:mm:ss");
            return x
        }
      })
    },
    copy(textToCopy, contentType) {
        if (textToCopy) {
            navigator.clipboard
                .writeText(textToCopy)
                .then(() => {
                    this.notifySuccess(
                        `${contentType} copied!`
                    );
                })
                .catch((err) => {
                    this.notifyErr(
                        'Error while copying',
                        err
                    );
                });
        }
    },
    remove(id, res){
        this.isDelete = true;
        const resource = this.resources.find(x => x.id == id)

        Object.assign(resource.value,{ ...res })
        return this.execute(resource);
    },
    clearAll() {
      this.isLoading = false;
      this.fullPage = true;
      this.resources.map((x) => {
        if (x.id === 5) {
          return (x.value = {
            name: "",
            discount: "",
            expiredAt: null,
            maxClaimCount: "",
          });
        }
        return (x.value = "");
      });
      this.masterKey = "";
      this.isEdit = false;
      this.isDelete =  false;
    },
    async getAllCoupon() {
      try {
        this.isLoading = true;
        let url = `${this.$config.studioServer.BASE_URL}api/v1/subscription/coupon`;
        const Url = new URL(this.$config.studioServer.BASE_URL);
        const headers = {
          Orign: Url.origin,
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.authToken}`,
        };

        const resp = await fetch(url, {
          headers,
        });

        if (resp && resp.status === (403 || 401)) {
          throw new Error("Something went wrong");
        }
        const json = await resp.json();
        if (resp.status != 200) {
          throw new Error(json);
        }
        this.couponTable = json;
      } catch (e) {
        this.notifyErr(e.message);
      } finally {
        this.isLoading = false;
      }
    },
    async getAllSchedules() {
      try {
        this.isLoading = true;
        let url = `${this.$config.studioServer.BASE_URL}api/v1/notification/email/schedules`;
        const Url = new URL(this.$config.studioServer.BASE_URL);
        const headers = {
          Orign: Url.origin,
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.authToken}`,
        };
        const resp = await fetch(url, {
          headers,
        });
        if (resp && resp.status === (403 || 401)) {
          throw new Error("Incorrect master key");
        }
        const json = await resp.json();
        if (resp.status != 200) {
          throw new Error(json);
        }
        this.schedules = json;
      } catch (e) {
        this.notifyErr(e.message);
      } finally {
        this.isLoading = false;
      }
    },
    async execute(resource) {
      try {
        this.checkEveryThingisOk(resource)
        
        const res = await this.masterPop();
        const masterKey = res;
        if (!masterKey) {
          throw new Error("Master Key must be passed");
        }
        let body = null;
        if (resource.id === 1) {
          body = {
            eventIds: resource.value.split(",").filter((x) => x),
          };
        }
        if (resource.id === 5) {
          body = resource.value;
          body.expiredAt = new Date(resource.value.expiredAt).toISOString();
        }
        let url;

        url = `${this.$config.studioServer.BASE_URL}${resource.path}`;
        if (resource.id != 5) {
          url = url.replace("<PARAM>", resource.value.trim());
        }
        url = url.replace("<SECRET_KEY>", masterKey);
        console.log(url);
        const Url = new URL(this.$config.studioServer.BASE_URL);
        const headers = {
          Orign: Url.origin,
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.authToken}`,
        }

        let method = resource.method ;

        this.isLoading = true;
        if (this.isEdit === true) {
          method  = "PUT";
        } else if (this.isDelete === true){
          method = "DELETE"
        }
        
        const resp = await fetch(url, {
          headers,
          method,
          body: body ? JSON.stringify(body) : null,
        });

        if (resp && resp.status === (403 || 401)) {
          throw new Error("Incorrect master key");
        }
        const json = await resp.json();
        if (resp.status != 200) {
          throw new Error(json);
        }
        if (json.message) {
          const { message, schedule } = json;

          if (message) {
            this.notifySuccess(message);
          } else {
            this.notifySuccess(json);
          }

          if (schedule) {
            this.schedules.unshift(schedule);
          }
        } else if (json.discount) {
          this.couponTable.unshift(json);
          this.isEdit = false;
        }

        this.clearAll();
      } catch (e) {
        this.notifyErr(e.message);
      } finally {
        this.Loading = false;
        this.clearAll();
        this.getAllCoupon();
      }
    },
    checkEveryThingisOk(resource) {
      if (resource.id != 5) {
        if (!resource.value) {
          throw new Error("Please enter " + resource.inputLabel);
        }
        if (resource.value.indexOf(" ") >= 0) {
          throw new Error("There should not be space(s) in " + resource.inputLabel);
        }
      }
      if (resource.id === 5) {
        if (!resource.value.name) {
          throw new Error("Enter coupon code");
        }
        
        // if (isValidSlug(resource.value.name)) {
        //   throw new Error("Enter valid coupon code");
        // }
        
        if (!resource.value.expiredAt) {
          throw new Error("Enter expiry date time");
        }

        if (
          resource.value.maxClaimCount <= 0 ||
          isNaN(parseInt(resource.value.maxClaimCount))
        ) {
          throw new Error("Enter Valid number for max limit");
        }

        if (
            !resource.value.discount || (resource.value.discount <= 0 && resource.value.discount >= 70) ||
            isNaN(parseInt(resource.value.discount))
        ) {
            throw new Error("Enter valid coupon discount ");
        }

        const ToDate = new Date();
        if (new Date(resource.value.expiredAt).getTime() <= ToDate.getTime()) {
          throw new Error("Expiry time should be gretter than current data & time");
        }

      }
    },
  },
};
</script>
