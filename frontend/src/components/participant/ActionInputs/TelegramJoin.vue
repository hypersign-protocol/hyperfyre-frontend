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
          <img src="../../../assets/telegram.svg" height="25px" />
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
    <b-collapse :id="`collapse-${idValue}`" v-model="visible">
      <b-card-body class="user-details">
        <b-row>
          <b-col cols="12" sm="12" md="12">
            <div class="follow">
              <button
                :disabled="done"
                @click="
                  handleTelegramLogin(`https://telegram.me/${data.value}`)
                "
                class="btn btn-outline-telegram"
              >
                <img src="../../../assets/telegram.svg" />
                Join @{{ tg.sourceScreenName }}
              </button>
            </div>
          </b-col>
        </b-row>
      </b-card-body>
    </b-collapse>
  </b-card>
</template>
<script>
import config from "../../../config";
import eventBus from "../../../eventBus.js";
import notificationMixins from "../../../mixins/notificationMixins";
import Messages from "../../../utils/messages/participants/en";
import apiClient from "../../../mixins/apiClientMixin.js";

export default {
  name: "TwitterRetweet",
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
      tgdata:{
        userID:"",
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
        return this.notifyErr(
          Messages.EVENT_ACTIONS.TELEGRAM_JOIN.TELEGRAM_AUTH
        );
      } else {
        try {
          const body = {
                tgUserID: this.tgdata.userID,
                tgGroupID: '@'+this.tg.sourceScreenName,                
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
              if(res.status===200){
                if(result.status==='left'){
                  return this.notifyErr(Messages.EVENT_ACTIONS.TELEGRAM_JOIN.JOIN_TG)
                }else{
                  this.$emit("input",JSON.stringify({...this.tg,}))
                }
              }
        } catch (error) {
           return this.notifyErr(Messages.EVENT_ACTIONS.TELEGRAM_JOIN.ASK_ADMIN_TO_SET_GROUPID)
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
              return this.notifyErr(
                Messages.EVENT_ACTIONS.TELEGRAM_JOIN.AUTH_FAILED
              );
            }

            if (data.username || data.id) {
              this.tg.targetScreenName = data.username || data.id;
                this.tgdata.userID=data.id;
              // localStorage.setItem("telegramId", data.username || data.id)
              window.open(urlToRedirect, "_blank");
            } else {
              return this.notifyErr(
                Messages.EVENT_ACTIONS.TELEGRAM_JOIN.FETCH_USERNAME_FAILED
              );
            }
          }
        );

        // } else {
        // 	window.open(urlToRedirect, "_blank");
        // }
      } catch (e) {
        this.notifyErr(Messages.EVENT_ACTIONS.ERROR + e.message);
      }
    },
  },
  mixins: [notificationMixins],
};
</script>
