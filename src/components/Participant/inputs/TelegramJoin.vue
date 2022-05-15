<template>
  <v-expansion-panel>
    <v-expansion-panel-header
      class="px-0 font-14 line-h-17 white--text font-weight--medium"
    >
      <div class="d-flex align-center">
        <img src="@/assets/images/telegram.png" class="mr-2" height="22" />
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
          +{{ data.score }}
        </v-chip>
        <img src="@/assets/images/check.svg" v-if="done" />
      </template>
    </v-expansion-panel-header>
    <v-expansion-panel-content class="font-14 line-h-32 color-grey-100">
      <div class="d-flex flex-column align-center justify-center">
        <v-btn
          :disabled="done"
          @click="handleTelegramLogin(`https://telegram.me/${data.value}`)"
          :ripple="false"
          class="border-r-3 height-35 letter-s-0 text-capitalize font-16 line-h-19 font-weight--medium"
          depressed
          outlined
          color="#229ED9"
          rounded
          x-large
        >
          <img src="@/assets/images/telegram.png" class="mr-2" height="22" />
          Join @{{ tg.sourceScreenName }}
        </v-btn>

        <v-btn
          v-if="!done"
          @click="update"
          :ripple="false"
          text
          class="height-35 letter-s-0 text-capitalize font-16 line-h-19 font-weight--medium white--text"
          depressed
          rounded
          x-large
        >
          Continue
        </v-btn>
      </div>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>
<script>
import config from "@/config";
import eventBus from "@/eventBus.js";
import notificationMixins from "@/mixins/notificationMixins";
import Messages from "@/utils/messages/participants/en";
import apiClient from "@/mixins/apiClientMixin.js";

export default {
  name: "TelegramJoin",
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
      tg: {
        sourceScreenName: "",
        targetScreenName: "",
      },
      tgdata: {
        userID: "",
      },
      authToken: localStorage.getItem("authToken"),
    };
  },
  async mounted() {
    try {
      if (this.data.value) {
        const tg = JSON.parse(this.data.value);
        this.tg = { ...tg };
      }
    } catch (e) {
      this.tg.sourceScreenName = this.data.value;
    }

    eventBus.$on(`disableInput${this.data._id}`, this.disableInput);
  },
  methods: {
    async update() {
      const tgIdInStore = this.tg.targetScreenName; //localStorage.getItem("telegramId");
      if (!tgIdInStore || tgIdInStore == "undefined" || tgIdInStore == null) {
        this.$store.dispatch("snackbar/SHOW", {
          type: "error",
          message: Messages.EVENT_ACTIONS.TELEGRAM_JOIN.TELEGRAM_AUTH,
        });
      } else {
        try {
          const body = {
            tgUserID: this.tgdata.userID,
            tgGroupID: "@" + this.tg.sourceScreenName,
          };
          let url = `${this.$config.studioServer.BASE_URL}api/v1/tg/verify`;
          let headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.authToken}`,
          };
          const res = await apiClient.makeCall({
            method: "POST",
            url: url,
            body: body,
            header: headers,
          });

          const result = res.data;
          if (res.status === 200) {
            if (result.status === "left") {
              this.$store.dispatch("snackbar/SHOW", {
                type: "error",
                message: Messages.EVENT_ACTIONS.TELEGRAM_JOIN.JOIN_TG,
              });
            } else {
              this.$emit("input", JSON.stringify({ ...this.tg }));
            }
          }
        } catch (error) {
          this.$store.dispatch("snackbar/SHOW", {
            type: "error",
            message: error.split(":").at(-1),
          });
        }

        // this.tg.targetScreenName = tgIdInStore;
        /* this.$emit(
          "input",
          JSON.stringify({
            ...this.tg,
          })
        );*/
      }
    },
    disableInput(data) {
      this.done = data;
    },
    handleTelegramLogin(urlToRedirect) {
      try {
        /// Commenting this condition out to make user authenticate eveything he presses on Join telegram
        /// Because of this check a user can just add any random value in the localstorage
        /// and by pass the telegram authentication. See this bug https://github.com/hypersign-protocol/whitelisting/issues/338

        // if (!localStorage.getItem("telegramId")) {
        // const that =  this;
        window.Telegram.Login.auth(
          { bot_id: config.telegramBotId, request_access: true },
          (data) => {
            if (!data) {
              this.$store.dispatch("snackbar/SHOW", {
                type: "error",
                message: Messages.EVENT_ACTIONS.TELEGRAM_JOIN.AUTH_FAILED,
              });
            }

            if (data.username || data.id) {
              this.tg.targetScreenName = data.username || data.id;
              this.tgdata.userID = data.id;
              // localStorage.setItem("telegramId", data.username || data.id)
              window.open(urlToRedirect, "_blank");
            } else {
              this.$store.dispatch("snackbar/SHOW", {
                type: "error",
                message:
                  Messages.EVENT_ACTIONS.TELEGRAM_JOIN.FETCH_USERNAME_FAILED,
              });
            }
          }
        );

        // } else {
        //  window.open(urlToRedirect, "_blank");
        // }
      } catch (e) {
        this.$store.dispatch("snackbar/SHOW", {
          type: "error",
          message: Messages.EVENT_ACTIONS.ERROR + e.message,
        });
      }
    },
  },
  mixins: [notificationMixins],
};
</script>
