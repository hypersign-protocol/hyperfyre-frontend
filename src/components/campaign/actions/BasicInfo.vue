<template>
  <div>
    <p class="font-20 line-h-24 font-weight-bold">Basic Info</p>
    <div class="mb-4">
      <label class="font-14 line-h-17 font-weight-regular mb-2"
        >Campaign Name <span class="red--text">*</span></label
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
    <div class="mb-4 d-flex align-center justify-space-between py-2">
      <div>
        <label class="font-14 line-h-17 font-weight-regular mb-2"
          >Start Date <span class="red--text">*</span></label
        >
        <div class="date-time mb-2">
          <v-datetime-picker
            dateFormat="MM/dd/yyyy"
            v-model="fromDate"
            :date-picker-props="dateProps"
            :time-picker-props="timeProps"
            placeholder="Please enter start date"
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
                class="font-12 line-h-14 color-primary-100 text-capitalize letter-s-0"
              >
                Clear
              </v-btn>
              <v-btn
                :ripple="false"
                text
                color="primary"
                @click="parent.okHandler"
                class="font-12 line-h-14 color-primary-100 text-capitalize letter-s-0"
              >
                OK
              </v-btn>
            </template>
          </v-datetime-picker>
        </div>
      </div>
      <div>
        <label class="font-14 line-h-17 font-weight-regular mb-2"
          >End Date <span class="red--text">*</span></label
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
                class="font-12 line-h-14 color-primary-100 text-capitalize letter-s-0"
              >
                Clear
              </v-btn>
              <v-btn
                :ripple="false"
                text
                color="primary"
                @click="parent.okHandler"
                class="font-12 line-h-14 color-primary-100 text-capitalize letter-s-0"
              >
                OK
              </v-btn>
            </template>
          </v-datetime-picker>
        </div>
      </div>
    </div>
    <div class="mb-2">
      <label class="font-14 line-h-17 font-weight-regular mb-2"
        >Tags <span class="red--text">*</span></label
      >
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
        placeholder="Please select tags"
      >
        <template v-slot:selection="data">
          <v-chip
            class="height-25 font-12 px-3"
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
          <v-icon>mdil-chevron-down</v-icon>
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
        >Banner URL <span class="red--text">*</span></label
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
        "no-title": false,
      },
      timeProps: {
        "no-title": false,
        format: "24hr",
      },
      user: JSON.parse(localStorage.getItem("user")),
      accessUser: JSON.parse(localStorage.getItem("accessuser")),
      authToken: localStorage.getItem("authToken"),
      accessToken: localStorage.getItem("accessToken"),
      startMenu: false,
      tagsDropdownChanged: false,
      endMenu: false,
      rules: {
        name: [(v) => !!v || "Please enter project name"],
        fromDate: [(v) => !!v || "Please enter start date"],
        toDate: [(v) => !!v || "Please enter end date"],
        logoUrl: [(v) => !!v || "Please enter banner url"],
        tags: [(v) => !!(v && v.length) || "Please select tags"],
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
      fromDate: null,
      toDate: null,
    };
  },
  watch: {
    selected() {
      this.tagsDropdownChanged = true;
    },
    fromDate(val) {
      this.campaign.fromDate = val;
    },
    toDate(val) {
      this.campaign.toDate = val;
    },
  },
  computed: {
    isLogoUrlValid() {
      if (!isValidURL(this.campaign.logoUrl)) {
        return "Please enter a valid url";
      }
      return true;
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
      if (this.isEdit) {
        this.selected = this.campaign.tags;
        this.fromDate = new Date(this.campaign.fromDate);
        this.toDate = new Date(this.campaign.toDate);
      }
    },

    async removeTags(item) {
      const index = this.selected.findIndex((x) => x.type === item.type);
      if (index >= 0) {
        this.selected.splice(index, 1);
      } else {
        const i = this.selected.findIndex((x) => x === item.type);
        if (i >= 0) this.selected.splice(i, 1);
      }
    },
  },
};
</script>
<style lang="css" scoped></style>
