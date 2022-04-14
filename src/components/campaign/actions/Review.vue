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

      <v-simple-table dark>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Type</th>
              <th class="text-left">Prize name</th>
              <th class="text-left">Number of Winners</th>
              <th class="text-left">Prize Per Winner</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in prizeList" :key="index">
              <td>{{ item.type }}</td>
              <td>{{ item.title }}</td>
              <td>{{ JSON.parse(item.value).winners }}</td>
              <td>{{ JSON.parse(item.value).prizeValue }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>

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

      <v-simple-table dark>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Type</th>
              <th class="text-left">Title</th>
              <th class="text-left">Placeholder</th>
              <th class="text-left">Score</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in customList" :key="index">
              <td>{{ item.type }}</td>
              <td>{{ item.title }}</td>
              <td>{{ item.placeHolder }}</td>
              <td>{{ item.score }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
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

      <v-simple-table dark>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Type</th>
              <th class="text-left">Title</th>
              <th class="text-left">Social Handle</th>
              <th class="text-left">Score</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in socialList" :key="index">
              <td>{{ item.type }}</td>
              <td>{{ item.title }}</td>
              <td>{{ item.value }}</td>
              <td>{{ item.score }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>

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
      <v-simple-table dark>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Blockchain</th>
              <th class="text-left">Title</th>
              <th class="text-left">Placeholder</th>
              <th class="text-left">Score</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in blockchainList" :key="index">
              <td>{{ item.type }}</td>
              <td>{{ item.title }}</td>
              <td>{{ item.placeHolder }}</td>
              <td>{{ item.score }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
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
      <v-simple-table dark>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Blockchain</th>
              <th class="text-left">Contact Address</th>
              <th class="text-left">Balance</th>
              <th class="text-left">Score</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in smartContractlist" :key="index">
              <td>{{ item.type }}</td>
              <td>{{ JSON.parse(item.value).contractAddress }}</td>
              <td>{{ JSON.parse(item.value).thresholdBalance }}</td>
              <td>{{ item.score }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>

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
    return {};
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
