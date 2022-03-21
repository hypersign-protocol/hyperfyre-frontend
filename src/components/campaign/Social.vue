<template>
  <div>
    <p class="font-20 line-h-24 font-weight-bold">Social</p>
    <div class="mb-4">
      <label class="font-14 line-h-17 font-weight-regular mb-2">App</label>
      <v-select
        placeholder="Select social media app"
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
        >Profile Link</label
      >
      <v-text-field
        placeholder="Social Media Profile Link"
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
        placeholder="Enter Place Holder"
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
  name: "Social",

  data() {
    return {
      items: ["Foo", "Bar", "Fizz", "Buzz"],
    };
  },
};
</script>

<style lang="css" scoped></style>
