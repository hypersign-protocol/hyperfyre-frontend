<template>
  <div>
    <p class="font-20 line-h-24 font-weight-bold">Review</p>
    <div class="font-16 line-h-20 font-weight--bold">
      Basic Info
      <v-btn
        @click="editTab('basic-info')"
        text
        :ripple="false"
        class="color-primary-100 text-capitalize font-12 line-h-14 letter-s-0"
        :elevation="0"
      >
        <PencilAltIcon class="height-18 color-primary-100" />
        Edit
      </v-btn>
    </div>
    <div class="mb-4">
      <label class="font-14 line-h-17 font-weight-regular mb-2"
        >Campaign Name</label
      >
      <div>{{ campaign.projectName }}</div>
    </div>
    <div class="mb-4">
      <label class="font-14 line-h-17 font-weight-regular mb-2"
        >Campaign Description</label
      >
      <div>{{ campaign.description }}</div>
    </div>
    <div class="mb-4">
      <label class="font-14 line-h-17 font-weight-regular mb-2"
        >Campaign Date</label
      >
      <div>
        {{ campaign.fromDate | moment("MMMM Do YYYY, h:mm:ss a") }} to
        {{ campaign.toDate | moment("MMMM Do YYYY, h:mm:ss a") }}
      </div>
    </div>
    <div class="mb-4">
      <label class="font-14 line-h-17 font-weight-regular mb-2"
        >Background Banner</label
      >
      <div>
        <img :src="campaign.logoUrl" />
      </div>
    </div>
    <div class="mb-4">
      <label class="font-14 line-h-17 font-weight-regular mb-2">Tags</label>
      <div v-for="(item, index) in campaign.tags" :key="index">
        {{ item }}
      </div>
    </div>
    <div class="mb-4">
      <label class="font-14 line-h-17 font-weight-regular mb-2"
        >Background Theme</label
      >
      <div>
        {{ campaign.themeColor }}
      </div>
    </div>
    <v-divider dark class="my-4"></v-divider>
    <div class="font-16 line-h-20 font-weight--bold">
      Referral
      <v-btn
        @click="editTab('referral')"
        text
        :ripple="false"
        class="color-primary-100 text-capitalize font-12 line-h-14 letter-s-0"
        :elevation="0"
      >
        <PencilAltIcon class="height-18 color-primary-100" />
        Edit
      </v-btn>
    </div>
    <div class="mb-4">
      <label class="font-14 line-h-17 font-weight-regular mb-2"
        >Referee Points</label
      >
      <div>
        {{ campaign.refereePoint }}
      </div>
    </div>
    <div class="mb-4">
      <label class="font-14 line-h-17 font-weight-regular mb-2"
        >Referral Points</label
      >
      <div>
        {{ campaign.referralPoint }}
      </div>
    </div>
    <v-divider dark class="my-4"></v-divider>
    <div class="mb-4" v-if="prizeList.length > 0">
      <div class="font-16 line-h-20 font-weight--bold">
        Prize
        <v-btn
          @click="editTab('prize')"
          text
          class="color-primary-100 text-capitalize font-12 line-h-14 letter-s-0"
          :elevation="0"
          :ripple="false"
        >
          <PencilAltIcon class="height-18 color-primary-100" />
          Edit
        </v-btn>
      </div>

      <v-data-table
        class="result-table campaign"
        :headers="prizeHeaders"
        :hide-default-footer="true"
        :items="prizeList"
        item-key="_id"
        dark
      >
        <template v-slot:item.type="{ item }">
          {{ item.type }}
        </template>
        <template v-slot:item.title="{ item }">
          {{ item.title }}
        </template>
        <template v-slot:item.no_of_winners="{ item }">
          {{ JSON.parse(item.value).winners }}
        </template>
        <template v-slot:item.prize_per_winner="{ item }">
          {{ JSON.parse(item.value).prizeValue }}
        </template>
      </v-data-table>

      <v-divider dark class="my-4"></v-divider>
    </div>

    <div class="mb-4" v-if="customList.length > 0">
      <div class="font-16 line-h-20 font-weight--bold">
        Custom
        <v-btn
          @click="editTab('custom')"
          text
          class="color-primary-100 text-capitalize font-12 line-h-14 letter-s-0"
          :elevation="0"
        >
          <PencilAltIcon class="height-18 color-primary-100" />
          Edit
        </v-btn>
      </div>

      <v-data-table
        class="result-table campaign"
        :headers="headers"
        :hide-default-footer="true"
        :items="customList"
        item-key="_id"
        dark
      >
        <template v-slot:item.type="{ item }">
          {{ item.type }}
        </template>
        <template v-slot:item.title="{ item }">
          {{ item.title }}
        </template>
        <template v-slot:item.placeHolder="{ item }">
          {{ item.placeHolder }}
        </template>
        <template v-slot:item.score="{ item }">
          {{ item.score }}
        </template>
      </v-data-table>
      <v-divider dark class="my-4"></v-divider>
    </div>

    <div class="mb-4" v-if="socialList.length > 0">
      <div class="font-16 line-h-20 font-weight--bold">
        Social
        <v-btn
          @click="editTab('social')"
          text
          class="color-primary-100 text-capitalize font-12 line-h-14 letter-s-0"
          :elevation="0"
        >
          <PencilAltIcon class="height-18 color-primary-100" />
          Edit
        </v-btn>
      </div>

      <v-data-table
        class="result-table campaign"
        :headers="headers"
        :hide-default-footer="true"
        :items="socialList"
        item-key="_id"
        dark
      >
        <template v-slot:item.type="{ item }">
          {{ item.type }}
        </template>
        <template v-slot:item.title="{ item }">
          {{ item.title }}
        </template>
        <template v-slot:item.placeHolder="{ item }">
          {{ item.placeHolder }}
        </template>
        <template v-slot:item.score="{ item }">
          {{ item.score }}
        </template>
      </v-data-table>

      <v-divider dark class="my-4"></v-divider>
    </div>

    <div class="mb-4" v-if="blockchainList.length > 0">
      <div class="font-16 line-h-20 font-weight--bold">
        Wallet
        <v-btn
          @click="editTab('wallet')"
          text
          class="color-primary-100 text-capitalize font-12 line-h-14 letter-s-0"
          :elevation="0"
        >
          <PencilAltIcon class="height-18 color-primary-100" />
          Edit
        </v-btn>
      </div>
      <v-data-table
        class="result-table campaign"
        :headers="headers"
        :hide-default-footer="true"
        :items="blockchainList"
        item-key="_id"
        dark
      >
        <template v-slot:item.type="{ item }">
          {{ item.type }}
        </template>
        <template v-slot:item.title="{ item }">
          {{ item.title }}
        </template>
        <template v-slot:item.placeHolder="{ item }">
          {{ item.placeHolder }}
        </template>
        <template v-slot:item.score="{ item }">
          {{ item.score }}
        </template>
      </v-data-table>

      <v-divider dark class="my-4"></v-divider>
    </div>

    <div class="mb-4" v-if="smartContractlist.length > 0">
      <div class="font-16 line-h-20 font-weight--bold">
        Smart Contract
        <v-btn
          @click="editTab('wallet')"
          text
          class="color-primary-100 text-capitalize font-12 line-h-14 letter-s-0"
          :elevation="0"
        >
          <PencilAltIcon class="height-18 color-primary-100" />
          Edit
        </v-btn>
      </div>

      <v-data-table
        class="result-table campaign"
        :headers="smartContractHeaders"
        :hide-default-footer="true"
        :items="smartContractlist"
        item-key="_id"
        dark
      >
        <template v-slot:item.type="{ item }">
          {{ item.type }}
        </template>
        <template v-slot:item.contract_address="{ item }">
          {{ JSON.parse(item.value).contractAddress }}
        </template>
        <template v-slot:item.balance="{ item }">
          {{ JSON.parse(item.value).thresholdBalance }}
        </template>
        <template v-slot:item.score="{ item }">
          {{ item.score }}
        </template>
      </v-data-table>

      <v-divider dark class="my-4"></v-divider>
    </div>
  </div>
