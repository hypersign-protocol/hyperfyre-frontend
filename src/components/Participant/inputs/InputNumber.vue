<template>
  <v-expansion-panel>
    <v-expansion-panel-header
      class="px-0 font-14 line-h-17 white--text font-weight--medium"
    >
      <div class="d-flex align-center">
        <v-icon size="22" color="white" class="mr-2"> mdi-numeric</v-icon>

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
        <img src="@/assets/images/check.svg" v-if="done" />
      </template>
    </v-expansion-panel-header>
    <v-expansion-panel-content class="font-14 line-h-32 color-grey-100">
      <div class="d-flex flex-column align-center justify-center">
        <v-form
          v-model="data.isManadatory"
          lazy-validation
          ref="form"
          class="text-center w-100"
        >
          <v-text-field
            v-model="data.value"
            :disabled="done"
            hide-details="auto"
            :rules="rules.input"
            dark
            flat
            solo
            outlined
            class="form-input mb-2"
            :placeholder="data.placeHolder"
          ></v-text-field>

          <v-btn
            v-if="!done"
            @click="update"
            :ripple="false"
            text
            class="height-35 letter-s-0 text-capitalize font-16 line-h-19 font-weight--medium white--text"
            depressed
            rounded
            x-large
          >
            Continue
          </v-btn>
        </v-form>
      </div>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>
<script>
import eventBus from "@/eventBus.js";
import notificationMixins from "@/mixins/notificationMixins";
import Messages from "@/utils/messages/participants/en";
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
      done: this.data.isDone,
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
      if (!this.data.value) {
        this.data.value = "";
        this.$store.dispatch("snackbar/SHOW", {
          type: "error",
          message: Messages.EVENT_ACTIONS.INVALID_INPUT,
        });
      } else {
        this.$emit("input", this.data.value);
      }
    },
    disableInput(data) {
      this.done = data;
    },
  },
  mixins: [notificationMixins],
};
</script>
