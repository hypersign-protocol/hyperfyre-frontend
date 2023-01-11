<template>
  <div>
    <div
      v-if="eventActionList.length"
      style="overflow-y: auto"
      class="selected-media-wrapper d-flex p-2 mb-4"
    >
      <div
        @click="handleEventActionClick(idx)"
        v-for="(eventAction, idx) in eventActionList"
        v-bind:Key="idx"
      >
        <div
          v-if="!eventActionList[idx].isDeleted"
          :class="
            flash == idx
              ? 'flash card rounded m-1 p-1 d-flex flex-row align-items-center'
              : 'card rounded m-1 p-1 d-flex flex-row align-items-center pointer'
          "
          style="min-width: 120px"
        >
          <span>            
            <i
              style="color: gray"
              v-if="eventAction.type.includes('SUMSUB_KYC')"
              class="fas fa-id-card"
            ></i>
          </span>
          <span>{{ truncate1(eventAction.title, 6) }}</span>
          <span style="color: gray; padding-left: 5px"
            ><i style="" class="fas fa-minus-circle"></i
          ></span>
        </div>
      </div>
    </div>

    <div>
      <div class="row g-3 align-items-center w-100 mt-4">
        <div class="text-left col-lg-3 col-md-3 text-left">
          <label for="type" class="col-form-label"
            >Type<span style="color: red">*</span>:
          </label>
        </div>
        <div class="col-lg-9 col-md-9 px-0">
          <hf-select-drop-down
          :options="options"
          @selected="e =>(selected.type=e)"
          ></hf-select-drop-down>
        </div>
      </div>

      <div
        class="row g-3 align-items-center w-100 mt-4"
      >
        <div class="text-left col-lg-3 col-md-3 text-left">
          <label for="prixeValue" class="col-form-label"
            >Kyc Slug<span style="color: red">*</span>:
          </label>
        </div>
        <div class="col-lg-9 col-md-9 px-0">
          <input
            v-model="selected.slug"
            type="text"
            id="title"
            class="form-control w-100"
            placeholder="Enter KYC slug"
          />
        </div>
      </div>

      <div
        class="row g-3 align-items-center w-100 mt-4"
      >
        <div class="text-left col-lg-3 col-md-3 text-left">
          <label for="title" class="col-form-label"
            >Title<span style="color: red">*</span>:
          </label>
        </div>
        <div class="col-lg-9 col-md-9 px-0">
          <input
            v-model="selected.title"
            type="text"
            id="title"
            class="form-control w-100"
            placeholder="Enter Action Title"
          />
        </div>
      </div>

      <div class="row g-3 align-items-center w-100 mt-4">
        <div class="text-left col-lg-3 col-md-3 text-left">
          <label for="title" class="col-form-label"
            >Score<span style="color: red">*</span>:
          </label>
        </div>
        <div class="col-lg-9 col-md-9 px-0">
          <input
            v-model="selected.score"
            type="number"
            id="title"
            class="form-control w-100"
          />
        </div>
      </div>
      <div
        class="row g-3 justify-content-md-end w-100 mt-4"
        v-if="isCreate == true"
      >
        <div class="col-lg-6 col-md-9 px-0">
          <hf-buttons
          name="Add"
          @executeAction="handleEventActionAdd()"
          ></hf-buttons>
        </div>
      </div>
      <div class="row g-3 justify-content-md-end w-100 mt-4" v-else>
        <div class="col-lg-6 col-md-9 px-0">
          <hf-buttons
          name="Update"
          @executeAction="handleEventActionUpdate()"
          customClass="btn button-theme slight-left-margin"
          ></hf-buttons>
          <hf-buttons
          name="Delete"
          @executeAction="handleEventActionDelete()"
          customClass="btn btn-danger slight-left-margin"
          ></hf-buttons>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.inputInfo {
  color: #808080b5;
  font-size: smaller;
}

.pointer {
  cursor: pointer;
}
.selected-media-wrapper {
  border: 1px dashed;
  max-height: 100px;
  background-color: #f5f5f5;
  border-radius: 10px;
}
.card i {
  cursor: pointer;
}
.card {
  transition: all 0.5s;
}
.card i {
  margin-right: 4px;
}
.flash {
  cursor: pointer;
  background-color: #1faa596b;
  border: 0;
  box-shadow: 2px 0 10px rgb(0 0 0 / 10%);
  animation: flash 0.4s cubic-bezier(1, 0, 0, 1);
}

