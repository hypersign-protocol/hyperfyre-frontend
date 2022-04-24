<template>
  <div>
    <p class="font-20 line-h-24 font-weight-bold">Prize</p>
    <template v-if="list.length > 0">
      <div class="px-5 py-20 border-r-8 event-list mb-20">
        <template v-for="(item, index) in list">
          <v-chip
            :key="index"
            class="font-12 line-h-16 height-28 event-chip mr-2"
            dark
            @click="edit(item, index)"
          >
            <v-icon size="15" class="mr-1">mdi-gift-outline</v-icon>
            {{ item.title | truncate(10) }}
            <v-icon size="15" class="ml-2">mdi-minus-circle-outline</v-icon>
          </v-chip>
        </template>
      </div>
    </template>
    <v-form ref="form">
      <div class="mb-4">
        <label class="font-14 line-h-17 font-weight-regular mb-2"
          >Select Type <span class="red--text">*</span></label
        >
        <v-autocomplete
          v-model="form.type"
          :rules="rules.type"
          :items="prizeTypes"
          item-text="text"
          item-value="value"
          hide-details="auto"
          dark
          flat
          solo
          outlined
          class="form-input"
          placeholder="Please select prize type"
        >
          <template slot="append">
            <v-icon>mdil-chevron-down</v-icon>
          </template></v-autocomplete
        >
      </div>
      <div class="mb-4">
        <label class="font-14 line-h-17 font-weight-regular mb-2"
          >Name <span class="red--text">*</span></label
        >
        <v-text-field
          v-model="form.title"
          :rules="rules.title"
          placeholder="Please enter prize name, ex: '$5000 worth of $HID '"
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
          >No of Winners <span class="red--text">*</span></label
        >
        <v-text-field
          v-model="details.winners"
          :rules="rules.number"
          placeholder="Please enter the number of winners ex: '1000'"
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
          >Prize per Winner <span class="red--text">*</span></label
        >
        <v-text-field
          v-model="details.prizeValue"
          :rules="rules.prize"
          hide-details="auto"
          dark
          flat
          solo
          outlined
          class="form-input"
          placeholder="Please enter the prize per winner ex: '250 BKS Tokens"
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
import Vue2Filters from "vue2-filters";
import campaign from "@/mixins/campaign";
export default {
  mixins: [Vue2Filters.mixin, campaign],
  name: "Prize",
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
      isEditing: false,
      selectedIndex: 0,
      form: {
        type: null,
        title: "",
        placeHolder: "",
        isManadatory: true,
        value: null,
        score: 10,
        _id: null,
        campaignName: "prize",
      },
      details: {
        winners: null,
        prizeValue: null,
      },
      rules: {
        title: [(v) => !!v || "Please enter title"],
        type: [(v) => !!v || "Please select social type"],
        prize: [(v) => !!v || "Please enter the prize per winner"],
        number: [
          (v) => !!v || "Please enter the number of winners",
          (v) =>
            (v && v > 0 && v <= 999) ||
            "Please enter a positive number between 0 and 999",
        ],
      },
    };
  },
  watch: {
    form: {
      handler: function (val) {
        console.log(val);
        this.$emit("input", { form: "prizeForm", isChanged: true });
      },
      deep: true,
    },
  },
  methods: {
    edit(item, index) {
      this.isEditing = true;
      this.selectedIndex = index;
      this.form.type = item.type;
      this.form.title = item.title;
      const value = JSON.parse(item.value);
      this.details.winners = value.winners;
      this.details.prizeValue = value.prizeValue;
    },

    add() {
      if (this.$refs.form.validate()) {
        let data = {};
        data.id = "PRIZE_" + this.campaign.actions.length;
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

      this.$root.$emit("updateEventActions", {
        type: "DELETE",
        data: deleteData,
      });

      this.cancel();
    },
    update() {
      this.list[this.selectedIndex].value = JSON.stringify(this.details);
      this.list[this.selectedIndex].type = this.form.type;
      this.list[this.selectedIndex].title = this.form.title;
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
        _this.$emit("input", { form: "prizeForm", isChanged: false });
      }, 500);
    },
  },
};
</script>
<style lang="css" scoped></style>
