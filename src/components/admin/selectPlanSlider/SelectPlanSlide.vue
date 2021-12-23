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
      width="50%"
      id="sidebar-right"
      :title="isProjectEditing ? 'Edit Plan' : 'Select Plan'"
      class="sidebarContainer background-transparent"
      right
      shadow
      no-close-on-backdrop
      backdrop-variant="dark"
    >
      <div class=" px-3 py-2">
        test
        {{plan}}
        
        <div>
          <h4 class="pricing-heading">
            <span v-html="plan.emoji"></span>
            {{ plan.planName }} - {{plan.price}}
          </h4>
          You have choosen <b>${{plan.price}}</b>, you are entitled to choose upto {{plan.noOfWinners}} winners.
          All the other features are complementary and free.
        </div>
        <hr/>
        <div>
         <input type="text" placeholder="HYPR456" />
        </div>
        <hr/>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import InputDate from '../../participant/ActionInputs/InputDate.vue';
import EventActionConfig from "./components/EventActionConfig.vue";
import GeneralConfig from "./components/GeneralConfig.vue";
import ReferralConfig from "./components/ReferralConfig.vue";
export default {
  name: "CreateProjectSlide",
  components: {
    GeneralConfig,
    EventActionConfig,
    ReferralConfig,
    InputDate
  },

  props: {
    plan: {
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
    saveProject: {
      type: Function,
    },
   
    isProjectEditing: {
      type: Boolean,
    },
  },

  computed: {
    // a computed getter
   
  },
  
  data() {
    return {
      /// TODO: Need to do it in a neat way
      // Use api https://localhost:6006/api/v1/actions
      // it returns: 
      // {"actionTypes":["INPUT_TEXT","INPUT_NUMBER","TWITTER_FOLLOW","TWITTER_RETWEET","TELEGRAM_JOIN","DISCORD_JOIN","BLOCKCHAIN_ETH","BLOCKCHAIN_TEZ","HYPERSIGN_AUTH"],"length":9}
      options: {
        customAction: [
          { text: "Select Input type", value: null },
          { text: "TEXT", value: "INPUT_TEXT" },
          { text: "NUMBER", value: "INPUT_NUMBER" },
          { text: "DATE", value: "INPUT_DATE" },
          { text: "LINK", value: "INPUT_HYPERLINK" },
          { text: "HYPERLINK", value: "HYPERLINK_URL"},
          { text: "INFO", value: "INFO_TEXT"}
        ]
      },
    };
  },
};
</script>
