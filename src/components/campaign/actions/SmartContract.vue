<template>
  <div>
    <p class="font-20 line-h-24 font-weight-bold">Smart Contract</p>
    <template v-if="list.length > 0">
      <div class="px-5 py-20 border-r-8 event-list mb-20">
        <template v-for="(item, index) in list">
          <v-chip
            :key="index"
            class="font-12 line-h-16 height-28 event-chip mt-2 mr-2"
            dark
            @click="edit(item, index)"
          >
            <img
              height="15"
              src="@/assets/images/ethereum.svg"
              class="mr-1"
              v-if="
                item.type === 'ETHEREUM_ERC20' ||
                item.type === 'ETHEREUM_ERC721'
              "
            />

            <img
              height="15"
              src="@/assets/images/matic-logo.svg"
              class="mr-1"
              v-if="item.type === 'MATIC_ERC20' || item.type === 'MATIC_ERC721'"
            />

            <img
              height="15"
              src="@/assets/images/binance-logo.svg"
              class="mr-1"
              v-if="
                item.type === 'BINANCE_ERC20' || item.type === 'BINANCE_ERC721'
              "
            />

            <img
              height="15"
              src="@/assets/images/moonbeam.png"
              class="mr-1"
              v-if="
                item.type === 'MOONBEAM_ERC20' ||
                item.type === 'MOONBEAM_ERC721'
              "
            />

            <img
              height="15"
              src="@/assets/images/moonbeam.png"
              class="mr-1"
              v-if="
                item.type === 'MOONRIVER_ERC20' ||
                item.type === 'MOONRIVER_ERC721'
              "
            />

            <img
              height="15"
              src="@/assets/images/moonbase-alpha.svg"
              class="mr-1"
              v-if="item.type === 'MOON_ERC20' || item.type === 'MOON_ERC721'"
            />

            <img
              height="15"
              src="@/assets/images/Reef.svg"
              class="mr-1"
              v-if="item.type === 'REEF_ERC20' || item.type === 'REEF_ERC721'"
            />

            {{ item.title | truncate(10) }}
            <v-icon size="15" class="ml-2">mdi-minus-circle-outline</v-icon>
          </v-chip>
        </template>
      </div>
    </template>
    <v-form ref="form">
      <div class="mb-4">
        <label class="font-14 line-h-17 font-weight-regular mb-2"
          >Select Type</label
        >
        <v-select
          v-model="form.type"
          :rules="rules.type"
          :items="types"
          item-text="text"
          item-value="value"
          hide-details="auto"
          dark
          flat
          solo
          outlined
          class="form-input"
        ></v-select>
      </div>
      <div class="mb-4">
        <label class="font-14 line-h-17 font-weight-regular mb-2"
          >Contact Address</label
        >
        <v-text-field
          v-model="details.contractAddress"
          :rules="rules.contractAddress"
          placeholder="Place contract address"
          hide-details="auto"
          dark
          flat
          solo
          outlined
          class="form-input"
        ></v-text-field>
      </div>
      <div class="mb-4">
        <label class="font-14 line-h-17 font-weight-regular mb-2"
          >Balance</label
        >
        <v-text-field
          v-model="details.thresholdBalance"
          :rules="rules.number"
          placeholder="Threshold Balance"
          hide-details="auto"
          dark
          flat
          solo
          outlined
          class="form-input"
        ></v-text-field>
      </div>
      <div class="mb-4">
        <label class="font-14 line-h-17 font-weight-regular mb-2">Title</label>
        <v-text-field
          v-model="form.title"
          :rules="rules.title"
          placeholder="Name your title"
          hide-details="auto"
          dark
          flat
          solo
          outlined
          class="form-input"
        ></v-text-field>
      </div>
      <div class="mb-4">
        <label class="font-14 line-h-17 font-weight-regular mb-2"
          >Placeholder</label
        >
        <v-text-field
          v-model="form.placeHolder"
          placeholder="Enter Place Holder"
          hide-details="auto"
          dark
          flat
          solo
          outlined
          class="form-input"
        ></v-text-field>
      </div>
      <div class="mb-4">
        <label class="font-14 line-h-17 font-weight-regular mb-2">Score</label>
        <v-text-field
          v-model="form.score"
          :rules="rules.number"
          hide-details="auto"
          dark
          flat
          solo
          outlined
          class="form-input"
        ></v-text-field>
      </div>
      <div
        class="d-flex flex-row align-center justify-space-between"
        v-if="isEditing"
      >
        <v-btn
          :ripple="false"
          class="btn-gradient-outline height-35 letter-s-0 text-capitalize font-16 line-h-19 font-weight-bold green--text"
          depressed
          rounded
          x-large
          @click="update"
        >
          Update
        </v-btn>
        <v-btn
          :ripple="false"
          class="btn-gradient-outline height-35 letter-s-0 text-capitalize font-16 line-h-19 font-weight-bold red--text"
          depressed
          rounded
          x-large
          @click="deleteEntry"
        >
          Delete
        </v-btn>
        <v-btn
          color="primary"
          class="letter-s-0 border-r-2 text-capitalize font-16 line-h-19 font-weight-regular grey--text"
          depressed
          text
          :ripple="false"
          rounded
          x-large
          @click="cancel"
        >
          Cancel
        </v-btn>
      </div>
      <div
        class="d-flex flex-column align-center justify-center"
        v-if="!isEditing"
      >
        <v-btn
          :ripple="false"
          block
          class="mb-6 btn-gradient-outline width-440 height-35 letter-s-0 ma-auto border-r-2 text-capitalize font-16 line-h-19 font-weight-bold color-primary-100"
          depressed
          rounded
          x-large
          @click="add"
        >
          Make another
        </v-btn>
        <span class="font-16 line-h-19 font-weight-regular white--text"
          >Or</span
        >
      </div>
    </v-form>
  </div>
