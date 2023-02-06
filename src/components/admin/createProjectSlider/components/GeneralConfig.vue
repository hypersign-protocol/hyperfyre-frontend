<style scoped>
.inputInfo {
  color: #808080b5;
  font-size: smaller;
}

.pointer {
  cursor: pointer;
}

.selected-media-wrapper {
  margin-top: 20px;
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
  color: var(--button-text-color);
  border: 0;

}

.datetime-picker {
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  padding: 0.375rem 0.75rem;


}

.slight-left-margin {
  margin-left: 2px;
}

.slight-left-margin-5 {
  margin-left: 5px;
}


input.largerCheckbox {
  transform: scale(1.25)
}
</style>

<template>
  <div>
    <div v-if="isProjectEditing" class="row g-3 align-items-center w-100 mt-4">
      <div class="col-lg-3 col-md-3 text-left">
        <tool-tips infoMessage="Event Id"></tool-tips><label for="eventId" class="col-form-label">
        </label> <label for="did" class="col-form-label">Event Id: </label>
      </div>
      <div class="col-lg-9 col-md-9 px-0">
        <input disabled v-model="project._id" type="text" id="did" class="form-control w-100">
      </div>
    </div>

    <div class="row g-3 align-items-center w-100  mt-4">
      <div class="col-lg-3 col-md-3 text-left">
        <tool-tips infoMessage="Name of the event"></tool-tips><label for="endDate"
          class="col-form-label"></label><label for="projectName" class="col-form-label">Event Name<span
            style="color: red">*</span>: </label>
      </div>
      <div class=" col-lg-9 col-md-9 px-0">
        <input v-model="project.projectName" type="text" placeholder="Demo Giveaway" id="projectName"
          class="form-control w-100">
      </div>
    </div>

    <div v-if="isProjectEditing" class="row g-3 align-items-center w-100  mt-4">
      <div class="col-lg-3 col-md-3 text-left">
        <tool-tips infoMessage="Slug of the event. It should be unique across the platform"></tool-tips><label
          for="slug" class="col-form-label">
        </label><label for="slug" class="col-form-label">Event Slug<span style="color: red">*</span>: </label>
      </div>
      <div class=" col-lg-9 col-md-9 px-0">
        <input v-model="project.slug" type="text" placeholder="demo-giveaway" id="slug" class="form-control w-100">
      </div>
    </div>

    <div v-if="isProjectEditing" class="row g-3 align-items-center w-100 mt-4">
      <div class="col-lg-3 col-md-3 text-left">
        <tool-tips infoMessage="Event status"></tool-tips><label for="projectStatus" class="col-form-label">Status:
        </label>
      </div>
      <div class="col-lg-9 col-md-9 px-0">

        <!-- <select class="form-control" v-model="project.projectStatus">
                      <option value="true" >OPEN</option>
                      <option value="false">CLOSE</option>
                </select > -->
        <b-form-select v-model="project.projectStatus" :options="statusOptions"></b-form-select>
      </div>
    </div>

    <div class="row g-3 align-items-center w-100 mt-4">
      <div class="col-lg-3 col-md-3 text-left">
        <tool-tips infoMessage="Banner image (Maximum size 400kb)"></tool-tips><label for="logoUrl" class="col-form-label">Banner<span style="color: red">*</span>: </label>
      </div>
      <div class="col-lg-9 col-md-9 px-0" style="display: flex">
        <div          
          :disabled="true"
          class="form-control w-100"
        >
          <input
            type="file"
            ref="file"
            @change="fileUploadForBanner"
            accept="image/jpeg, image/png"
            hidden
          />
          <span>Image of aspect ratio 16:9 or 4:3</span>          
     </div>
     <hf-buttons name="" iconClass="fa fa-upload" @executeAction="uploadBtn"
            customClass="btn button-theme slight-left-margin-5"></hf-buttons>
        </div>      
    </div>


    <div class="row g-3 align-items-center w-100 mt-4">

            <div class="col-lg-3 col-md-3 text-left">
                <tool-tips infoMessage="Start date time of the event"></tool-tips><label for="startDate" class="col-form-label">Start Date<span style="color: red">*</span>: </label>
            </div>
            
            <div class="col-lg-9 col-md-9 px-0 datepicker">
              <date-time-picker 
                v-model="project.fromDate"
                :clear-button="true"
                :close-button="true"
                empty-value=""
                format="DDDD HH:mm"
                :today-button="true"
                :time-picker="true" 
                :hour-time="24"     
              ></date-time-picker>
                   
            </div>  
            
    </div>



    <div class="row g-3 align-items-center w-100 mt-4">

            <div class="col-lg-3 col-md-3 text-left">
                <tool-tips infoMessage="End date time of the event"></tool-tips><label for="endDate" class="col-form-label">End Date<span style="color: red">*</span>: </label>
            </div>
            <div class="col-lg-9 col-md-9 px-0">
                <date-time-picker                 
                  v-model="project.toDate"
                  :clear-button="true"
                  :close-button="true"
                  format="DDDD HH:mm"
                  empty-value=""
                  :today-button="true"
                  :hour-time="24" 
                ></date-time-picker>
            </div>  
    </div>

    <!-- Tile -->
    <div v-if="eventActionList.length" style="overflow-y:auto" class="selected-media-wrapper d-flex p-2 mb-4">
      <div @click="handleEventActionClick(idx)" title="Click to delete this tag"
        v-for="(eventAction, idx) in eventActionList" v-bind:Key="idx">
        <div v-if="!eventActionList[idx].isDeleted" :class="flash == idx ?
        'flash card rounded m-1 p-1 d-flex flex-row align-items-center' :
        'card rounded m-1 p-1 d-flex flex-row align-items-center pointer'" style="min-width: 120px">
          <span>
            <i style="color: gray" v-if="eventAction.type.includes('_TAG')" class="fas fa-tags"></i>
          </span>
          <span style="width:90%">{{ getTagText(eventAction.type) }}</span>
          <span style="color: gray;padding-left: 5px"><i class="fas fa-minus-circle"></i></span>
        </div>
      </div>
    </div>

    <!--  Tile End  -->
    <div>
      <div class="row g-3 align-items-center w-100 mt-4">
        <div class=" text-left col-lg-3 col-md-3 text-left">
          <tool-tips infoMessage="Select one or more tags"></tool-tips><label for="type"
            class="col-form-label">Tags<span style="color: red">*</span>: </label>
        </div>
        <div class="col-lg-8 col-md-8 px-0">
          <hf-select-drop-down v-model="selected.type" :options="options"
            @selected="e => (selected.type = e)"></hf-select-drop-down>
        </div>
        <div class="col-lg-1 col-md-1 px-0">
          <!-- <button @click="handleEventActionAdd()" class="btn button-theme slight-left-margin-5"  :style="buttonThemeCss" type="button"> {{eventActionList.includes(selected) ? "Cancel" : "Add"}}</button> -->
          <hf-buttons name="Add" @executeAction="handleEventActionAdd()"
            customClass="btn button-theme slight-left-margin-5"></hf-buttons>
        </div>
      </div>
    </div>

    <div class="row g-3 align-items-center w-100 mt-4">
      <div class="col-lg-3 col-md-3 text-left">
        <tool-tips infoMessage="Notify participants about your upcoming campaign"></tool-tips><label for="endDate"
          class="col-form-label">Notification: </label>
      </div>
      <div class="col-lg-9 col-md-9 px-0">
        <b-form-checkbox v-model="project.isNotificaionEnabled" name="check-button" switch>
        </b-form-checkbox>
      </div>

    </div>


  </div>
