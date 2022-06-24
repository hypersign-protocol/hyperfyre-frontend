<style scoped>
.accordion > .card {
  overflow: inherit !important;
}
.b-sidebar > .b-sidebar-header {
  border: 1px solid #000 !important;
}
.previewshow{
  display: block !important;
}
/* .show.collapse{
  display: block !important;
} */
/* .show.collapse{
  transition: height 1s;

} */
.button-theme {
  background-color: #f1b319;
  border-collapse: #f1b319;
  color: black;
  border: 0;
}

.theme-color{
  color:#000000a1;
}

.accordion-header-theme {
  background-color: rgba(241, 179, 25, 0.24);
  border: 0;
}
.fa-exclamation-circle{
  position: relative;
  display: inline-block;
  cursor: help;
}
.fa-exclamation-circle .tooltiptext {
  visibility: hidden;
  width: 250px;
  height: auto;
  background-color: #F1B319;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
  position: absolute;
  z-index: 1;
}
.tooltiptext{
  font-family:  sans-serif;
  font-size: 15px;
  max-width: 230px;
}
.fa-exclamation-circle:hover .tooltiptext {
  visibility: visible;
}
.info {
  display:flex;
  padding:03px;
  color:#F1B319;
  font-size:22px;
  border-radius:50%;
  margin-left: 200px;
  margin-top: -30px;
  width:20px;
  text-align:center;
  }
