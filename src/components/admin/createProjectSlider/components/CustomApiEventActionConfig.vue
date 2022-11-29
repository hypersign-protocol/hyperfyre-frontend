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
              height="18px"
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
          <tool-tips infoMessage="Title of the action which participant will see in the form"></tool-tips>
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
          <tool-tips infoMessage="API Endpoint which Fyre server will call to verify user's input"></tool-tips>
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
            placeholder="http://yourdomain.com/api/path"
          />
          <span class="inputInfo"
            >Make sure to whitelist [<span style="color:#3457D5;font-weight: bold;">https://app.fyre.hypersign.id</span>]
            URL on your server and your API endpoint is publicly accessible.</span
          >
        </div>
      </div>

      <div
        class="row g-3 align-items-center w-100 mt-4"
      >
        <div class="text-left col-lg-3 col-md-3 text-left">
          <tool-tips infoMessage="Method (GET/POST) of the API"></tool-tips>
          <label for="type" class="col-form-label"
            >HTTP Method<span style="color: red">*</span>:
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
          <tool-tips infoMessage="Query or body parameter fields of the API"></tool-tips>
          <label for="title" class="col-form-label"
            >Fields<span style="color: red">*</span>:
          </label>
        </div>        
          <div class="col-lg-9 col-md-9 px-0 card">
           <b-card-header header-tag="header" class="p-1 border-0 accordin-header theme-color" role="tab">
                    <b-button block v-b-toggle.accordion-11 style="text-decoration:none; color:#212529;" variant="info"
                    :aria-expanded="visible ? 'true' : 'false'"
                    @click="visible = !visible"
                    aria-controls="collapse-1"
                    class="text-left border-0 theme-color bg-transparant"
                    title="Create Attribute configuration">Fields Configurations
                    <i :class="!visible ? 'fa fa-arrow-down' : 'fa fa-arrow-up'" style="float:right;"></i>
                    </b-button>
                  </b-card-header>
          <b-collapse id="collapse-1" class="mt-2" v-model="visible" style="padding:10px" role="tabpanel">          
          <b-card no-body
          class="p-2">
              <b-tabs
              card
              
              class="mt-1"  
              >
              <b-tab
              title="Query Params"
              active
              >
              <b-card-text>
                    <div class="selected-media-wrapper d-flex p-2 mb-4 m-1"  style="overflow-y: auto" v-if="queryParameterAttributeArray.length > 0">
                      <div v-for="(attr,fieldName) in queryParameterAttributeArray" v-bind:key="attr.fieldName">
                        <div :class="
                            querryAttrFlash == attr.fieldName
                            ? 'flash card rounded m-1 p-1 d-flex flex-row align-items-center'
                            : 'card rounded m-1 p-1 d-flex flex-row align-items-center pointer'"
                            @click="handleClickQueryParam(attr.fieldName)"
                            style="min-width:90px;"
                            :title="attr.fieldName"
                          >
                          {{ truncate1(attr.fieldName,6) }}
                           <span style="color: gray; padding-left: 5px">
                            <i style="" class="fas fa-minus-circle"></i>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div class="row g-3 align-items-center w-100">
                        <div class="col-lg-3 col-md-3 text-left">
                          <tool-tips infoMessage="Field name"></tool-tips>
                          <label for="attributeName" class="col-form-label">Name<span style="color: red">*</span>: </label>                          
                        </div>
                        <div class="col-lg-9 col-md-9 px-0">
                          <input v-model="queryParamAttributeData.fieldName" type="text" id="attributeName" class="form-control w-100"
                            placeholder="Field name e.g userId">
                        </div>
                    </div>

                    <div class="row g-3 align-items-center w-100 mt-4">
                        <div class="col-lg-3 col-md-3 text-left">                        
                        <tool-tips infoMessage="Field Datatype"></tool-tips>
                        <label for="type" class="col-form-label">Type<span style="color: red">*</span>:</label>
                        </div>
                        <div class="col-lg-9 col-md-9 px-0">
                      <b-form-select
                      v-model="queryParamAttributeData.fieldType"
                      :options="attributeFieldTypeOption"
                      @input="showQueryParamChainIDFieldOnSelect"
                      ></b-form-select>
                      </div>
                    </div>
                    <div class="row g-3 align-items-center w-100 mt-4" v-if="showQueryAttrChainIdField">
                        <div class="col-lg-3 col-md-3 text-left">
                          <tool-tips infoMessage="Chain Id of cosmos blockchain"></tool-tips>
                          <label for="chainId" class="col-form-label">Chain ID<span style="color: red">*</span>: </label>                          
                        </div>
                        <div class="col-lg-9 col-md-9 px-0">
                          <input v-model="chainId" type="text" id="chainId" class="form-control w-100"
                            placeholder="cosmos-hub1">
                        </div>
                    </div>
                    <div class="row g-3 align-items-center w-100 mt-4">
                        <div class="col-lg-3 col-md-3 text-left">                        
                        <tool-tips infoMessage="Field label for user input"></tool-tips>
                        <label for="type" class="col-form-label">Label<span style="color: red">*</span>:</label>
                        </div>
                        <div class="col-lg-9 col-md-9 px-0">
                      <input v-model="queryParamAttributeData.fieldPlaceHolder" type="text" id="attributeName" class="form-control w-100"
                            placeholder="Field label for user input">
                      </div>
                    </div>
                    <div class="form-group row mt-4" v-if="isAddForQuerry">
                      <div class="col-sm-10">                        
                        <hf-buttons 
                          name="Add"                          
                          @executeAction="addQuerryParamAttributesToBox()"
                        ></hf-buttons>
                      </div>                                            
                    </div>
                    <div class="form-group row mt-4" v-else>
                      <div class="col-sm-10">                        
                        <hf-buttons 
                          name="Update"        
                          class="btn btn-primary"
                          @executeAction="updateQueryParamAttributeData()"
                        ></hf-buttons>
                        <hf-buttons 
                          name="Delete"        
                          customClass="btn btn-danger slight-left-margin"
                          @executeAction="deleteQueryParamAttributeData()"
                        ></hf-buttons>
                      </div>
                    </div>
                    </b-card-text>
                    </b-tab>
                    <b-tab
              title="Body Params"              
              active
              v-if="!isGet"
              >
              <b-card-text>
              <div class="selected-media-wrapper d-flex p-2 mb-4"  style="overflow-y: auto" v-if="bodyParameterAttributeArray.length > 0">
                      <div v-for="(attr,fieldName) in bodyParameterAttributeArray" v-bind:key="attr.fieldName">
                        <div :class="
                            attrFlash == attr.fieldName
                            ? 'flash card rounded m-1 p-1 d-flex flex-row align-items-center'
                            : 'card rounded m-1 p-1 d-flex flex-row align-items-center pointer'"
                            @click="handleClickBodyParam(attr.fieldName)"
                            style="min-width:90px;"
                            :title="attr.fieldName"
                          >
                          {{ truncate1(attr.fieldName,6) }}
                           <span style="color: gray; padding-left: 5px">
                            <i style="" class="fas fa-minus-circle"></i>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div class="row g-3 align-items-center w-100">
                        <div class="col-lg-3 col-md-3 text-left">
                          <tool-tips infoMessage="Field name"></tool-tips>
                          <label for="attributeName" class="col-form-label">Name<span style="color: red">*</span>: </label>                          
                        </div>
                        <div class="col-lg-9 col-md-9 px-0">
                          <input v-model="attributeData.fieldName" type="text" id="attributeName" class="form-control w-100"
                            placeholder="Field name e.g userId">
                        </div>
                    </div>

                    <div class="row g-3 align-items-center w-100 mt-4">
                        <div class="col-lg-3 col-md-3 text-left">                        
                        <tool-tips infoMessage="Field Datatype"></tool-tips>
                        <label for="type" class="col-form-label">Type<span style="color: red">*</span>:</label>
                        </div>
                        <div class="col-lg-9 col-md-9 px-0">
                      <b-form-select
                      v-model="attributeData.fieldType"
                      :options="attributeFieldTypeOption"
                      @input="showBodyParamChainIDFieldOnSelect"
                      ></b-form-select>
                      </div>
                    </div>
                     <div class="row g-3 align-items-center w-100 mt-4" v-if="showBodyAttrChainIdField">
                        <div class="col-lg-3 col-md-3 text-left">
                          <tool-tips infoMessage="Chain Id of cosmos blockchain"></tool-tips>
                          <label for="bodyAttrChainId" class="col-form-label">Chain ID<span style="color: red">*</span>: </label>                          
                        </div>
                        <div class="col-lg-9 col-md-9 px-0">
                          <input v-model="bodyAttrChainId" type="text" id="bodyAttrChainId" class="form-control w-100"
                            placeholder="cosmos-hub1">
                        </div>
                    </div>
                    <div class="row g-3 align-items-center w-100 mt-4">
                        <div class="col-lg-3 col-md-3 text-left">                        
                        <tool-tips infoMessage="Field label for user input"></tool-tips>
                        <label for="type" class="col-form-label">Label<span style="color: red">*</span>:</label>
                        </div>
                        <div class="col-lg-9 col-md-9 px-0">
                      <input v-model="attributeData.fieldPlaceHolder" type="text" id="attributeName" class="form-control w-100"
                            placeholder="Field label for user input">
                      </div>
                    </div>
                    <div class="form-group row mt-4" v-if="isAdd">
                      <div class="col-sm-10">                        
                        <hf-buttons 
                          name="Add"                          
                          @executeAction="addBodyParamAttributesToBox()"
                        ></hf-buttons>
                      </div>                                            
                    </div>
                    <div class="form-group row mt-4" v-else>
                      <div class="col-sm-10">                        
                        <hf-buttons 
                          name="Update"        
                          class="btn btn-primary"
                          @executeAction="updateBodyParamAttributeData()"
                        ></hf-buttons>
                        <hf-buttons 
                          name="Delete"        
                          customClass="btn btn-danger slight-left-margin"
                          @executeAction="deleteBodyParamAttributeData()"
                        ></hf-buttons>
                      </div>
                    </div> 
              </b-card-text>             
              </b-tab>
              </b-tabs>
              </b-card>             
            </b-collapse>
        </div>
      </div>

      <div
        class="row g-3 align-items-center w-100 mt-4"
      >
        <div class="text-left col-lg-3 col-md-3 text-left">
          <tool-tips infoMessage="API header in JSON format"></tool-tips>
          <label for="title" class="col-form-label"
            >Headers:
          </label>
        </div>
        
        <div class="col-lg-9 col-md-9 px-0 borderHeader">
          <codemirror
          class="m-1"
          ref="json-cm"
          v-model="apiData.header"
          :options="cmOptions"
          ></codemirror>
        </div>
      </div>

      <div
        class="row g-3 align-items-center w-100 mt-4"
      >
        <div class="text-left col-lg-3 col-md-3 text-left">
          <tool-tips infoMessage="Configure condition which you want Fyre server to apply upon getting response from your API"></tool-tips>
          <label for="title" class="col-form-label"
            >Condition<span style="color: red">*</span>:
          </label>
        </div>        
          <div class="col-lg-2 col-md-2 px-0">
          <hf-select-drop-down
          :options="returnTypeOption"
          @selected=" e =>inputReturnType(e)"  

          ></hf-select-drop-down>          
        </div>
        <div class="col-lg-2 col-md-2 px-0">
          <hf-select-drop-down
          :options="condtionOption"
          @selected=" e =>inputCondtion(e)"
          ></hf-select-drop-down>    
        </div>
        <div class="col-lg-5 col-md-2 px-0" v-show="isBoolean === true">
          <hf-select-drop-down
          :options="booleanCondition"
          @selected=" e =>inputBooleanCondtion(e)"
          ></hf-select-drop-down>
        </div>

        <div class="col-lg-5 col-md-2 px-0" v-show="showRegexInputField === true">
                 <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">/</span>
            </div>
            <input type="text" class="form-control" ref="pattern" v-model="pattern"
            placeholder="pattern">
            <div class="input-group-append">
              <span class="input-group-text" id="basic-addon1">/</span>
            </div>

            <input type="text" class="form-control col-lg-3" v-model="flags.join('')" disabled></input>
            <div class="input-group-append box">
              <b-dropdown id="dropdown-right" class="dropBtn" right text="Flag" size="sm" variant="secondary">                 
              <b-form-checkbox-group                       
                stacked        
                size="sm"      
                v-model="flags"
                :options="checkBoxOptions"                             
                value-field="item"
                text-field="name"
                disabled-field="notEnabled"
              ></b-form-checkbox-group>                  
              </b-dropdown>
          </div>
        </div>
    
        </div>

        <div class="col-lg-5 col-md-2 px-0" v-show="showStringInput">
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
          <tool-tips infoMessage="Error message upon unsuccessful verfication of match condition"></tool-tips>
          <label for="type" class="col-form-label"
            >Error message:
          </label>
        </div>
        <div class="col-lg-9 col-md-9 px-0">
          <input
            v-model="apiData.customApiErrorMessage"     
            type="text"
            id="customApiErrorMessage"
            class="form-control w-100"
            placeholder="Enter error message"
          />
        </div>
      </div>

      <div class="row g-3 align-items-center w-100 mt-4">
        <div class="text-left col-lg-3 col-md-3 text-left">
          <tool-tips infoMessage="Score you want to give the user upon successfully performing this action"></tool-tips>
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
.card-body{
padding: 0rem !important;
margin-top: 2rem;
}
.bv-no-focus-ring{
  margin-left:1rem !important;
}
.inputInfo {
  color: #808080b5;
  font-size: smaller;
}
.borderHeader{
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.125);
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
  background-color:rgba(241, 179, 25, 0.24);
  color: #212529;
}
.bg-transparant{
  background-color: transparent !important;
  color: #212529;
}
</style>
<script>
import notificationMixins from "../../../../mixins/notificationMixins";
import {
  ifSpaceExists,
  isEmpty,
  isValidURL,
  truncate,
  isFloat,
} from "../../../../mixins/fieldValidationMixin";
import {BTab, BTabs} from "bootstrap-vue"
import Messages from "../../../../utils/messages/admin/en";
import config from "../../../../config"
import HfButtons from "../../../elements/HfButtons.vue"
import EventBus from '../../../../eventBus';
import HfSelectDropDown from "../../../elements/HfSelectDropDown.vue"
import ToolTips from "../../../basic/toolTips.vue"
import validator from 'validator';
import { codemirror } from "vue-codemirror"
// require styles
import "codemirror/addon/lint/lint.css";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/lint/lint";
import "codemirror/addon/lint/json-lint";
import "codemirror/keymap/sublime";
import jsonlint from "jsonlint";
import { JSHINT } from "jshint";
window.JSHINT = JSHINT;
window.jsonlint = jsonlint;
export default {
  name: "CustomAPIEventActionConfig",
  components:
  {
  codemirror,
  HfButtons,
  HfSelectDropDown,
  BTabs,
  BTab,
  ToolTips
  },
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
  showStringInput() {
    if(this.isBoolean === false && this.showRegexInputField === false) {
      return true
    } else {
      return false
    }
  },
   codemirror() {
      return this.$refs.cmEditor.codemirror;
    },
  },
  data() {
    return {
      cmOptions: {
        // codemirror options

        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        mode: "application/json",
        gutters: ["CodeMirror-lint-markers"],
        lineWrapping: true,
        theme: "default",
        lint: true,
        collapseIdentical: true,

        keyMap: "sublime",
        // more codemirror options,
      },
      attrFlash:null,
      selectedId:null,
      showAttribute:false,
      isAdd: true,
      isAddForQuerry:true,      
      visible:false,
      counter:0,
      isGet:false,
      isPost:false,
      isBoolean:false,
      isNumber:false,
      showRegexInputField:false,
      flags:[],
      pattern:"",
       checkBoxOptions: [
          { item: 'g', name: 'g' },
          { item: 'i', name: 'i' },
          { item: 'm', name: 'm' },
          { item: 's', name: 's' },
          { item: 'u', name: 'u' },
          { item: 'y', name: 'y' },          
        ],
      showQueryAttrChainIdField: false,
      showBodyAttrChainIdField:false,
      chainId:"",
      bodyAttrChainId:"",
      queryAttributeArray:[],
      bodyAttributeArray:[],
      appName: config.appName,
      attributeFieldTypeOption:[
        {text:"Select",value:null},
        {        
        label:"Data types",
        options:[
        { text: "boolean", value: "BOOLEAN" },
        { text: "string", value: "STRING" },
        { text: "integer", value: "NUMBER" },
        { text: "float", value: "FLOAT" },],
        },{
        label:"Blockchain type",
        options: [
          { text: "Ethereum", value: "BLOCKCHAIN_ETH" },
          { text: "Cosmos blockchain", value: "BLOCKCHAIN_COSMOS" },
        ]
        }
      ],
      booleanCondition:[
        { text: "Boolean Type", value: null },
        { text: "True", value: true },
        { text: "False", value: false },
      ],
      allCondition: [
        { text: "Select HTTP Method", value: null },
        { text: "GET", value: "GET" },
        { text: "POST", value: "POST" },
      ],
      returnTypeOption:[
        { text: "Response Type", value: null },
        { text: "boolean", value: "BOOLEAN" },
        { text: "string", value: "STRING" },
        { text: "integer", value: "NUMBER" },
        { text: "float", value: "FLOAT" },
        { text: "object", value: "OBJECT" },
      ],
      condtionOption:[
        { text: "Condition", value: null },
        { text: "Regex", value: "REGEXP" },
        { text: "===", value: "===" },
        { text: "<", value: "<" },
        { text: ">", value: ">" },
        { text: ">=", value: ">=" },
        { text: "<=", value: "<=" },
      ],      
      flash: null,
      isCreate: true,
      selectedAttrId:null,
      currentSelectedId: 0, 
      apiData:{
        apiEndPoint: "",
        attributes:[],
        header:"",
        apiMethod:null,
        returnType:null,
        condition:null,
        conditionValue:null,
        customApiErrorMessage:""
      },
      queryParameterAttributeArray:[],
      querryAttrFlash:null,
      queryParamAttributeData:{
        fieldName:"",
        fieldType:null,
        fieldPlaceHolder:"",
        parameter:"query"
      },
      queryParamToAppend:"",
      bodyParameterAttributeArray:[],
      attributeData:{
        fieldName:"",
        fieldType:null,
        fieldPlaceHolder:"",
        parameter:"body"
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
  watch:{
     pattern:{
          deep:true,
          handler: function(newValue,oldValue) {            
            if(newValue.startsWith('/') || newValue.endsWith('/')) {      
            const trimed = newValue.replace(/^\/|\/$/g, '')
            this.pattern = trimed
          }
        }
     }
  },
  async mounted() {
    this.$root.$on("callClearFromProject", () => {
      this.clearSelected();
      this.clearBodyParamAttributeData()
        this.clearQuerryAttributeData()
        this.queryParameterAttributeArray = []
        this.bodyParameterAttributeArray = []
      this.counter = 0
    });
     EventBus.$on("sendProject", (project) => {
      this.project = {...project}
    });
  },
  methods: {
    showQueryParamChainIDFieldOnSelect(e) {
      if(e === "BLOCKCHAIN_COSMOS") {
        this.showQueryAttrChainIdField = true
      } else {
        this.showQueryAttrChainIdField = false
      }
    },
    showBodyParamChainIDFieldOnSelect(e) {
      if(e === "BLOCKCHAIN_COSMOS") {
        this.showBodyAttrChainIdField = true
      } else {
        this.showBodyAttrChainIdField = false
      }
    },
    modifyAPIEnpoint(){
      // truncate the '/'
      if(this.apiData.apiEndPoint.endsWith('/')){
        this.apiData.apiEndPoint = this.apiData.apiEndPoint.trim()
        this.apiData.apiEndPoint = this.apiData.apiEndPoint.substring(0, this.apiData.apiEndPoint.length-1 )
      }
      const epURL = new URL(this.apiData.apiEndPoint)
      epURL.search = "?";
      this.queryParameterAttributeArray.forEach(element => {
        epURL.search += `${element.fieldName}=\$\{${element.fieldName}\}&`
      });

      // truncate the '&'
      this.apiData.apiEndPoint = epURL.toString();
      if(this.apiData.apiEndPoint.endsWith('&')){
        this.apiData.apiEndPoint = this.apiData.apiEndPoint.trim()
        this.apiData.apiEndPoint = this.apiData.apiEndPoint.substring(0, this.apiData.apiEndPoint.length-1 )         
      }
    },
    handleQueryParamValidation() {
      let isValid = true
      if(isEmpty(this.queryParamAttributeData.fieldName)) {
        isValid = false
        return this.notifyErr('Enter Field Name')
      } else if (isValidURL(this.queryParamAttributeData.fieldName)) {
        isValid = false
        return this.notifyErr('Enter Valid Field Name')
      } else if (ifSpaceExists(this.queryParamAttributeData.fieldName)) {        
        isValid = false
        return this.notifyErr('Field name should not have space')
      } 
      else if(this.isPresentQueryParamAttribute()) {
        isValid = false
        return this.notifyErr('Attribute with duplicate Field Name are not allowed')
      } 
      else if(!this.queryParamAttributeData.fieldType) {
        isValid = false
        return this.notifyErr('Select Field Type')
      } else if(this.showQueryAttrChainIdField === true && isEmpty(this.chainId)) {
          isValid = false
        return this.notifyErr('Enter Chain Id')        
      } else if(this.showQueryAttrChainIdField === true && isValidURL(this.chainId)) {
        isValid = false
        return this.notifyErr('Enter valid Chain Id')
      } else if(isEmpty(this.queryParamAttributeData.fieldPlaceHolder)) {
        isValid = false
        return this.notifyErr('Enter Label')
      } else if (isValidURL(this.queryParamAttributeData.fieldPlaceHolder)) {
        isValid = false
        return this.notifyErr('Enter Valid Label')
      }
      return isValid
    },
    isPresentQueryParamAttribute(){
      let status = false;
       let temp = [ ...this.queryParameterAttributeArray]
       const index = temp.findIndex((x)=> x.fieldName === this.querryAttrFlash)
       if(temp.length!==0){
        if(this.isAddForQuerry === false){
         temp.splice(index,1)
        }
       const element = temp.find((value) => {
            if(this.queryParamAttributeData.fieldName!==this.querryAttrFlash && value.fieldName === this.queryParamAttributeData.fieldName){
              return value;
            }
       });       
       if(element !== undefined){
        status = true
       }
      }
      return status
    },
    clearQuerryAttributeData() {
      this.chainId = ""
      this.querryAttrFlash = null
      this.queryParamAttributeData = {
        fieldName:"",
        fieldType:null,
        fieldPlaceHolder:"",
        parameter:"query"
      }    
      this.showQueryAttrChainIdField = false 
    },
    addQuerryParamAttributesToBox() {           
      let isValid = this.handleQueryParamValidation()
      if(isValid) {
        if(this.showQueryAttrChainIdField === true) {
          this.queryParamAttributeData['chainId'] = this.chainId
        }
      const trimFieldName = this.queryParamAttributeData.fieldName.trim()
      this.queryParamAttributeData.fieldName = trimFieldName
      this.queryParameterAttributeArray.push(this.queryParamAttributeData)
      this.clearQuerryAttributeData()
      this.modifyAPIEnpoint()
      }
    },
    handleClickQueryParam(id) {
      this.querryAttrFlash = id
      const found = this.queryParameterAttributeArray.find((x)=>x.fieldName === id)
      let updateData = found
      // this.selectedAttrId = id
     if(updateData.hasOwnProperty('chainId')){
      this.showQueryAttrChainIdField = true
      this.chainId = updateData.chainId      
     }   
      this.queryParamAttributeData = { ...updateData}      
      this.isAddForQuerry = false
    },
    updateQueryParamAttributeData() {
      let isValid = this.handleQueryParamValidation()
      if(isValid) {
      let obj = {
        fieldName: this.queryParamAttributeData.fieldName.trim(),
        fieldType: this.queryParamAttributeData.fieldType,
        fieldPlaceHolder: this.queryParamAttributeData.fieldPlaceHolder,
        parameter:this.queryParamAttributeData.parameter
      }      
      if(this.showQueryAttrChainIdField === true) {
        obj['chainId']= this.chainId
      }
      const indexToUpdate = this.queryParameterAttributeArray.findIndex((x)=>x.fieldName === this.querryAttrFlash)      
      if(indexToUpdate > -1){      
      this.queryParameterAttributeArray[indexToUpdate] = obj
      this.clearQuerryAttributeData() 
      this.isAddForQuerry = true
      this.modifyAPIEnpoint()
      }
      }
    },
    deleteQueryParamAttributeData() {
      let id = this.querryAttrFlash
      const attrIndex = this.queryParameterAttributeArray.findIndex((x)=> x.fieldName === id)
      if(attrIndex > -1) {
        this.queryParameterAttributeArray.splice(attrIndex,1)        
      }
       this.clearQuerryAttributeData() 
       this.isAddForQuerry = true
       this.modifyAPIEnpoint()
    },
    addBodyParamAttributesToBox() {
      let isValid = this.handleBodyParamValidation()
      if(isValid) {   
        if(this.showBodyAttrChainIdField === true) {
          this.attributeData['chainId'] = this.bodyAttrChainId
        } 
      const trimFieldName = this.attributeData.fieldName.trim()
      this.attributeData.fieldName = trimFieldName
      this.bodyParameterAttributeArray.push(this.attributeData)
      this.clearBodyParamAttributeData()
      }
    },
    handleClickBodyParam(id) {
      this.attrFlash = id
      const found = this.bodyParameterAttributeArray.find((x)=>x.fieldName === id)
      let updateData = found
      if(updateData.hasOwnProperty('chainId')){
      this.showBodyAttrChainIdField = true
      this.bodyAttrChainId = updateData.chainId      
     } 
      this.selectedAttrId = id
      this.attributeData = { ...updateData}      
      this.isAdd = false
    },
    updateBodyParamAttributeData() {
      let isValid = this.handleBodyParamValidation()
      if(isValid) {
      let obj = {
        fieldName: this.attributeData.fieldName.trim(),
        fieldType: this.attributeData.fieldType,
        fieldPlaceHolder: this.attributeData.fieldPlaceHolder,
        parameter:this.attributeData.parameter
      }      
      if(this.showBodyAttrChainIdField === true) {
        obj['chainId']= this.bodyAttrChainId
      }
      const indexToUpdate = this.bodyParameterAttributeArray.findIndex((x)=>x.fieldName === this.attrFlash)      
      if(indexToUpdate > -1){      
      this.bodyParameterAttributeArray[indexToUpdate] = obj
      this.clearBodyParamAttributeData()
      this.isAdd = true
      }
      }
      
    },
    deleteBodyParamAttributeData() {
      let id = this.selectedAttrId
      const attrIndex = this.bodyParameterAttributeArray.findIndex((x)=> x.fieldName === id)
      if(attrIndex > -1) {
        this.bodyParameterAttributeArray.splice(attrIndex,1)
      }
       this.clearBodyParamAttributeData()
       this.isAdd = true
    },
    handleBodyParamValidation() {
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
      } 
      else if(this.isPresentBodyParamAttribute()) {
        isValid = false
        return this.notifyErr('Attribute with duplicate Field Name are not allowed')
      } 
      else if(!this.attributeData.fieldType) {
        isValid = false
        return this.notifyErr('Select Field Type')
      } else if(this.showBodyAttrChainIdField === true && isEmpty(this.bodyAttrChainId)) {
        isValid = false
        return this.notifyErr('Enter Chain Id')        
      } else if(this.showBodyAttrChainIdField === true && isValidURL(this.bodyAttrChainId)) {
        isValid = false
        return this.notifyErr('Enter valid Chain Id')
      } else if(isEmpty(this.attributeData.fieldPlaceHolder)) {
        isValid = false
        return this.notifyErr('Enter Label')
      } else if (isValidURL(this.attributeData.fieldPlaceHolder)) {
        isValid = false
        return this.notifyErr('Enter Valid Label')
      }
      return isValid
    },
    isPresentBodyParamAttribute(){
      let status = false;
       let temp = [ ...this.bodyParameterAttributeArray]
       const index = temp.findIndex((x)=> x.fieldName === this.attrFlash)
       if(temp.length!==0){
        if(this.isAdd === false){
         temp.splice(index,1)
        }
       const element = temp.find((value) => {
            if(this.attributeData.fieldName!==this.attrFlash && value.fieldName === this.attributeData.fieldName){
              return value;
            }
       });       
       if(element !== undefined){
        status = true
       }
      }
      return status
    },
    clearBodyParamAttributeData() {
      this.bodyAttrChainId = ""
      this.selectedAttrId = null
      this.attrFlash = null
      this.attributeData = {
        fieldName:"",        
        fieldPlaceHolder:"",
        fieldType:null,
        parameter:"body"
      }
      this.showBodyAttrChainIdField = false
    },
    inputBooleanCondtion(e) {      
      this.apiData.conditionValue = e
    },
    inputCondtion(e){
      if(e === "REGEXP") {
        this.showRegexInputField = true        
      }  else {        
        if(typeof(this.apiData.conditionValue)==="object") {
          this.apiData.conditionValue = ""
        }        
        this.showRegexInputField = false
      }
      this.apiData.condition = e
    },
    inputReturnType(e) {
      switch(e){
        case "BOOLEAN": {
          this.apiData.conditionValue = null
          this.isBoolean = true          
          this.showRegexInputField = false          
          this.condtionOption =[
        { text: "Condition", value: null },
        { text: "===", value: "===" },
        ]
        break;
        }
        case "NUMBER":
        case "FLOAT":{
          this.isBoolean = false
          this.isNumber = true
          this.condtionOption=[
            { text: "Condition", value: null },
            { text: "Regex", value: "REGEXP" },
            { text: "===", value: "===" },
            { text: "<", value: "<" },
            { text: ">", value: ">" },
            { text: ">=", value: ">=" },
            { text: "<=", value: "<=" },
          ]
        }
        break;
        case "STRING":{
          this.isBoolean = false
          this.isNumber = false
          this.condtionOption=[
            { text: "Condition", value: null },
            { text: "Regex", value: "REGEXP" },
            { text: "===", value: "===" },
          ]
        }
        break;
        case "OBJECT":{          
          this.isBoolean = false
          this.isNumber = false
          this.condtionOption=[
            { text: "Condition", value: null },
            { text: "Regex", value: "REGEXP" },
            { text: "===", value: "===" },            
          ]
        }
        break;
        default:{
          this.isBoolean = false
          this.isNumber = false
          this.condtionOption=[
            { text: "Condition", value: null },
            { text: "Regex", value: "REGEXP" },
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
        this.bodyParameterAttributeArray = []
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
      this.visible = false
      this.isAdd = true
      this.isAddForQuerry = true
      // this.isGet = false,
      // this.isPost = false,
      this.isBoolean = false,
      this.isNumber = false,
      this.showRegexInputField = false
      this.pattern = ""
      this.flags = []
      this.apiData = {
        apiEndPoint: "",      
        header:"",
        attributes:[],
        apiMethod:null,
        returnType:null,
        condition:null,
        conditionValue:null,
        customApiErrorMessage:""
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
            this.notifyErr(Messages.EVENTS.ACTIONS.CUSTOMAPI.API_ENDPOINT);
          } else if (!this.apiData.apiEndPoint.includes('http://localhost') && !validator.isURL(this.apiData.apiEndPoint)) {
            isvalid = false;
            this.notifyErr(Messages.EVENTS.ACTIONS.CUSTOMAPI.API_VALID_ENDPOINT);
          } else if (this.apiData.header!=="" && !this.isValidJson(this.apiData.header)) {
            isvalid = false;
            this.notifyErr(Messages.EVENTS.ACTIONS.CUSTOMAPI.HEADER_IN_JSON);
          } else if (this.apiData.apiMethod === null) {
            isvalid = false;
            this.notifyErr(Messages.EVENTS.ACTIONS.CUSTOMAPI.SELECT_API_METHOD)
          } else if(this.apiData.apiMethod !== null && !(this.queryParameterAttributeArray.length || this.bodyParameterAttributeArray.length)) {
            isvalid = false
            return this.notifyErr(Messages.EVENTS.ACTIONS.CUSTOMAPI.ATLEAST_ONE_ATTRIBUTE)
          } else if (this.apiData.returnType === null) {
            isvalid = false;
            this.notifyErr(Messages.EVENTS.ACTIONS.CUSTOMAPI.SELECT_RESPONSE_TPYE)
          } else if(this.apiData.condition === null) {
              isvalid = false;
              this.notifyErr(Messages.EVENTS.ACTIONS.CUSTOMAPI.SELECT_CONDITION)
            } 
            // else if (this.apiData.conditionValue === null || this.apiData.conditionValue === "") {
            //   isvalid = false;
            //   this.notifyErr(Messages.EVENTS.ACTIONS.CUSTOMAPI.VALID_CONDITION)
            // } 
            else if(this.apiData.returnType !== null) {
              if(this.showRegexInputField === true) {
                if(isEmpty(this.pattern)) {
                  isvalid = false
                  return this.notifyErr('Enter Pattern for the regex')
                }
              } else {
              switch (this.apiData.returnType) {
              case "BOOLEAN":
              case "STRING":
              case "OBJECT":
                if(this.apiData.conditionValue === null || this.apiData.conditionValue === "") {
                  isvalid = false
                  return this.notifyErr(Messages.EVENTS.ACTIONS.CUSTOMAPI.VALID_CONDITION)
                }
                break;
              case "NUMBER":              
              if(!Number.isInteger(parseFloat((this.apiData.conditionValue)))) {
                  isvalid = false
                  return this.notifyErr(Messages.EVENTS.ACTIONS.CUSTOMAPI.INTEGER_VALUE)
                }
                break;
              case "FLOAT":
                if(!isFloat(this.apiData.conditionValue)) {
                  isvalid = false
                  return this.notifyErr(Messages.EVENTS.ACTIONS.CUSTOMAPI.FLOAT_VALUE)
                }
                break;               
            }         
          }   
          } if (isNaN(parseInt(this.selected.score))) {            
            isvalid = false;
            return this.notifyErr(Messages.EVENTS.ACTIONS.SCORE_IS_NUM);
          } else if (parseInt(this.selected.score) < 0) {
            isvalid = false;
            return this.notifyErr(Messages.EVENTS.ACTIONS.SCORE_IS_POSITIVE_NUM);
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
        this.apiData.attributes = [...this.queryParameterAttributeArray, ...this.bodyParameterAttributeArray] // merging two arrays here in single one        
        this.apiData.apiEndPoint = this.apiData.apiEndPoint.trim() 
        if(this.showRegexInputField === true) {
          let tempObject = {
            pattern:"",
            flag:""
          }
          let flags = this.flags.join('')
          tempObject.flag = flags
          tempObject.pattern = this.pattern
          this.apiData.conditionValue = JSON.stringify(tempObject)
        }        
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
        if(this.apiData.returnType === "BOOLEAN") {
          this.isBoolean = true
          EventBus.$emit("resetOption",this.apiData.conditionValue);
        }
        this.clearSelected();
        this.clearBodyParamAttributeData()
        this.clearQuerryAttributeData()
        this.queryParameterAttributeArray = []
        this.bodyParameterAttributeArray = []
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
        if(this.apiData.returnType === "BOOLEAN") {
        this.isBoolean = true
        EventBus.$emit("resetOption",this.apiData.conditionValue);
        } 
      this.clearSelected();
      this.clearBodyParamAttributeData();
      this.clearQuerryAttributeData();
      this.queryParameterAttributeArray = []
      this.bodyParameterAttributeArray = []
      this.isCreate = true;
    },
    handleEventActionUpdate() {
      // Code to update an Action
      let isvalid = this.handleEventActionValidation();
      if (isvalid) {
        this.apiData.attributes = [...this.queryParameterAttributeArray, ...this.bodyParameterAttributeArray]
        this.apiData.apiEndPoint = this.apiData.apiEndPoint.trim()
        if(this.showRegexInputField === true) {
          let tempObject = {
            pattern:"",
            flag:""
          }
          let flags = this.flags.join('')
          tempObject.flag = flags
          tempObject.pattern = this.pattern
          this.apiData.conditionValue = JSON.stringify(tempObject)
        }  
        this.selected.value = JSON.stringify(this.apiData);        
        this.eventActionList[this.currentSelectedId] = this.selected;
        this.$emit("updateEventActions", {
          type: "UPDATE",
          data: this.selected,
        });
        EventBus.$emit("resetOption",this.apiData.condition);
        EventBus.$emit("resetOption",this.apiData.returnType);
        EventBus.$emit("resetOption",this.apiData.apiMethod);
        if(this.apiData.returnType === "BOOLEAN") {
        this.isBoolean = true
        EventBus.$emit("resetOption",this.apiData.conditionValue);
        }        
        this.clearSelected();
        this.clearBodyParamAttributeData()
        this.clearQuerryAttributeData()
        this.queryParameterAttributeArray = []
        this.bodyParameterAttributeArray = []
        this.isCreate = true;
      }
    },

    handleEventActionClick(idx) {
      this.clearSelected()
      this.clearBodyParamAttributeData()
      this.clearQuerryAttributeData()
      this.queryParameterAttributeArray = []
      this.bodyParameterAttributeArray = []
      this.isCreate = false;
      // Code to update an Action
      this.flash = idx;
      let updateData = this.eventActionList[idx];
      this.currentSelectedId = idx;
      this.selected = updateData;
      this.apiData = { ...JSON.parse(this.selected.value)}      
      if(this.apiData.condition === "REGEXP") {
        this.apiData.conditionValue = JSON.parse(this.apiData.conditionValue)
        this.pattern = this.apiData.conditionValue.pattern
        this.flags = this.apiData.conditionValue.flag.split('')
      }
      // need to extract the attributes and segregate it into two arrays
      // queryParameterAttributeArray and in bodyParameterAttributeArray based on parameter field
      if(this.apiData.attributes.length) {
        for(let index = 0;index<this.apiData.attributes.length;index++) {
          if(this.apiData.attributes[index].parameter === 'query') {
            this.queryParameterAttributeArray.push(this.apiData.attributes[index])
          } else {
            this.bodyParameterAttributeArray.push(this.apiData.attributes[index])
          }
        }
      }      
      EventBus.$emit("setOption",this.apiData.apiMethod);
      EventBus.$emit("setOption",this.apiData.returnType);
      EventBus.$emit("setOption",this.apiData.condition);
      if(this.apiData.returnType === "BOOLEAN") {
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
