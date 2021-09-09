<template>
  <div>
    <Banner :eventName="eventData.projectName" 
    :themeColor="eventData.themeColor"
    :fontColor="eventData.fontColor"
    :fromDate="eventData.fromDate"
    :toDate="eventData.toDate"
     />

    <div class="content" v-if="isAuthenticated">
      <ul>
        <li v-for="eachAction in eventData.actions" :key="eachAction.id">
          <Action
            :actionType="eachAction.type"
            :title="eachAction.title"
            :score="eachAction.score"
          />
        </li>
      </ul>
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
    // https://stage.hypermine.in/whitelist/api/v1/project/solana-hack-test001?isPublic=true
    const projectSlug = "solana-hack-test001";
    let url = `${this.$config.studioServer.BASE_URL}api/v1/project/${projectSlug}?isPublic=true`;
    let headers = {
      "Content-Type": "application/json",
    };
    // const resp =  await apiClient.makeCall({ method: "GET", url: url, header: headers})

    // console.log(resp)

    this.eventData = {
      _id: "6130de1f0379c618867c3555",
      projectName: "Cred Credential Issuer",
      logoUrl:
        "http://fyre.hypersign.id/wp-content/uploads/elementor/thumbs/HF_SMall-pch5ehuxrejjgmsohg31856yer1edotxk6p6ly0fdi.png",
      fromDate: "2021-09-02T02:13:00.000Z",
      toDate: "2021-10-31T02:13:00.000Z",
      ownerDid: "did:hs:617e0a7d-6b24-471a-9637-6ff3d2aa3018",
      twitterHandle: "solana",
      telegramHandle: "solana",
      twitterPostFormat: "solana",
      projectStatus: true,
      telegramAnnouncementChannel: "",
      blockchainType: "ETHEREUM",
      themeColor: "#2b0a4e",
      fontColor: "#ffffff",
      slug: "solana-hack-test001",
      actions: [
        {
          id: 1,
          type: "INPUT_TEXT",
          title: "Enter your name",
          placeholder: "Vishwas Anand Bhushan",
          isManadatory: false,
          value: "",
          score: 20,
        },
        {
          id: 2,
          type: "INPUT_DATE",
          title: "Enter website url",
          placeholder: "https://hypersign.id",
          isManadatory: false,
          value: "",
          score: 30,
        },
      ],
      __v: 0,
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
