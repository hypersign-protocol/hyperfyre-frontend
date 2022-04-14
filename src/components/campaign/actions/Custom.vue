<template>
  <div>
    <p class="font-20 line-h-24 font-weight-bold">Custom</p>
    <template v-if="list.length > 0">
      <div class="px-5 py-20 border-r-8 event-list mb-20">
        <template v-for="(item, index) in list">
          <v-chip
            :key="index"
            class="font-12 line-h-16 height-28 event-chip mr-2 mb-2"
            dark
            @click="edit(item, index)"
          >
            <v-icon size="15" class="mr-1" v-if="item.type === 'INPUT_TEXT'"
              >mdi-file</v-icon
            >
            <v-icon size="15" class="mr-1" v-if="item.type === 'INPUT_NUMBER'"
              >mdi-numeric</v-icon
            >
            <v-icon
              size="15"
              class="mr-1"
              v-if="item.type === 'INPUT_HYPERLINK'"
              >mdi-link-variant</v-icon
            >
            <v-icon size="15" class="mr-1" v-if="item.type === 'INPUT_DATE'"
              >mdi-calendar</v-icon
            >
            <v-icon size="15" class="mr-1" v-if="item.type === 'HYPERLINK_URL'"
              >mdi-logout-variant</v-icon
            >
            <v-icon size="15" class="mr-1" v-if="item.type === 'INFO_TEXT'"
              >mdi-information-outline</v-icon
            >
            {{ item.title | truncate(10) }}
            <v-icon size="15" class="ml-2">mdi-minus-circle-outline</v-icon>
          </v-chip>
        </template>
      </div>
    </template>
    <v-form ref="form">
      <div class="mb-4">
        <label class="font-14 line-h-17 font-weight-regular mb-2">Type</label>
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
        <label class="font-14 line-h-17 font-weight-regular mb-2">Title</label>
        <v-text-field
          v-model="form.title"
          :rules="rules.title"
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
          v-model="form.placeHolder"
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
          v-model="form.value"
          :rules="rules.value"
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
          v-model="form.value"
          :rules="rules.value"
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
  name: "Custom",
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
        campaignName: "custom",
      },
      rules: {
        title: [(v) => !!v || "Please enter title"],
        type: [(v) => !!v || "Please select social type"],
        value: [(v) => !!v || "Please enter this field"],
        number: [
          (v) => !!v || "This field is required",
          (v) =>
            (v && v > 0) ||
            "Please enter a positive number which is greate than 0",
        ],
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
  methods: {
    edit(item, index) {
      this.isEditing = true;
      this.selectedIndex = index;
      this.form.type = item.type;
      this.form.title = item.title;
      this.form.value = item.value;
      this.form.placeHolder = item.placeHolder;
      this.form.isManadatory = item.isManadatory;
      this.form.score = item.score;
    },

    add() {
      if (this.$refs.form.validate()) {
        let data = {};
        data.id = "CUSTOM_" + this.campaign.actions.length;
        data.value = this.form.value;
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
      this.list[this.selectedIndex].value = this.form.value;
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
