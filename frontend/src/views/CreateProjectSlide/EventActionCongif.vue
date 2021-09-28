<template>
  <div>
      <div v-if="eventActionList.length" class="selected-media-wrapper d-flex p-2 mb-4" >
        <div @click="handleEventActionClick(idx)" :class="flash == idx ?  'flash card rounded m-1 p-1 d-flex flex-row align-items-center' : 'card rounded m-1 p-1 d-flex flex-row align-items-center pointer'" v-for="(eventAction, idx) in eventActionList" :key="idx">
            <span class="mr-2 text-capitalize"><i :class="eventAction.title"></i>  {{eventAction.title}}</span>
            <div class="ml-3" /><i @click="removeSocialMedia(idx)" class="fas fa-minus-circle"></i>
        </div>
      </div>
      <div >
        <div class="row g-3 align-items-center w-100 mt-4">
          <div class=" text-left col-lg-5 col-md-5 text-left">
              <label for="type" class="col-form-label">Type: </label>
          </div>
          <div class="col-lg-7 col-md-7 px-0">
            <b-form-select v-model="selected.type" :options="options"></b-form-select>
          </div>  
        </div>
        <div class="row g-3 align-items-center w-100 mt-4">
          <div class=" text-left col-lg-5 col-md-5 text-left">
              <label for="title" class="col-form-label">Title: </label>
          </div>
          <div class="col-lg-7 col-md-7 px-0">
              <input   v-model="selected.title" type="text"   id="title" class="form-control w-100" >
          </div>  
        </div>
        <div class="row g-3 align-items-center w-100 mt-4" v-if="eventActionType != 'SOCIAL'">
          <div class=" text-left col-lg-5 col-md-5 text-left">
              <label for="placeHolder" class="col-form-label">Place Holder: </label>
          </div>
          <div class="col-lg-7 col-md-7 px-0">
              <input   v-model="selected.placeHolder" type="text"   id="placeHolder" class="form-control w-100" >
          </div>  
        </div>

        <div class="row g-3 align-items-center w-100 mt-4" v-if="eventActionType != 'BLOCKCHAIN'">
          <div class=" text-left col-lg-5 col-md-5 text-left">
              <label for="value" class="col-form-label">Value: </label>
          </div>
          <div class="col-lg-7 col-md-7 px-0">
              <input   v-model="selected.value" type="text"   id="value" class="form-control w-100" >
          </div>  
        </div>
        <div class="row g-3 align-items-center w-100 mt-4" style="display:none">
          <div class=" text-left col-lg-5 col-md-5 text-left">
              <label for="score" class="col-form-label">Score: </label>
          </div>
          <div class="col-lg-7 col-md-7 px-0">
              <input   v-model="selected.score" type="text"   id="score" class="form-control w-100" >
          </div>  
        </div>
        <div class="row g-3 justify-content-md-end w-100 mt-4" v-if="isCreate==true">
          <div class="col-lg-7 col-md-7 px-0">
            <button @click="handleEventActionAdd()" class="btn btn-primary button-theme" type="button"> {{eventActionList.includes(selected) ? "Update" : "Add"}}</button>
          </div>  
        </div>
        <div class="row g-3 justify-content-md-end w-100 mt-4" v-else>
          <div class="col-lg-3 col-md-7 px-0">
            <button @click="handleEventActionUpdate()" class="btn btn-primary button-theme" type="button"> Update</button>
          </div>  
          <div class="col-lg-3 col-md-7 px-0">
            <button @click="handleEventActionDelete()" class="btn btn-primary button-theme" type="button"> Delete</button>
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
    background-color: #1FAA59;
    color: #fff; 
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
import notificationMixins from '../../mixins/notificationMixins';
import {isEmpty,isValidURL} from '../../mixins/fieldValidationMixin';

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
            "id": ""
      },
    }
    
  },
  methods: {
    clearSelected () {
      let clearData = {
            "type": null,
            "title": "",
            "placeHolder": "",
            "isManadatory": true,
            "value": "",
            "score": 10
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
            }else if(isValidURL(this.selected.title)){
              isvalid=false
              this.notifyErr(`Do not put url in title`)
            }else if(isEmpty(this.selected.value)){
              isvalid=false
              this.notifyErr(`Value Should not be empty`)
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
            }
        break;
        default:
          console.log("Spelling mistake");
      }
      
      

      return isvalid
    },

    handleEventActionAdd(media){
      // Code to Add an Action
      let isvalid = this.handleEventActionValidation()
      if(isvalid) {
        this.selected["id"] = this.eventActionType + "_" +  this.eventActionList.length;
        this.eventActionList.push(this.selected);
        console.log("Emitting events from grand-child to parents")
        this.$emit("updateEventActions", {
          type: "ADD",
          data: this.selected
        })
        console.log("Emitting events from grand-child to parents")
        this.clearSelected()
      }

    },

  
      
    handleEventActionDelete(){

      // Code to delete an Action
      const actionToDelete = this.eventActionList[this.currentSelectedId];
      this.eventActionList.splice(this.currentSelectedId, 1);
      this.$emit("updateEventActions", {
        type: "DELETE",
        data: actionToDelete.id
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
      let updateData = this.eventActionList[idx]
      this.currentSelectedId = idx
      this.selected = updateData
      this.isCreate=false

    },
      
  },

  mixins: [notificationMixins]
};
</script>

