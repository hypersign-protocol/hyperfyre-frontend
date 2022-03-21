<template>
  <div>
    <p class="font-20 line-h-24 font-weight-bold">Basic Info</p>
    <div class="mb-4">
      <label class="font-14 line-h-17 font-weight-regular mb-2"
        >Campaign Name</label
      >
      <v-text-field
        v-model="form.name"
        :rules="rules.name"
        hide-details="auto"
        dark
        flat
        solo
        outlined
        class="form-input"
        placeholder="Campaign Name"
      ></v-text-field>
    </div>
    <div class="mb-4">
      <label class="font-14 line-h-17 font-weight-regular mb-2"
        >Campaign Description</label
      >
      <v-textarea
        v-model="form.description"
        hide-details="auto"
        dark
        solo
        auto-grow
        rows="4"
        class="form-input"
        placeholder="Enter description here for your campaign"
      ></v-textarea>
    </div>
    <div class="d-flex align-center justify-space-between py-4">
      <div>
        <label class="font-14 line-h-17 font-weight-regular mb-2"
          >Start Date</label
        >
        <v-menu
          ref="startMenu"
          v-model="startMenu"
          :close-on-content-click="false"
          :return-value.sync="form.startDate"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              hide-details="auto"
              :value="dateFormat(form.startDate)"
              dark
              flat
              solo
              outlined
              placeholder="mm/dd/yyyy"
              class="form-input date"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="form.startDate" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="startMenu = false">
              Cancel
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.startMenu.save(form.startDate)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
      </div>
      <div>
        <label class="font-14 line-h-17 font-weight-regular mb-2"
          >End Date</label
        >
        <v-menu
          ref="endMenu"
          v-model="endMenu"
          :close-on-content-click="false"
          :return-value.sync="form.endDate"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              hide-details="auto"
              :value="dateFormat(form.endDate)"
              dark
              flat
              solo
              outlined
              placeholder="mm/dd/yyyy"
              class="form-input date"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="form.endDate" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="endMenu = false">
              Cancel
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.endMenu.save(form.endDate)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
      </div>
    </div>
    <div class="mb-4">
      <label class="font-14 line-h-17 font-weight-regular mb-2"
        >Upload Logo
        <v-icon size="20" color="#979EAF">mdi-help-circle-outline</v-icon>
      </label>
      <div class="d-flex align-center height-48">
        <v-file-input
          v-model="form.logoUrl"
          hide-details="auto"
          dark
          flat
          solo
          outlined
          placeholder="Attach file here"
          class="form-input"
          prepend-icon=""
        ></v-file-input>
        <v-btn
          elevation="0"
          color="primary"
          class="height-48 text-capitalize rounded-l-0 rounded-bl-0"
          >Upload File</v-btn
        >
      </div>
      <span class="font-12 line-h-14 font-weight-regular color-grey-300"
        >Upload a maximum of 2mb file in JPEG / PNG / SVG format</span
      >
    </div>
    <div class="mb-4">
      <label class="font-14 line-h-17 font-weight-regular mb-2"
        >Upload Banner
        <v-icon size="20" color="#979EAF">mdi-help-circle-outline</v-icon>
      </label>
      <div class="d-flex align-center height-48">
        <v-file-input
          v-model="form.bannerUrl"
          hide-details="auto"
          dark
          flat
          solo
          outlined
          placeholder="Attach file here"
          class="form-input"
          prepend-icon=""
        ></v-file-input>
        <v-btn
          elevation="0"
          color="primary"
          class="height-48 text-capitalize rounded-l-0 rounded-bl-0"
          >Upload File</v-btn
        >
      </div>
      <span class="font-12 line-h-14 font-weight-regular color-grey-300">
        Upload a maximum of 2mb file in JPEG / PNG / SVG format
        <br />
        Size must be 3000px by 420px height
      </span>
    </div>
    <div class="mb-4">
      <label class="font-14 line-h-17 font-weight-regular mb-2"
        >Background Theme
        <v-icon size="20" color="#979EAF">mdi-help-circle-outline</v-icon>
      </label>
      <div class="d-flex align-center height-48">
        <span class="background-theme outline"></span>
        <span class="background-theme primary"></span>
        <span class="background-theme secondary"></span>
        <span class="background-theme gradient"></span>
      </div>
    </div>
    <div class="mb-4">
      <span class="font-16 line-h-19 font-weight-regular white--text">Or</span>
    </div>
    <div class="mb-4">
      <label class="font-14 line-h-17 font-weight-regular mb-2"
        >Background Banner
        <v-icon size="20" color="#979EAF">mdi-help-circle-outline</v-icon>
      </label>
      <div class="d-flex align-center height-48">
        <span class="font-16 line-h-19 font-weight-regular color-grey-300"
          >https://solawind.com/hellowallpaper.jpg/</span
        >
      </div>
    </div>
  </div>
</template>
<script>
import general from "@/mixins/general";
export default {
  name: "BasicInfo",
  mixins: [general],
  data() {
    return {
      startMenu: false,
      endMenu: false,
      rules: {
        name: [(v) => !!v || "Please enter project name"],
      },
      form: {
        name: null,
        description: null,
        startDate: new Date().toISOString().substr(0, 10),
        endDate: new Date().toISOString().substr(0, 10),
        logoUrl: null,
        bannerUrl: null,
        backgroundTheme: null,
        backgroundBanner: null,
      },
    };
  },
};
</script>
<style lang="css" scoped></style>