</template>
<script>
import { PencilAltIcon } from "@vue-hero-icons/outline";
import Vue2Filters from "vue2-filters";
import general from "@/mixins/general";
export default {
  name: "Review",
  mixins: [Vue2Filters.mixin, general],
  components: {
    PencilAltIcon,
  },
  props: {
    campaign: {
      type: Object,
    },
  },
  data() {
    return {
      headers: [
        {
          text: "Type",
          align: "start",
          sortable: false,
          value: "type",
        },
        {
          text: "Title",
          sortable: false,
          align: "left",
          value: "title",
        },
        {
          text: "Placeholder",
          sortable: false,
          value: "placeHolder",
        },
        {
          text: "Score",
          sortable: false,
          value: "score",
        },
      ],

      smartContractHeaders: [
        {
          text: "Type",
          align: "start",
          sortable: false,
          value: "type",
        },
        {
          text: "Contract Address",
          sortable: false,
          value: "contract_address",
        },
        {
          text: "Threshold Balance ",
          sortable: false,
          value: "balance",
        },
        {
          text: "Score",
          sortable: false,
          value: "score",
        },
      ],

      prizeHeaders: [
        {
          text: "Type",
          align: "start",
          sortable: false,
          value: "type",
        },
        {
          text: "Prize Name",
          sortable: false,
          value: "title",
        },
        {
          text: "No of Winners",
          sortable: false,
          value: "no_of_winners",
        },
        {
          text: "Prize per Winner",
          sortable: false,
          value: "prize_per_winner",
        },
      ],
    };
  },
  computed: {
    customList: function () {
      if (this.campaign.actions && this.campaign.actions.length > 0) {
        return this.campaign.actions.filter(
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
      if (this.campaign.actions && this.campaign.actions.length > 0) {
        return this.campaign.actions.filter(
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
      if (this.campaign.actions && this.campaign.actions.length > 0) {
        return this.campaign.actions.filter(
          (x) => x.type.indexOf("BLOCKCHAIN_") > -1
        );
      } else {
        return [];
      }
    },
    smartContractlist: function () {
      if (this.campaign.actions && this.campaign.actions.length > 0) {
        return this.campaign.actions.filter(
          (x) =>
            x.type.indexOf("ETHEREUM_") > -1 ||
            x.type.indexOf("MATIC_") > -1 ||
            x.type.indexOf("BINANCE_") > -1 ||
            x.type.indexOf("REEF_") > -1 ||
            x.type.indexOf("MOONBEAM_") > -1 ||
            x.type.indexOf("MOONRIVER_") > -1 ||
            x.type.indexOf("MOON_") > -1
        );
      } else {
        return [];
      }
    },
    prizeList: function () {
      if (this.campaign.actions && this.campaign.actions.length > 0) {
        return this.campaign.actions.filter(
          (x) => x.type.indexOf("PRIZE_") > -1
        );
      } else {
        return [];
      }
    },
  },
  methods: {
    editTab(tabName) {
      this.$root.$emit("setTab", tabName);
    },
  },
};
</script>
<style lang="css" scoped></style>
