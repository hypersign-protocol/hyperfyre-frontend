<style>
.drag {
  cursor: move; /* fallback if grab cursor is unsupported */
}
</style>

<template>
  <div class="mx-auto overflow-hidden mt-3 border-0" style="max-width: 600px">
    <div>
      <Metrics
        :userScore="5"
        :totalEntries="eventData.investorsCount"
        :timeLeft="
          parseInt(
            (new Date(eventData.toDate).getTime() - new Date().getTime()) /
              (1000 * 3600 * 24)
          ) < 0
            ? '0'
            : parseInt(
                (new Date(eventData.toDate).getTime() - new Date().getTime()) /
                  (1000 * 3600 * 24)
              )
        "
      />
    </div>
    <div>
      <Banner
        :eventName="eventData.projectName"
        :themeColor="eventData.themeColor"
        :fontColor="eventData.fontColor"
        :fromDate="new Date(eventData.fromDate).toLocaleString()"
        :toDate="new Date(eventData.toDate).toLocaleString()"
        :logoUrl="eventData.logoUrl"
      />
    </div>
    <div class="accordion mx-auto">
      <b-col
        md="14"
        v-for="action in eventData.actions"
        v-bind:key="action._id"
      >
        <b-card v-if="action.type === 'INFO_TEXT' && action.isDeleted !== true">
          <b-row cols-sm="1">
            <b-col cols="1" sm="1" md="1">
              <span>
                <i
                  style="color: gray"
                  v-if="action.type.includes('INFO_')"
                  class="fa fa-info-circle"
                ></i>
              </span>
            </b-col>
            <b-col cols="9" sm="9" class="text-left" md="9">
              <div class="text text-capitalize">{{ action.title }}</div>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <b-col
        md="14"
        v-for="action in eventData.actions"
        v-bind:key="action._id"
      >
        <b-card
          v-if="action.type === 'PRIZE_CARD' && action.isDeleted !== true"
        >
          <b-row cols-sm="1">
            <b-col cols="1" sm="1" md="1">
              <span>
                <i
                  style="color: gray"
                  v-if="action.type.includes('PRIZE_')"
                  class="fas fa-gift"
                ></i>
              </span>
            </b-col>
            <b-col cols="9" sm="9" class="text-left" md="9">
              <div class="text text-capitalize">{{ action.title }}</div>
            </b-col>
          </b-row>
        </b-card>
      </b-col>

      <draggable v-model="eventData.actions" @end="onEnd" class="drag">
        <b-col
          md="14"
          v-for="action in eventData.actions"
          v-bind:key="action._id"
          title="Drag to change the position of the action"
        >
          <b-card
            v-if="
              action.type !== 'HYPERSIGN_AUTH' &&
              action.type !== 'PRIZE_CARD' &&
              action.type !== 'INFO_TEXT' &&
              action.isDeleted !== true
            "
          >
            <b-row cols-sm="1">
              <b-col cols="1" sm="1" md="1">
                <span>
                  <i
                    style="color: gray"
                    v-if="action.type.includes('TWITTER')"
                    class="fab fa-twitter"
                  ></i>
                  <i
                    style="color: gray"
                    v-if="action.type.includes('TELEGRAM')"
                    class="fab fa-telegram-plane"
                  ></i>
                  <i
                    style="color: gray"
                    v-if="action.type.includes('INPUT_TEXT')"
                    class="fas fa-file-alt"
                  ></i>
                  <i
                    style="color: gray"
                    v-if="action.type.includes('NUMBER')"
                    class="fas fa-list-ol"
                  ></i>
                  <i
                    style="color: gray"
                    v-if="action.type.includes('DATE')"
                    class="fas fa-calendar-minus"
                  ></i>
                  <i
                    style="color: gray"
                    v-if="action.type.includes('DISCORD')"
                    class="fab fa-discord"
                  ></i>
                  <i
                    style="color: gray"
                    v-if="action.type.includes('INPUT_HYPERLINK')"
                    class="fa fa-link"
                  ></i>
                  <i
                    style="color: gray"
                    v-if="action.type.includes('INFO_TEXT')"
                    class="fa fa-info-circle"
                  ></i>
                  <i
                    style="color: gray"
                    v-if="action.type.includes('PRIZE_')"
                    class="fas fa-gift"
                  ></i>
                  <i
                    style="color: gray"
                    v-if="action.type.includes('SUMSUB_KYC')"
                    class="fas fa-id-card"
                  ></i>
                  <img
                    style="padding-right: 5px"
                    src="../../../../assets/external-link.svg"
                    v-if="action.type.includes('HYPERLINK_URL')"
                    height="22px"
                  />
                  <img
                    style="padding-right: 5px"
                    src="/img/ethereum.2b470564.svg"
                    v-if="action.type.includes('BLOCKCHAIN_ETH')"
                    height="22px"
                  />
                  <img
                    style="padding-right: 5px"
                    src="/img/ethereum.2b470564.svg"
                    v-if="action.type.includes('ETHEREUM_ERC20')"
                    height="22px"
                  />
                  <img
                    style="padding-right: 5px"
                    src="/img/ethereum.2b470564.svg"
                    v-if="action.type.includes('ETHEREUM_ERC721')"
                    height="22px"
                  />

                  <img
                    style="padding-right: 5px"
                    src="../../../../assets/matic-logo.svg"
                    v-if="action.type.includes('MATIC_ERC20')"
                    height="20px"
                  />
                  <img
                    style="padding-right: 5px"
                    src="../../../../assets/matic-logo.svg"
                    v-if="action.type.includes('MATIC_ERC721')"
                    height="20px"
                  />

                  <img
                    style="padding-right: 5px"
                    src="../../../../assets/binance-logo.svg"
                    v-if="action.type.includes('BINANCE_ERC20')"
                    height="20px"
                  />
                  <img
                    style="padding-right: 5px"
                    src="../../../../assets/binance-logo.svg"
                    v-if="action.type.includes('BINANCE_ERC721')"
                    height="20px"
                  />
                  <img
                    style="padding-right: 5px"
                    src="../../../../assets/ringing.png"
                    v-if="action.type.includes('PUSH_NOTIFICATION')"
                    height="20px"
                  />
                  <img
                    style="padding-right: 5px"
                    src="../../../../assets/Reef.svg"
                    v-if="action.type.includes('REEF_ERC20')"
                    height="20px"
                  />
                  <img
                    style="padding-right: 5px"
                    src="../../../../assets/Reef.svg"
                    v-if="action.type.includes('REEF_ERC721')"
                    height="20px"
                  />

                  <img
                    style="padding-right: 5px"
                    src="../../../../assets/moonbase-alpha.svg"
                    v-if="action.type.includes('MOON_ERC20')"
                    height="22px"
                  />
                  <img
                    style="padding-right: 5px"
                    src="../../../../assets/moonbase-alpha.svg"
                    v-if="action.type.includes('MOON_ERC721')"
                    height="22px"
                  />
                  <img
                    style="padding-right: 5px"
                    src="../../../../assets/moon-river.png"
                    v-if="action.type.includes('MOONRIVER_ERC20')"
                    height="20px"
                  />
                  <img
                    style="padding-right: 5px"
                    src="../../../../assets/moon-river.png"
                    v-if="action.type.includes('MOONRIVER_ERC721')"
                    height="20px"
                  />

                  <img
                    style="padding-right: 5px"
                    src="../../../../assets/moonbeam.png"
                    v-if="action.type.includes('MOONBEAM_ERC20')"
                    height="20px"
                  />
                  <img
                    style="padding-right: 5px"
                    src="../../../../assets/moonbeam.png"
                    v-if="action.type.includes('MOONBEAM_ERC721')"
                    height="20px"
                  />

                  <img
                    style="padding-right: 5px"
                    src="../../../../assets/tezos.png"
                    v-if="action.type.includes('BLOCKCHAIN_TEZ')"
                    height="22px"
                  />
                  <img
                    style="padding-right: 5px"
                    src="../../../../assets/cardano_128.png"
                    v-if="action.type.includes('BLOCKCHAIN_CARDANO')"
                    height="22px"
                  />
                  <img
                    style="padding-right: 5px"
                    src="../../../../assets/binance-logo.svg"
                    v-if="action.type.includes('BLOCKCHAIN_BSC')"
                    height="22px"
                  />
                  <img
                    style="padding-right: 5px"
                    src="../../../../assets/matic-logo.svg"
                    v-if="action.type.includes('BLOCKCHAIN_MATIC')"
                    height="20px"
                  />
                  <img
                    style="padding-right: 5px"
                    src="../../../../assets/harmony.png"
                    v-if="action.type.includes('BLOCKCHAIN_ONE')"
                    height="20px"
                  />
                  <img
                    style="padding-right: 5px"
                    src="../../../../assets/avalanche.png"
                    v-if="action.type.includes('BLOCKCHAIN_AVAX')"
                    height="20px"
                  />
                  <img
                    style="padding-right: 5px"
                    src="../../../../assets/Reef.svg"
                    v-if="action.type.includes('BLOCKCHAIN_REEF')"
                    height="20px"
                  />
                </span>
              </b-col>
              <b-col cols="9" sm="9" class="text-left" md="9">
                <div class="text text-capitalize">{{ action.title }}</div>
              </b-col>

              <b-col cols="2" sm="2" md="2">
                <b-badge class="btn-score">
                  <img src="../../../../assets/plus.svg" />
                  {{ action.score }}
                </b-badge>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </draggable>
    </div>
  </div>
</template>

<script>
import Banner from "../../../participant/Banner.vue";
import Metrics from "../../../participant/Metrics.vue";
import draggable from "vuedraggable";
export default {
  name: "PreviewConfig",
  props: {
    eventData: {
      type: Object,
    },
  },
  components: { Banner, Metrics, draggable },
  methods: {
    onEnd() {
      this.$root.$emit("actionReorder", this.eventData.actions);
    },
  },
};
</script>
