<template>
  <div>
    <p class="font-20 line-h-24 font-weight-bold">Social</p>
    <template v-if="list.length > 0">
      <div class="px-5 py-20 border-r-8 event-list mb-20">
        <template v-for="(item, index) in list">
          <v-chip
            :key="index"
            class="font-12 line-h-16 height-28 event-chip mr-2 mb-2"
            dark
            @click="edit(item, index)"
          >
            <v-icon
              size="15"
              class="mr-1"
              v-if="
                item.type === 'TWITTER_FOLLOW' ||
                item.type === 'TWITTER_RETWEET'
              "
              >mdi-twitter</v-icon
            >
            <v-icon size="15" class="mr-1" v-if="item.type === 'DISCORD_JOIN'"
              >mdi-discord</v-icon
            >

            <img
              height="15"
              src="@/assets/images/telegram.png"
              class="mr-1"
              v-if="item.type === 'TELEGRAM_JOIN'"
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
          >Type <span class="red--text">*</span></label
        >
        <v-autocomplete
          v-model="form.type"
          :rules="rules.type"
          :items="socialTypes"
          item-text="text"
          item-value="value"
          hide-details="auto"
          dark
          flat
          solo
          outlined
          class="form-input"
          placeholder="Please select type"
          @change="socialHandleType"
          ><template slot="append">
            <v-icon>mdil-chevron-down</v-icon>
          </template></v-autocomplete
        >
      </div>
      <div class="mb-4">
        <label class="font-14 line-h-17 font-weight-regular mb-2"
          >Title <span class="red--text">*</span></label
        >
        <v-text-field
          v-model="form.title"
          :placeholder="titleText"
          hide-details="auto"
          :rules="rules.title"
          dark
          flat
          solo
          outlined
          class="form-input"
        ></v-text-field>
      </div>
      <div class="mb-4">
        <label class="font-14 line-h-17 font-weight-regular mb-2"
          >{{ link }} <span class="red--text">*</span></label
        >
        <v-text-field
          v-model="form.value"
          :rules="rules.value.concat(isLinkValid)"
          :placeholder="placeHolderText"
          hide-details="auto"
          dark
          flat
          solo
          outlined
          class="form-input"
        ></v-text-field>
        <span
          class="font-12 line-h-14 white--text"
          v-if="form.type === 'TELEGRAM_JOIN'"
          >Make sure to add
          <a
            target="_blank"
            :href="`https://telegram.me/hyperfyre_stage_bot?startgroup=any`"
            >Hyperfyre Telegram Bot</a
          >
          in your public group, for this functionality to work properly.</span
        >
      </div>
      <div class="mb-4">
        <label class="font-14 line-h-17 font-weight-regular mb-2"
          >Score <span class="red--text">*</span></label
        >
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
import {
  isValidURL,
  isdiscordLink,
  isretweetUrl,
} from "@/mixins/fieldValidationMixin";
import campaign from "@/mixins/campaign";
export default {
  name: "Social",
  mixins: [campaign],
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
      rules: {
        title: [
          (v) =>
            !!v || "Please enter title" /* eslint-disable no-useless-escape */,
          (v) =>
            !/(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/.test(
              v
            ) || "Please enter a valid title",
        ],
        type: [(v) => !!v || "Please select social type"],
        value: [(v) => !!v || "Please enter social handle"],
        number: [
          (v) => !!v || "Please enter value",
          (v) =>
            (v && v > 0 && v <= 999) ||
            "Please enter a positive number between 0 and 999",
        ],
      },
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
        campaignName: "social",
      },
      hfTgBotId: this.$config.verifierBot.TELEGRAM,
      placeHolderText: "Please add your handle 'Ex: hypersignchain' without @",
      link: "Social Handle",
    };
  },
  watch: {
    form: {
      handler: function () {
        this.$emit("input", { form: "socialForm", isChanged: true });
      },
      deep: true,
    },
  },
  computed: {
    isLinkValid() {
      if (
        this.form.type != "DISCORD_JOIN" &&
        this.form.type != "TWITTER_RETWEET" &&
        isValidURL(this.form.value)
      ) {
        return "Do not put url in Social Handle";
      } else if (
        this.form.type === "TWITTER_RETWEET" &&
        isretweetUrl(this.form.value)
      ) {
        return "Plase Enter valid retweet url";
      } else if (
        this.form.type === "DISCORD_JOIN" &&
        isdiscordLink(this.form.value)
      ) {
        return "Invalid Invite Link";
      } else {
        return true;
      }
    },
    titleText() {
      if (this.form.type === "DISCORD_JOIN") {
        return `Please add title of action 'Ex: Join Hypersignchain on Discord'`;
      } else if (this.form.type === "TELEGRAM_JOIN") {
        return `Please add title of action 'Ex: Join Hypersignchain on TG.'`;
      } else {
        return `Please add title of action 'Ex: Click to follow Hypersignchain.'`;
      }
    },
  },
  methods: {
    socialHandleType() {
      if (this.form.type === "TWITTER_FOLLOW") {
        this.placeHolderText =
          "Please add your handle 'Ex: hypersignchain' without @";
        this.link = "Social Handle";
        this.rules.value = [
          (v) => !!v || "Please add your handle 'Ex: hypersignchain' without @",
        ];
      } else if (this.form.type === "TWITTER_RETWEET") {
        this.link = "Retweet url";
        this.placeHolderText =
          "Please enter your retweet url Ex: https://twitter.com/tweet/abc";
        this.rules.value = [
          (v) =>
            !!v ||
            "Please enter your retweet url Ex: https://twitter.com/tweet/abc",
        ];
      } else if (this.form.type === "TELEGRAM_JOIN") {
        this.placeHolderText = "Please enter your telegram handle";
        this.link = "Social Handle";
        this.rules.value = [(v) => !!v || "Please enter your telegram handle"];
      } else if (this.form.type === "DISCORD_JOIN") {
        this.link = "Invite Link";
        this.placeHolderText = "Please enter your discord server invite handle";
        this.rules.value = [
          (v) => !!v || "Please enter your discord server invite handle",
        ];
      }
    },
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
        data.id = "SOCIAL_" + this.campaign.actions.length;
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

        _this.form.type = null;
        _this.form.title = null;
        _this.form.value = null;
        _this.form.placeHolder = null;

        // _this.$refs.form.reset();
      }, 500);
    },
  },
};
</script>
<style lang="css" scoped></style>
