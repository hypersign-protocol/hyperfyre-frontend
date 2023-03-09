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
                <!-- <button
                  type="button"
                  class="btn btn-outline-primary button-theme"
                  :style="buttonThemeCss"
                  @click="execute(resource)"
                >
                  Execute
                </button> -->
                <hf-buttons
                name="Execute"
                @executeAction="execute(resource)"
                ></hf-buttons>
                <div
                  v-if="resource.id === 4"
                  class="btn"
                  style="float:right"
                  @click="getAllSchedules()"
                  title="Click to refresh"
                ><i class="fas fa-sync" aria-hidden="true"></i>
                </div>
                <div
                  v-if="resource.id === 3"
                  class="btn"
                  style="float:right"
                  @click="getAllPushNotificationScheduled()"
                  title="Click to refresh"
                ><i class="fas fa-sync" aria-hidden="true"></i>
                </div>
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
                <date-time-picker
                  v-model='resource.value.expiredAt'
                  :clear-button="true"
                  :close-button="true"
                  empty-value=""   
                  :time-picker="true" 
                  format="DDDD HH:mm"
                  :hour-time="24"
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
                <!-- <button
                  type="button"
                  class="btn btn-outline-primary button-theme"
                  :style="buttonThemeCss"
                  @click="execute(resource)"
                >
                  Execute
                </button> -->
                <hf-buttons
                name="Execute"
                @executeAction="execute(resource)"
                ></hf-buttons>
        
                <!-- <button
                  type="button"
                  class="btn btn-outline-primary button-theme"
                  :style="buttonThemeCss"
                  @click="clearAll()"
                >
                  Cancel
                </button> -->
                <hf-buttons
                name="Cancel"
                @executeAction="clearAll()"
                ></hf-buttons>
                <div
                  v-if="resource.id === 5"
                  class="btn"
                  style="float:right"
                  @click="getAllCoupon()"
                  title="Click to refresh"
                ><i class="fas fa-sync" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          <!-- Push Notification Table -->
            <div
              class="row g-3 w-100"
              v-if="resource.id == 3 && pushNotificationSchedule.length > 0"
              style="padding: 10px; max-height: 300px; overflow-y: auto"
            >
              <hf-table
              :items="pushNotificationSchedule"
              :fields="pushNotificationHeader"
              ></hf-table>
            </div>
          <!--  -->
            <div
              class="row g-3 w-100"
              v-if="resource.id == 4 && schedules.length > 0"
              style="padding: 10px; max-height: 300px; overflow-y: auto"
            >
              <hf-table
              :items="schedules"
              :fields="emailNotificationHeader"
              ></hf-table>
            </div>

            <!-- Coupon Table -->
            <div
              class="row g-3 w-100"
              v-if="resource.id == 5 && couponTable.length > 0"
              style="padding: 10px; max-height: 300px; overflow-y: auto"
            >
              <hf-table
              :items="couponTable"
              :fields="couponHeader"
              @updateRecord="row => update(resource.id,row)"
              @deleteRecord="res => remove(resource.id,res)"
              ></hf-table>
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
    <hf-pop-up
    id="hf-popup-superadmin"
    Header="Super Admin Confirmation"
    >
     <div class="row g-3 align-items-center w-100  mt-4">
        <div class="col-lg-3 col-md-3 text-left">
          <label for="masterKey" class="col-form-label">Master Key :</label>
        </div>
        <div class=" col-lg-9 col-md-9 px-0">
          <input v-model="masterKey" type="password" 
          placeholder="****************************************" 
          id="masterKey" class="form-control w-100" >
        </div>   
    </div>
    <div class="mt-5 text-center">
    <hf-buttons
    name="Confirm"
    @executeAction="confirm()"
    ></hf-buttons>
    </div>
    </hf-pop-up>
  </div>
</template>

