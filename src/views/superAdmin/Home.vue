<template>
    <div class="home marginLeft marginRight">
        <loading :active.sync="isLoading" :can-cancel="true" :is-full-page="fullPage"></loading>
        <h1>Super Admin Portal</h1>
        <hr />
        <div class="accordion" role="tablist" v-for="resource in resources" v-bind:key="resource.name" >
            <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1 border-0 accordin-header accordion-header-theme"
                :style="headerThemeCss"
                    role="tab" 
                    >
                    <div class="row" style="padding-left: 5px; padding-right:5px;">
                        <div class="col-md-10">
                            <b-button block v-b-toggle="'accordion-' + resource.id"
                                class="bg-transparent border-0 text-left" style="color:black">
                                <i :class="resource.icon" aria-hidden="true"></i>
                                {{ resource.name}}
                            </b-button>
                        </div>
                        <div class="col-md-2">
                            <b-button variant="info" class="bg-transparent border-0 text-left"
                                style="float: right; color:black" disabled title="Allow your teammate to perform this action by adding their DID. Feature coming soon...">
                                <i class="fa fa-user-plus" aria-hidden="true"></i>
                            </b-button>
                        </div>
                    </div>
                </b-card-header>
                <b-collapse :id="`accordion-${resource.id}`" visible accordion="my-accordion" role="tabpanel">
                    <b-card-body>
                        <div class="row g-3 w-100" v-if="resource.inputLabel && resource.id!=5" style="padding: 10px">
                            <div class="col-lg-2 col-md-9 px-0">
                                <label class="col-form-label">{{ resource.inputLabel }}: </label>
                            </div>
                            <div class="col-lg-6 col-md-9 px-0">
                                <input type="text" class="form-control w-100" :placeholder="resource.inputPlaceholder"
                                    v-model="resource.value">
                            </div>
                            <div class="col-lg-4 col-md-3 slight-align">
                                <button type="button" class="btn btn-outline-primary button-theme"
                                :style="buttonThemeCss"
                                    @click="execute(resource)">Execute</button>
                            </div>
                        </div>
                        <div class="row g-3 w-100" v-if="resource.id===5" style="padding: 10px">
                            <div class="col-lg-4 col-md-9 px-0">
                                <label class="col-form-label">{{ resource.inputLabel.couponName }}: </label>
                                
                            </div>                                         
                            <div class="col-lg-6 col-md-9 px-0 py-1">
                                <input type="text" class="form-control w-100" :placeholder="resource.inputPlaceholder.couponNamePlaceholder"
                                    v-model="resource.value.name">
                            </div>
                            <div class="col-lg-4 col-md-9 px-0">
                                <label class="col-form-label">{{ resource.inputLabel.expiryTime }}: </label>
                            </div> 
                            <div class="col-lg-6 col-md-9 px-0 py-1 datepicker" >
                                <!-- <input type="datetime" class="form-control w-100" :placeholder="resource.inputPlaceholder.expiryTimePlaceholder"
                                    v-model="resource.expiryTimeValue"> -->

                                     <datepicker 
                                        v-model="resource.value.expiredAt"
                                        format="YYYY-MM-DD h:i:s"                         
                                    />
                                   
                            </div>

                            <div class="col-lg-4 col-md-9 px-0">
                                <label class="col-form-label">{{ resource.inputLabel.maxLimit }}: </label>
                            </div> 
                            <div class="col-lg-6 col-md-9 px-0 py-1">
                                <input type="number" class="form-control w-100" :placeholder="resource.inputPlaceholder.maxLimitPlaceholder"
                                    v-model="resource.value.maxClaimCount">
                            </div>

                            <div class="col-lg-4 col-md-9 px-0">
                                <label class="col-form-label">{{ resource.inputLabel.valueField }}: </label>
                            </div> 
                            <div class="col-lg-6 col-md-9 px-0 py-1">
                                <input type="text" class="form-control w-100" :placeholder="resource.inputPlaceholder.valuePlaceholder"
                                    v-model="resource.value.discount">
                            </div>
                            <div class="col-lg-4 col-md-3 px-0 py-1">
                                <button type="button" class="btn btn-outline-primary button-theme"
                                :style="buttonThemeCss"
                                    @click="execute(resource)">Execute</button>
                            </div>
                            <div class="col-lg-4 col-md-3 px-0 py-1" v-if="isEdit==true">
                                <button type="button" class="btn btn-outline-primary button-theme"
                                :style="buttonThemeCss"
                                    @click="cancel(resource)">Cancel</button>
                            </div>
                        </div>
                        <div class="row g-3 w-100" v-if="resource.id == 4 && schedules.length > 0" style="padding:10px;max-height: 300px;overflow-y: auto;">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Schedule Id</th>
                                        <th scope="col">Time (UTC)</th>
                                        <!-- <th scope="col">EmailId</th> -->
                                        <th scope="col">Event Id</th>
                                        <th scope="col">Total Mails</th>
                                        <th scope="col">Passed Mails</th>
                                        <th scope="col">Failed Mails</th>
                                        <th scope="col">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="schedule in schedules" v-bind:key="schedule._id">
                                        <td>{{schedule._id}}</td>
                                        <td>{{new Date(schedule.scheduledAt).toLocaleString()}}</td>
                                        <td>{{schedule.userId}}</td>
                                        <td>{{schedule.eventId}}</td>
                                        <td>{{schedule.totalEmailsToSend}}</td>
                                        <td>{{schedule.totalPassedEmails}}</td>
                                        <td>{{schedule.totalFailedEmails}}</td>
                                        <td>{{schedule.status}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <!-- Coupon Table -->
                        <div class="row g-3 w-100" v-if="resource.id == 5 && couponTable.length > 0" style="padding:10px;max-height: 300px;overflow-y: auto;">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Coupon Name</th>
                                        <th scope="col">Discount</th>                            
                                        <th scope="col">Expired at</th>
                                        <th scope="col">Maximum Limit</th>
                                        <th scope="col">Usage Count</th>
                                        <th scope="col">Update</th>
                                        <th scope="col">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="coupon in couponTable" v-bind:key="coupon._id">
                                        <td>{{coupon.name}}</td>
                                        <td>{{coupon.discount}}</td>
                                        <td>{{new Date(coupon.expiredAt).toLocaleString()}}</td>
                                        <td>{{coupon.maxClaimCount}}</td>
                                        <td>{{coupon.usageCount}}</td>
                                        <td>
                                            <i class="fas fa-pencil-alt"
                                                style="text-transform: uppercase; float:right; cursor: pointer;"
                                                title="Click to edit the app and generate new keypair"
                                            @click="update(coupon)">
                                            </i>
                                        </td>
                                        <td @click="remove(coupon._id)">
                                            <button
                                                style="text-transform: uppercase"
                                                class="btn btn-danger btn-sm"
                                                title="Click to remove the coupon"
                                            >
                                            <i class="fas fa-trash"></i>
                                            </button>
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
                <b-card-header header-tag="header" class="p-1 border-0 accordin-header accordion-header-theme"
                :style="headerThemeCss"
                    role="tab">
                    <b-button block v-b-toggle.accordian-logs class="bg-transparent border-0 text-left text-primary">
                        <!-- <i class="fas fa-cog"></i> -->
                        <i class="fa fa-database" aria-hidden="true"></i>
                        Logs
                    </b-button>
                </b-card-header>
                <b-collapse id="accordian-logs" visible accordion="my-accordion" role="tabpanel">
                    <b-card-body>
                    </b-card-body>
                </b-collapse>
            </b-card>
        </div>
    </div>

</template>


<style scoped>
.datetime-picker{
   background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    padding: 0.375rem 0.75rem;
    
    
}
.datetime-picker input{
        background-color: red !important;
        min-width: 0px !important;
}
.datetime-picker input#tj-datetime-input{
    display: none;
    border: none !important;
    min-width: none !important;
}
@media only screen and (max-width: 599px) {
    .slight-align{
        padding-left: 0px ;
        padding-top: 10px;
    }
}
.text-primary{
    color:black
}

