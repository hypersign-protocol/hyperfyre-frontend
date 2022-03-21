<template>
  <div>
    <p class="font-20 line-h-24 font-weight-bold">Custom</p>
    <div class="mb-4">
      <label class="font-14 line-h-17 font-weight-regular mb-2">Type</label>
      <v-select
        v-model="form.type"
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
      <label class="font-14 line-h-17 font-weight-regular mb-2">Title</label>
      <v-text-field
        v-model="form.title"
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
      <v-textarea
        v-model="form.placeholder"
        hide-details="auto"
        dark
        solo
        auto-grow
        rows="4"
        class="form-input"
        placeholder="Enter description here for your campaign"
      ></v-textarea>
    </div>
    <div class="mb-4" v-if="url">
      <label class="font-14 line-h-17 font-weight-regular mb-2">Url</label>
      <v-text-field
        v-model="form.url"
        hide-details="auto"
        dark
        flat
        solo
        outlined
        class="form-input"
      ></v-text-field>
    </div>
    <div class="mb-4" v-if="info">
      <label class="font-14 line-h-17 font-weight-regular mb-2">Info</label>
      <v-text-field
        v-model="form.info"
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
        hide-details="auto"
        dark
        flat
        solo
        outlined
        class="form-input"
      ></v-text-field>
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
  name: "Custom",

  data() {
    return {
      items: ["Foo", "Bar", "Fizz", "Buzz"],
      types: [
        { text: "Select Input type", value: null },
        { text: "TEXT", value: "INPUT_TEXT" },
        { text: "NUMBER", value: "INPUT_NUMBER" },
        { text: "DATE", value: "INPUT_DATE" },
        { text: "LINK", value: "INPUT_HYPERLINK" },
        { text: "HYPERLINK", value: "HYPERLINK_URL" },
        { text: "INFO", value: "INFO_TEXT" },
      ],

      form: {
        type: null,
        title: null,
        placeholder: null,
        url: null,
        score: null,
        info: null,
      },
    };
  },
  computed: {
    url() {
      return this.form.type === "HYPERLINK_URL" ? true : false;
    },
    info() {
      return this.form.type === "INFO_TEXT" ? true : false;
    },
  },
};
</script>
<style lang="css" scoped></style>
