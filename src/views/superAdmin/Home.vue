<template>
    <div class="home marginLeft marginRight">
        <loading :active.sync="isLoading" :can-cancel="true" :is-full-page="fullPage"></loading>
        <h1>Super Admin Portal</h1>
        <hr />
        <div class="accordion" role="tablist" v-for="resource in resources" v-bind="resource.name">
            <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1 border-0 accordin-header accordion-header-theme"
                :style="headerThemeCss"
                    role="tab">
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
                        <div class="row g-3 w-100" v-if="resource.inputLabel" style="padding: 10px">
                            <div class="col-lg-2 col-md-9 px-0">
                                <label class="col-form-label">{{ resource.inputLabel }}: </label>
                            </div>
                            <div class="col-lg-6 col-md-9 px-0">
                                <input type="text" class="form-control w-100" :placeholder="resource.inputPlaceholder"
                                    v-model="resource.value">
                            </div>
                            <div class="col-lg-4 col-md-3 ">
                                <button type="button" class="btn btn-outline-primary button-theme"
                                :style="buttonThemeCss"
                                    @click="execute(resource)">Execute</button>
                            </div>
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
                        //To be implemented
                        <!-- <table class="table ">
                            <thead>
                                <tr>
                                    <th scope="col">Action</th>
                                    <th scope="col">Time</th>
                                    <th scope="col">Actor DID</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>Larry</td>
                                    <td>the Bird</td>
                                    <td>@twitter</td>
                                </tr>
                            </tbody>
                        </table> -->
                    </b-card-body>
                </b-collapse>
            </b-card>
        </div>
    </div>

</template>


<style scoped>
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

export default {
    components: {
        Loading
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
    mixins: [notificationMixins],
    data() {
        return {
            isLoading: false,
            fullPage: true,
            origin: "",
            masterKey: "StageKey1",
            response: null,   
            authToken: localStorage.getItem("authToken"), 
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
                    inputPlaceholder: "62b307ae54b0af3b2aa0877e",
                    value: ""
                },
                {
                    id:3,
                    name: "Send Push Notification",
                    path: "api/v1/notification/push/sendNotification/<PARAM>?webPushkey=<SECRET_KEY>",
                    method: "GET",
                    icon: "fa fa-bell",
                    inputLabel: "Event Id",
                    inputPlaceholder: "62848d5b5368005f2918edca",
                    value: ""
                },
                {
                    id: 4,
                    name: "Send Email Notification",
                    path: "api/v1/notification/email/send/<PARAM>?notificationKey=<SECRET_KEY>",
                    method: "GET",
                    icon:"fa fa-envelope",
                    inputLabel: "Event Id",
                    inputPlaceholder: "62848d5b5368005f2918edca",
                    value: ""
                },
            ]
        }
    },
    methods: {
        clearAll(){
            this.isLoading = false;
            this.fullPage =true; 
            this.resources.map(x => x.value = "");
            this.masterKey = ""

        },
        async execute(resource){
            try {
            const res = await this.$swal
                .fire({
                    html: `
            <div><b style="color:red">Enter Master Key To Execute</div>
    <input type="password" id="name" class="swal2-input" placeholder="***************">`,
                    confirmButtonText: '<span style="color:white">Confirm</span>',
                    confirmButtonColor: "red",
                    icon: "warning",
                    focusConfirm: false,
                    showCloseButton: true,
                    allowOutsideClick: false,
                    preConfirm: () => {
                        let masterKey = this.$swal.getPopup().querySelector("#name").value;
                        if (masterKey === "") {
                            this.$swal.showValidationMessage(`Please enter the master key to proceed`);
                        }
                        return { masterKey };
                    },
                })

                const { masterKey } = res.value;
                
                if (!masterKey){
                    throw new Error("Master Key must be passed")
                }

                if (!resource.value){
                    throw new Error("Please enter" + resource.inputLabel)
                }

                if (resource.value.indexOf(' ') >= 0){
                    throw new Error("There should not be space(s) in " + resource.inputLabel)
                }
                
                let body = null;
                if(resource.id === 1){
                    body = {
                        eventIds: resource.value.split(',').filter((x) => x)
                    }
                }
                this.isLoading = true;
                let url = `${this.$config.studioServer.BASE_URL}${resource.path}`;
                url = url.replace('<PARAM>', resource.value.trim())
                url = url.replace('<SECRET_KEY>', masterKey)

                const Url = new URL(this.$config.studioServer.BASE_URL)
                const headers = {
                    Orign: Url.origin,
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.authToken}`,
                };

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

                const { message } = json;
                if(message){
                    this.notifySuccess(message);
                } else {
                    this.notifySuccess(json);
                }
                
            } catch (e) {
                this.notifyErr(e.message);
            } finally {
                this.clearAll();
            }
        }
    }
}
</script>