<style scoped>
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
import { isValidURL,isFloat } from "../../mixins/fieldValidationMixin";
import dayjs from "dayjs";
import HfButtons from "../../components/elements/HfButtons.vue"
import HfPopUp from "../../components/elements/HfPopUp.vue"
import HfTable from "../../components/elements/HfTable.vue"
export default {
  components: {
    Loading,
    
    HfButtons,
    HfPopUp,
    HfTable
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
  mixins: [notificationMixins],
  data() {
    return {
      isEdit: false,
      isDelete: false,
      isLoading: false,
      fullPage: true,
      origin: "",
      masterKey: "",
      response: null,
      authToken: localStorage.getItem("authToken"),
      schedules: [],
      couponTable: [],
      couponHeader:[
        {key:"name",label:"Coupon Code",type:"text",isCopy:true},
        {key:"discount",label:"Discount (%)",type:"number"},
        {key:"expiredAt",label:"Expires At",type:"date"},
        {key:"maxClaimCount",label:"Limit",type:"number"},
        {key:"usageCount",label:"Usage",type:"number"},
        {key:"action", label:"Action",type:"action",editOnly:true, isDelete:true },
      ],
      emailNotificationHeader:[
        {key:"scheduledAt",label:"Time (UTC)", type:"date"},
        {key:"userId",label:"Schedular", type:"text"},
        {key:"eventId",label:"Event Id", type:"text"},
        {key:"totalEmailsToSend",label:"Total", type:"email"},
        {key:"totalPassedEmails",label:"Passed", type:"number"},
        {key:"totalFailedEmails",label:"Failed", type:"number"},
        {key:"status",label:"Status", type:"text"},
      ],
      pushNotificationHeader:[
        {key:"scheduledAt",label:"Time (UTC)", type:"date"},
        {key:"eventId",label:"Event Id", type:"text"},
        {key:"totalWebPushToSend",label:"Total", type:"email"},
        {key:"totalPassedWebPush",label:"Passed", type:"number"},
        {key:"totalFailedWebPush",label:"Failed", type:"number"},
        {key:"status",label:"Status", type:"text"},
      ],
      pushNotificationSchedule:[],
      tempResources:{},
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
    this.getAllPushNotificationScheduled();
  },
  methods: {
    update(id, coupon) {
      this.isEdit = true;
      this.resources.map(x => {
        if(x.id === id){
            Object.assign(x.value, { ...coupon })
            if(id === 5) x.value.expiredAt = dayjs(x.value.expiredAt).format("YYYY-MM-DD HH:mm:ss");
            return x
        }
      })
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
            discount: 0,
            expiredAt: null,
            maxClaimCount: 0,
          });
        }
        return (x.value = "");
      });
      this.masterKey = "";
      this.isEdit = false;
      this.isDelete =  false;
      this.tempResources = {}
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
    async getAllPushNotificationScheduled(){
      try {
        this.isLoading = true;
        let url = `${this.$config.studioServer.BASE_URL}api/v1/notification/push/schedules`;
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
        this.pushNotificationSchedule = json;
      } catch (e) {
        this.notifyErr(e.message);
      } finally {
        this.isLoading = false;
      }
    },
    execute(resource){
      let ab = true
      this.tempResources = resource;
      console.log(this.tempResources)
      if(this.isDelete!=true){
       ab = this.checkEveryThingisOk(resource)
    }
      if(ab == true){
        this.$root.$emit('bv::show::modal','hf-popup-superadmin');
      }
    },
    async confirm() {
      let resource = this.tempResources
      try {
        
        if (!this.masterKey) {
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
        url = url.replace("<SECRET_KEY>", this.masterKey);
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
        if (json.message && json.schedule) {
          const { message, schedule } = json;

          if (message) {
            this.notifySuccess(message);
          } else {
            this.notifySuccess(json);
          }

          if (schedule) {
            this.schedules.unshift(schedule);
          }
        }
        else if(json.message && !json.newWebPushSchedule && this.isDelete == true){
          this.notifySuccess(json.message)
          this.getAllCoupon();
        }
        else if(json.message && !json.newWebPushSchedule){
          this.notifySuccess(json.message)
        }
        else if(json.updatedSubs){
          this.notifySuccess("Subscription id: "+json.updatedSubs._id + " " + "is activated " + json.updatedSubs.paymentData.activated)
        }else if (json.discount) {
          if(this.isEdit!=true){
          this.couponTable.unshift(json);
          this.notifySuccess("Coupon"+" "+ json.name + " "+ "successfully created");
          }
          else{
          this.notifySuccess("Coupon"+" "+ json.name + " "+ "successfully updated");
          this.getAllCoupon();
          }
          this.isEdit = false;
        }
        else if(json.message && json.newWebPushSchedule){
          let {message, newWebPushSchedule} = json;
          this.notifySuccess(message)
          this.pushNotificationSchedule.unshift(newWebPushSchedule);
        }

        this.clearAll();
      } catch (e) {
        this.notifyErr(e.message);
      } finally {
        this.Loading = false;
        this.$root.$emit('bv::hide::modal','hf-popup-superadmin');
      }
    },
    checkEveryThingisOk(resource) {
      let isValid = true
      const ToDate = new Date();
      if (resource.id != 5) {
        if (!resource.value) {
          isValid = false
          this.notifyErr("Please enter " + resource.inputLabel);
        }
        if (resource.value.indexOf(" ") >= 0) {
          isValid = false
          this.notifyErr("There should not be space(s) in " + resource.inputLabel);
        }
      }
      if (resource.id === 5) {
        if (!resource.value.name) {
          isValid = false
          this.notifyErr("Enter coupon code");
        }
        else if(isValidURL(resource.value.name)){
          isValid = false
          this.notifyErr("Coupon should not be a url")
        }
        else if(resource.value.name.trim().includes(' ')){
          isValid = false
          this.notifyErr('There should not be space in coupon')
        }
        
        else if (!resource.value.expiredAt) {
          isValid = false
          this.notifyErr("Enter expiry date time");
        }

        else if (new Date(resource.value.expiredAt).getTime() <= ToDate.getTime()) {
          isValid = false
          this.notifyErr("Expiry time should be gretter than current data & time");
        }

        else if (
          resource.value.maxClaimCount <= 0 || isFloat(resource.value.maxClaimCount)
        ) {
          isValid = false
          this.notifyErr("Limit should be a number greater than 0");
        }

        else if (
           !resource.value.discount || (resource.value.discount <= 0 || resource.value.discount > 70) ||
            isNaN(parseInt(resource.value.discount))
        ) {
          isValid = false
            this.notifyErr("Discount value should be a number greater than 0 and less than 70");
        }

      }
      return isValid;
    },
  },
};
</script>
