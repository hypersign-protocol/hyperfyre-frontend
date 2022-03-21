<template>
  <v-container class="py-0">
    <div class="overview__wrap">
      <v-row class="ma-0">
        <v-col cols="12" md="12" class="pa-0">
          <v-card flat color="black">
            <v-tabs
              :hide-slider="true"
              v-model="navigationTab"
              vertical
              class="este__tabs"
            >
              <p class="font-20 line-h-24 font-weight-bold color-grey-100">
                Create a Campaign
              </p>
              <template v-for="(item, index) in navigation">
                <v-tab
                  class="font-16 line-h-19 font-weight-bold letter-s-0"
                  :ripple="false"
                  :href="`#${item.slug}`"
                  :key="index"
                >
                  <v-icon size="25" color="#313443" class="mr-2"
                    >mdi-circle</v-icon
                  >
                  {{ item.name }}
                </v-tab>
              </template>
            </v-tabs>
            <div class="tab__content__wrapper">
              <v-tabs-items v-model="navigationTab">
                <template v-for="(item, index) in navigation">
                  <v-tab-item :value="item.slug" :eager="true" :key="index">
                    <div class="content__text white--text">
                      <v-form
                        :ref="`${item.name.replace(/\s/g, '')}Form`"
                        class="width-600 ma-auto white--text"
                      >
                        <component :is="loadComponent(item)"></component>
                        <div
                          class="d-flex flex-column align-center justify-center"
                        >
                          <v-btn
                            :ripple="false"
                            color="primary"
                            block
                            class="mt-10 background-theme gradient width-440 height-35 letter-s-0 ma-auto border-r-2 text-capitalize font-16 line-h-19 font-weight-bold white--text"
                            depressed
                            rounded
                            x-large
                            @click="next()"
                          >
                            <span v-if="navigationTab !== 'review'"
                              >Continue</span
                            >
                            <span v-else>Submit</span>
                          </v-btn>
                          <v-btn
                            v-if="navigationTab !== 'basic-info'"
                            color="primary"
                            class="letter-s-0 ma-auto border-r-2 text-capitalize font-16 line-h-19 font-weight-bold color-primary-100"
                            depressed
                            text
                            :ripple="false"
                            rounded
                            x-large
                            @click="prev()"
                          >
                            Back
                          </v-btn>
                        </div>
                      </v-form>
                    </div>
                  </v-tab-item>
                </template>
              </v-tabs-items>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>
<script>
export default {
  name: "CreateCampaign",

  data() {
    return {
      navigationTab: "basic-info",
      navigation: [
        {
          name: "Basic Info",
          slug: "basic-info",
        },
        {
          name: "Referral",
          slug: "referral",
        },
        {
          name: "Custom",
          slug: "custom",
        },
        {
          name: "Social",
          slug: "social",
        },
        {
          name: "Wallet",
          slug: "wallet",
        },
        {
          name: "Review",
          slug: "review",
        },
      ],
    };
  },

  methods: {
    loadComponent(item) {
      return require(`@/components/campaign/${item.name.replace(
        /\s/g,
        ""
      )}.vue`).default;
    },

    next() {
      const index = this.navigation.findIndex(
        (el) => el.slug === this.navigationTab
      );
      if (index >= 0 && this.navigation.length - 1 > index) {
        const nextIndex = (index + 1) % this.navigation.length;
        this.navigationTab = this.navigation[nextIndex].slug;
      }

      // this[`${name.replace(/\s/g, "")}`]();
    },

    prev() {
      const index = this.navigation.findIndex(
        (el) => el.slug === this.navigationTab
      );

      const prevIndex =
        (index + this.navigation.length - 1) % this.navigation.length;
      this.navigationTab = this.navigation[prevIndex].slug;

      // this[`${name.replace(/\s/g, "")}`]();
    },

    BasicInfo() {
      console.log("here");
      if (this.$refs.BasicInfoForm.validate()) {
        console.log("cge");
      }
    },
  },
};
</script>
<style lang="css" scoped></style>
