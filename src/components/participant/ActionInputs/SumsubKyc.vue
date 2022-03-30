<template>
  <b-card no-body class="action-wrap">
    <b-card-header
      :class="visible ? null : 'collapsed'"
      :aria-expanded="visible ? 'true' : 'false'"
      :aria-controls="`collapse-${idValue}`"
      @click="visible = !visible"
    >
      <b-row>
        <b-col cols="1" sm="1" md="1">
          <img src="https://sumsub.com/wp-content/uploads/2019/02/SS-logo-big-floating-1024x747.png.pagespeed.ce.z-fgtDC2mQ.png" height="20px" />
        </b-col>
        <b-col cols="9" sm="9" class="text-left" md="9">
          <div class="text text-capitalize">{{ data.title }}</div>
        </b-col>
        <b-col cols="2" sm="2" md="2">
          <b-badge class="btn-score" @click="update()" v-if="!done">
            <img src="../../../assets/plus.svg" />
            {{ data.score }}
          </b-badge>
          <img
            class="check-mark"
            src="../../../assets/check-circle-fill.svg"
            height="25px"
            v-if="done"
          />
        </b-col>
      </b-row>
    </b-card-header>
    <b-collapse :id="`collapse-${idValue}-KYC`" v-model="visible"   >
      <b-card-body class="user-details">
        <b-row>
          <b-col cols="12" sm="12" md="12">
           
            <div v-if="!data.slug" class="follow">
              <!-- <b-form-input
                type="text"
                :placeholder="data.placeHolder"
                v-model="data.value"
                :disabled="done" 
                :required="data.isManadatory"
              ></b-form-input> -->
              <ErrorMessage errorMessage="e-KYC Configuration error : Wrong Slug"/>
            </div>
            <div v-else-if="!done">
                <div id="sumsub-websdk-container"></div>
            </div>
            <div v-else>
             <SuccessMessage successMessage="KYC Verification Complete"/>
            </div>
          </b-col>
        </b-row>
        <b-row v-if="!done">
          <b-col cols="12" sm="12" md="12">
            <button class="btn btn-link center" @click="update()">
              Continue
            </button>
          </b-col>
        </b-row>
      </b-card-body>
    </b-collapse>
  </b-card>
</template>
<style scoped>
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>

<script>

import ErrorMessage from "../ErrorMessage.vue";
import snsWebSdk from '@sumsub/websdk';
import eventBus from "../../../eventBus.js";

import apiClient from "../../../mixins/apiClientMixin.js";
import notificationMixins from "../../../mixins/notificationMixins";
import SuccessMessage from '../SuccessMessage.vue';

export default {
  name: "SumsubKyc",
  props: {
    idValue: {
      required: true,
    },
    data: {
      required: true,
    },
  },
  components: {
    ErrorMessage,
    SuccessMessage,
  },
  data() {
    return {
      visible: false,
      done: this.data.isDone,
      authToken: localStorage.getItem("authToken"),
      showerror: false,
      kycData:{},     
      
    };
  },
  async mounted() {
      this.$root.$on('bv::collapse::state', (collapseId, isJustShown) => {
      if(collapseId.includes('KYC') && isJustShown){
      this.dropDown()
      }
    eventBus.$on(`disableInput${this.data._id}`, this.disableInput);

    })
    
        
    },

methods:{
  async update(){
   try{
    if(this.kycData.reviewResult.reviewAnswer==="GREEN" && this.kycData.reviewStatus==="completed"){
     
     
    this.$emit("input", "true");
    this.done=true
    }else if(this.kycData.reviewResult.reviewAnswer==="RED"){
      return this.notifyErr("Your Kyc verfication has been declined")
    }else{
      return this.notifyWarning("Your Kyc verfication is not completed")
    }
   }catch(e){
      return this.notifyWarning("Your Kyc verfication is not completed")
   }
    
  },
 async dropDown(){
  if(!this.done){
  const data= await  this.getNewAccessToken() 
 
    this.launchWebSdk(data.token)
  }
 }
,
 launchWebSdk(accessToken/*, applicantEmail, applicantPhone, customI18nMessages*/) {
  // customI18nMessages={"letter":"A"}
    let snsWebSdkInstance = snsWebSdk.init(
            accessToken,
            // token update callback, must return Promise
            // Access token expired
            // get a new one and pass it to the callback to re-initiate the WebSDK
            () => this.getNewAccessToken()
        )
        .withConf({
            lang: 'en', //language of WebSDK texts and comments (ISO 639-1 format)
            // email: applicantEmail,
            // phone: applicantPhone,
             //i18n: customI18nMessages, //JSON of custom SDK Translations
            uiConf: {
               // customCss: "https://url.com/styles.css"
                // URL to css file in case you need change it dynamically from the code
                // the similar setting at Customizations tab will rewrite customCss
                // you may also use to pass string with plain styles `customCssStr:`
                customCssStr:` 
                h4,p{
                  color:black;
                }              
                button.continue,button.submit{
                  color : black !important;
                  background:#F1B319 !important;
                }
                div.tab-content{
                  background-color:#faedcd !important
                }
                div.mobile-tabs{
                  color:#252733 !important
                }
                div.round-icon{
                  background-image:linear-gradient(204deg,#F1B319,#dedede) !important
                }
              
              :root{
                --primary-color:black !important;
                --success-color:#f1b319 !important;
              }
                
                `
            },
        })
        .withOptions({ addViewportTag: false, adaptIframeHeight: true})
        // see below what kind of messages WebSDK generates
        .on('idCheck.stepCompleted', (payload) => {           
            this.notifySuccess( `Completed Step : ${payload["step"]}`)
        })
        .on('idCheck.onError', (error) => {
            console.log('onError', error)
            this.notifyErr(error.mesage)
        })
        .on('idCheck.applicantStatus',payload=>{
          this.kycData=payload
          this.notifySuccess("Your KYC status Updated")
        })
        
        .build();

    // you are ready to go:
    // just launch the WebSDK by providing the container element for it
    snsWebSdkInstance.launch('#sumsub-websdk-container')
},

 async getNewAccessToken() {
    let url = `${this.$config.studioServer.BASE_URL}api/v1/sumsub/kyc/accesstoken`;
    let headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.authToken}`,
      };
    const res = await apiClient.makeCall({
        method: "POST",
        url: url,
        header: headers,
        body:JSON.stringify({"actionId":this.data._id, "eventId":this.data.eventId})
      });
  
    return Promise.resolve(res.data)// get a new token from your backend
  }
}, disableInput(data) {
      this.done = data;
    },
 mixins: [notificationMixins],
};
</script>
