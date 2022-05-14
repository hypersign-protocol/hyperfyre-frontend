<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="px-0 font-12 line-h-15 white--text">
      <div class="d-flex align-center">
        <v-icon size="22" color="white" class="mr-2"> mdil-bell</v-icon>
        {{ data.title }}
      </div>
      <template v-slot:actions>
        <v-chip
          class="black--text font-weight-bold"
          color="green"
          small
          label
          @click="update()"
          v-if="!done"
        >
          {{ data.score }}
        </v-chip>
        <img src="@/assets/images/check.svg" v-if="done" />
      </template>
    </v-expansion-panel-header>
    <v-expansion-panel-content class="font-14 line-h-32 color-grey-100">
      <div class="d-flex flex-column align-center justify-space-around">
        <v-btn
          :ripple="false"
          class="btn-gradient-outline mb-2 height-35 letter-s-0 text-capitalize font-16 line-h-19 font-weight--medium white--text"
          depressed
          rounded
          x-large
          @click="getBrowserSubscription"
        >
          Subscribe
        </v-btn>

        <v-btn
          :ripple="false"
          text
          class="height-35 letter-s-0 text-capitalize font-16 line-h-19 font-weight--medium white--text"
          depressed
          rounded
          x-large
          v-if="!done"
          @click="update"
        >
          Continue
        </v-btn>
      </div>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>
<script>
import eventBus from "@/eventBus.js";
import { isValidURL, isEmpty } from "@/mixins/fieldValidationMixin";
import notificationMixins from "@/mixins/notificationMixins";
import Messages from "@/utils/messages/participants/en";
import config from "@/config";
export default {
  name: "PushNotification",
  props: {
    idValue: {
      required: true,
    },
    data: {
      required: true,
    },
  },
  data() {
    return {
      visible: false,
      done: this.data.isDone,
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
        this.$store.dispatch("snackbar/SHOW", {
          type: "error",
          message: Messages.EVENT_ACTIONS.INVALID_INPUT,
        });
      } else {
        this.data.value = "Subscribed";
        this.$emit("input", this.data.value);
      }
    },
    async update() {
      if (
        this.data.subObj !== undefined &&
        this.data.subscription !== undefined
      ) {
        this.data.value = "Notification Subscribed";
        this.$root.$emit("input", this.data.value);
      } else {
        this.$store.dispatch("snackbar/SHOW", {
          type: "error",
          message: Messages.EVENT_ACTIONS.SUBS.SUBS_NOTIFICATION,
        });
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
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
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
          this.$store.dispatch("snackbar/SHOW", {
            type: "success",
            message: "Notification Granted",
          });
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
                });

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

            this.$store.dispatch("snackbar/SHOW", {
              type: "success",
              message: "Registered",
            });
          } catch (error) {
            this.$store.dispatch("snackbar/SHOW", {
              type: "error",
              message: "Service worker registration failed",
            });
          }
        } else if (permission === "blocked" || permission === "denied") {
          this.$store.dispatch("snackbar/SHOW", {
            type: "error",
            message: "Notification Blocked",
          });
        }
      } else {
        this.$store.dispatch("snackbar/SHOW", {
          type: "error",
          message: "Notification Not Supported",
        });
      }
    },
  },
  mixins: [notificationMixins],
};
</script>
<style lang="css" scoped></style>
