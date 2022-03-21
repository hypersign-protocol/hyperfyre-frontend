<template>
  <v-container>
    <div class="overview__wrap">
      <div class="d-flex align-center justify-space-between">
        <p class="white--text mt-24 font-20 font-weight-medium line-h-24">
          Manage Camppaigns
        </p>
        <div class="d-flex align-center">
          <v-btn
            :ripple="false"
            color="primary"
            class="background-theme gradient width-150 height-35 letter-s-0 ma-auto border-r-2 text-capitalize font-16 line-h-19 font-weight-bold white--text mr-4"
            depressed
            rounded
            x-large
          >
            Add Participant
          </v-btn>
          <v-btn
            :ripple="false"
            color="primary"
            class="background-theme gradient width-150 height-35 letter-s-0 ma-auto border-r-2 text-capitalize font-16 line-h-19 font-weight-bold white--text"
            depressed
            rounded
            x-large
            to="/create-campaign"
          >
            Create Campaign
          </v-btn>
        </div>
      </div>
      <p class="color-grey-100 mt-40 font-14 font-weight-bold line-h-17">
        On Going
      </p>
      <v-card elevation="0" flat class="bg-blue-100 border-r-8">
        <v-card-text class="pa-0">
          <v-row class="ma-0 bg-blue-100 border-r-8">
            <v-col cols="12" md="6">
              <div class="d-flex align-center">
                <div
                  class="profile-icon width-47 height-47 bg-blue-200 border-r-50 mr-2"
                >
                  <span class="white--text">C</span>
                </div>
                <div class="d-flex flex-column">
                  <div class="white--text font-14 line-h-22 font-weight-bold">
                    Charlie Giveaway
                  </div>
                  <div
                    class="color-grey-300 font-12 line-h-14 font-weight-regular"
                  >
                    December 01, 2021, 4:20AM to 4:20PM EST
                  </div>
                </div>
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <div class="d-flex align-center justify-end">
                <div
                  class="font-14 line-h-22 font-weight-bold color-grey-300 mr-32"
                >
                  <span class="white--text mr-2">4</span> Participants
                </div>
                <div class="d-flex">
                  <v-btn icon>
                    <v-icon color="primary">mdi-close</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon color="primary">mdi-circle-edit-outline</v-icon>
                  </v-btn>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <p class="color-grey-100 mt-40 font-14 font-weight-bold line-h-17">
        Upcoming
      </p>
      <v-card elevation="0" flat class="bg-blue-100 border-r-8">
        <v-card-text class="pa-0">
          <v-row class="ma-0 bg-blue-100 border-r-8">
            <v-col cols="12" md="6">
              <div class="d-flex align-center">
                <div
                  class="profile-icon width-47 height-47 bg-blue-200 border-r-50 mr-2"
                >
                  <span class="white--text">C</span>
                </div>
                <div class="d-flex flex-column">
                  <div class="white--text font-14 line-h-22 font-weight-bold">
                    Charlie Giveaway
                  </div>
                  <div
                    class="color-grey-300 font-12 line-h-14 font-weight-regular"
                  >
                    December 01, 2021, 4:20AM to 4:20PM EST
                  </div>
                </div>
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <div class="d-flex align-center justify-end">
                <div
                  class="font-14 line-h-22 font-weight-bold color-grey-300 mr-32"
                >
                  <span class="white--text mr-2">4</span> Participants
                </div>
                <div class="d-flex">
                  <v-btn icon>
                    <v-icon color="primary">mdi-close</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon color="primary">mdi-circle-edit-outline</v-icon>
                  </v-btn>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <p class="color-grey-100 mt-40 font-14 font-weight-bold line-h-17">
        Completed
      </p>
      <v-card elevation="0" flat class="bg-blue-100 border-r-8">
        <v-card-text class="pa-0">
          <v-row class="ma-0 bg-blue-100 border-r-8">
            <v-col cols="12" md="6">
              <div class="d-flex align-center">
                <div
                  class="profile-icon width-47 height-47 bg-blue-200 border-r-50 mr-2"
                >
                  <span class="white--text">C</span>
                </div>
                <div class="d-flex flex-column">
                  <div class="white--text font-14 line-h-22 font-weight-bold">
                    Charlie Giveaway
                  </div>
                  <div
                    class="color-grey-300 font-12 line-h-14 font-weight-regular"
                  >
                    December 01, 2021, 4:20AM to 4:20PM EST
                  </div>
                </div>
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <div class="d-flex align-center justify-end">
                <div
                  class="font-14 line-h-22 font-weight-bold color-grey-300 mr-32"
                >
                  <span class="white--text mr-2">4</span> Participants
                </div>
                <div class="d-flex">
                  <v-btn icon>
                    <v-icon color="primary">mdi-refresh</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon color="primary">mdi-trash-can-outline</v-icon>
                  </v-btn>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </div>
  </v-container>
</template>
<script>
export default {
  name: "Campaigns",

  data() {
    return {};
  },
};
</script>
<style lang="css" scoped></style>
