<template>
  <div class="overview__wrap">
    <p class="white--text mt-24 font-20 font-weight-medium line-h-24">
      {{ greeting }}, {{ user.name }},
      <span
        v-if="
          accessUser && accessUser.adminName && accessUser.adminName !== 'Self'
        "
        >you have logged in as {{ accessUser.adminName }} !
      </span>
    </p>
    <campaign-stats></campaign-stats>
    <subscription-stats></subscription-stats>
    <p class="color-grey-100 mt-40 font-14 font-weight-bold line-h-17">
      Featured Campaign
    </p>
    <v-row
      class="ma-0 pa-24 bg-blue-100 border-r-8 featured--campaign cursor-pointer"
      @click="$router.push({ path: '/task-view' })"
    >
      <v-col cols="12" md="6">
        <div class="bg-yellow-100 py-58 px-120 border-r-4">
          <div class="d-flex align-center justify-center">
            <img src="@/assets/images/a-icon.svg" />
            <p class="ml-4 mb-0 white--text font-32 line-h-38 font-weight-bold">
              Awesome
            </p>
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="6">
        <div class="max-width-250">
          <div class="profile-icon width-47 height-47 bg-blue-200 border-r-50">
            <span class="white--text">D</span>
          </div>
          <div class="white--text mt-4 font-14 line-h-22 font-weight-bold">
            Demo Giveaway
          </div>
          <div
            class="color-grey-300 mt-4 font-12 line-h-14 font-weight-regular"
          >
            December 01, 2021, 4:20AM to 4:20PM EST
          </div>
          <div class="white--text font-14 line-h-22 mt-20">
            You have 0 Points
          </div>
        </div>
      </v-col>
    </v-row>
    <campaignList></campaignList>
    <v-divider class="bg-blue-300 mt-70"></v-divider>
    <p class="white--text font-16 line-h-19 font-weight-bold mt-25">
      Stats of Solawind (@solawind)
    </p>
    <div class="d-flex align-center justify-space-between mt-33">
      <div class="d-flex align-center">
        <span class="white--text font-14 font-weight-regular line-h-17"
          >Twitter</span
        >
        <span
          class="font-14 font-weight-regular line-h-17 color-primary-100 mx-2"
        >
          |
        </span>
        <span class="font-14 font-weight-regular line-h-17 color-primary-100"
          >Facebook</span
        >
      </div>
      <div class="d-flex align-center">
        <span class="white--text font-14 font-weight-regular line-h-17"
          >1M</span
        >
        <span
          class="font-14 font-weight-regular line-h-17 color-primary-100 mx-2"
        >
          |
        </span>
        <span class="font-14 font-weight-regular line-h-17 color-primary-100"
          >3M</span
        >
        <span
          class="font-14 font-weight-regular line-h-17 color-primary-100 mx-2"
        >
          |
        </span>
        <span class="font-14 font-weight-regular line-h-17 color-primary-100"
          >6M</span
        >
        <span
          class="font-14 font-weight-regular line-h-17 color-primary-100 mx-2"
        >
          |
        </span>
        <span class="font-14 font-weight-regular line-h-17 color-primary-100"
          >YTD</span
        >
        <span
          class="font-14 font-weight-regular line-h-17 color-primary-100 mx-2"
        >
          |
        </span>
        <span class="font-14 font-weight-regular line-h-17 color-primary-100"
          >ALL</span
        >
      </div>
    </div>
    <v-row class="mt-34">
      <v-col cols="12" md="3">
        <div class="d-flex flex-column">
          <p class="font-14 line-h-17 font-weight-medium color-grey-100">
            Engagement Rate
          </p>
          <div class="d-flex flex-column stat-card border-r-4 pa-3">
            <p class="white--text font-20 line-h-24 font-weight-bold">0.5</p>
            <img src="@/assets/images/stat01.png" class="ma-auto" />
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="3">
        <div class="d-flex flex-column">
          <p class="font-14 line-h-17 font-weight-medium color-grey-100">
            Retweets
          </p>
          <div class="d-flex flex-column stat-card border-r-4 pa-3">
            <p class="white--text font-20 line-h-24 font-weight-bold">420</p>
            <img src="@/assets/images/stat01.png" class="ma-auto" />
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="3">
        <div class="d-flex flex-column">
          <p class="font-14 line-h-17 font-weight-medium color-grey-100">
            Likes
          </p>
          <div class="d-flex flex-column stat-card border-r-4 pa-3">
            <p class="white--text font-20 line-h-24 font-weight-bold">308</p>
            <img src="@/assets/images/stat01.png" class="ma-auto" />
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="3">
        <div class="d-flex flex-column">
          <p class="font-14 line-h-17 font-weight-medium color-grey-100">
            Clicks
          </p>
          <div class="d-flex flex-column stat-card border-r-4 pa-3">
            <p class="white--text font-20 line-h-24 font-weight-bold">1,204</p>
            <img src="@/assets/images/stat01.png" class="ma-auto" />
          </div>
        </div>
      </v-col>
    </v-row>
    <p class="font-14 line-h-17 font-weight-medium color-grey-100 mt-47">
      Feed
    </p>
    <v-row>
      <v-col cols="12" md="4">
        <div class="tweet-card">
          <v-icon color="#34A5E4" class="float-right mt-n3">mdi-twitter</v-icon>
          <p class="white--text font-16 line-h-19 font-weight-bold">
            Solawind Fan (cryptosol1)
          </p>
          <p class="font-16 line-h-19 font-weight-regular color-grey-400">
            Loving the @solawind crypto! this is going to be huge! I am going
            all in!!!
          </p>
          <p class="font-16 line-h-19 font-weight-regular color-grey-400">
            Highly recommended for everyone! DYOR > Invest!
          </p>
        </div>
      </v-col>
      <v-col cols="12" md="4">
        <div class="tweet-card">
          <v-icon color="#34A5E4" class="float-right mt-n3">mdi-twitter</v-icon>
          <p class="white--text font-16 line-h-19 font-weight-bold">
            Tony Hawkins (solawind2)
          </p>
          <p class="font-16 line-h-19 font-weight-regular color-grey-400">
            Bacon ipsum dolor amet pork belly kielbasa shankle, ground round
            flank ball tip jerky frankfurter.
          </p>
          <p class="font-16 line-h-19 font-weight-regular color-grey-400">
            Cow tongue hamburger shankle venison chislic sausage burgdoggen
            jerky tri-tip buffalo beef ribs bacon shoulder. @solawind
          </p>
        </div>
      </v-col>
      <v-col cols="12" md="4">
        <div class="tweet-card">
          <v-icon color="#34A5E4" class="float-right mt-n3">mdi-twitter</v-icon>
          <p class="white--text font-16 line-h-19 font-weight-bold">
            Albert Einsteam (yeahboy)
          </p>
          <p class="font-16 line-h-19 font-weight-regular color-grey-400">
            Bacon ipsum dolor amet pork belly kielbasa shankle, ground round
            flank ball tip jerky frankfurter.
          </p>
        </div>
      </v-col>
      <v-col cols="12" md="4">
        <div class="tweet-card">
          <v-icon color="#34A5E4" class="float-right mt-n3">mdi-twitter</v-icon>
          <p class="white--text font-16 line-h-19 font-weight-bold">
            Islandboy (islandboy)
          </p>
          <p class="font-16 line-h-19 font-weight-regular color-grey-400">
            Pastrami beef ribs burgdoggen, rump meatball ground round biltong
            corned beef flank. Brisket buffalo pastrami,
          </p>
          <p class="font-16 line-h-19 font-weight-regular color-grey-400">
            #solawind @solawind
          </p>
          <p class="font-16 line-h-19 font-weight-regular color-grey-400">
            andouille pig spare ribs venison beef meatloaf. Jowl burgdoggen
            pancetta bacon short ribs.
          </p>
        </div>
      </v-col>
      <v-col cols="12" md="4">
        <div class="tweet-card">
          <v-icon color="#34A5E4" class="float-right mt-n3">mdi-twitter</v-icon>
          <p class="white--text font-16 line-h-19 font-weight-bold">
            Saltbae (Tian2)
          </p>
          <p class="font-16 line-h-19 font-weight-regular color-grey-400">
            Andouille pig spare ribs venison beef meatloaf. Jowl burgdoggen
            pancetta bacon short ribs.
          </p>
          <p class="font-16 line-h-19 font-weight-regular color-grey-400">
            #crypto #sol #solawin
          </p>
        </div>
      </v-col>
      <v-col cols="12" md="4">
        <div class="tweet-card">
          <v-icon color="#34A5E4" class="float-right mt-n3">mdi-twitter</v-icon>
          <p class="white--text font-16 line-h-19 font-weight-bold">
            KennyKen (mastershifu)
          </p>
          <p class="font-16 line-h-19 font-weight-regular color-grey-400">
            Andouille pig spare ribs venison beef meatloaf. Jowl burgdoggen
            pancetta bacon short ribs.
          </p>
          <p class="font-16 line-h-19 font-weight-regular color-grey-400">
            #crypto #sol #solawin
          </p>
        </div>
      </v-col>
      <v-col cols="12" md="4">
        <div class="tweet-card">
          <v-icon color="#34A5E4" class="float-right mt-n3">mdi-twitter</v-icon>
          <p class="white--text font-16 line-h-19 font-weight-bold">
            ChinPatrick (taralets!)
          </p>
          <p class="font-16 line-h-19 font-weight-regular color-grey-400">
            Pastrami beef ribs burgdoggen, rump meatball ground round biltong
            corned beef flank. Brisket buffalo pastrami,
          </p>
          <p class="font-16 line-h-19 font-weight-regular color-grey-400">
            #solawind @solawind
          </p>
          <p class="font-16 line-h-19 font-weight-regular color-grey-400">
            andouille pig spare ribs venison beef meatloaf. Jowl burgdoggen
            pancetta bacon short ribs.
          </p>
        </div>
      </v-col>
      <v-col cols="12" md="4">
        <div class="tweet-card">
          <v-icon color="#34A5E4" class="float-right mt-n3">mdi-twitter</v-icon>
          <p class="white--text font-16 line-h-19 font-weight-bold">
            AndrewMartinee (BigDaddyDrei)
          </p>
          <p class="font-16 line-h-19 font-weight-regular color-grey-400">
            Andouille pig spare ribs venison beef meatloaf. Jowl burgdoggen
            pancetta bacon short ribs.
          </p>
          <p class="font-16 line-h-19 font-weight-regular color-grey-400">
            #crypto #sol #solawin
          </p>
        </div>
      </v-col>
    </v-row>
    <v-divider class="bg-blue-300 mt-54"></v-divider>
    <p class="font-14 line-h-17 font-weight-medium color-grey-100 mt-47">FAQ</p>
    <v-expansion-panels class="faq__wrap" flat v-model="panel" multiple>
      <v-expansion-panel>
        <v-expansion-panel-header class="pl-0 font-16 line-h-19 white--text"
          >What is Solawind?
          <template v-slot:actions>
            <v-icon color="primary"> mdi-plus </v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="font-14 line-h-32 color-grey-100">
          Marketing tools to keep your conversations true and your community
          real.
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header class="pl-0 font-16 line-h-19 white--text"
          >What is Solawind Contract Address?
          <template v-slot:actions>
            <v-icon color="primary"> mdi-plus </v-icon>
          </template></v-expansion-panel-header
        >
        <v-expansion-panel-content class="font-14 line-h-32 color-grey-100">
          Marketing tools to keep your conversations true and your community
          real.
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header class="pl-0 font-16 line-h-19 white--text"
          >Why you should invest in Solawind?
          <template v-slot:actions>
            <v-icon color="primary"> mdi-plus </v-icon>
          </template></v-expansion-panel-header
        >
        <v-expansion-panel-content class="font-14 line-h-32 color-grey-100">
          Marketing tools to keep your conversations true and your community
          real.
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
<script>
import campaignList from "@/components/campaign/list";
import SubscriptionStats from "@/components/Admin/SubscriptionStats";
import CampaignStats from "@/components/Admin/CampaignStats";
export default {
  name: "TheOverview",
  components: {
    campaignList,
    SubscriptionStats,
    CampaignStats,
  },
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
      accessUser: JSON.parse(localStorage.getItem("accessuser")),
      authToken: localStorage.getItem("authToken"),
      accessToken: localStorage.getItem("accessToken"),
      panel: [0],
    };
  },

  computed: {
    greeting() {
      const myDate = new Date();
      const hrs = myDate.getHours();

      let greet;

      if (hrs < 12) greet = "Good Morning";
      else if (hrs >= 12 && hrs <= 17) greet = "Good Afternoon";
      else if (hrs >= 17 && hrs <= 24) greet = "Good Evening";

      return greet;
    },
  },
};
</script>
<style lang="css" scoped></style>