</template>
<script>
export default {
  name: "SmartContract",
  props: {
    campaign: {
      type: Object,
    },
    isEdit: {
      type: Boolean,
      required: true,
    },
    list: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      types: [
        { text: "Select Contract Type", value: null },
        { text: "Ethereum ERC20", value: "ETHEREUM_ERC20" },
        { text: "Ethereum ERC721", value: "ETHEREUM_ERC721" },
        { text: "Polygon ERC20", value: "MATIC_ERC20" },
        { text: "Polygon ERC721", value: "MATIC_ERC721" },
        { text: "Binance ERC20", value: "BINANCE_ERC20" },
        { text: "Binance ERC721", value: "BINANCE_ERC721" },
        { text: "Moon Beam ERC20", value: "MOONBEAM_ERC20" },
        { text: "Moon Beam ERC721", value: "MOONBEAM_ERC721" },
        { text: "Moon River ERC20", value: "MOONRIVER_ERC20" },
        { text: "Moon River ERC721", value: "MOONRIVER_ERC721" },
        { text: "Moon Alpha(testnet) ERC20", value: "MOON_ERC20" },
        { text: "Moon Alpha(testnet) ERC721", value: "MOON_ERC721" },
        { text: "Reef ERC20", value: "REEF_ERC20" },
        { text: "Reef ERC721", value: "REEF_ERC721" },
      ],
      isEditing: false,
      selectedIndex: 0,
      form: {
        type: null,
        title: "",
        placeHolder: "",
        isManadatory: true,
        value: null,

        score: 10,
        id: "",
        campaignName: "smart-contract",
      },
      details: {
        contractAddress: null,
        thresholdBalance: null,
      },
      rules: {
        title: [(v) => !!v || "Please enter title"],
        type: [(v) => !!v || "Please select social type"],
        value: [(v) => !!v || "Please enter this field"],
        contractAddress: [(v) => !!v || "Please enter contract address"],
        number: [
          (v) => !!v || "This field is required",
          (v) =>
            (v && v > 0) ||
            "Please enter a positive number which is greate than 0",
        ],
      },
    };
  },
  methods: {
    edit(item, index) {
      this.isEditing = true;
      this.selectedIndex = index;
      this.form.type = item.type;
      this.form.title = item.title;
      this.form.placeHolder = item.placeHolder;
      this.form.isManadatory = item.isManadatory;
      this.form.score = item.score;
      const value = JSON.parse(item.value);
      this.details.contractAddress = value.contractAddress;
      this.details.thresholdBalance = value.thresholdBalance;
    },

    add() {
      if (this.$refs.form.validate()) {
        let data = {};
        data.id = "SMARTCONTRACT_" + this.campaign.actions.length;
        data.value = JSON.stringify(this.details);
        data.type = this.form.type;
        data.title = this.form.title;
        data.placeHolder = this.form.placeHolder;
        data.isManadatory = this.form.isManadatory;
        data.score = this.form.score;
        data._id = this.form._id;
        data.campaignName = this.form.campaignName;
        this.list.push(data);
        this.cancel();

        this.$root.$emit("updateEventActions", {
          type: "ADD",
          data: data,
        });
      }
    },
    deleteEntry() {
      const deleteData = this.list[this.selectedIndex];
      this.list.splice(this.selectedIndex, 1);
      this.cancel();

      this.$root.$emit("updateEventActions", {
        type: "DELETE",
        data: deleteData,
      });
    },
    update() {
      this.list[this.selectedIndex].value = JSON.stringify(this.details);
      this.list[this.selectedIndex].type = this.form.type;
      this.list[this.selectedIndex].title = this.form.title;
      this.list[this.selectedIndex].placeHolder = this.form.placeHolder;
      this.list[this.selectedIndex].score = this.form.score;
      this.list[this.selectedIndex].type = this.form.type;
      this.cancel();

      this.$root.$emit("updateEventActions", {
        type: "UPDATE",
        data: this.list[this.selectedIndex],
      });
    },

    cancel() {
      const _this = this;
      setTimeout(function () {
        _this.selectedIndex = 0;
        _this.isEditing = false;
        _this.$refs.form.reset();
      }, 500);
    },
  },
};
</script>
<style lang="css" scoped></style>