.accordion>.card {
    overflow: inherit !important;
}

.b-sidebar>.b-sidebar-header {
    border: 1px solid #000 !important;
}

.previewshow {
    display: block !important;
}

/* .show.collapse{
  display: block !important;
} */
/* .show.collapse{
  transition: height 1s;

} */
.button-theme {
    background-color: var(--button-bg-color);
    border-collapse:  var(--button-bg-color);
    color: var(--button-text-color);
    border: 0;
}

.accordion-header-theme {
    background-color:var(--header-bg-color);
    border: 0;
}

.fa-exclamation-circle {
    position: relative;
    display: inline-block;
    cursor: help;
}

.fa-exclamation-circle .tooltiptext {
    visibility: hidden;
    width: 250px;
    height: auto;
    background-color: var(--button-bg-color);
    color: #fff;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;
    position: absolute;
    z-index: 1;
}

.tooltiptext {
    font-family: sans-serif;
    font-size: 15px;
    max-width: 230px;
}

.fa-exclamation-circle:hover .tooltiptext {
    visibility: visible;
}

.info {
    display: flex;
    padding: 03px;
    color: var(--button-bg-color);
    font-size: 22px;
    border-radius: 50%;
    margin-left: 200px;
    margin-top: -30px;
    width: 20px;
    text-align: center;
}
</style>

