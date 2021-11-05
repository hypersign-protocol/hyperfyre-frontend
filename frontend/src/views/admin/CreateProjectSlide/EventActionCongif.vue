<template>
  <div>
      <div v-if="eventActionList.length" style="overflow-y:auto" class="selected-media-wrapper d-flex p-2 mb-4" >
        <div @click="handleEventActionClick(idx)" 
          :class="flash == idx ?  
            'flash card rounded m-1 p-1 d-flex flex-row align-items-center' : 
            'card rounded m-1 p-1 d-flex flex-row align-items-center pointer'" 
          style="min-width: 113px"
          v-for="(eventAction, idx) in eventActionList" v-bind:Key="idx">
            <span>
              <i style="color: gray" v-if="eventAction.type.includes('TWITTER')" class="fab fa-twitter"></i>  
              <i style="color: gray" v-if="eventAction.type.includes('TELEGRAM')" class="fab fa-telegram-plane"></i>  
              <i style="color: gray" v-if="eventAction.type.includes('INPUT_TEXT')"  class="fas fa-file-alt"></i>
              <i style="color: gray" v-if="eventAction.type.includes('NUMBER')"  class="fas fa-list-ol"></i>
              <i style="color: gray" v-if="eventAction.type.includes('DATE')"  class="fas fa-calendar-minus"></i>
              <i style="color: gray" v-if="eventAction.type.includes('DISCORD')"  class="fab fa-discord"></i>
              <i style="color: gray" v-if="eventAction.type.includes('INPUT_HYPERLINK')"  class="fa fa-link"></i>
              <i style="color: gray" v-if="eventAction.type.includes('INFO_TEXT')"  class="fa fa-info-circle"></i>
              <img style="padding-right: 5px" src="../../../assets/external-link.svg"  v-if="eventAction.type.includes('HYPERLINK_URL')"   height="22px" />
              <img style="padding-right: 5px" src="/img/ethereum.2b470564.svg"  v-if="eventAction.type.includes('_ETH')"   height="22px" />
              <img style="padding-right: 5px" src="/img/ethereum.2b470564.svg"  v-if="eventAction.type.includes('ETHEREUM')"   height="22px" />
              <img style="padding-right: 5px;" src="../../../assets/matic-logo.svg"  v-if="eventAction.type.includes('MATIC')"   height="20px" />
              <img style="padding-right: 5px;" src="../../../assets/binance-logo.svg"  v-if="eventAction.type.includes('BINANCE')"   height="20px" />
              <img style="padding-right: 5px" src="../../../assets/tezos.png"  v-if="eventAction.type.includes('_TEZ')"   height="22px" />
            </span>
            <span >{{ truncate1(eventAction.title, 8) }}</span>
            <span style="color: gray;padding-left: 5px"><i style=""  class="fas fa-minus-circle"></i></span>
        </div>
      </div>
      <div >
        <div class="row g-3 align-items-center w-100 mt-4">
          <div class=" text-left col-lg-3 col-md-3 text-left">
              <label for="type" class="col-form-label">Type<span style="color: red">*</span>: </label>
          </div>
          <div class="col-lg-9 col-md-9 px-0">
            <b-form-select v-model="selected.type" :options="options"></b-form-select>
          </div>  
        </div>
         <!-- contract address -->
        <div class="row g-3 align-items-center w-100 mt-4" v-if="eventActionType === 'SMARTCONTRACT'">
          <div class=" text-left col-lg-3 col-md-3 text-left">
              <label for="title" class="col-form-label">Contract Address<span style="color: red">*</span>: </label>
          </div>
          <div class="col-lg-9 col-md-9 px-0">
              <input   v-model="selected.value" type="text"   id="title" class="form-control w-100" >
          </div>  
        </div>

        <div class="row g-3 align-items-center w-100 mt-4">
          <div class=" text-left col-lg-3 col-md-3 text-left">
              <label for="title" class="col-form-label">Title<span style="color: red">*</span>: </label>
          </div>
          <div class="col-lg-9 col-md-9 px-0">
              <input   v-model="selected.title" type="text"   id="title" class="form-control w-100" >
          </div>  
        </div>

        <div class="row g-3 align-items-center w-100 mt-4" v-if="info">
          <div class=" text-left col-lg-3 col-md-3 text-left">
              <label for="title" class="col-form-label">Info<span style="color: red">*</span>: </label>
          </div>
          <div class="col-lg-9 col-md-9 px-0">
              <markdown-editor toolbar=' numlist bullist code quote bold italic heading link preview fullscreen ' theme="success" v-model="selected.value"></markdown-editor>
          </div>  
        </div>
        <!-- HyperlinkUrl -->
        <div class="row g-3 align-items-center w-100 mt-4" v-if="url">
          <div class=" text-left col-lg-3 col-md-3 text-left">
              <label for="title" class="col-form-label">URL<span style="color: red">*</span>: </label>
          </div>
          <div class="col-lg-9 col-md-9 px-0">
              <input   v-model="selected.value"  type="text"   id="title" class="form-control w-100" >
          </div>  
        </div>

        <div class="row g-3 align-items-center w-100 mt-4" v-if="placeH">
          <div class=" text-left col-lg-3 col-md-3 text-left">
              <label for="placeHolder" class="col-form-label">Place Holder: </label>
          </div>
          <div class="col-lg-9 col-md-9 px-0">
              <input   v-model="selected.placeHolder" type="text"   id="placeHolder" class="form-control w-100" >
          </div>  
        </div>       
        <div class="row g-3 align-items-center w-100 mt-4" v-if="nodDisplay">
          <div class=" text-left col-lg-3 col-md-3 text-left">
              <label for="value" class="col-form-label">Social Handle<span style="color: red">*</span>: </label>
          </div>
          <div class="col-lg-9 col-md-9 px-0">
              <input   v-model="selected.value" type="text"  :placeholder="selected.type === 'DISCORD_JOIN' ? 'Enter server invite link' : '' "  id="value" class="form-control w-100" >
          </div>  
        </div>
        <div class="row g-3 align-items-center w-100 mt-4" v-if="!noScore">
          <div class=" text-left col-lg-3 col-md-3 text-left">
              <label for="title" class="col-form-label">Score<span style="color: red">*</span>: </label>
          </div>
          <div class="col-lg-9 col-md-9 px-0">
              <input   v-model="selected.score" type="number"   id="title" class="form-control w-100" >
          </div>  
        </div>
        <div class="row g-3 justify-content-md-end w-100 mt-4" v-if="isCreate==true">
          <div class="col-lg-9 col-md-9 px-0">
            <button @click="handleEventActionAdd()" class="btn btn-primary button-theme" type="button"> {{eventActionList.includes(selected) ? "Update" : "Add"}}</button>
          </div>  
        </div>
        <div class="row g-3 justify-content-md-end w-100 mt-4" v-else>
          <div class="col-lg-3 col-md-9 px-0">
            <button @click="handleEventActionUpdate()" class="btn btn-primary button-theme" type="button"> Update</button>
          </div>  
          <div class="col-lg-3 col-md-9 px-0">
            <button @click="handleEventActionDelete()" class="btn btn-danger" type="button"> Delete</button>
          </div>  
        </div>
      </div>
  </div>
