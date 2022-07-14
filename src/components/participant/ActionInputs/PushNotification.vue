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
          <img src="../../../assets/ringing.png" height="25px" />
        </b-col>
        <b-col cols="9" sm="9" class="text-left" md="9">
          <div class="text text-capitalize">{{ data.title }}</div>
        </b-col>
        <b-col cols="2" sm="2" md="2">
          <b-badge class="btn-score" :style="buttonThemeCss" @click="update()" v-if="!done">
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
    <b-collapse :id="`collapse-${idValue}`" v-model="visible">
      <b-card-body class="user-details">
        <b-row>
          <b-col cols="12" sm="12" md="12">
            <div class="follow">
              <!-- <b-form-input
                type="text"
                :placeholder="data.placeHolder"
                v-model="data.value"
                :disabled="done"
                :required="data.isManadatory"
              ></b-form-input> -->
              <button
                :disabled="done"
                class="btn btn-outline-twitter text-black"
                @click="getBrowserSubscription()"
              >
                Subscribe
              </button>
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
import eventBus from "../../../eventBus.js";
import { isValidURL, isEmpty } from "../../../mixins/fieldValidationMixin";
import notificationMixins from "../../../mixins/notificationMixins";
import Messages from "../../../utils/messages/participants/en";
import config from "../../../config";
export default {
  name: "PushNotification",
  props: {
    idValue: {
      required: true,
    },
    data: {
      required: true,
    },
    authToken: {
      required: true
    },
    done: {
      required: true,
    }
  },
computed:{
 buttonThemeCss() {
      return {
        '--button-bg-color': config.app.buttonBgColor,
        '--button-text-color':config.app.buttonTextColor
      }
     }
  },
  data() {
    return {
      visible: false,
    };
  },
  mounted() {
    
    if (this.$route.query) {
      if (this.$route.query.subsId === localStorage.getItem("subsId")) {
        this.data.value = "Subscribed";
        this.giveScore();
      }
    }

    eventBus.$on(`disableInput${this.data._id}`, this.disableInput);
  },
  methods: {
    async giveScore() {
      if (!this.isFieldValid()) {
        this.data.subObj = "";
        return this.notifyErr(Messages.EVENT_ACTIONS.INVALID_INPUT);
      } else {
        this.data.value="Subscribed"
        this.$emit("input", this.data.value);
      }
    },
    async update() {
      // if(localStorage.getItem("subsId")!==undefined){
      // const response = await fetch(
      //   config.studioServer.BASE_URL + "api/v1/push/verifyNotification",
      //   {
      //     method: "post",
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      //     },
      //     body: JSON.stringify({
      //       subObj: this.data.subObj,
      //       id: this.data.subscription._id,
      //       url: location.href,
      //     }),
      //   }
      // );
      // return response.json();
      if(this.data.subObj !==undefined && this.data.subscription!==undefined){
        this.data.value="Notification Subscribed"
         this.$emit("input", this.data.value);
      }else{
        this.notifyErr(Messages.EVENT_ACTIONS.SUBS.SUBS_NOTIFICATION)
      }
      
    },
    isFieldValid() {
      if (isEmpty(this.data.value)) {
        return false;
      }
      if (isValidURL(this.data.value)) {
        return false;
      }
      return true;
    },
    disableInput(data) {
      this.done = data;
    },

    async saveSubscription(subscription) {
      const response = await fetch(
        config.studioServer.BASE_URL + "api/v1/notification/push/subscribe",
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.authToken}`,
          },
          body: JSON.stringify({ subObj: subscription }),
        }
      );
      return response.json();
    },
    urlB64ToUint8Array(base64String) {
      const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
      const base64 = (base64String + padding)
        // eslint-disable-next-line no-useless-escape
        .replace(/\-/g, "+")
        .replace(/_/g, "/");
      const rawData = atob(base64);
      const outputArray = new Uint8Array(rawData.length);
      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
    },

    async getBrowserSubscription() {
      if ("Notification" in window && navigator.serviceWorker) {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          this.notifySuccess("Notification Granted");
          try {
            try {
               const brave = await navigator.brave.isBrave();
            if (brave) {
              alert(
                "Brave browser Detected User Google Service to Enable Push brave://settings/privacy"
              );
            }
            } catch (error) {
             console.log("Not Brave");
            }
           
            await navigator.serviceWorker
              .register(`/service-worker.js`, { scope: "/" })
              .then(async () => {
                return await navigator.serviceWorker.ready;
              })
              .then(async (reg) => {
                const applicationServerKey = await this.urlB64ToUint8Array(
                  config.webpush_public_key
                );
                reg.addEventListener("updatefound", () => {
                  reg.update();
                })
                

                reg.pushManager
                  .subscribe({ applicationServerKey, userVisibleOnly: true })
                  .then(async (e) => {
                    // console.log(JSON.stringify(e));

                    this.data.subObj = e;
                    this.data.subscription = await this.saveSubscription(e);
                   // console.log(e);
                    localStorage.setItem("subsId", this.data.subscription._id);
                  });
              });

            await this.notifySuccess("Registerd");
          } catch (error) {
           // console.log(error);
            return this.notifyErr("Service Worker Registration Faild");
          }
        } else if (permission === "blocked" || permission === "denied") {
          return this.notifyErr("Notification Blocked");
        }
      } else {
        return this.notifyErr("Notification Not Supported");
      }
    },
  },
  mixins: [notificationMixins],
};
</script>
