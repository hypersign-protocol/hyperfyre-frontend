<template>
  <div>
    <p class="font-20 line-h-24 font-weight-bold">Basic Info</p>
    <div class="mb-4">
      <label class="font-14 line-h-17 font-weight-regular mb-2"
        >Campaign Name</label
      >
      <v-text-field
        v-model="campaign.projectName"
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
    <!--  <div class="mb-2">
      <label class="font-14 line-h-17 font-weight-regular mb-2"
        >Campaign Description</label
      >
      <v-textarea
        v-model="campaign.description"
        hide-details="auto"
        dark
        solo
        auto-grow
        rows="4"
        class="form-input"
        placeholder="Enter description here for your campaign"
      ></v-textarea>
    </div> -->
    <div class="d-flex align-center justify-space-between py-2">
      <div>
        <label class="font-14 line-h-17 font-weight-regular mb-2"
          >Start Date</label
        >
        <div class="date-time">
          <v-datetime-picker
            dateFormat="MM/dd/yyyy"
            v-model="fromDate"
            :date-picker-props="dateProps"
            :time-picker-props="timeProps"
          >
            <template slot="dateIcon">
              <v-icon>mdil-calendar</v-icon>
            </template>
            <template slot="timeIcon">
              <v-icon>mdil-clock</v-icon>
            </template>
            <template slot="actions" slot-scope="{ parent }">
              <v-btn
                :ripple="false"
                text
                color="primary"
                @click.native="parent.clearHandler"
              >
                Clear
              </v-btn>
              <v-btn
                :ripple="false"
                text
                color="primary"
                @click="parent.okHandler"
              >
                OK
              </v-btn>
            </template>
          </v-datetime-picker>
        </div>
        <!--  <v-menu
          ref="startMenu"
          v-model="startMenu"
          :close-on-content-click="false"
          :return-value.sync="campaign.fromDate"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              hide-details="auto"
              :value="dateFormat(campaign.fromDate, isEdit)"
              :rules="rules.fromDate"
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
          <v-date-picker v-model="campaign.fromDate" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="startMenu = false">
              Cancel
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.startMenu.save(campaign.fromDate)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-menu> -->
      </div>
      <div>
        <label class="font-14 line-h-17 font-weight-regular mb-2"
          >End Date</label
        >

        <div class="date-time">
          <v-datetime-picker
            dateFormat="MM/dd/yyyy"
            v-model="toDate"
            :date-picker-props="dateProps"
            :time-picker-props="timeProps"
          >
            <template slot="dateIcon">
              <v-icon>mdil-calendar</v-icon>
            </template>
            <template slot="timeIcon">
              <v-icon>mdil-clock</v-icon>
            </template>
            <template slot="actions" slot-scope="{ parent }">
              <v-btn
                :ripple="false"
                text
                color="primary"
                @click.native="parent.clearHandler"
              >
                Clear
              </v-btn>
              <v-btn
                :ripple="false"
                text
                color="primary"
                @click="parent.okHandler"
              >
                OK
              </v-btn>
            </template>
          </v-datetime-picker>
        </div>

        <!-- <v-menu
          ref="endMenu"
          v-model="endMenu"
          :close-on-content-click="false"
          :return-value.sync="campaign.toDate"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              hide-details="auto"
              :value="dateFormat(campaign.toDate, isEdit)"
              :rules="rules.toDate"
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
          <v-date-picker v-model="campaign.toDate" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="endMenu = false">
              Cancel
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.endMenu.save(campaign.toDate)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-menu> -->
      </div>
    </div>
    <div class="mb-2">
      <label class="font-14 line-h-17 font-weight-regular mb-2">Tags</label>
      <v-autocomplete
        v-model="selected"
        :rules="rules.tags"
        :items="tags"
        item-text="tagName"
        item-value="type"
        multiple
        small-chips
        autocomplete="off"
        dark
        flat
        solo
        outlined
        hide-details="auto"
        class="form-input"
        @change="getSelectedTags"
      >
        <template v-slot:selection="data">
          <v-chip
            class="este-chip tag-chip px-3"
            v-bind="data.attrs"
            :input-value="data.selected"
          >
            <span class="pr-2">
              {{ data.item.tagName }}
            </span>
            <v-icon color="white" small @click.stop="removeTags(data.item)">
              mdi-close
            </v-icon>
          </v-chip>
        </template>
        <template slot="append">
          <v-icon>mdi-chevron-down</v-icon>
        </template>
      </v-autocomplete>
    </div>
    <div class="mb-2" v-if="isEdit">
      <label class="font-14 line-h-17 font-weight-regular mb-2">Status</label>
      <v-select
        v-model="campaign.projectStatus"
        :items="campaignStatus"
        item-text="value"
        item-value="id"
        autocomplete="off"
        dark
        flat
        solo
        outlined
        class="form-input"
      >
        <template slot="append">
          <v-icon>mdi-chevron-down</v-icon>
        </template>
      </v-select>
    </div>
    <div class="mb-4">
      <label class="font-14 line-h-17 font-weight-regular mb-2"
        >Banner URL</label
      >
      <v-text-field
        :rules="rules.logoUrl.concat(isLogoUrlValid)"
        v-model="campaign.logoUrl"
        hide-details="auto"
        dark
        flat
        solo
        outlined
        class="form-input"
        placeholder="Please enter banner url"
      ></v-text-field>
      <span class="font-12 line-h-14 font-weight-regular color-grey-300"
        >Banner URL should be in the size of 600x300 pixels</span
      >
    </div>

    <div class="mb-4 d-flex align-center">
      <label class="font-14 line-h-17 font-weight-regular mr-4"
        >Notification</label
      >

      <v-switch
        :ripple="false"
        hide-details="auto"
        v-model="campaign.isNotificaionEnabled"
        flat
        class="mt-0 pt-0 notification-switch"
      ></v-switch>
    </div>

    <!-- <div class="mb-4">
      <label class="font-14 line-h-17 font-weight-regular mb-2"
        >Upload Logo
        <v-icon size="20" color="#979EAF">mdi-help-circle-outline</v-icon>
      </label>
      <div class="d-flex align-center height-48">
        <v-file-input
          v-model="campaign.bannerUrl"
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
          class="height-48 text-capitalize rounded-l-0 rounded-bl-0 letter-s-0"
          >Upload File</v-btn
        >
      </div>
      <span class="font-12 line-h-14 font-weight-regular color-grey-300"
        >Upload a maximum of 2mb file in JPEG / PNG / SVG format</span
      >
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
    </div> -->
  </div>