</template>
<style scoped>


.pointer {
 cursor: pointer;
}
.selected-media-wrapper{
    border: 1px dashed;
    max-height: 100px;
    background-color: #f5f5f5;
    border-radius: 10px;

}
.card i{
    cursor: pointer;
}
.card{
    transition: all 0.5s;

}
.card i{
    margin-right: 4px;
}
.flash{
    cursor: pointer;
    background-color: #1faa596b;
    border: 0;
    box-shadow: 2px 0 10px rgb(0 0 0 / 10%);
    animation: flash 0.4s cubic-bezier(1, 0, 0, 1);
}

.fa-minus-circle{
    font-size: 14px;
}
@keyframes flash {
    0%{
        opacity: 0;
      
    }
    100%{
        opacity: 1;
    }
}

.button-theme{
  background-color: #F1B319;
  border-collapse: #F1B319;
  color: black;
  border: 0;
}
</style>
<script>
import notificationMixins from '../../../mixins/notificationMixins';
import {isEmpty,isValidURL, truncate,isdiscordLink,isContractValid} from '../../../mixins/fieldValidationMixin';
import 'v-markdown-editor/dist/v-markdown-editor.css';
import Vue from 'vue'
import Editor from 'v-markdown-editor'
Vue.use(Editor);

export default {
  name: "EventActionCongif",
  components: {  },
  props: {
    eventActionType: {
      type: String,
    },
    eventActionList : {
      type: Array,
      required: true,
    },
    options: {
      type: Array
    }
  },
  computed:{
    nodDisplay(){
      if(this.eventActionType !='CUSTOM' && this.eventActionType !='BLOCKCHAIN' && this.eventActionType !='SMARTCONTRACT')
      return true
    },
    url(){
      if(this.eventActionType === 'CUSTOM' && this.selected.type ==='HYPERLINK_URL')
      return true
    },
   
    placeH(){
      if(this.eventActionType != 'SOCIAL'  && this.selected.type !='HYPERLINK_URL' && this.selected.type !='INFO_TEXT')
      return true
    },
    info(){
      if(this.eventActionType === 'CUSTOM' && this.selected.type ==='INFO_TEXT'){
      return true
      }
    },
    noScore(){
      if(this.eventActionType === 'CUSTOM' && this.selected.type ==='INFO_TEXT'){
        return true
      }
    }
  },
  data(){
    return{
      // selectedEventActionType: this.eventActionType,
      flash: null,
      isCreate: true,
      currentSelectedId :0,
      selected :{
            "type": null,
            "title": "",
            "placeHolder": "",
            "isManadatory": true,
            "value": "",
            "score": 10,
            "id": "",
            
      },
    }
    
  },
  async mounted(){
    this.$root.$on('callClearFromProject',()=>{this.clearSelected()})
  },
  methods: {
      removeSocialMedia(index) {        
      this.currentSelectedId=index
      this.handleEventActionDelete()
    },
    clearSelected () {
      this.flash=null;
      this.isCreate=true
      let clearData = {            
            "type": null,
            "title": "",
            "placeHolder": "",
            "isManadatory": true,
            "value": "",
            "score": 10,
            
      }

      this.selected = clearData
      this.currentSelectedId = null
    },
    handleEventActionValidation() {
      let isvalid = true
      switch (this.eventActionType) {
        case "SOCIAL":
            if(this.selected.type===null){
              isvalid = false
              this.notifyErr(`Please choose Social Action Type`)
            }else if(isEmpty(this.selected.title)){
                isvalid = false
                this.notifyErr(`Title Should not be empty`)
            }else if(isEmpty(this.selected.value)){
              isvalid=false
              this.notifyErr(`Social Handle Should not be empty`)
            }else if(isValidURL(this.selected.title)){
              isvalid=false
              this.notifyErr(`Do not put url in title`)
            }else if(isEmpty(this.selected.value)){
              isvalid=false
              this.notifyErr(`Social Handle Should not be empty`)
            }else if(this.selected.type === 'DISCORD_JOIN' && isdiscordLink(this.selected.value)){
                isvalid = false
                this.notifyErr(`Invalid Invite Link`)
            }else if(this.selected.score===""){
                isvalid=false
                this.notifyErr(`Please Enter the Score`)
            }  else if(isNaN(parseInt(this.selected.score))){
                isvalid=false
                this.notifyErr(`Score should be a number`)
            } else if(parseInt(this.selected.score)<0){
                isvalid=false
                this.notifyErr(`Score should be a Positive number`)
            } 
          break;
        case "CUSTOM":
         if(this.selected.type===null){
              isvalid = false
              this.notifyErr(`Please choose Custom Action Type`)
            }else if(isEmpty(this.selected.title)){
                isvalid = false
                this.notifyErr(`Title Should not be empty`)
            }else if(isValidURL(this.selected.title)){
              isvalid=false
              this.notifyErr(`Do not put url in title`)
            }else if(this.selected.type==='INFO_TEXT'){
             if(isEmpty(this.selected.value)){
                isvalid = false
                this.notifyErr(`Info Should not be empty`)
            }
            }else if(this.selected.type==='HYPERLINK_URL'){
             if(isEmpty(this.selected.value)){
                isvalid = false
                this.notifyErr(`Url Should not be empty`)
            }else if(!(this.selected.type ==='HYPERLINK_URL' && isValidURL(this.selected.value))){
              isvalid=false
              this.notifyErr(`Please Enter Valid Url`)
            }
            else if(this.selected.score===""){
                isvalid=false
                this.notifyErr(`Please Enter the Score`)
            }  else if(isNaN(parseInt(this.selected.score))){
              isvalid=false
              this.notifyErr(`Score should be a number`)
            }else if(parseInt(this.selected.score)<0){
                isvalid=false
                this.notifyErr(`Score should be a Positive number`)
            }
            }else if(this.selected.score===""){
                isvalid=false
                this.notifyErr(`Please Enter the Score`)
            }
            else if(isNaN(parseInt(this.selected.score))){
              isvalid=false
              this.notifyErr(`Score should be a number`)
            }else if(parseInt(this.selected.score)<0){
                isvalid=false
                this.notifyErr(`Score should be a Positive number`)
            } 
        break;
        case "BLOCKCHAIN":
          if(this.selected.type===null){
              isvalid = false
              this.notifyErr(`Please choose Blockchain Type`)
            }else if(isEmpty(this.selected.title)){
                isvalid = false
                this.notifyErr(`Title Should not be empty`)
            }else if(isValidURL(this.selected.title)){
              isvalid=false
              this.notifyErr(`Do not put url in title`)
            } else if(this.selected.score===""){
                isvalid=false
                this.notifyErr(`Please Enter the Score`)
            }  else if(isNaN(parseInt(this.selected.score))){
              isvalid=false
              this.notifyErr(`Score should be a number`)
            }else if(parseInt(this.selected.score)<0){
                isvalid=false
                this.notifyErr(`Score should be a Positive number`)
            } 
        break;
        case "SMARTCONTRACT":
          if(this.selected.type===null){
              isvalid = false
              this.notifyErr(`Please choose Contract Type`)
            }else if(isEmpty(this.selected.value)){
                isvalid = false
                this.notifyErr(`Contract Address Should not be empty`)
            }else if(!isContractValid(this.selected.value)){
              isvalid= false
              this.notifyErr(`Please enter valid Contract address`)
            }else if(isEmpty(this.selected.title)){
                isvalid = false
                this.notifyErr(`Title Should not be empty`)
            }else if(isValidURL(this.selected.title)){
              isvalid=false
              this.notifyErr(`Do not put url in title`)
            }else if(this.selected.score===""){
                isvalid=false
                this.notifyErr(`Please Enter the Score`)
            }  else if(isNaN(parseInt(this.selected.score))){
              isvalid=false
              this.notifyErr(`Score should be a number`)
            }else if(parseInt(this.selected.score)<0){
                isvalid=false
                this.notifyErr(`Score should be a Positive number`)
            } 
        break;
        
        default:
          this.notifyErr("Invalid event type")
      }
      
      

      return isvalid
    },


    handleEventActionAdd(){
      // Code to Add an Action
      let isvalid = this.handleEventActionValidation()
      if(isvalid) {
        this.selected["id"] = this.eventActionType + "_" +  this.eventActionList.length;
        this.eventActionList.push(this.selected);      
        this.$emit("updateEventActions", {
          type: "ADD",
          data: this.selected
        })
        this.clearSelected()
      }

    },

  
      
    handleEventActionDelete(){

      // Code to delete an Action
      const actionToDelete = this.eventActionList[this.currentSelectedId];
      this.eventActionList.splice(this.currentSelectedId, 1);
      this.$emit("updateEventActions", {
        type: "DELETE",
        data: actionToDelete._id || actionToDelete.id
      })
      this.clearSelected();
      this.isCreate=true

    },
    handleEventActionUpdate(){

      // Code to update an Action
      let isvalid = this.handleEventActionValidation()
      if(isvalid) { 
        this.eventActionList[this.currentSelectedId] = this.selected
        this.$emit("updateEventActions", {
          type: "UPDATE",
          data: this.selected
        })
        this.clearSelected();
        this.isCreate=true
      }

    },

    handleEventActionClick(idx){
      // Code to update an Action
      this.flash=idx
      let updateData = this.eventActionList[idx]
      this.currentSelectedId = idx
      this.selected = updateData
      this.isCreate=false

    },

    truncate1(str, number){
      return truncate(str, number)
    }
      
  },

  mixins: [notificationMixins]
};
</script>