</style>
<template>
  <div>
    <b-sidebar backdrop width="50%" id="sidebar-right" :title="isProjectEditing ? 'Edit Event' : 'Create Event'"
      class="sidebarContainer background-transparent" right shadow no-close-on-backdrop backdrop-variant="dark">
      <div class="px-3 py-2">
        <div class="accordion" role="tablist" v-if="preview">
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1 border-0 accordin-header accordion-header-theme" role="tab">
              <b-button v-b-toggle.accordion-1 style="pointer-events:none;" variant="info"
                class="bg-transparent border-0 text-left theme-color" title="Preview"><i
                  class="fas fa-file-contract"></i> Preview

              </b-button>
              <b-button variant="info" style="float:right" class="bg-transparent border-0 text-left theme-color"
                title="Close" @click="closePreview">
                <i class="fas fa-close">Close</i>
              </b-button>
            </b-card-header>
            <b-collapse visible class="previewshow" id="accordion-1" accordion="my-accordion1" role="tabpanel">
              <b-card-body>

                <preview-config :eventData="project" />
              </b-card-body>
            </b-collapse>
          </b-card>
        </div>
        <div class="accordion" role="tablist" v-else>
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1 border-0 accordin-header accordion-header-theme" role="tab">
              <b-button block v-b-toggle.accordion-1 class="bg-transparent border-0 text-left theme-color"
                title="Create General configuration for your event"><i class="fas fa-cog"></i> General Configurations
              </b-button>
            </b-card-header>
            <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <general-config v-on="$listeners" :isProjectEditing="isProjectEditing" :themeColor="themeColor"
                  :fontColor="fontColor" :fontColorDefault="fontColorDefault" :themeColorDefault="themeColorDefault"
                  :project="project" :eventActionList="tag" eventActionType="TAGS" :options="getTagDb" />
              </b-card-body>
            </b-collapse>
          </b-card>

          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1 accordin-header accordion-header-theme" role="tab">
              <b-button block v-b-toggle.accordion-2 variant="info"
                class="bg-transparent border-0 text-left theme-color"
                title="Create Referral configuration for your event"><i class="fa fa-user-plus"></i> Referral
                Configurations
                <!-- <a class="tool" data-position="right" draggable="false" title="Creates a unique referral URL for each campaign participants, set points of each referral"><i class='fas fa-exclamation-circle'></i></a> -->
              </b-button>

            </b-card-header>
            <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <referral-config v-on="$listeners" :project="project" />
                <!-- <eventAction-congif
                  v-on="$listeners"
                  :eventActionList="smartContractlist"
                  eventActionType="SMARTCONTRACT"
                  :options="options.smartContractAction"
                /> -->
              </b-card-body>
            </b-collapse>
          </b-card>
          <!--Prize  -->
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1 border-0 accordin-header accordion-header-theme" role="tab">
              <b-button block v-b-toggle.accordion-3 class="bg-transparent border-0 text-left theme-color"
                title="Create Prize configuration for your event"><i class="fas fa-gift"></i> Prize Configurations
              </b-button>
            </b-card-header>
            <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <event-action-config v-on="$listeners" :eventActionList="prizeList" eventActionType="PRIZE"
                  :options="options.prizeDetails" />
              </b-card-body>
            </b-collapse>
          </b-card>
          <!--End Prize  -->

          <!--KYC CONFIG-->
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1 border-0 accordin-header accordion-header-theme" role="tab">
              <b-button block v-b-toggle.accordion-8 class="bg-transparent border-0 text-left theme-color"
                title="Create Kyc configuration for your event"><i class="fas fa-id-card"></i> KYC Configurations
              </b-button>
            </b-card-header>
            <b-collapse id="accordion-8" accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <event-action-config v-on="$listeners" :eventActionList="KycList" eventActionType="KYC"
                  :options="options.kycConfig" />
              </b-card-body>
            </b-collapse>
          </b-card>
          <!--END KYC CONFIG-->


          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1 accordin-header accordion-header-theme" role="tab">
              <b-button block v-b-toggle.accordion-4 variant="info"
                class="bg-transparent border-0 text-left theme-color"
                title="Create Custom Inputs configuration for your event"><i class="fab fa-intercom"></i> Custom Inputs
                Configurations
              </b-button>
            </b-card-header>
            <b-collapse id="accordion-4" accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <eventAction-config v-on="$listeners" :eventActionList="customList" eventActionType="CUSTOM"
                  :options="options.customAction" />
              </b-card-body>
            </b-collapse>
          </b-card>

          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1 accordin-header accordion-header-theme" role="tab">
              <b-button block v-b-toggle.accordion-5 variant="info"
                class="bg-transparent border-0 text-left theme-color"
                title="Create Social configuration for your event"><i class="fas fa-share-alt"></i> Social
                Configurations
              </b-button>
            </b-card-header>
            <b-collapse id="accordion-5" accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <eventAction-config v-on="$listeners" :eventActionList="socialList" eventActionType="SOCIAL"
                  :options="options.socialAction" />
              </b-card-body>
            </b-collapse>
          </b-card>

          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1 accordin-header accordion-header-theme" role="tab">
              <b-button block v-b-toggle.accordion-6 variant="info"
                class="bg-transparent border-0 text-left theme-color"
                title="Create Wallet configuration for your event"><i class="fab fa-bitcoin"></i> Collect Wallet
                Configurations
              </b-button>
            </b-card-header>
            <b-collapse id="accordion-6" accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <eventAction-config v-on="$listeners" :eventActionList="blockchainList" eventActionType="BLOCKCHAIN"
                  :options="options.blockchainAction" />
              </b-card-body>
            </b-collapse>
          </b-card>

          <!-- Smart Contract Config -->
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1 accordin-header accordion-header-theme" role="tab">
              <b-button block v-b-toggle.accordion-7 variant="info"
                class="bg-transparent border-0 text-left theme-color"
                title="Create Smart contract configuration for your event"><i class="fas fa-file-contract"></i> Tokens
                or NFT Holding Configurations
              </b-button>
            </b-card-header>
            <b-collapse id="accordion-7" accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <eventAction-config v-on="$listeners" :eventActionList="smartContractlist"
                  eventActionType="SMARTCONTRACT" :options="options.smartContractAction" />
              </b-card-body>
            </b-collapse>
          </b-card>



          <!--Custom Smart Contract-->

          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1 accordin-header accordion-header-theme" role="tab">
              <b-button block v-b-toggle.accordion-9 variant="info"
                class="bg-transparent border-0 text-left theme-color"
                title="Create Custom Smart contract configuration for your event"><i class="fas fa-file-contract"></i>
                Custom Smart Contract Configurations
              </b-button>
            </b-card-header>
            <b-collapse id="accordion-9" accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <eventAction-config v-on="$listeners" :eventActionList="customContractlist"
                  eventActionType="CUSTOMCONTRACT" :options="options.customContractAction" />
              </b-card-body>
            </b-collapse>
          </b-card>

          <!-- <b-card no-body class="mb-1">
            <b-card-header
              header-tag="header"
              class="p-1 accordin-header accordion-header-theme"
              role="tab"
            >
              <b-button
                block
                v-b-toggle.accordion-9
                variant="info"
                class="bg-transparent border-0 text-left text-primary"
                title="Create Smart contract configuration for your event"
                ><i class="fas fa-file-contract"></i> Preview
              </b-button>
            </b-card-header>
            <b-collapse
              id="accordion-9"
              accordion="my-accordion"
              role="tabpanel"
            >
              <b-card-body>
                <preview-config  :eventData="project"/>
              </b-card-body>
            </b-collapse>
          </b-card> -->

          <!--  -->
          <!-- Tags Config -->
          <!-- <b-card no-body class="mb-1">
            <b-card-header
              header-tag="header"
              class="p-1 accordin-header accordion-header-theme"
              role="tab"
            >
              <b-button
                block
                v-b-toggle.accordion-8
                variant="info"
                class="bg-transparent border-0 text-left text-primary"
                title="Create Tags configuration for your event"
                ><i class="fas fa-tags"></i> Tags
                Configurations
              </b-button>
            </b-card-header>
            <b-collapse
              id="accordion-8"
              accordion="my-accordion"
              role="tabpanel"
            >
              <b-card-body>
                <eventAction-config
                  v-on="$listeners"
                  :eventActionList="tag"
                  eventActionType="TAGS"
                  :options="options.tagDetails"
                />
              </b-card-body>
            </b-collapse>
          </b-card> -->
        </div>

        <button class="btn btn-primary mt-3 button-theme  mr-3" type="button" @click="openPreview">
          Preview
        </button>
        <button class="btn btn-primary mt-3 button-theme" type="button" @click="saveProject">
          Save
        </button>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import EventActionConfig from "./components/EventActionConfig.vue";
