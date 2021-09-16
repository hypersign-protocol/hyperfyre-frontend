<template>
  <div class="actioncontent">
    <h4>{{ title }}</h4>
    <p>
      <span v-if="actionType ===  eventActionType.TWITTER_FOLLOW">
        <!-- <i class="fab fa-twitter"></i> -->
        <b-button
          size="sm"
          class="btn-twitter twitter"
          @click="
            handleTwitterLogin(
              'https://twitter.com/' + value + '?ref_src=twsrc%5Etfw'
            )
          "
          :disabled="done"
        >
          <i class="fab fa-twitter"></i>
          Follow @{{ twitter.sourceScreenName }}
        </b-button>
      </span>

      <span v-if="actionType === eventActionType.TWITTER_RETWEET">
        <!-- <i class="fab fa-twitter"></i> -->
        <b-button
          size="sm"
          class="btn-twitter twitter"
          @click="
            handleTwitterLogin('https://twitter.com/intent/tweet?text=' + value)
          "
          :disabled="done"
        >
          <i class="fab fa-twitter"></i> Retweet
        </b-button>

        <input placeholder="Paset your re-tweet url" v-model="val" type="url" :disabled="done" />
      </span>

      <span  v-if="actionType === eventActionType.TELEGRAM_JOIN">
        <b-button 
          size="sm" 
          class="btn-twitter telegram" 
          @click="handleTelegramLogin(`https://t.me/${value}`)"
        >
          <i class="fab fa-telegram-plane"></i> Join @ {{value}}
        </b-button>
      </span>

      <span v-if="actionType === eventActionType.INPUT_TEXT">
        <input
          type="text"
          :placeholder="placeHolder"
          v-model="val"
          :disabled="done"
        />
      </span>
      <span v-if="actionType === eventActionType.INPUT_DATE">
        <input
          type="datetime-local"
          :placeholder="placeHolder"
          v-model="val"
          :disabled="done"
        />
      </span>
      <span v-if="actionType === eventActionType.INPUT_NUMBER">
        <input
          type="number"
          :placeholder="placeHolder"
          v-model="val"
          :disabled="done"
        />
      </span>

      <span>
        <button
          style="background: green; color: white"
          @click="updateUserInfo()"
          title="click to accept"
          v-if="!done"
        >
          + {{ score }}
        </button>
        <button v-else style="background: grey; color: white" disabled>
          <i class="far fa-check-circle"></i>
        </button>
      </span>
    </p>
  </div>
</template>

