<template>
  <div class="overview__wrap">
    <v-row class="mt-44">
      <v-col cols="12" md="5"> </v-col>
      <v-col cols="12" md="7">
        <div class="d-flex align-center mb-6">
          <v-icon color="#979EAF">mdi-arrow-left</v-icon>
          <p class="mb-0 font-14 line-h-17 font-weight-bold white--text">
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
                  <div class="d-flex flex-column align-center justify-center">
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
                  <div class="d-flex flex-column align-center justify-center">
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
                  <div class="d-flex flex-column align-center justify-center">
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
      </v-col>
    </v-row>
  </div>
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