.fa-minus-circle {
  font-size: 14px;
}
@keyframes flash {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.button-theme {
  background-color: var(--button-bg-color);
  border-collapse: var(--button-bg-color);
  color:var(--button-text-color);;
  border: 0;
}
.slight-left-margin {
  margin-left: 2px;
}
</style>
<script>
import notificationMixins from "../../../../mixins/notificationMixins";
import {
  isEmpty,
  isValidURL,
  truncate
} from "../../../../mixins/fieldValidationMixin";
import Messages from "../../../../utils/messages/admin/en";
import config from "../../../../config"
import HfButtons from "../../../elements/HfButtons.vue"
import EventBus from '../../../../eventBus';
import HfSelectDropDown from "../../../elements/HfSelectDropDown.vue"
export default {
  name: "KycEventActionConfig",
  components: { HfButtons, HfSelectDropDown},
  filters: {
    pretty: function (value) {
      return JSON.stringify(JSON.parse(value), null, 2);
    },
  },
  props: {
    eventActionType: {
      type: String,
    },
    eventActionList: {
      type: Array,
      required: true,
    },
    options: {
      type: Array,
    },
  },
  computed: {
      buttonThemeCss() {
      return {
        '--button-bg-color': config.app.buttonBgColor,
        '--button-text-color':config.app.buttonTextColor
      }
     },
  },
  data() {
    return {
      appName: config.appName,
      flash: null,
      isCreate: true,
      currentSelectedId: 0,
      selected: {
        type: null,
        title: "",
        placeHolder: "",
        isManadatory: true,
        value: "",
        score: 10,
        id: "",
        slug: "",
      },
      project:{},
      hfTgBotId: this.$config.verifierBot.TELEGRAM,
    };
  },
  async mounted() {
    this.$root.$on("callClearFromProject", () => {
      this.clearSelected();
    });
     EventBus.$on("sendProject", (project) => {
      this.project = {...project}
    });
  },
  methods: {
    clearSelected() {
      this.flash = null;
      this.isCreate = true;
      let clearData = {
        type: null,
        title: "",
        placeHolder: "",
        isManadatory: true,
        value: "",
        score: 10,
        slug: "",
      };

      this.selected = clearData;
      this.currentSelectedId = null;
    },
    handleEventActionValidation() {
      let isvalid = true;
      const ToDate = new Date();
      //////
      //// WARNINGS: This is worst way of handeling validation
      //// You should return or break the moment first error occured
      //// But here you are checking all validation every time - waste of time!
      ////////////
          if(this.project.projectStatus ==false){
            isvalid = false;
            return this.notifyErr(Messages.EVENTS.EVENT_CLOSED)
          } if(new Date(this.project.toDate).getTime() <= ToDate.getTime()) {
            isvalid = false
            return this.notifyErr(Messages.EVENTS.EVENT_EXPIRY_DATE)
          }
          if (this.selected.type === null) {
            isvalid = false;
            this.notifyErr(Messages.EVENTS.ACTIONS.KYCACCORDIN.KYC_TYPE);
          } else if (isEmpty(this.selected.slug)) {
            isvalid = false;
            this.notifyErr(Messages.EVENTS.ACTIONS.KYCACCORDIN.KYC_SLUG);
          } else if (isValidURL(this.selected.slug)) {
            isvalid = false;
            this.notifyErr(Messages.EVENTS.ACTIONS.KYCACCORDIN.SLUG_NOT_URL);
          } else if (isEmpty(this.selected.title)) {
            isvalid = false;
            this.notifyErr(Messages.EVENTS.ACTIONS.KYCACCORDIN.KYC_TITLE);
          } else if (isValidURL(this.selected.title)) {
            isvalid = false;
            this.notifyErr(Messages.EVENTS.ACTIONS.TITLE_URL);
          } else if (isNaN(parseInt(this.selected.score))) {
            isvalid = false;
            this.notifyErr(Messages.EVENTS.ACTIONS.SCORE_IS_NUM);
          } else if (parseInt(this.selected.score) < 0) {
            isvalid = false;
            this.notifyErr(Messages.EVENTS.ACTIONS.SCORE_IS_POSITIVE_NUM);
          } else if (this.isCreate === true && this.eventActionList.length > 0 && this.eventActionList.length <= 1) {
            isvalid = false;
            this.notifyErr(Messages.EVENTS.ACTIONS.KYCACCORDIN.DUPLICATE_KYC);
          }

      return isvalid;
    },

    handleEventActionAdd() {
      // Code to Add an Action
      let isvalid = this.handleEventActionValidation();
      if (isvalid) {
        this.selected["id"] =
          this.eventActionType + "_" + this.eventActionList.length;
        this.eventActionList.push(this.selected);
        this.$emit("updateEventActions", {
          type: "ADD",
          data: this.selected,
        });
        EventBus.$emit("resetOption",this.selected.type);
        this.clearSelected();
      }
    },
    handleEventActionDelete() {
      // Code to delete an Action
      const actionToDelete = this.eventActionList[this.currentSelectedId];
      this.eventActionList.splice(this.currentSelectedId, 1);
      this.$emit("updateEventActions", {
        type: "DELETE",
        data: actionToDelete,
      });
      EventBus.$emit("resetOption",this.selected.type);
      this.clearSelected();
      this.isCreate = true;
    },
    handleEventActionUpdate() {
      // Code to update an Action
      let isvalid = this.handleEventActionValidation();
      if (isvalid) {
        this.eventActionList[this.currentSelectedId] = this.selected;
        this.$emit("updateEventActions", {
          type: "UPDATE",
          data: this.selected,
        });
        EventBus.$emit("resetOption",this.selected.type);
        this.clearSelected();
        this.isCreate = true;
      }
    },

    handleEventActionClick(idx) {
      // Code to update an Action
      this.flash = idx;
      let updateData = this.eventActionList[idx];
      this.currentSelectedId = idx;

      this.selected = updateData;
      EventBus.$emit("setOption",this.selected.type);
      this.isCreate = false;
    },

    truncate1(str, number) {
      return truncate(str, number);
    },
  },

  mixins: [notificationMixins],
};
</script>