</template>
<script>
import general from "@/mixins/general";
import { isValidURL } from "@/mixins/fieldValidationMixin";
export default {
  name: "BasicInfo",
  mixins: [general],
  props: {
    campaign: {
      type: Object,
    },
    isEdit: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      dateProps: {
        "no-title": true,
      },
      timeProps: {
        "no-title": true,
      },
      authToken: localStorage.getItem("authToken"),
      startMenu: false,
      tagsDropdownChanged: false,
      endMenu: false,
      rules: {
        name: [(v) => !!v || "Please enter project name"],
        fromDate: [(v) => !!v || "Please enter start date"],
        toDate: [(v) => !!v || "Please enter end date"],
        logoUrl: [(v) => !!v || "Please enter banner url"],
        tags: [(v) => !!v || "Please select tags"],
      },
      tags: [],
      selected: [],
      campaignStatus: [
        {
          id: true,
          value: "Open",
        },
        {
          id: false,
          value: "Close",
        },
      ],
    };
  },
  watch: {
    selected() {
      this.tagsDropdownChanged = true;
    },
  },
  computed: {
    isLogoUrlValid() {
      if (!isValidURL(this.campaign.logoUrl)) {
        return "Please enter a valid url";
      }
      return true;
    },
    fromDate() {
      if (this.campaign.fromDate) {
        return this.dateFormat(this.campaign.fromDate, this.isEdit);
      } else {
        return null;
      }
    },

    toDate() {
      console.log(this.campaign.toDate);
      if (this.campaign.toDate) {
        console.log(this.dateFormat(this.campaign.toDate, this.isEdit));

        return this.dateFormat(this.campaign.toDate, this.isEdit);
      } else {
        return null;
      }
    },
  },
  mounted() {
    this.$root.$on("getBasicInfoFormData", this.emitFilledData);
    this.getTags();
  },

  methods: {
    emitFilledData() {
      this.$root.$emit("getFilledData", this.form);
    },

    getSelectedTags() {
      let _this = this;
      if (this.tagsDropdownChanged) {
        _this.campaign.tags = [];
      }

      this.tags.forEach((el) => {
        _this.selected.forEach((value) => {
          if (el.type === value) {
            _this.campaign.tags.push({ _id: el._id, type: el.type });
          }
        });
      });
    },
    async getTags() {
      const url = `${this.$config.studioServer.BASE_URL}api/v1/tag`;
      const headers = {
        Authorization: `Bearer ${this.authToken}`,
      };
      const resp = await fetch(url, {
        headers,
        method: "GET",
      });

      if (!resp.ok) {
        return this.notifyErr(resp.statusText);
      } else {
        this.tags = await resp.json();
      }
      await this.loadTags();
    },

    async loadTags() {
      console.log(this.isEdit);
      console.log(this.campaign);
      if (this.isEdit) {
        console.log(this.campaign.tags);
        this.selected = this.campaign.tags;
        console.log(this.selected);
      }
    },

    async removeTags(item) {
      const index = this.campaign.tags.findIndex((x) => x.type === item.type);
      if (index >= 0) {
        this.campaign.tags.splice(index, 1);
      } else {
        const i = this.campaign.tags.findIndex((x) => x === item.type);
        if (i >= 0) this.campaign.tags.splice(i, 1);
      }
    },
  },
};
</script>
<style lang="css" scoped></style>
