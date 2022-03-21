<template>
  <div>
    <p class="font-20 line-h-24 font-weight-bold">Wallet</p>
    <div class="mb-4">
      <label class="font-14 line-h-17 font-weight-regular mb-2"
        >Select Blockchain</label
      >
      <v-select
        placeholder="Select Blockchain"
        :items="items"
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
      <label class="font-14 line-h-17 font-weight-regular mb-2">Balance</label>
      <v-text-field
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
      <v-select
        :items="items"
        hide-details="auto"
        dark
        flat
        solo
        outlined
        class="form-input"
      ></v-select>
    </div>
    <div class="d-flex flex-column align-center justify-center">
      <v-btn
        :ripple="false"
        block
        class="mb-6 btn-gradient-outline width-440 height-35 letter-s-0 ma-auto border-r-2 text-capitalize font-16 line-h-19 font-weight-bold color-primary-100"
        depressed
        rounded
        x-large
      >
        Make another
      </v-btn>
      <span class="font-16 line-h-19 font-weight-regular white--text">Or</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "Wallet",

  data() {
    return {
      items: ["Foo", "Bar", "Fizz", "Buzz"],
    };
  },
};
</script>
<style lang="css" scoped></style>
