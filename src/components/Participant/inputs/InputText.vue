<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="px-0 font-12 line-h-15 white--text">
      <div class="d-flex align-center">
        <v-icon size="22" color="white" class="mr-2"> mdi-file</v-icon>

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
          ref="form"
          v-model="data.isManadatory"
          lazy-validation
          class="text-center"
        >
          <v-text-field
            v-model="data.value"
            hide-details="auto"
            :rules="rules.input"
            dark
            flat
            solo
            outlined
            class="form-input mb-2"
            :disabled="done"
            :placeholder="data.placeHolder"
          ></v-text-field>
          <v-btn
            :ripple="false"
            text
            class="text-decoration-underline height-35 letter-s-0 text-capitalize font-16 line-h-19 font-weight--medium white--text"
            depressed
            rounded
            x-large
            v-if="!done"
            @click="update"
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
import { isValidURL, isEmpty } from "@/mixins/fieldValidationMixin";
import notificationMixins from "@/mixins/notificationMixins";
export default {
  name: "InputText",
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
      if (!this.isFieldValid()) {
        this.data.value = "";
        this.$store.dispatch("snackbar/SHOW", {
          type: "error",
          message: "Please fill in the field",
        });
      } else {
        this.$emit("input", this.data.value);
      }
    },
    isFieldValid() {
      if (isEmpty(this.data.value)) {
        return false;
      }
      if (isValidURL(this.data.value)) {
        return false;
      }
      return true;
    },
    disableInput(data) {
      this.done = data;
    },
  },
  mixins: [notificationMixins],
};
</script>
