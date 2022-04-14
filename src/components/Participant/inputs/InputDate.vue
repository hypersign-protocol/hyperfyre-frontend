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
        <v-form
          v-model="data.isManadatory"
          lazy-validation
          ref="form"
          class="text-center"
        >
          <v-menu
            ref="startMenu"
            v-model="startMenu"
            :close-on-content-click="false"
            :return-value.sync="data.value"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                :disabled="done"
                hide-details="auto"
                :value="dateFormat(data.value, false)"
                :rules="rules.input"
                dark
                flat
                solo
                outlined
                placeholder="mm/dd/yyyy"
                class="form-input date mb-2"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="data.value" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="startMenu = false">
                Cancel
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.startMenu.save(data.value)"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>

          <v-btn
            v-if="!done"
            @click="update"
            :ripple="false"
            class="btn-gradient-outline height-35 letter-s-0 text-capitalize font-16 line-h-19 font-weight--medium white--text mr-4"
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
import general from "@/mixins/general";
import { isDate } from "@/mixins/fieldValidationMixin";
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
      startMenu: false,
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
      if (!isDate(this.data.value)) {
        this.data.value = "";
        this.$store.dispatch("snackbar/SHOW", {
          type: "error",
          message: Messages.EVENT_ACTIONS.INPUT_DATE.INVALID_DATE_TIME,
        });
      } else {
        this.$emit("input", this.data.value);
      }
    },
    disableInput(data) {
      this.done = data;
    },
  },
  mixins: [notificationMixins, general],
};
</script>
