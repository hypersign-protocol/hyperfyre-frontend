<template>
  <div>
    <h2>{{eventData.projectName}}</h2>
    <Banner :eventName="eventData.projectName" 
    :themeColor="eventData.themeColor"
    :fontColor="eventData.fontColor"
    :fromDate="eventData.fromDate"
    :toDate="eventData.toDate"
     />

    <div class="content" v-if="isAuthenticated">
      <div v-for="eachAction in eventData.actions" :key="eachAction._id">
          <Action
            :actionType="eachAction.type"
            :actionId="eachAction._id"
            :placeHolder="eachAction.title"
            :eventId="eachAction.eventId"
            :title="eachAction.title"
            :score="eachAction.score"
          />
      </div>
    </div>

    <div class="content" v-else>
      <Login 
        :themeColor="eventData.themeColor" 
        :fontColor="eventData.fontColor" 
        @AuthDataReceieved="getAuthData"
      />
    </div>

  </div>
</template>

<script>
import Banner from "../../components/v4/Banner.vue";
import Login from "../../components/v4/Login.vue";
import Action from "../../components/v4/Action.vue";
import apiClient from "../../mixins/apiClientMixin";

export default {
  name: "Test",
  components: {
    Banner,
    Login,
    Action,
  },
  data() {
    return {
      isAuthenticated: false,
      eventData : {},
      actions: []
    };
  },
  async created() {

    // https://stage.hypermine.in/whitelist/api/v1/project/custom-input-type--001?isPublic=true
    const projectSlug = "custom-input-type--001"; // take slug from url
    let url = `${this.$config.studioServer.BASE_URL}api/v1/project/${projectSlug}?isPublic=true`;
    let headers = {
      "Content-Type": "application/json",
    };
    const resp =  await apiClient.makeCall({ method: "GET", url: url, header: headers})

    this.eventData = {
      ...resp.data
    }

  },
  methods: {
    getItemClick(item) {
      this.itemClicked = item;
    },
    getAuthData(authorizationToken) {
      console.log("Receiving auth token event")
      if (authorizationToken && authorizationToken != "") {

        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
    },
  },
};
</script>

<style scoped>
.content {
  margin-top: 20px;
  padding: 2px;
  min-width: 650px;
  height: 500px;
  margin-left: 35%;
  margin-right: 30%;
  max-height: 700px;
  overflow-y: auto;
  background: rgb(204, 203, 203);
  border-radius: 20px;
}

.QRRefresh{
  width:100%; 
  align-content:center; 
  height:100%; 
  cursor: pointer;
  margin-top: 14%;
}
</style>
