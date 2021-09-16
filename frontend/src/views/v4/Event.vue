<template>
  <div>
    <h2>{{eventData.projectName}}</h2>
    <Metrics
      :userScore="userEventData && userEventData.numberOfReferals? userEventData.numberOfReferals : 0"
      :totalEntries="userEventData && userEventData.count ? userEventData.count : 0"
      :timeLeft="timeLeft"
      class="metric"
     />
    <Banner :eventName="eventData.projectName" 
    :themeColor="eventData.themeColor"
    :fontColor="eventData.fontColor"
    :fromDate="new Date(eventData.fromDate).toLocaleString()"
    :toDate="new Date(eventData.toDate).toLocaleString()"
     />

    <div class="content" v-if="authToken != '' && authToken != null">
      <div v-for="eachAction in eventActionsToShow" :key="eachAction._id">
          <Action
            :actionType="eachAction.type"
            :actionId="eachAction._id"
            :placeHolder="eachAction.title"
            :eventId="eachAction.eventId"
            :title="eachAction.title"
            :score="eachAction.score"
            :isDone="eachAction.isDone"
            :value="eachAction.value"
            @UserUpdateEvent="updateUserData"
          />
      </div>
    </div>

    <div class="content" v-else>
      <Login 
        :themeColor="eventData.themeColor" 
        :fontColor="eventData.fontColor" 
        @AuthTokenUpdateEvent="updateAuthentication"
      />
    </div>

  </div>
</template>

<script>
import Banner from "../../components/v4/Banner.vue";
import Login from "../../components/v4/Login.vue";
import Action from "../../components/v4/Action.vue";
import Metrics from "../../components/v4/Metrics.vue";
import apiClient from "../../mixins/apiClientMixin";

export default {
  name: "Test",
  components: {
    Banner,
    Login,
    Action,
    Metrics
  },
  data() {
    return {
      eventData : {},
      actions: [],
      authToken: "",
      userEventData:  null,
      userAuthData: null,
      eventActionsToShow: [],
      eventSlug: "",
    }
  },
  computed:{
    timeLeft: function () {
      if(this.eventData.fromDate){
        
        const toDateParse = new Date(this.eventData.toDate)
        const fromDateParse = new Date(new Date().toISOString()) // now
        
        return Math.ceil((toDateParse - fromDateParse ) /  (1000 * 60 * 60 * 24))
      }
    }
  },
  async created() {
    this.authToken = localStorage.getItem("authToken");
    const userDetail = localStorage.getItem("user")
    if(userDetail){
      this.userAuthData = JSON.parse(userDetail)  
    }else{
      console.log(userDetail)
      console.log("CREATED():: fetching userDetail")
      await this.fetchUserDetails();
    }

    if(this.$route.params["slug"]){
      this.eventSlug = this.$route.params["slug"];
      console.log(this.eventSlug)
      await this.fetchEventData(); 
      await this.fetchUserInfoOnLogin();
    }

    
  },
  async updated(){
    
  },
  methods: {

    async updateAuthentication(authToken){
      console.log('Authtoke event recieved authToken =' + authToken)
      this.authToken = authToken;
      await this.fetchUserDetails();
      this.fetchUserInfoOnLogin();

    },

    async fetchUserDetails(){
      if(this.authToken){

        const url = `${this.$config.studioServer.BASE_URL}hs/api/v2/auth/protected`;
        console.log(url)
        let headers = {
            Authorization: `Bearer ${this.authToken}`,
        }
        const res = await apiClient.makeCall({
            url,
            body: {},
            header: headers,
            method: "POST",
          });

          console.log(res)

          if(res && res.data){
            this.userAuthData = {
              ...res.data.message
            }
            localStorage.setItem("user", JSON.stringify(this.userAuthData));
          }else{
            console.log("Invlaid resposen")
          }
      }else{
        console.log("fetchUserDetails() :  No authToken")
      }
    },
    async fetchEventData(){
      if(this.eventSlug && this.eventSlug != ""){
        // https://stage.hypermine.in/whitelist/api/v1/project/custom-input-type--001?isPublic=true
        //"custom-input-type-002"; // take slug from url
        let url = `${this.$config.studioServer.BASE_URL}api/v1/project/${this.eventSlug}?isPublic=true`;
        let headers = {
          "Content-Type": "application/json",
        };
        const resp =  await apiClient.makeCall({ method: "GET", url: url, header: headers})

        this.eventData = {
          ...resp.data
        }
      }else{
        alert("Invalid project slug")
      }
        
    },
    async fetchUserInfoOnLogin(){
      if(this.authToken != "" && this.authToken && this.userAuthData.email){
        const url = `${this.$config.studioServer.BASE_URL}api/v1/investor?email=${this.userAuthData.email}&projectId=${this.eventData._id}`;
        let headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.authToken}`,
        }

        const res = await apiClient.makeCall({
          url,
          header: headers,
          method: "GET",
        })

        this.userEventData = {
          ...res.data[0]
        }


        const eventActions  =  this.eventData.actions;
        

        if(this.userEventData.actions && this.userEventData.actions.length > 0 ){
          this.eventActionsToShow = eventActions.map(ea => {
          const doneAction = this.userEventData.actions.find(ua =>  ua._id == ea._id)
          if(doneAction){
            ea["isDone"] =  true
            ea.value = doneAction.value
          }else{
            ea["isDone"] = false
          }
          return ea
          })

        }else{
          this.eventActionsToShow = eventActions
        }
      }  
    },
    updateUserData(userEventData){
      console.log("Update User data event  received")
      if(userEventData){
        this.userEventData = {
          ...userEventData
        }
      }
    }

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

.metric{
  margin-left: 783px;

  margin-bottom: 120px;
}
</style>
