<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="px-0 font-12 line-h-15 white--text">
      <div class="d-flex align-center">
        <v-icon size="22" color="#313540" class="mr-2" v-if="!done">
          mdi-circle</v-icon
        >

        <v-icon size="22" color="green" class="mr-2" v-if="done">
          mdi-check-circle</v-icon
        >
        {{ data.title }}
      </div>
      <template v-slot:actions>
        <v-chip
          class="black--text font-weight-bold"
          color="green"
          small
          label
          @click="update()"
          v-if="!done"
        >
          +{{ data.score }}
        </v-chip>
        <v-icon color="#fff"> mdi-chevron-down </v-icon>
      </template>
    </v-expansion-panel-header>
    <v-expansion-panel-content class="font-14 line-h-32 color-grey-100">
      <div class="d-flex flex-column align-center justify-center">
        <v-btn
          :href="data.value"
          :disabled="done"
          @click="isClicked()"
          target="_blank"
          :ripple="false"
          class="btn-gradient-outline height-35 letter-s-0 text-capitalize font-16 line-h-19 font-weight--medium white--text mb-4"
          depressed
          rounded
          x-large
        >
          <v-icon size="15" class="mr-1">mdi-logout-variant</v-icon>

          {{ data.value }}
        </v-btn>

        <v-btn
          v-if="!done"
          @click="update"
          :ripple="false"
          class="btn-gradient-outline height-35 letter-s-0 text-capitalize font-16 line-h-19 font-weight--medium white--text"
          depressed
          rounded
          x-large
        >
          Continue
        </v-btn>
      </div>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>
<script>
import eventBus from "@/eventBus.js";
import notificationMixins from "@/mixins/notificationMixins";
import Messages from "@/utils/messages/participants/en";
import { truncate } from "@/mixins/fieldValidationMixin";
export default {
  name: "InputNumber",
  props: {
    idValue: {
      required: true,
    },
    data: {
      required: true,
    },
  },
  data() {
    return {
      visible: false,
      isDisabled: false,
      done: this.data.isDone,
      hasClicked: false,
      rules: {
        input: [(v) => !!v || "Please fill in the field"],
      },
    };
  },
  mounted() {
    eventBus.$on(`disableInput${this.data._id}`, this.disableInput);
  },
  methods: {
    update() {
      if (!this.hasClicked) {
        this.$store.dispatch("snackbar/SHOW", {
          type: "error",
          message: Messages.EVENT_ACTIONS.URL_NOT_VISITED,
        });
      } else {
        this.$emit("input", this.data.value);
      }
    },
    isClicked() {
      this.hasClicked = true;
    },
    disableInput(data) {
      this.done = data;
    },
    truncate1(str, number) {
      return truncate(str, number);
    },
  },
  mixins: [notificationMixins],
};
</script>
