<template>
  <v-container class="py-0">
    <div class="overview__wrap">
      <v-row class="ma-0">
        <v-col cols="12" md="3" class="pa-0">
          <div class="pt-42 pr-27">
            <div class="d-flex flex-column align-center">
              <p class="mb-2 font-24 line-h-29 font-weight-bold white--text">
                0
              </p>
              <p class="font-16 line-h-19 font-weight-bold color-grey-100">
                Total Points
              </p>
            </div>
            <div class="d-flex align-center justify-center">
              <div class="d-flex flex-column px-5 py-3">
                <span
                  class="font-16 line-h-19 font-weight-bold white--text mb-1"
                  >08</span
                >
                <span class="font-12 line-h-15 font-weight-bold color-grey-100"
                  >Days</span
                >
              </div>
              <v-divider vertical class="task-border"></v-divider>
              <div class="d-flex flex-column px-5 py-3">
                <span
                  class="font-16 line-h-19 font-weight-bold white--text mb-1"
                  >08</span
                >
                <span class="font-12 line-h-15 font-weight-bold color-grey-100"
                  >Hrs</span
                >
              </div>
              <v-divider vertical class="task-border"></v-divider>
              <div class="d-flex flex-column px-5 py-3">
                <span
                  class="font-16 line-h-19 font-weight-bold white--text mb-1"
                  >08</span
                >
                <span class="font-12 line-h-15 font-weight-bold color-grey-100"
                  >Mins</span
                >
              </div>
              <v-divider vertical class="task-border"></v-divider>
              <div class="d-flex flex-column px-5 py-3">
                <span
                  class="font-16 line-h-19 font-weight-bold white--text mb-1"
                  >08</span
                >
                <span class="font-12 line-h-15 font-weight-bold color-grey-100"
                  >Sec</span
                >
              </div>
            </div>
            <div class="my-24">
              <p
                class="width-128 text-center ma-auto font-12 line-h-15 font-weight-bold color-grey-100"
              >
                Finish on or before the countdown ends
              </p>
            </div>
            <div
              class="gradient-#3A0088 d-flex flex-column align-center justify-center refer__wrap border-r-4 width-207 ma-auto text-center px-18 py-25"
            >
              <v-icon color="#fff" class="mb-2"
                >mdi-account-plus-outline</v-icon
              >
              <p class="font-12 line-h-15 font-weight-bold white--text mb-2">
                Refer and gain +15 points
              </p>
              <p
                class="font-12 line-h-15 font-weight-regular white--text mb-28"
              >
                You can gain more points by referring your friends
              </p>
              <p class="font-12 line-h-15 font-weight-bold white--text mb-2">
                Your Referral Code
              </p>
              <div class="border-r-4 px-3 border-1">
                <span class="font-12 line-h-15 font-weight-bold white--text"
                  >z420run34txu</span
                >
              </div>
              <v-btn
                block
                color="white"
                :ripple="false"
                elevation="0"
                class="letter-s-0 border-r-2 mt-17 text-capitalize px-5 py-2 color-primary-100"
              >
                Share Now
              </v-btn>
            </div>
          </div>
        </v-col>
        <v-divider vertical class="task-border"></v-divider>
        <v-col cols="12" md="9" class="pa-0">
          <div class="pt-42 pl-146">
            <div
              class="d-flex align-center mb-6 cursor-pointer"
              @click="$router.push({ path: '/overview' })"
            >
              <v-icon color="#979EAF">mdi-arrow-left</v-icon>
              <p
                class="ml-1 mb-0 font-14 line-h-17 font-weight-bold white--text"
              >
                Demo Giveaway
              </p>
            </div>
            <v-card flat color="black" class="task-card">
              <div class="bg-yellow-100 py-58 px-120 border-r-4">
                <div class="d-flex align-center justify-center">
                  <img src="@/assets/images/a-icon.svg" />
                  <p
                    class="ml-4 mb-0 white--text font-32 line-h-38 font-weight-bold"
                  >
                    Awesome
                  </p>
                </div>
              </div>
              <div class="mt-6">
                <div class="d-flex align-center justify-space-between">
                  <p class="color-grey-100 font-14 line-h-17 font-weight-bold">
                    To-Dos
                  </p>
                  <p class="color-grey-100 font-14 line-h-17 font-weight-bold">
                    1 of 8
                  </p>
                </div>
                <v-expansion-panels class="todo__wrap" flat multiple>
                  <v-expansion-panel>
                    <v-expansion-panel-header
                      class="px-0 font-12 line-h-15 white--text"
                    >
                      <div class="d-flex align-center">
                        <v-icon size="22" color="#313540" class="mr-2">
                          mdi-circle</v-icon
                        >
                        Refer this to a friend
                      </div>
                      <template v-slot:actions>
                        <v-chip
                          class="black--text font-weight-bold"
                          color="green"
                          small
                          label
                        >
                          +15
                        </v-chip>
                        <v-icon color="#fff"> mdi-chevron-down </v-icon>
                      </template>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content
                      class="font-14 line-h-32 color-grey-100"
                    >
                      <div
                        class="d-flex flex-column align-center justify-center"
                      >
                        <v-btn icon class="bg-blue-400 mb-2">
                          <v-icon color="#fff">mdi-twitter</v-icon>
                        </v-btn>
                        <p class="font-14 line-h-17 white--text mb-2">
                          Follow us on:
                        </p>
                        <a
                          class="font-14 line-h-17 color-primary-100 text-decoration-none"
                          href="https://twitter.com/awesome"
                          >https://twitter.com/awesome</a
                        >
                      </div>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                  <v-expansion-panel>
                    <v-expansion-panel-header
                      class="px-0 font-12 line-h-15 white--text"
                    >
                      <div class="d-flex align-center">
                        <v-icon size="22" color="#313540" class="mr-2">
                          mdi-circle</v-icon
                        >
                        Refer this to a friend
                      </div>
                      <template v-slot:actions>
                        <v-chip
                          class="black--text font-weight-bold"
                          color="green"
                          small
                          label
                        >
                          +15
                        </v-chip>
                        <v-icon color="#fff"> mdi-chevron-down </v-icon>
                      </template>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content
                      class="font-14 line-h-32 color-grey-100"
                    >
                      <div
                        class="d-flex flex-column align-center justify-center"
                      >
                        <v-btn icon class="bg-blue-400 mb-2">
                          <v-icon color="#fff">mdi-twitter</v-icon>
                        </v-btn>
                        <p class="font-14 line-h-17 white--text mb-2">
                          Follow us on:
                        </p>
                        <a
                          class="font-14 line-h-17 color-primary-100 text-decoration-none"
                          href="https://twitter.com/awesome"
                          >https://twitter.com/awesome</a
                        >
                      </div>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                  <v-expansion-panel>
                    <v-expansion-panel-header
                      class="px-0 font-12 line-h-15 white--text"
                    >
                      <div class="d-flex align-center">
                        <v-icon size="22" color="#313540" class="mr-2">
                          mdi-circle</v-icon
                        >
                        Refer this to a friend
                      </div>
                      <template v-slot:actions>
                        <v-chip
                          class="black--text font-weight-bold"
                          color="green"
                          small
                          label
                        >
                          +15
                        </v-chip>
                        <v-icon color="#fff"> mdi-chevron-down </v-icon>
                      </template>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content
                      class="font-14 line-h-32 color-grey-100"
                    >
                      <div
                        class="d-flex flex-column align-center justify-center"
                      >
                        <v-btn icon class="bg-blue-400 mb-2">
                          <v-icon color="#fff">mdi-twitter</v-icon>
                        </v-btn>
                        <p class="font-14 line-h-17 white--text mb-2">
                          Follow us on:
                        </p>
                        <a
                          class="font-14 line-h-17 color-primary-100 text-decoration-none"
                          href="https://twitter.com/awesome"
                          >https://twitter.com/awesome</a
                        >
                      </div>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </div>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>
<script>
export default {
  name: "TaskView",

  data() {
    return {};
  },
};
</script>
<style lang="css" scoped></style>
