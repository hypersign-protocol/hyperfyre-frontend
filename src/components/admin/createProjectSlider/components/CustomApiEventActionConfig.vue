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
            <img
              style="padding-right: 5px"
              src="../../../../assets/filled-rest-api-50.png"          
              height="22px"
            />  
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

      <div
        class="row g-3 align-items-center w-100 mt-4"
      >
        <div class="text-left col-lg-3 col-md-3 text-left">
          <label for="title" class="col-form-label"
            >API Endpoint<span style="color: red">*</span>:
          </label>
        </div>
        <div class="col-lg-9 col-md-9 px-0">
          <input
            v-model="apiData.apiEndPoint"    
            type="text"
            id="title"
            class="form-control w-100"
            placeholder="Enter Api Endpoint"
          />
          <span class="inputInfo"
            >Make sure to whitelist <span style="color:#3457D5;font-weight: bold;">https://app.fyre.hypersign.id</span>
            url on your server.</span
          >
        </div>
      </div>

     <div
        class="row g-3 align-items-center w-100 mt-4"
      >
        <div class="text-left col-lg-3 col-md-3 text-left">
          <label for="title" class="col-form-label"
            >Header (Optional):
          </label>
        </div>
        <div class="col-lg-9 col-md-9 px-0">
          <textarea
          class="form-control w-100"
          name="header"
          id="title"
          cols="30"
          rows="5"
          v-model="apiData.header"
          placeholder =
          "Enter Header in JSON format"
          ></textarea>
        </div>
      </div>

      <div
        class="row g-3 align-items-center w-100 mt-4"
      >
        <div class="text-left col-lg-3 col-md-3 text-left">
          <label for="type" class="col-form-label"
            >API Method<span style="color: red">*</span>:
          </label>
        </div>
        <div class="col-lg-9 col-md-9 px-0">
          <hf-select-drop-down
          :options="allCondition"
          @selected=" e =>inputMethod(e)"          
          ></hf-select-drop-down>
        </div>
      </div>

      <div
        class="row g-3 align-items-center w-100 mt-4"
        v-if="isGet === true"
      >
        <div class="text-left col-lg-3 col-md-3 text-left">
          <label for="title" class="col-form-label"
            >Query Parameter<span style="color: red">*</span>:
          </label>
        </div>        
          <div class="col-lg-9 col-md-9 px-0">
           <input
            v-model="apiData.queryParamValue"
            type="text"
            id="title"
            class="form-control w-100"
            placeholder="Enter Query parameter"
          />         
        </div>
      </div>

      <div
        class="row g-3 align-items-center w-100 mt-4"
        v-if="isPost === true"
      >
        <div class="text-left col-lg-3 col-md-3 text-left">
          <label for="title" class="col-form-label"
            >Body<span style="color: red">*</span>:
          </label>
        </div>        
          <div class="col-lg-9 col-md-9 px-0">
          <textarea
          class="form-control w-100"
          name="bodyFormat"
          id="title"
          cols="30"
          rows="5"
          v-model="apiData.bodyFormat"
          placeholder =
          "Enter body in JSON format"
          ></textarea>     
        </div>
      </div>

      <div
        class="row g-3 align-items-center w-100 mt-4"
      >
        <div class="text-left col-lg-3 col-md-3 text-left">
          <label for="title" class="col-form-label"
            >Condition<span style="color: red">*</span>:
          </label>
        </div>        
          <div class="col-lg-3 col-md-2 px-0">
          <hf-select-drop-down
          :options="returnTypeOption"
          @selected=" e =>inputReturnType(e)"  

          ></hf-select-drop-down>          
        </div>
        <div class="col-lg-3 col-md-2 px-0">
          <hf-select-drop-down
          :options="condtionOption"
          @selected=" e =>inputCondtion(e)"
          ></hf-select-drop-down>    
        </div>
        <div class="col-lg-3 col-md-2 px-0" v-show="isBoolean === true">
          <hf-select-drop-down
          :options="booleanCondition"
          @selected=" e =>inputBooleanCondtion(e)"
          ></hf-select-drop-down>
        </div>
        <div class="col-lg-3 col-md-2 px-0" v-show="isBoolean === false">
          <input
            v-model="apiData.conditionValue"
            :type="isNumber ? 'number' :'text'"
            id="title"
            class="form-control w-100"
            placeholder="Enter condition value"
          />    
        </div>
      </div>
      <div class="row g-3 align-items-center w-100 mt-4">
        <div class="text-left col-lg-3 col-md-3 text-left">
          <label for="type" class="col-form-label"
            >Placeholder<span style="color: red">*</span>:
          </label>
        </div>
        <div class="col-lg-9 col-md-9 px-0">
          <input
            v-model="selected.placeHolder"     
            type="text"
            id="title"
            class="form-control w-100"
            placeholder="Enter Placeholder for the user input"
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
  truncate,
} from "../../../../mixins/fieldValidationMixin";
import Messages from "../../../../utils/messages/admin/en";
import config from "../../../../config"
import HfButtons from "../../../elements/HfButtons.vue"
import EventBus from '../../../../eventBus';
import HfSelectDropDown from "../../../elements/HfSelectDropDown.vue"
import validator from 'validator';
export default {
  name: "CustomAPIEventActionConfig",
  components: { HfButtons, HfSelectDropDown},
  props: {
    eventActionType: {
      type: String,
    },
    eventActionList: {
      type: Array,
      required: true,
    },
    // options: {
    //   type: Array,
    // },
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
      counter:0,
      isGet:false,
      isPost:false,
      isBoolean:false,
      isNumber:false,
      appName: config.appName,
      booleanCondition:[
        { text: "Boolean Type", value: null },
        { text: "True", value: true },
        { text: "False", value: false },
      ],
      allCondition: [
        { text: "Select Method", value: null },
        { text: "Get", value: "CUSTOM_API_GET" },
        { text: "Post", value: "CUSTOM_API_POST" },
      ],
      returnTypeOption:[
        { text: "Return Type", value: null },
        { text: "Boolean", value: "CUSTOM_API_RETURN_TYPE_BOOLEAN" },
        { text: "String", value: "CUSTOM_API_RETURN_TYPE_STRING" },
        { text: "Number", value: "CUSTOM_API_RETURN_TYPE_NUMBER" },      
      ],
      condtionOption:[
        { text: "Condition", value: null },
        { text: "===", value: "===" },
        { text: "<", value: "<" },
        { text: ">", value: ">" },
        { text: ">=", value: ">=" },
        { text: "<=", value: "<=" },
      ],      
      flash: null,
      isCreate: true,
      currentSelectedId: 0, 
      apiData:{
        apiEndPoint: "",
        queryParamValue:"",
        header:"",
        bodyFormat:"",
        apiMethod:null,
        returnType:null,
        condition:null,
        conditionValue:null
      },    
      selected: {
        type:"CUSTOM_API",  
        title: "",
        placeHolder:"",
        isManadatory: true,
        score: 10,
        id: "",
        slug: "",
        value:""
      },
      project:{},
      hfTgBotId: this.$config.verifierBot.TELEGRAM,
    };
  },
  async mounted() {
    this.$root.$on("callClearFromProject", () => {
      this.clearSelected();
      this.counter = 0
    });
     EventBus.$on("sendProject", (project) => {
      this.project = {...project}
    });
  },
  methods: {
    inputBooleanCondtion(e) {      
      this.apiData.conditionValue = e
    },
    inputCondtion(e){
      this.apiData.condition = e
    },
    inputReturnType(e) {
      switch(e){
        case "CUSTOM_API_RETURN_TYPE_BOOLEAN": {
          this.apiData.conditionValue = null
          this.isBoolean = true          
          this.condtionOption =[
        { text: "Condition", value: null },
        { text: "===", value: "===" },
        ]
        break;
        }
        case "CUSTOM_API_RETURN_TYPE_NUMBER":{
          this.isBoolean = false
          this.isNumber = true
          this.condtionOption=[
            { text: "Condition", value: null },
            { text: "===", value: "===" },
            { text: "<", value: "<" },
            { text: ">", value: ">" },
            { text: ">=", value: ">=" },
            { text: "<=", value: "<=" },
          ]
        }
        break;
        case "CUSTOM_API_RETURN_TYPE_STRING":{          
          this.isBoolean = false
          this.isNumber = false
          this.condtionOption=[
            { text: "Condition", value: null },
            { text: "===", value: "===" },            
          ]
        }
        break;
        default:{
          this.isBoolean = false
          this.isNumber = false
          this.condtionOption=[
            { text: "Condition", value: null },
            { text: "===", value: "===" },
            { text: "<", value: "<" },
            { text: ">", value: ">" },
            { text: ">=", value: ">=" },
            { text: "<=", value: "<=" },
          ]
        }
      }
      this.apiData.returnType = e
    },
    inputMethod(e){
      if(e === "CUSTOM_API_GET") {
        this.isPost = false
        this.isGet = true
      } else if(e === "CUSTOM_API_POST") {
        this.isGet = false
        this.isPost = true
      } else{
        this.isGet = false
        this.isPost = false
      }
      this.apiData.apiMethod = e
    },
    clearSelected() {
      this.isGet = false,
      this.isPost = false,
      this.isBoolean = false,
      this.isNumber = false,
      this.apiData = {
        apiEndPoint: "",      
        header:"",
        queryParamValue:"",
        bodyFormat:"",
        apiMethod:null,
        returnType:null,
        condition:null,
        conditionValue:null
      }
      this.flash = null;
      this.isCreate = true;
      this.selected = {
        type:"CUSTOM_API",  
        title: "",
        placeHolder:"",
        isManadatory: true,
        score: 10,
        id: "",
        slug: "",
        value:""
      };
    },
    handleEventActionValidation() {
      let isvalid = true;

      //////
      //// WARNINGS: This is worst way of handeling validation
      //// You should return or break the moment first error occured
      //// But here you are checking all validation every time - waste of time!
      ////////////
          if(this.project.projectStatus ==false){
            isvalid = false;
            return this.notifyErr(Messages.EVENTS.EVENT_CLOSED)
          }
         if (isEmpty(this.selected.title)) {
            isvalid = false;
            this.notifyErr(Messages.EVENTS.ACTIONS.EMPTY_TITLE);
          } else if(isEmpty(this.apiData.apiEndPoint)) {
            isvalid = false;
            this.notifyErr('Api Endpoint should not be empty');
          } else if (!this.apiData.apiEndPoint.includes('http://localhost') && !validator.isURL(this.apiData.apiEndPoint)) {
            isvalid = false;
            this.notifyErr('enter valid endpoint');
          } else if (this.apiData.header!=="" && !this.isValidJson(this.apiData.header)) {
            isvalid = false;
            this.notifyErr("Enter header in JSON format");
          } else if (this.apiData.apiMethod === null) {
            isvalid = false;
            this.notifyErr('Select API Method')
          } else if (this.apiData.apiMethod === "CUSTOM_API_GET" && isEmpty(this.apiData.queryParamValue)) {
            isvalid = false;
            this.notifyErr('Enter Query Parameter')
          } else if (this.apiData.apiMethod === "CUSTOM_API_POST") {
            if(isEmpty(this.apiData.bodyFormat)){
            isvalid = false;
            this.notifyErr('Enter body format')
            }  else if (!this.isValidJson(this.apiData.bodyFormat)) {
              isvalid = false;
              this.notifyErr('Enter Body in JSON format')
            }
          } else if (this.apiData.returnType === null) {
            isvalid = false;
            this.notifyErr('Select Return Type')
          } else if(this.apiData.condition === null) {
              isvalid = false;
              this.notifyErr('Select Condition')
            } else if (this.apiData.conditionValue === null || isEmpty(this.apiData.conditionValue)) {
              isvalid = false;
              this.notifyErr('Enter Condition value')
            } else if (isEmpty(this.selected.placeHolder)) {
            isvalid = false;
            this.notifyErr('Enter Placeholder')
          }
      return isvalid;
    },
    isValidJson(input){
      try {
        JSON.parse(input);
    } catch (e) {
        return false;
    }
    return true;
    },
    handleEventActionAdd() {
      // Code to Add an Action
      let isvalid = this.handleEventActionValidation();
      if (isvalid) {  
        this.counter +=1
        this.selected.value = JSON.stringify(this.apiData);     
        this.selected["id"] = this.counter
        this.eventActionList.push(this.selected);
        this.$emit("updateEventActions", {
          type: "ADD",
          data: this.selected,
        });
        EventBus.$emit("resetOption",this.apiData.condition);
        EventBus.$emit("resetOption",this.apiData.returnType);
        EventBus.$emit("resetOption",this.apiData.apiMethod);
        if(this.apiData.returnType === "CUSTOM_API_RETURN_TYPE_BOOLEAN") {
        this.isBoolean = true
        EventBus.$emit("resetOption",this.apiData.conditionValue);
        }
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
        EventBus.$emit("resetOption",this.apiData.condition);
        EventBus.$emit("resetOption",this.apiData.returnType);
        EventBus.$emit("resetOption",this.apiData.apiMethod);
        if(this.apiData.returnType === "CUSTOM_API_RETURN_TYPE_BOOLEAN") {
        this.isBoolean = true
        EventBus.$emit("resetOption",this.apiData.conditionValue);
        } 
      this.clearSelected();
      this.isCreate = true;
    },
    handleEventActionUpdate() {
      // Code to update an Action
      let isvalid = this.handleEventActionValidation();
      if (isvalid) {
        this.selected.value = JSON.stringify(this.apiData);
        this.eventActionList[this.currentSelectedId] = this.selected;
        this.$emit("updateEventActions", {
          type: "UPDATE",
          data: this.selected,
        });
        EventBus.$emit("resetOption",this.apiData.condition);
        EventBus.$emit("resetOption",this.apiData.returnType);
        EventBus.$emit("resetOption",this.apiData.apiMethod);
        if(this.apiData.returnType === "CUSTOM_API_RETURN_TYPE_BOOLEAN") {
        this.isBoolean = true
        EventBus.$emit("resetOption",this.apiData.conditionValue);
        }        
        this.clearSelected();
        this.isCreate = true;
      }
    },

    handleEventActionClick(idx) {
      this.clearSelected()
      this.isCreate = false;
      // Code to update an Action
      this.flash = idx;
      let updateData = this.eventActionList[idx];
      this.currentSelectedId = idx;
      this.selected = updateData;
      this.apiData = { ...JSON.parse(this.selected.value)}
      EventBus.$emit("setOption",this.apiData.apiMethod);
      EventBus.$emit("setOption",this.apiData.returnType);
      EventBus.$emit("setOption",this.apiData.condition);
      if(this.apiData.returnType === "CUSTOM_API_RETURN_TYPE_BOOLEAN") {
        this.isBoolean = true
        EventBus.$emit("setOption",this.apiData.conditionValue);
      }
    },

    truncate1(str, number) {
      return truncate(str, number);
    },
  },

  mixins: [notificationMixins],
};
</script>