import PreviewConfig from "./components/PreviewConfig.vue";
import GeneralConfig from "./components/GeneralConfig.vue";
import ReferralConfig from "./components/ReferralConfig.vue";
export default {
  name: "CreateProjectSlide",
  components: {
    GeneralConfig,
    EventActionConfig,
    ReferralConfig,
    PreviewConfig,
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
    contractType: {
      type: String,
    },
     openPreview:{
       type:Function
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
    tagList: {
      type: Array,
    },
    tagFdb: {
      type: Array,
    },
  },

  computed: {
    // a computed getter
    getTagDb: function () {
      if (this.tagFdb && this.tagFdb.length > 0) {
        for (let index = 0; index < this.tagFdb.length; index++) {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.options.tagDetails.push({
            text: this.tagFdb[index].tagName,
            value: this.tagFdb[index].type,
          });
        }
        return this.options.tagDetails;
      } else {
        return [];
      }
    },
    customList: function () {
      if (this.actionList && this.actionList.length > 0) {
        return this.actionList.filter(
          (x) =>
            x.type.indexOf("INPUT_") > -1 ||
            x.type.indexOf("HYPERLINK_URL") > -1 ||
            x.type.indexOf("INFO_TEXT") > -1
        );
      } else {
        return [];
      }
    },

    socialList: function () {
      if (this.actionList && this.actionList.length > 0) {
        return this.actionList.filter(
          (x) =>
            x.type.indexOf("TWITTER_") > -1 ||
            x.type.indexOf("TELEGRAM_") > -1 ||
            x.type.indexOf("DISCORD_") > -1
        );
      } else {
        return [];
      }
    },

    blockchainList: function () {
      if (this.actionList && this.actionList.length > 0) {
        return this.actionList.filter(
          (x) => x.type.indexOf("BLOCKCHAIN_") > -1
        );
      } else {
        return [];
      }
    },
    smartContractlist: function () {
      if (this.actionList && this.actionList.length > 0) {
        return this.actionList.filter(
          (x) =>
            x.type.indexOf("ETHEREUM_ERC20") > -1 ||
            x.type.indexOf("MATIC_ERC20") > -1 ||
            x.type.indexOf("BINANCE_ERC20") > -1 ||
            x.type.indexOf("REEF_ERC20") > -1 ||
            x.type.indexOf("MOONBEAM_ERC20") > -1 ||
            x.type.indexOf("MOONRIVER_ERC20") > -1 ||
            x.type.indexOf("MOON_ERC20") > -1 ||
             x.type.indexOf("ETHEREUM_ERC721") > -1 ||
            x.type.indexOf("MATIC_ERC721") > -1 ||
            x.type.indexOf("BINANCE_ERC721") > -1 ||
            x.type.indexOf("REEF_ERC721") > -1 ||
            x.type.indexOf("MOONBEAM_ERC721") > -1 ||
            x.type.indexOf("MOONRIVER_ERC721") > -1 ||
            x.type.indexOf("MOON_ERC721") > -1 
        );
      } else {
        return [];
      }
    },
    customContractlist:function () {
 if (this.actionList && this.actionList.length > 0) {
        return this.actionList.filter(
          (x) =>
            x.type.indexOf("ETHEREUM_NETWORK") > -1 ||
            x.type.indexOf("MATIC_NETWORK") > -1 ||
            x.type.indexOf("BINANCE_NETWORK") > -1
            
        );
      } else {
        return [];
      }
    },
    prizeList: function () {
      if (this.actionList && this.actionList.length > 0) {
        return this.actionList.filter((x) => x.type.indexOf("PRIZE_") > -1);
      } else {
        return [];
      }
    },
     KycList: function () {
      if (this.actionList && this.actionList.length > 0) {
        return this.actionList.filter((x) => x.type.indexOf("KYC") > -1);
      } else {
        return [];
      }
      },
    tag: function () {
      if (this.tagList && this.tagList.length > 0) {
        return this.tagList.filter((x) => x.type.indexOf("_TAG") > -1);
      } else {
        return [];
      }
    },
  },
  data() {
    return {
      /// TODO: Need to do it in a neat way
      // Use api https://localhost:6006/api/v1/actions
      // it returns:
      // {"actionTypes":["INPUT_TEXT","INPUT_NUMBER","TWITTER_FOLLOW","TWITTER_RETWEET","TELEGRAM_JOIN","DISCORD_JOIN","BLOCKCHAIN_ETH","BLOCKCHAIN_TEZ","HYPERSIGN_AUTH"],"length":9}
      options: {
        customAction: [
          { text: "Select participants input type", value: null },
          { text: "Participants provides Text", value: "INPUT_TEXT" },
          { text: "Participants provides Number", value: "INPUT_NUMBER" },
          { text: "Participants provides Date", value: "INPUT_DATE" },
          { text: "Participants provides URL", value: "INPUT_HYPERLINK" },
          { text: "Participants click URL", value: "HYPERLINK_URL" },
          { text: "Event description", value: "INFO_TEXT" },
        ],
        socialAction: [
          { text: "Select Social Action type", value: null },
          { text: "Twitter Follow", value: "TWITTER_FOLLOW" },
          { text: "Twitter Retweet", value: "TWITTER_RETWEET" },
          { text: "Telegram Join", value: "TELEGRAM_JOIN" },
          { text: "Discord Join", value: "DISCORD_JOIN" },
        ],
        blockchainAction: [
          { text: "Select Blockchain type", value: null },
          { text: "Ethereum", value: "BLOCKCHAIN_ETH" },
          { text: "Polygon", value: "BLOCKCHAIN_MATIC" },
          { text: "Binance Smart chain", value: "BLOCKCHAIN_BSC" },
          { text: "Harmony", value: "BLOCKCHAIN_ONE" },
          { text: "Avalanche", value: "BLOCKCHAIN_AVAX" },
          { text: "Reef", value: "BLOCKCHAIN_REEF" },
          { text: "Tezos", value: "BLOCKCHAIN_TEZ" },
          { text: "Cardano", value: "BLOCKCHAIN_CARDANO" },
        ],
        smartContractAction: [
          { text: "Select Contract Type", value: null },
          { text: "Ethereum ERC20", value: "ETHEREUM_ERC20" },
          { text: "Ethereum ERC721", value: "ETHEREUM_ERC721" },
          { text: "Polygon MaticERC20", value: "MATIC_ERC20" },
          { text: "Polygon MaticERC721", value: "MATIC_ERC721" },
          { text: "Binance BEP20", value: "BINANCE_ERC20" },
          { text: "Binance BEP721", value: "BINANCE_ERC721" },
          { text: "Moon Beam ERC20", value: "MOONBEAM_ERC20" },
          { text: "Moon Beam ERC721", value: "MOONBEAM_ERC721" },
          { text: "Moon River ERC20", value: "MOONRIVER_ERC20" },
          { text: "Moon River ERC721", value: "MOONRIVER_ERC721" },
          { text: "Moon Alpha(testnet) ERC20", value: "MOON_ERC20" },
           { text: "Moon Alpha(testnet) ERC721", value: "MOON_ERC721" },
          { text: "Reef ERC20", value: "REEF_ERC20" },
          { text: "Reef ERC721", value: "REEF_ERC721" },
        ],
        customContractAction:[
          { text: "Select Contract Type", value: null },
          { text: "Ethereum", value: "ETHEREUM_NETWORK" },         
          { text: "Polygon", value: "MATIC_NETWORK" },        
          { text: "Binance", value: "BINANCE_NETWORK" },       
         
          
        ]
        ,
        kycConfig:[{ text: "Select Provider", value: null},
        {text:'SUMSUB',value:'SUMSUB_KYC'}],

        // TODO: Completly wrong way of implementing Prize action
        //// Prize is also an action for us, so there should be different action type liek (PRIZE_NFT, PRIZE_TOKEN, PRIZE_OTHER)
        //// for prize type. But you guys kept `PRIZE_CARD` for all prizes.
        //// Consenquence is that you were not storing the type hence this issues
        //// https://github.com/hypersign-protocol/hyperfyre-frontend/issues/1348
        //// I also can not fix is since it need to be fixed both frontend and backend. So did this hack -  storing type as well in the value field
        prizeDetails: [
          { text: "Select Prize Type", value: null },
          { text: "NFT", value: "NFT" },
          { text: "Tokens", value: "Tokens" },
          { text: "Others", value: "Others" }
        ],
        tagDetails: [{ text: "Select Tag Type", value: null }],
      },
      preview:false
    };
  },
  mounted(){
   
this.$root.$on("openPreview",()=>{
  this.preview=true
})
this.$root.$on("closePreview",this.closePreview)
  }
  ,
  methods: {
 
    closePreview () {
      this.preview= false
    }
  },
};
</script>
