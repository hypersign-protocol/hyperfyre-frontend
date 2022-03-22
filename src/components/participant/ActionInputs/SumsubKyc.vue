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
              <ErrorMessage errorMessage="e-KYC is not verified"/>
            </div>
            <div v-else>
                <div id="sumsub-websdk-container"></div>
            </div>
          </b-col>
        </b-row>
        <b-row v-if="!done">
          <!-- <b-col cols="12" sm="12" md="12">
            <button class="btn btn-link center" @click="update()">
              Continue
            </button>
          </b-col> -->
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
import eventBus from "../../../eventBus.js";
import { isValidURL, isEmpty } from "../../../mixins/fieldValidationMixin";
import notificationMixins from "../../../mixins/notificationMixins";
import Messages from "../../../utils/messages/participants/en";
import config from "../../../config";
import ErrorMessage from "../ErrorMessage.vue";
import snsWebSdk from '@sumsub/websdk';
import crypto from 'crypto'

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
  },
  data() {
    return {
      visible: false,
      done: this.data.isDone,
      authToken: localStorage.getItem("authToken"),
      showerror: false,
    };
  },
  mounted() {
      this.$root.$on('bv::collapse::state', (collapseId, isJustShown) => {
      if(collapseId.includes('KYC') && isJustShown){
      this.clicked()
      }
        
    })
      console.log(JSON.parse(localStorage.getItem('user')).email);
      
      //this.launchWebSdk()
        
    },

methods:{
 async clicked(){
 const token= await  this.getNewAccessToken()
  }
,
 launchWebSdk(accessToken, applicantEmail, applicantPhone, customI18nMessages) {
    let snsWebSdkInstance = snsWebSdk.init(
            accessToken,
            // token update callback, must return Promise
            // Access token expired
            // get a new one and pass it to the callback to re-initiate the WebSDK
            () => this.getNewAccessToken()
        )
        .withConf({
            lang: 'en', //language of WebSDK texts and comments (ISO 639-1 format)
            email: applicantEmail,
            phone: applicantPhone,
            i18n: customI18nMessages, //JSON of custom SDK Translations
            uiConf: {
                customCss: "https://url.com/styles.css"
                // URL to css file in case you need change it dynamically from the code
                // the similar setting at Customizations tab will rewrite customCss
                // you may also use to pass string with plain styles `customCssStr:`
            },
        })
        .withOptions({ addViewportTag: false, adaptIframeHeight: true})
        // see below what kind of messages WebSDK generates
        .on('idCheck.stepCompleted', (payload) => {
            console.log('stepCompleted', payload)
        })
        .on('idCheck.onError', (error) => {
            console.log('onError', error)
        })
        .build();

    // you are ready to go:
    // just launch the WebSDK by providing the container element for it
    snsWebSdkInstance.launch('#sumsub-websdk-container')
},

 async getNewAccessToken() {
    let externalUserId=encodeURIComponent('pratapmridha1@gmail.com') //'random-JSToken-5h83gk9'//"pratapmridha1@gmail.com"//'random-JSToken-' + Math.random().toString(36).substring(2, 9)
    let ttlInSecs=1200
    let method = 'POST';
    let levelName=this.data.slug
    console.log(externalUserId);
    let url =`/resources/accessTokens?userId=${externalUserId}&ttlInSecs=${ttlInSecs}&levelName=${levelName}`


    let ts= Math.floor(Date.now() / 1000);
    const signature = crypto.createHmac('sha256',  config.sumsub_secret_key);
   console.log(signature);
    signature.update(ts+method.toUpperCase()+url)
    console.log(ts+method.toUpperCase()+url);
    let sig=signature.digest('hex')
    let headers={
      'Accept': 'application/json',
      'X-App-Token': config.sumsub_app_token,
      'X-App-Access-Ts':ts,
      'X-App-Access-Sig':sig  ,
    
    }

    let resp=await fetch(config.sumsub_api_baseurl+url,{
      method:method,
      headers:headers,
      
    })

    console.log(await resp.json());

  return 5;
    //return Promise.resolve(newAccessToken)// get a new token from your backend
  }
}

};
</script>
