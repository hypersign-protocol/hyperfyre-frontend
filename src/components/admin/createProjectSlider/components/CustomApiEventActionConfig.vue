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
        v-if="showAttribute === true"
      >
        <div class="text-left col-lg-3 col-md-3 text-left">
          <label for="title" class="col-form-label"
            >{{isGet ? 'Query Parameter Fields':'Body Fields'}}<span style="color: red">*</span>:
          </label>
        </div>        
          <div class="col-lg-9 col-md-9 px-0">
           <b-card-header header-tag="header" class="p-1 border-0 accordin-header-theme" :style="headerThemeCss" role="tab">
                    <b-button block v-b-toggle.accordion-11 style="text-decoration:none; color:#212529;" variant="secondary"
                    :aria-expanded="visible ? 'true' : 'false'"
                    @click="visible = !visible"
                    aria-controls="collapse-1"
                    class="text-left border-0 theme-color bg-transparant"
                    title="Create Attribute configuration">Fields Configurations
                    <i :class="!visible ? 'fa fa-arrow-down' : 'fa fa-arrow-up'" style="float:right;"></i>
                    </b-button>
                  </b-card-header>
            <b-collapse id="collapse-1" class="mt-2" v-model="visible" style="padding:10px">
                    <div class="selected-media-wrapper d-flex p-2 mb-4"  style="overflow-y: auto" v-if="apiData.attributes.length > 0">
                      <div v-for="(attr,id) in apiData.attributes" v-bind:key="attr.id">
                        <div :class="
                            attrFlash == attr.id
                            ? 'flash card rounded m-1 p-1 d-flex flex-row align-items-center'
                            : 'card rounded m-1 p-1 d-flex flex-row align-items-center pointer'"
                            @click="handleClick(attr.id)"
                            style="min-width:90px;"
                            :title="attr.fieldName"
                          >
                          {{ attr.fieldName }}
                           <span style="color: gray; padding-left: 5px">
                            <i style="" class="fas fa-minus-circle"></i>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div class="row g-3 align-items-center w-100">
                        <div class="col-lg-3 col-md-3 text-left">
                          
                          <label for="attributeName" class="col-form-label">Field Name<span style="color: red">*</span>: </label>                          
                        </div>
                        <div class="col-lg-9 col-md-9 px-0">
                          <input v-model="attributeData.fieldName" type="text" id="attributeName" class="form-control w-100"
                            placeholder="firstName">
                        </div>
                    </div>

                    <div class="row g-3 align-items-center w-100 mt-4">
                        <div class="col-lg-3 col-md-3 text-left">                        
                        <label for="type" class="col-form-label">Field Type<span style="color: red">*</span>:</label>
                        </div>
                        <div class="col-lg-9 col-md-9 px-0">
                      <hf-select-drop-down
                      :options="attributeFieldTypeOption"
                      @selected=" e =>attributeData.fieldType = e"
                      ></hf-select-drop-down>
                      </div>
                    </div>
                    <div class="row g-3 align-items-center w-100 mt-4">
                        <div class="col-lg-3 col-md-3 text-left">                        
                        <label for="type" class="col-form-label">Field Placeholder:</label>
                        </div>
                        <div class="col-lg-9 col-md-9 px-0">
                      <input v-model="attributeData.fieldPlaceHolder" type="text" id="attributeName" class="form-control w-100"
                            placeholder="Enter Placeholder">
                      </div>
                    </div>
                    <div class="form-group row mt-4" v-if="isAdd">
                      <div class="col-sm-10">                        
                        <hf-buttons 
                          name="Add"                          
                          @executeAction="addAttributesToBox()"
                        ></hf-buttons>
                      </div>                                            
                    </div>
                    <div class="form-group row mt-4" v-else>
                      <div class="col-sm-10">                        
                        <hf-buttons 
                          name="Update"        
                          class="btn btn-primary"
                          @executeAction="updateAttributeData()"
                        ></hf-buttons>
                        <hf-buttons 
                          name="Delete"        
                          customClass="btn btn-danger slight-left-margin"
                          @executeAction="deleteAttribute()"
                        ></hf-buttons>
                      </div>
                    </div>                   
                  </b-collapse>
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
.accordion-header-theme {
  background-color:var(--header-bg-color);
  border: 0;
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
.theme-color{
  color: var(--header-text-color);
}
</style>
<script>
import notificationMixins from "../../../../mixins/notificationMixins";
import {
  ifSpaceExists,
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
      headerThemeCss(){
    return{
      '--header-bg-color': config.app.headerBGColor,
      '--header-text-color':config.app.headerTextColor
      }
  },
  },
  data() {
    return {
      attrFlash:null,
      selectedId:null,
      showAttribute:false,
      isAdd:true,
      attrCounter:0,      
      visible:false,
      counter:0,
      isGet:false,
      isPost:false,
      isBoolean:false,
      isNumber:false,
      appName: config.appName,
      attributeFieldTypeOption:[
        { text: "Return Type", value: null },
        { text: "Boolean", value: "CUSTOM_API_ATTRIBUTE_TYPE_BOOLEAN" },
        { text: "String", value: "CUSTOM_API_ATTRIBUTE_TYPE_STRING" },
        { text: "Number", value: "CUSTOM_API_ATTRIBUTE_TYPE_NUMBER" },
      ],
      booleanCondition:[
        { text: "Boolean Type", value: null },
        { text: "True", value: true },
        { text: "False", value: false },
      ],
      allCondition: [
        { text: "Select Method", value: null },
        { text: "GET", value: "GET" },
        { text: "POST", value: "POST" },
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
      selectedId:null,
      currentSelectedId: 0, 
      apiData:{
        apiEndPoint: "",
        attributes:[],
        header:"",
        apiMethod:null,
        returnType:null,
        condition:null,
        conditionValue:null
      },
      attributeData:{
        fieldName:"",
        fieldType:null,
        fieldPlaceHolder:""
      },
      selected: {
        type:null,  
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
    addAttributesToBox() {
      let isValid = this.handleValidation()
      if(isValid) {
      this.attrCounter +=1
      this.attributeData['id'] = this.attrCounter
      this.apiData.attributes.push(this.attributeData)
      EventBus.$emit("resetOption",this.attributeData.fieldType)
      this.clearAttributeData()
      }
    },
    handleClick(id) {
      this.attrFlash = id
      const found = this.apiData.attributes.find((x)=>x.id === id)
      let updateData = found
      this.selectedId = id
      this.attributeData = { ...updateData}      
      EventBus.$emit("setOption",updateData.fieldType);
      this.isAdd = false
    },
    updateAttributeData() {
      let isValid = this.handleValidation()
      if(isValid) {
      let obj = {
        fieldName: this.attributeData.fieldName,
        fieldType: this.attributeData.fieldType,
        fieldPlaceHolder: this.attributeData.fieldPlaceHolder,
        id: this.selectedId
      }
      const indexToUpdate = this.apiData.attributes.findIndex((x)=>x.id === this.selectedId)
      if(indexToUpdate > -1){
      this.apiData.attributes[indexToUpdate] = obj
      EventBus.$emit("resetOption",this.attributeData.fieldType);
      this.clearAttributeData()
      this.isAdd = true
      }
      }
      
    },
    deleteAttribute() {
      let id = this.selectedId
      const attrIndex = this.apiData.attributes.findIndex((x)=> x.id === id)
      if(attrIndex > -1) {
        this.apiData.attributes.splice(attrIndex,1)
      }
       EventBus.$emit("resetOption",this.attributeData.fieldType);
       this.clearAttributeData()
       this.isAdd = true
    },
    handleValidation() {
      let isValid = true
      if(isEmpty(this.attributeData.fieldName)) {
        isValid = false
        return this.notifyErr('Enter Field Name')
      } else if (isValidURL(this.attributeData.fieldName)) {
        isValid = false
        return this.notifyErr('Enter Valid Field Name')
      } else if (ifSpaceExists(this.attributeData.fieldName)) {
        isValid = false
        return this.notifyErr('Field name should not have space')
      } else if(!this.attributeData.fieldType) {
        isValid = false
        return this.notifyErr('Select Field Type')
      }
      return isValid
    },
    clearAttributeData() {
      this.selectedId = null
      this.attrFlash = null
      this.attributeData = {
        fieldName:"",        
        placeHolder:""
      }
    },
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
      if(e === "GET") {
        this.selected.type = "CUSTOM_API_GET"
        this.showAttribute = true
        this.isGet = true
        this.isPost = false
      } else if(e === "POST") {
        this.selected.type = "CUSTOM_API_POST"
        this.showAttribute = true
        this.isGet = false
        this.isPost = true
      } else{
        this.selected.type = null
        this.showAttribute = false
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
        attributes:[],
        apiMethod:null,
        returnType:null,
        condition:null,
        conditionValue:null
      }
      this.flash = null;
      this.isCreate = true;
      this.selected = {
        type:null,  
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
          } else if (this.apiData.returnType === null) {
            isvalid = false;
            this.notifyErr('Select Return Type')
          } else if(this.apiData.condition === null) {
              isvalid = false;
              this.notifyErr('Select Condition')
            } else if (this.apiData.conditionValue === null || this.apiData.conditionValue === "") {
              isvalid = false;
              this.notifyErr('Enter Condition value')
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
      this.clearAttributeData()
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
