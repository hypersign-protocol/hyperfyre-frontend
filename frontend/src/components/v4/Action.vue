<template>
  <div class="actioncontent">
    <h4>[Action Component]</h4>
    <p>
      <span>
        <label>{{ title }} : </label>
      </span>
      <span v-if="actionType === 'INPUT_TEXT'">
        <input type="text" :placeholder="placeHolder" v-model="value" :disabled="done"/>
      </span>
      <span v-if="actionType === 'INPUT_DATE'">
        <input
          type="datetime-local"
          :placeholder="placeHolder"
          v-model="value"
          :disabled="done"
        />
      </span>
      <span v-if="actionType === 'INPUT_NUMBER'">
        <input type="number" :placeholder="placeHolder" v-model="value" :disabled="done"/>
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
        <button
          v-else
          style="background: grey; color: white"
          disabled
        >
          <i class="far fa-check-circle"></i>
        </button>
      </span>
    </p>
  </div>
</template>

<script>
import apiClient from "../../mixins/apiClientMixin";
export default {
  props: {
    actionType: String,
    actionId: String,
    title: String,
    eventId: String,
    placeHolder: String,
    isMandatory: Boolean,
    value: String,
    score: Number,
  },
  data() {
    return {
      authToken: localStorage.getItem("authToken"),
      userData: {
        "ethAddress": "0x12312312312",
        "twitterHandle": "hermit123123",
        "telegramHandle": "hermitTg123",
        "projectId": "613b8476442d2d56fb0988fa",
        "tweetUrl": "https://asdad.com",
      },
      actions: [],
      done: false,
    }
  },
  methods:{
    async updateUserInfo(){
      //
      if(!this.value){
        return alert("Pls enter a valid input")
      }
      this.actions.push({
        actionId: this.actionId,
        value: this.value
      })

      this.userData.projectId = this.eventId
      const body = {
        ...this.userData,
        actions: this.actions
      }


      let url = `${this.$config.studioServer.BASE_URL}api/v1/investor/add`;
      let headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.authToken}`,
      };
      
      const resp =  await apiClient.makeCall({ method: "POST", url: url, body, header: headers})
      const { data } =  resp;
      console.log(resp.data);
      this.actions = [];

      if(data){
        const  { actions } = data;
        if(actions && actions.length > 0){  
            const action = actions.find(x => x._id == this.actionId);
          if( action != null || action != "undefined"){
            this.done = true
          } else {
            return alert("could not update the action")
          }
        } else {
          return alert("no actions found with user")
        }
      } else{
        return alert("some error occurred")
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
</style>