</template>

<script>
import config from "../../../../config"
import notificationMixins from "../../../../mixins/notificationMixins"
import Messages from "../../../../utils/messages/admin/en";
import ToolTips from "../../../basic/toolTips.vue";
import HfButtons from "../../../elements/HfButtons.vue"
import HfSelectDropDown from "../../../elements/HfSelectDropDown.vue"
import EventBus from "../../../../eventBus"
export default {
  name: "GeneralConfig",
  components: { ToolTips, HfButtons, HfSelectDropDown },
  computed: {
    buttonThemeCss() {
      return {
        '--button-bg-color': config.app.buttonBgColor,
        '--button-text-color': config.app.buttonTextColor
      }
    }
  },
  data() {
    return {
      idx: null,
      flash: null,
      isCreate: true,
      currentSelectedId: 0,
      themeColorLocal: this.themeColor,
      fontColorLocal: this.fontColor,
      selected: {
        "type": null,
        "id": "",
      },
      statusOptions: [
        { text: "OPEN", value: true },
        { text: "CLOSE", value: false }
      ]
    }
  },
  props: {
    project: {
      type: Object
    },
    themeColorDefault: {
      type: String
    },
    fontColorDefault: {
      type: String
    },
    fontColor: {
      type: String
    },
    themeColor: {
      type: String
    },
    isProjectEditing: {
      type: Boolean
    },
    eventActionType: {
      type: String,
    },
    eventActionList: {
      type: Array,
      required: true,
    },
    options: {
      type: Array
    }
  },
  async mounted() {
    this.$root.$on('callClearFromProject', () => { this.clearSelected() })

  },
  methods: {
    uploadBtn(){
      this.$refs.file.click();
    },
    fileUploadForBanner(e) {
    let file = this.$refs.file.files;
    if ((file = e.target.files[0])) {
      if (file.size > config.banner.bannersize) {
      return  this.notifyErr("File size is more than 400kb");
    }
    const  reader = new  FileReader();
    reader.readAsDataURL(file);
    let  dataUrl;
    reader.onload = (e) => {
    dataUrl = e.target.result;
    let  image = new  Image();
    image.src = dataUrl;
    image.onload = () => {
    let  imageHeight = image.naturalHeight;
    let  imageWidth = image.naturalWidth;
    const  aspectRatio = imageWidth / imageHeight;
    if (aspectRatio != 4 / 3) {
    this.notifyWarning(`Ideal banner aspect ratio should be 16:9 or 4:3 for better rendering`);
    }
    image.height = imageHeight;
    image.width = imageWidth;
    this.project.logoUrl = dataUrl;
    };
  };
  }
},
    getTagText(tagType) {
      const t = this.options.find(x => x.value === tagType)
      return t ? t.text : "";
    },
    handleEventActionAdd() {
      // Code to Add an Action
      let isvalid = this.handleEventActionValidation()
      if (isvalid) {
        this.selected["id"] = this.eventActionType + "_" + this.eventActionList.length;
        this.eventActionList.push(this.selected);
        this.$emit("updateTagActions", {
          type: "ADD",
          data: this.selected
        });
        EventBus.$emit("resetOption", this.selected.type);
        this.clearSelected()
      }

    },
    handleEventActionDelete() {

      // Code to delete an Action
      const actionToDelete = this.eventActionList[this.currentSelectedId];
      this.eventActionList.splice(this.currentSelectedId, 1);
      this.$emit("updateTagActions", {
        type: "DELETE",
        data: actionToDelete
      })
      this.clearSelected();
      this.isCreate = true

    },
    handleEventActionCancel() {
      this.clearSelected();
    },
    clearSelected() {
      this.flash = null;
      this.isCreate = true
      let clearData = {
        "type": null,

      }
      this.selected = clearData
      this.currentSelectedId = null
    },

    handleEventActionValidation() {
      let isvalid = true

      //////
      //// WARNINGS: This is worst way of handeling validation
      //// You should return or break the moment first error occured
      //// But here you are checking all validation every time - waste of time!
      ////////////
      switch (this.eventActionType) {
        case "TAGS":
          if (this.selected.type === null) {
            isvalid = false
            this.notifyErr(Messages.EVENTS.CREATE_EDIT_EVENT.CHOOSE_TAG)
          }
          else if (this.isPresent()) {
            isvalid = false
            this.notifyErr(Messages.EVENTS.CREATE_EDIT_EVENT.DUPLICATE_TAG)
          }
          break;
        default:
          this.notifyErr(Messages.EVENTS.ACTIONS.INVALID_EVENT_TYPE)
      }
      return isvalid
    },
    isPresent() {
      const element = this.eventActionList.find((value) => {
        return value.type === this.selected.type;
      });
      return typeof element === "undefined" ? false : true;

    },
    handleEventActionClick(idx) {
      if (this.eventActionList.length == 1) {
        return this.notifyErr(Messages.EVENTS.CREATE_EDIT_EVENT.ATLEAST_ONE_TAG)
      }
      this.flash = idx
      let updateData = this.eventActionList[idx]
      this.currentSelectedId = idx;

      this.selected = updateData;
      this.isCreate = false;
      this.handleEventActionDelete();
    },
  },
  mixins: [notificationMixins]
};


</script>

