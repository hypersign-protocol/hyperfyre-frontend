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
      ></v-text-field>
    </div>
  </div>
</template>
<script>
export default {
  name: "Referral",
  props: {
    campaign: {
      type: Object,
    },
  },
  data() {
    return {
      rules: {
        number: [
          (v) => !!v || "This field is required",
          (v) =>
            (v && v > 0) ||
            "Please enter a positive number which is greate than 0",
        ],
      },
    };
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
