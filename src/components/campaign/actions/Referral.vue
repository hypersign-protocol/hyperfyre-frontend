<template>
  <div>
    <p class="font-20 line-h-24 font-weight-bold">Referral</p>
    <div class="mb-4">
      <label class="font-14 line-h-17 font-weight-regular mb-2"
        >Referee Points</label
      >
      <v-text-field
        hide-details="auto"
        v-model="campaign.refereePoint"
        :rules="rules.number"
        dark
        flat
        solo
        outlined
        class="form-input"
        placeholder="Please enter referee points"
      ></v-text-field>
    </div>
    <div class="mb-4">
      <label class="font-14 line-h-17 font-weight-regular mb-2"
        >Referral Points</label
      >
      <v-text-field
        hide-details="auto"
        v-model="campaign.referralPoint"
        :rules="rules.number"
        dark
        flat
        solo
        outlined
        class="form-input"
        placeholder="Please enter referral points"
      ></v-text-field>
    </div>
  </div>
</template>
<script>
import general from "@/mixins/general";
export default {
  name: "Referral",
  mixins: [general],
  props: {
    campaign: {
      type: Object,
    },
  },
  data() {
    return {
      rules: {
        number: [
          (v) => !!v || "Please enter points",
          (v) =>
            (v && v > 0 && v <= 999) ||
            "Please enter a positive number between 0 and 999",
        ],
      },
    };
  },
  watch: {
    form: {
      handler: function () {
        this.$emit("input", { form: "referralForm", isChanged: true });
      },
      deep: true,
    },
  },
  created() {
    this.$root.$on("getReferralFormData", this.emitFilledData);
  },
  methods: {
    emitFilledData() {
      this.$root.$emit("getFilledData", this.form);
    },
  },
};
</script>
<style lang="css" scoped></style>
