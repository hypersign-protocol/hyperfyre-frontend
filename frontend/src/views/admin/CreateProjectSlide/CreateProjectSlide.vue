<style scoped>
.accordion > .card {
  overflow: inherit !important;
}
.b-sidebar > .b-sidebar-header {
  border: 1px solid #000 !important;
}

.button-theme {
  background-color: #f1b319;
  border-collapse: #f1b319;
  color: black;
  border: 0;
}

.accordion-header-theme {
  background-color: rgba(241, 179, 25, 0.24);
  border: 0;
}

</style>
<template>
  <div>
    <b-sidebar
      backdrop
      width="500px"
      id="sidebar-right"
      :title="isProjectEditing ? 'Edit Event' : 'Create Event'"
      class="sidebarContainer background-transparent"
      right
      shadow
    >
      <div class=" px-3 py-2">
        <div class="accordion" role="tablist">
          <b-card no-body class="mb-1 ">
            <b-card-header
              header-tag="header"
              class="p-1 border-0 accordin-header accordion-header-theme"
              role="tab"
            >
              <b-button
                block
                v-b-toggle.accordion-1
                class="bg-transparent border-0 text-left text-primary"
                >General Configurations</b-button
              >
            </b-card-header>
            <b-collapse
              id="accordion-1"
              visible
              accordion="my-accordion"
              role="tabpanel"
            >
              <b-card-body>
                <general-config
                  :isProjectEditing="isProjectEditing"
                  :themeColor="themeColor"
                  :fontColor="fontColor"
                  :fontColorDefault="fontColorDefault"
                  :themeColorDefault="themeColorDefault"
                  :project="project"
                />
              </b-card-body>
            </b-collapse>
          </b-card>

          <b-card no-body class="mb-1">
            <b-card-header
              header-tag="header"
              class="p-1 accordin-header accordion-header-theme"
              role="tab"
            >
              <b-button
                block
                v-b-toggle.accordion-2
                variant="info"
                class="bg-transparent border-0 text-left text-primary"
                >Social Configurations
              </b-button>
            </b-card-header>
            <b-collapse
              id="accordion-2"
              accordion="my-accordion"
              role="tabpanel"
            >
              <b-card-body>
                <eventAction-congif
                  v-on="$listeners"
                  :eventActionList="socialList"
                  eventActionType="SOCIAL"
                  :options="options.socialAction"
                />
              </b-card-body>
            </b-collapse>
          </b-card>

          <b-card no-body class="mb-1">
            <b-card-header
              header-tag="header"
              class="p-1 accordin-header accordion-header-theme"
              role="tab"
            >
              <b-button
                block
                v-b-toggle.accordion-3
                variant="info"
                class="bg-transparent border-0 text-left text-primary"
                >Custom Inputs Configurations
              </b-button>
            </b-card-header>
            <b-collapse
              id="accordion-3"
              accordion="my-accordion"
              role="tabpanel"
            >
              <b-card-body>
                <eventAction-congif
                  v-on="$listeners"
                  :eventActionList="customList"
                  eventActionType="CUSTOM"
                  :options="options.customAction"
                />
              </b-card-body>
            </b-collapse>
          </b-card>

          <b-card no-body class="mb-1">
            <b-card-header
              header-tag="header"
              class="p-1 accordin-header accordion-header-theme"
              role="tab"
            >
              <b-button
                block
                v-b-toggle.accordion-4
                variant="info"
                class="bg-transparent border-0 text-left text-primary"
                >Blockchain Configurations
              </b-button>
            </b-card-header>
            <b-collapse
              id="accordion-4"
              accordion="my-accordion"
              role="tabpanel"
            >
              <b-card-body>
                <eventAction-congif
                  v-on="$listeners"
                  :eventActionList="blockchainList"
                  eventActionType="BLOCKCHAIN"
                  :options="options.blockchainAction"
                />
              </b-card-body>
            </b-collapse>
          </b-card>
        </div>
        <button
          class="btn btn-primary mt-3 button-theme"
          type="button"
          @click="saveProject"
        >
          Submit
        </button>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import BlockchainCongif from "./BlockchainCongif.vue";
import EventActionCongif from "./EventActionCongif.vue";
import GeneralConfig from "./GeneralConfig.vue";
import SocialConfig from "./SocialConfig.vue";

export default {
  name: "CreateProjectSlide",
  components: {
    SocialConfig,
    GeneralConfig,
    BlockchainCongif,
    EventActionCongif,
  },

  props: {
    project: {
      type: Object,
    },
    themeColor: {
      type: String,
    },
    fontColor: {
      type: String,
    },
    themeColorDefault: {
      type: String,
    },
    fontColorDefault: {
      type: String,
    },
    blockChainType: {
      type: String,
    },
    saveProject: {
      type: Function,
    },
    addedSocialMedias: {
      type: Array,
    },
    actionList: {
      type: Array,
    },
    selectedSocialMedia: {
      type: Object,
    },
    socialOptions: {
      type: Array,
    },
    isProjectEditing: {
      type: Boolean,
    },
  },

  computed: {
    // a computed getter
    customList: function() {
      if (this.actionList && this.actionList.length > 0) {
        return this.actionList.filter((x) => x.type.indexOf("INPUT_") > -1);
      } else {
        return [];
      }
    },

    socialList: function() {
      if (this.actionList && this.actionList.length > 0) {
        return this.actionList.filter(
          (x) =>
            x.type.indexOf("TWITTER_") > -1 || x.type.indexOf("TELEGRAM_") > -1
        );
      } else {
        return [];
      }
    },

    blockchainList: function() {
      if (this.actionList && this.actionList.length > 0) {
        return this.actionList.filter(
          (x) => x.type.indexOf("BLOCKCHAIN_") > -1
        );
      } else {
        return [];
      }
    },
  },
  
  data() {
    return {
      options: {
        customAction: [
          { text: "Select Input type", value: null },
          { text: "TEXT", value: "INPUT_TEXT" },
          { text: "NUMBER", value: "INPUT_NUMBER" },
          { text: "DATE", value: "INPUT_DATE" },
        ],
        socialAction: [
          { text: "Select Social Action type", value: null },
          { text: "Twitter Follow", value: "TWITTER_FOLLOW" },
          { text: "Twitter Retweet", value: "TWITTER_RETWEET" },
          { text: "Telegram Join", value: "TELEGRAM_JOIN" },
        ],
        blockchainAction: [
          { text: "Select Blockchain type", value: null },
          { text: "Ethereum", value: "BLOCKCHAIN_ETH" },
          { text: "Tezos", value: "BLOCKCHAIN_TEZ" },
        ],
      },
    };
  },
};
</script>