<script>
import apiClient from "../../mixins/apiClientMixin";
import webAuth from "../../mixins/twitterLogin";
import config from "../../config";
export default {
  props: {
    actionType: String,
    actionId: String,
    title: String,
    eventId: String,
    placeHolder: String,
    isMandatory: Boolean,
    score: Number,
    isDone: Boolean,
    value: String,
  },
  data() {
    return {
      authToken: localStorage.getItem("authToken"),
      userData: {
        ethAddress: "0x12312312312",
        twitterHandle: "hermit123123",
        telegramHandle: "hermitTg123",
        projectId: "613b8476442d2d56fb0988fa",
        tweetUrl: "https://asdad.com",
      },
      actions: [],
      twitter: {
        sourceScreenName: this.value,
        targetScreenName: "",
      },
      val: this.value,
      done: this.isDone,
      eventActionType: {
        ...config.eventActionType   
      }
    };
  },
  methods: {
    async updateUserInfo() {
      //
      try {
        if (!this.val) {
          return alert("Error: Pls enter a valid input");
        }

        if (this.actionType === this.eventActionType.TWITTER_FOLLOW) {
          if (!(await this.hasFollowedTwitter())) {
            return alert("Error: Please follow first");
          } else {
            this.val = this.twitter.targetScreenName;
          }
        }

        if (this.actionType === this.eventActionType.TWITTER_RETWEET) {
          if (!(await this.hasRetweeted())) {
            return alert("Error: Invalid retweet");
          } else {

          }
        }

        if(this.actionType === this.eventActionType.TELEGRAM_JOIN){
          if(!localStorage.getItem("telegamId")){
            return alert("Error: Please authorize telegram to proceed")
          } else {
            this.val = localStorage.getItem("telegamId");
          }
        }

        this.actions.push({
          actionId: this.actionId,
          value: this.val,
        });

        this.userData.projectId = this.eventId;
        const body = {
          ...this.userData,
          actions: this.actions,
        };

        let url = `${this.$config.studioServer.BASE_URL}api/v1/investor/add`;
        let headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.authToken}`,
        };

        const resp = await apiClient.makeCall({
          method: "POST",
          url: url,
          body,
          header: headers,
        });
        const { data } = resp;
        console.log(resp.data);
        this.actions = [];

        if (data) {
          const { actions } = data;
          if (actions && actions.length > 0) {
            const action = actions.find((x) => x._id == this.actionId);
            if (action != null || action != "undefined") {
              this.done = true;
              console.log("Update User data event  emit");
              this.$emit("UserUpdateEvent", resp.data);
            } else {
              return alert("Error: could not update the action");
            }
          } else {
            return alert("Error: no actions found with user");
          }
        } else {
          return alert("Error: some error occurred");
        }
      } catch (e) {
        console.log(e);
      }
    },

    async getTwitterScreenName(twitterId) {
      try {
        if (twitterId) {
          
          let url = `${this.$config.studioServer.BASE_URL}api/v1/twitter/user/${twitterId}`;
          let headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.authToken}`,
          };

          const resp = await apiClient.makeCall({
            method: "GET",
            url: url,
            body: {},
            header: headers,
          });

          const { screen_name } = resp.data;

          console.log(screen_name);
          // localStorage.setItem("twitterHandle", screen_name);

          return screen_name;
        } else {

          return null;
        }
      } catch (e) {
        console.log(e);
      }
    },

    async hasRetweeted() {
      try {
        const twitterId = localStorage.getItem('twitterId')
        if (twitterId) {
          let url = `${this.$config.studioServer.BASE_URL}api/v1/twitter/verify`;
          let headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.authToken}`,
          };

          const body = {
            tweetUrl: this.val,
            userId: twitterId,
            tweetText: this.value,
            needUserDetails: false,
            checkIfFollowed: false,
            sourceScreenName: "",
          };

          const resp = await apiClient.makeCall({
            method: "POST",
            url: url,
            body,
            header: headers,
          });

          if (resp.data.hasTweetUrlVerified) {
            return true;
          } else {
            alert(resp.data.error);
            return false;
          }
        }
      } catch (e) {
        console.log(e);
        return false;
      }
    },

    async hasFollowedTwitter() {
      try {
        const twitterId= localStorage.getItem('twitterId');

        this.twitter.targetScreenName = await this.getTwitterScreenName(
          twitterId
        );


        if (
          this.twitter.sourceScreenName && 
          this.twitter.targetScreenName &&
          this.twitter.sourceScreenName != "" &&
          this.twitter.targetScreenName != ""
        ) {
          let url = `${this.$config.studioServer.BASE_URL}api/v1/twitter/follower`;
          let headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.authToken}`,
          };

          const resp = await apiClient.makeCall({
            method: "POST",
            url: url,
            body: this.twitter,
            header: headers,
          });

          return resp.data;
        } else {
          console.log("Source or target twitter screen name is  blank");
          return false;
        }
      } catch (e) {
        console.log(e);
        return false;
      }
    },

    handleTwitterLogin(urlToRedirect) {
      try {
        if (!localStorage.getItem('twitterId')) {
          
          webAuth.popup.authorize(
            {
              connection: "twitter",
              owp: true,
            },
            (err, authRes) => {
              if (!err) {
                webAuth.client.userInfo(
                  authRes.accessToken,
                  async (err, user) => {
                    if (err) {
                      return alert("Something Went Wrong");
                    }

                    console.log(user);

                    const twitterId = user.sub.split("|")[1];
                    localStorage.setItem("twitterId", twitterId);

                    window.open(urlToRedirect, "_blank");
                  }
                );
              }
            }
          );
        } else {
          window.open(urlToRedirect, "_blank");
          // this.twitter.targetScreenName = localStorage.getItem("twitterHandle")
        }
      } catch (e) {
        console.log(e);
      }
    },

    handleTelegramLogin(urlToRedirect){
        if(!localStorage.getItem("telegamId")){

          window.Telegram.Login.auth(
            { bot_id: config.telegramBotId, request_access: true },
            (data) => {

              if (!data) {
                return alert("Authentication Failed! Try again")
              }

              this.stepOneData.rules[idx].checked = true;
                localStorage.setItem("telegramId", data.username)
                window.open(urlToRedirect, "_blank");
            }
          );

      } else{
        window.open(urlToRedirect, "_blank");
      }
    }
  }
};
</script>

<style scoped>
.actioncontent {
  margin-top: 20px;
  padding: 2px;
  min-width: 500px;
  height: 150px;
  background: rgb(234, 241, 212);
  border-radius: 20px;
}

.twitter {
  color: rgb(255, 255, 255);
  background-color: rgb(29, 161, 242);
}
.telegram {
  color: rgb(255, 255, 255);
  background-color: rgb(0, 136, 204);
}
</style>