<script>
import config from "../../config";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import notificationMixins from "../../mixins/notificationMixins";
import Datepicker from 'vuejs-datetimepicker'
import {isOnlyAlphaNumeric} from "../../mixins/fieldValidationMixin"
import masterKeyPopupMixin from "../../mixins/masterKeyPopupMixin.js"
import dayjs from "dayjs";
export default {
    components: {
        Loading,Datepicker
    },
    computed: {
          buttonThemeCss() {
      return {
        '--button-bg-color': config.app.buttonBgColor,
        '--button-text-color':config.app.buttonTextColor
      }
     },
      headerThemeCss(){
    return{
      '--header-bg-color': config.app.headerBGColor,
      '--header-text-color':config.app.headerTextColor
      }
  },
    },
    mixins: [notificationMixins,masterKeyPopupMixin],
    data() {
        return {
            isEdit:false,
            isLoading: false,
            fullPage: true,
            origin: "",
            masterKey: "StageKey1",
            response: null,   
            authToken: localStorage.getItem("authToken"), 
            schedules: [],
            couponTable:[],
            resources: [{
                    id: 1,
                    name: "Promote An Event",
                    path: "api/v1/project/promote?notificationKey=<SECRET_KEY>",
                    method: "POST",
                    icon: "fa fa-bullhorn",
                    inputLabel: "Event Id (s)",
                inputPlaceholder: "Comma separated eventId (62b307ae54b0af3b2aa0877e, 62b307ae54b0af3b2aa0877e,...)",
                value: ""
                },
                {
                    id: 2,
                    name: "Activate A Subscription",
                    path: "api/v1/subscription/activate/<PARAM>?activationKey=<SECRET_KEY>",
                    method: "GET",
                    icon: "fa fa-credit-card",
                    inputLabel: "Subscrption Id",
                    inputPlaceholder: "Enter subpription id",
                    value: ""
                },
                {
                    id:3,
                    name: "Send Push Notification",
                    path: "api/v1/notification/push/sendNotification/<PARAM>?webPushkey=<SECRET_KEY>",
                    method: "GET",
                    icon: "fa fa-bell",
                    inputLabel: "Event Id",
                    inputPlaceholder: "Enter event id",
                    value: ""
                },
                {
                    id: 4,
                    name: "Send Email Notification",
                    path: "api/v1/notification/email/send/<PARAM>?notificationKey=<SECRET_KEY>",
                    method: "GET",
                    icon:"fa fa-envelope",
                    inputLabel: "Event Id",
                    inputPlaceholder: "enter event id",
                    value: ""
                },
                {
                    id: 5,
                    name: "Generate Coupon",
                    path: "api/v1/subscription/coupon?notificationKey=<SECRET_KEY>",
                    method: "POST",
                    icon:"fa fa-tag",
                    inputLabel: {
                        couponName:"Coupon Name",
                        valueField:"Discount Value",
                        expiryTime:"Expiry Time",
                        maxLimit:"Max Limit"
                    },
                    inputPlaceholder: {
                       couponNamePlaceholder:"Enter Coupon name",
                       valuePlaceholder:"Enter discount in percentage",
                       expiryTimePlaceholder:"Enter expiry Time",
                       maxLimitPlaceholder:"Enter maximum limit"
                    },
                    value:{
                    name:"",
                    discount:"",
                    expiredAt:null,
                    maxClaimCount:""
                    }
                    
                },
            ]
        }
    },
    created(){
        /// TODO: Temporary fix
        this.getAllSchedules();
        this.getAllCoupon();
    },
    methods: {
        cancel(){
            this.isEdit =  false;
            this.clearAll();
        },
        update(coupon){
        this.isEdit =  true;
        this.resources[4].value = {...coupon}
        this.resources[4].value.expiredAt = dayjs(coupon.expiredAt).format(
        "YYYY-MM-DD hh:mm:ss"
      );
        },
       async remove(id){
        try{
        if (id) {
        const res = await this.masterPop()
        if(!res){
            throw new Error("Master Key must be passed")
        }
        this.Loading = true;
        const url = `${this.$config.studioServer.BASE_URL}api/v1/subscription/coupon?notificationKey=${res}`;
        let headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.authToken}`,
        };
        const resp = await fetch(url, {
          method: "DELETE",
          body: JSON.stringify({
            _id: id,
          }),
          headers,
        });
        const json = await resp.json();
        if (json) {
          if (!resp.ok) {
            return this.notifyErr(json);
          } else {
            this.notifySuccess(json.message);
          }
        } else {
          throw new Error("Error while Removing");
        }
      }
       }catch(e){
           this.notifyErr(e.message);
       }
       finally{
           this.Loading = false;
           this.getAllCoupon();
       }
        },
        clearAll(){
            this.isLoading = false;
            this.fullPage =true; 
            this.resources.map(x => {
                if(x.id === 5){
                    return x.value = {
                    name:"",
                    discount:"",
                    expiredAt:null,
                    maxClaimCount:""
                    }
                }
                return x.value = ""});
                this.masterKey = ""

        },
        async getAllCoupon(){
            try{
                this.isLoading = true;
                let url = `${this.$config.studioServer.BASE_URL}api/v1/subscription/coupon`;
                const Url = new URL(this.$config.studioServer.BASE_URL)
                const headers = {
                    Orign: Url.origin,
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.authToken}`,
                };

                const resp =  await fetch(url, {
                    headers
                });

                if(resp && resp.status === (403 || 401)){
                    throw new Error("Something went wrong")
                }
                const json = await resp.json();
                if(resp.status != 200){
                    throw new Error(json)
                }
                this.couponTable = json;    
            }catch(e){
                this.notifyErr(e.message);
            } finally {
                this.isLoading = false;
            }
        },
        async getAllSchedules(){            
            try{
                this.isLoading = true;
                let url = `${this.$config.studioServer.BASE_URL}api/v1/notification/email/schedules`;
                const Url = new URL(this.$config.studioServer.BASE_URL)
                const headers = {
                    Orign: Url.origin,
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.authToken}`,
                };
                const resp =  await fetch(url, {
                    headers
                });
                if(resp && resp.status === (403 || 401)){
                    throw new Error("Incorrect master key")
                }
                const json = await resp.json();
                if(resp.status != 200){
                    throw new Error(json)
                }
                this.schedules = json;    
            }catch(e){
                this.notifyErr(e.message);
            } finally {
                this.isLoading = false;
            }
        },
        async execute(resource){
            try {
                if(this.checkEveryThingisOk(resource)!==true){
                    throw new Error(this.checkEveryThingisOk(resource));
                }
                const res = await this.masterPop();               
                const  masterKey  = res;
                if (!masterKey){
                    throw new Error("Master Key must be passed")
                }
                let body = null;
                if(resource.id === 1){
                    body = {
                        eventIds: resource.value.split(',').filter((x) => x)
                    }
                }
                if(resource.id === 5){
                    body = resource.value;
                    body.expiredAt = new Date(resource.value.expiredAt).toISOString();                    
                }
                let url;
                
                url = `${this.$config.studioServer.BASE_URL}${resource.path}`;                
                console.log(url)
                if(resource.id != 5){
                    url = url.replace('<PARAM>', resource.value.trim())
                }
                url = url.replace('<SECRET_KEY>', masterKey);
                console.log(url)
                const Url = new URL(this.$config.studioServer.BASE_URL)
                const headers = {
                    Orign: Url.origin,
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.authToken}`,
                };
                this.isLoading = true;
                if(this.isEdit===true){
                   resource.method = "PUT" 
                }
                else if(resource.id === 1 ||resource.id === 5){
                    resource.method = "POST";
                }
                const resp = await fetch(url, {
                    headers,
                    method: resource.method,
                    body: body? JSON.stringify(body) : null
                })
                
                if(resp && resp.status === (403 || 401)){
                    throw new Error("Incorrect master key")
                }
                const json = await resp.json();
                if(resp.status != 200){
                    throw new Error(json)
                }
                if(json.message){
                const { message, schedule } = json;

                if(message){
                    this.notifySuccess(message);
                } else {
                    this.notifySuccess(json);
                }

                if(schedule){
                    this.schedules.unshift(schedule);
                }
                }
                else if(json.discount){
                    console.log(json);
                    this.couponTable.unshift(json)
                    console.log(this.couponTable)
                    this.isEdit =  false;
                }
                
                this.clearAll()
            } catch (e) {
                this.notifyErr(e.message);
            } finally {
                this.Loading = false;
                this.getAllCoupon();
            }
        },
        checkEveryThingisOk(resource){
                 if(resource.id != 5){
                if(!resource.value){
                    return ("Please enter " + resource.inputLabel)
                }
                if (resource.value.indexOf(' ') >= 0){      
                    return ("There should not be space(s) in " + resource.inputLabel)
                }
                }
                if(resource.id === 5){
                    if(!resource.value.name){
                        return ("Enter coupon name");
                    }
                    if(!isOnlyAlphaNumeric(resource.value.name)){                        
                        return ("Enter valid coupon code");
                    }
                    if(!resource.value.expiredAt){                       
                        return ("Enter expiry date time")
                    }
                    if(!resource.value.maxClaimCount){                        
                        return ("Enter max limit");
                    }
                    if(resource.value.maxClaimCount <= 0)  {                      
                        return ("Enter Valid number for max limit")
                    }
                    if(!resource.value.discount){                        
                        return ("Enter discount in percentage");
                    }
                   
                    const ToDate = new Date();
                    if(new Date(resource.value.expiredAt).getTime() <= ToDate.getTime()){                        
                        return ("Expiry time should be gretter than current data & time")
                    }
                    
                    if(!resource.value.discount < 0){                        
                            return ("Enter valid percentage value")
                    }               
                }   
                return true;
                }
    }
}
</script>