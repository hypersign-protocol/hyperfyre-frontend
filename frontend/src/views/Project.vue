<style scoped>
.addmargin {
  margin-top: 10px;
  margin-bottom: 10px;
}

.vue-logo-back {
  background-color: black;
}

.logo {
  width: 144px;
}

.fullbody {
  width: 100%;
}

.floatLeft {
  float: left;
}
.floatRight {
  float: right;
}
.card-header {
  background: aliceblue;
  padding: 0px;
}
.sm-tiles {
  float: left;
  padding: 5px;
  border: 1px solid #8080807d;
  margin: 1%;
  border-radius: 5px;
  background: #f5dda71c;
  color: #888b8f;
}
.sm-tiles:hover {
  float: left;
  padding: 5px;
  border: 1px solid #8080807d;
  margin: 1%;
  border-radius: 5px;
  background: #f5dda7a3;
  font-style: bold;
  color: #888b8f;
}

label {
  font-weight: bold;
}
.card {
  border-radius: 10px;
}

i {
  color: grey;
  padding: 5px;
}
.paginationContainer {
  display: flex;
  list-style: none;

  justify-content: center;
}
.paginationContainer >>> li {
  padding: 2px 10px;
  margin: 0 2px;
  border-radius: 3px;
}
.paginationContainer >>> li.active {
  background-color: #F1B319;
  color: #fff;
}


.button-theme{
  background-color: #F1B319;
  border-collapse: #F1B319;
  color: black;
  border: 0;

}


.theme{
  background-color: #363740;
  border-collapse: #363740;
  color: whitesmoke;
  border: 0;

}

.event-card{
  float: left;
  max-width: 60rem;
  margin-right: 3%;
  margin-bottom: 2%;
  border:0;
  border-radius: 20px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}
.card-body-custom{
  color: rgb(46, 46, 46);
}

.event-card-footer{
  padding: 7px; background-color: #F1B3193D;  border-radius: 0px 0px 20px 20px;
}

.event-card-header{
  padding: 7px; background-color: white; color: black; font-size: larger; text-align: center; border-radius: 20px 20px 0px 0px
}
.copy{
	padding:3px; font-size: medium; cursor: pointer; color:grey
}

.fixBanner{
  min-width: 150px; min-height: 150px; max-width: 150px; max-height: 150px;
}

</style>
<template>
  <div class="home marginLeft marginRight">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    ></loading>



    <div class="row">
        <div class="col-md-8">
            <div class="form-group">
              <input v-if="projects.length"  @keyup="handleSearch" type="text" class="form-control w-25" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Search events by name">
            </div>
        </div>

        <div class="col-md-4">
          <div class="text-right">
            <button @click="openCreateSidebar" class="btn btn-primary button-theme">Create <i class="fas fa-plus text-white"></i> </button>
          </div>

          <div>
            <!-- <b-button v-b-toggle.sidebar-right>Toggle Sidebar</b-button> -->
            
            <create-project-slide 
            :isProjectEditing="isProjectEditing"
              :project="project"
              @UpdateColors="UpdateColors"
              :themeColor="themeColor"
              :themeColorDefault="themeColorDefault"
              :fontColor="fontColor"
              :fontColorDefault="fontColorDefault"
              :blockChainType="blockchainType"
              :eventActionType="eventActionType"
              :saveProject="saveProject"
              :addedSocialMedias="addedSocialMedias"
              :selectedSocialMedia="selectedSocialMedia"
              :socialOptions="socialOptions"
              :actionList="project.actions"


              @updateEventActions="AddUpdateDelEventActions"
             />

          

          </div>

        </div>
    </div>

    <div class="row" v-if="whitelistingLink != ''" style="margin-top: 2%">
      <div class="col-md-12" style="text-align: left">
        <div class="card">
          <div class="card-body">
            <h4>
              Congratulations!!! Your event is successfully created, you can
              give this link to your users for whitelisting.
              <a :href="whitelistingLink" target="_blank">{{
                whitelistingLink
              }}</a>
            </h4>
          </div>
        </div>
      </div>
    </div>

      <div v-if="!projectsToShow.length">
          <h3>No events found, click on "create" button to create a new event!</h3>
      </div>

    <div class="row" style="margin-top: 2%">
      <div class="col-md-12 my-5 w-100" style="text-align: left;max-height:660px; overflow-y:scroll">
        <div
          class="card event-card"
          v-for="project in projectsToShow"
          v-bind:key="project.projectName"
        >
          <div
            class="theme event-card-header"
          >
            <span style="">{{ project.projectName }}</span>
            <span data-toggle="tooltip"
                    data-placement="bottom"
                    title="Project Status" style="float:right">

              
              <span v-if="project.projectStatus == true">
                <i class="fas fa-signal" style="color:green"></i> 
              </span>
              <span  v-if="!project.projectStatus ||  project.projectStatus == false" >
                <i class="fas fa-signal" style="color:red"></i>
              </span>

            </span>
          </div>
          <div class="card-body card-body-custom">
            <div class="row">
              <div class="col-md-4">
                <img :src="project.logoUrl" class="fixBanner" @error="onBannerError($event)" />
              </div>
              <div class="col-md-8">
                <ul style="list-style-type: none">
                  <li
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="EventId"
                  >
                    <i class="far fa-id-card"></i
                    ><span class="card-title">{{ project._id }}</span> <span @click="copy(project._id, 'EventId')" class="copy"><i class="far fa-copy"></i></span>
                  </li>
                  <li
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Start Date"
                  >
                    <i class="fas fa-hourglass-start"></i>
                    {{ new Date(project.fromDate).toLocaleString() }}
                  </li>
                  <li
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="End Date"
                  >
                    <i class="fas fa-hourglass-end"></i> {{ new Date(project.toDate).toLocaleString() }}
                  </li>

                  <li
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Whitelisting Form"
                  >
                    <i class="fas fa-file-alt"></i>
                    <a :href="project.whitelisting_link" target="_blank" class="card-body-custom"
                      >Whitelisting Form Url</a
                    ><span @click="copy(project.whitelisting_link, 'Form Url')" class="copy"><i class="far fa-copy"></i></span>
                  </li>

                  <li
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Investor List"
                  >
                    <i class="fas fa-users"></i
                    ><a class="card-body-custom" :href="`/app/admin/investors?projectId=${project._id}`"
                      >User List ({{project.investorsCount}})</a
                    >
                  </li>

                </ul>
              </div>
            </div>
          </div>
          <div
            class="theme event-card-footer"
          >
            <!-- <span
              data-toggle="tooltip"
              data-placement="bottom"
              title="Twitter handle"
            >
              <a
                :href="`https://twitter.com/${project.twitterHandle}`"
                target="__blank"
              >
                <i class="fab fa-twitter"></i
              ></a>
            </span> -->
            <!-- <span
              data-toggle="tooltip"
              data-placement="bottom"
              title="Telegram handle"
            >
              <a
                :href="`https://telegram.me/${project.telegramHandle}`"
                target="__blank"
                ><i class="fab fa-telegram-plane"></i
              ></a>
            </span> -->
            <span
              style="float: right; cursor: pointer"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Edit this event"
              ><i class="fas fa-pencil-alt"  @click="editProject(project)"></i
            ></span>
          </div>
        </div>

      

      </div>
    </div>


       <paginate
       v-if="projectsToShow.length"
      
        :pageCount="Math.ceil(this.projects.length / this.perPage)"
         :clickHandler="paginateChange"
        :prevText="'Prev'"
        :nextText="'Next'"
        :force-page="currentPage"
        :containerClass="'paginationContainer'"
        :page-class="'paginationItem'"
        
      >
      </paginate>
  </div>
</template>

<script>
import fetch from "node-fetch";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import Datepicker from 'vuejs-datetimepicker'
import Paginate from "vuejs-paginate";
import notificationMixins from '../mixins/notificationMixins';
import apiClientMixin from '../mixins/apiClientMixin';

import { isValidURL } from "../mixins/fieldValidationMixin.js";

import CreateProjectSlide from './CreateProjectSlide/CreateProjectSlide.vue';
import dayjs from "dayjs";
export default {
  name: "Investor",
  components: { Loading, Datepicker, Paginate, CreateProjectSlide },
  
  data() {
    return {
      project: {
        _id: "",
        projectName: "",
        logoUrl: "",
        fromDate: "",
        toDate: "",
        ownerDid: "did:hs:QWERTlkasd090123SWEE12322",
        investorsCount: 0,
        social: {},
        projectStatus: true,
        actions: []
      }, 
      projects: [],   
      
      selectedSocialMedia: null,
      addedSocialMedias: [],
      eventActionList: [],
      socialOptions: [
          {value: null, label: "Select a Social Profile"},
          {
              label: "Twitter",
              
              value: {
                  media: "twitter",
                  icon: "fab fa-twitter",
                  fields: [ 
                      {name: "twitterHandle", type: "text", placeholder: "Twitter Handle", value:"" } ,
                      {name: "twitterPostFormat", type: "text", placeholder: "Twitter Post Format", value: "" }
                  ]
              }, 
              
          },
          {
              label: "Telegram", 
              value: {
                  media: "telegram",
                  icon:"fab fa-telegram-plane",
                  fields: [ 
                      {name: "telegramHandle", type: "text", placeholder: "Telegram Handle", value: "" } ,
                      {name: "telegramAnnouncementChannel", type: "text", placeholder: "Telegram Announcement Channel", value: "", optional: true }
                  ]
              }, 
              
          }
      ],

      searchQuery: "",
      projectsToShow : [],
      perPage: 10,
      projectStatus: true,
      blockchainType: "ETHEREUM",
      eventActionType: "ETHEREUM",
      currentPage: 1,
      themeColor: "#494949",
      themeColorDefault: "#494949",
      fontColor: "#ffffff",
      fontColorDefault: "#ffffff",

      isProjectEditing: false,
      
      cols: [
        "Project Id",
        "Project Name",
        "WL Start Date",
        "WL End Date",
        "Logo Url",
        "Investor List",
        "Whitelisting Form",
        "",
      ],
      whitelistingLink: "",
      active: 0,
      host: location.hostname,
      authToken: localStorage.getItem("authToken"),
      isLoading: false,
      fullPage: true,
      user: {},
      errors: [],
    };
  },

  async mounted() {
    //const usrStr = localStorage.getItem("user");
    //this.user = null; JSON.parse(usrStr);

    const usrStr = localStorage.getItem("user");
    this.user = {
      ...JSON.parse(usrStr),
    };
    this.project.ownerDid = this.user.id; // : "did:hs:QWERTlkasd090123SWEE12322";
    await this.fetchProjects();
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.prevRoute = from;
    });
  },

  methods: {
    onBannerError(e){
      e.target.src =require("../assets/default-banner.png");
    },
    copy(textToCopy, contentType){
			if(textToCopy){
				navigator.clipboard.writeText(textToCopy).then(() => {
						this.notifySuccess(`${contentType} is copied to clipboard`);
					})
					.catch(err => {
						this.notifyErr('Error in copying text: ', err);
					});
			}
    },
    openCreateSidebar(){
      this.resetAllValues();
      this.isProjectEditing = false
        this.$root.$emit('bv::toggle::collapse', 'sidebar-right')
    },
    AddUpdateDelEventActions(event){
      const  { type, data } = event;
      if(type){
        switch(type){
          case "ADD": {
            this.eventActionList.push(data);            
            break;
          }

          case "UPDATE": {
            const { id, _id } =  data;          
            this.eventActionList.map(x => {
              if((x._id === _id) || x.id === id){
                return data;
              }
            })
            break;
          }

          case "DELETE": {
            const actionIndex = this.eventActionList.findIndex(x => x._id === data)
            if(actionIndex > -1){
              this.eventActionList[actionIndex]["isDeleted"] = true;
            }else{
              const actionIndex = this.eventActionList.findIndex(x => x.id === data)
              if(actionIndex > -1){
                this.eventActionList.splice(actionIndex, 1)
              }
            }
            break;
          }
        }
      }
    },
    handleSearch(e){
        if(e.target.value.length){
          this.searchQuery = e.target.value.trim();
          return this.projectsToShow = this.projects.filter(x => (x.projectName.toLowerCase().includes(e.target.value.toLowerCase())));
        } else{
          this.searchQuery = ""
          this.paginateChange(this.currentPage)
        }

    },
    UpdateColors(e){

     this.fontColor = e.fontColor
    this.themeColor = e.themeColor

    },
    paginateChange(e){

      this.currentPage = e
       const skip = this.perPage * (e - 1);

       this.projectsToShow  = this.projects.slice(skip, this.perPage + skip);
    },

    handleThemeChange(e) {
      this.themeColor = e.target.value
    },
    openCreateModal() {
      
      this.isProjectEditing = false;
      this.project = {}
      this.eventActionList = this.eventActionList
      this.blockchainType = "ETHEREUM";
      this.fontColor = this.fontColorDefault;
      this.themeColor = this.themeColorDefault;
      this.projectStatus = true;
      this.$bvModal.show("create-project-modal")
    },
    changeProjectStatus (event) {
      this.project.projectStatus = event.target.options[event.target.options.selectedIndex].value === "false" ? false : true ;
    },
    async fetchProjects() {
      try {
        
        this.isLoading = true;
        if (!this.user.id) throw new Error("No project found");
       

        const url = `${this.$config.studioServer.BASE_URL}api/v1/project?onwer=${this.user.id}`;

        const headers = {
          Authorization: `Bearer ${this.authToken}`,
        };
        const resp = await fetch(url, {
          headers,
          method: "GET",
        });

        if (!resp.ok) {
          return this.notifyErr(resp.statusText);
        }

        const json = await resp.json();
        this.projects = json;
        this.projectsToShow = this.projects.slice(0, this.perPage);
        this.projects.map((x) => {
          x["whitelisting_link"] =
            window.location.origin + ( x.slug && x.slug != "" ?  "/event/" + x.slug :  "/app/form?projectId=" + x._id ) ;
          x["investors_link"] =
            window.location.origin +
            "/app/admin/investors?projectId=" +
            x._id;
        });
        this.notifySuccess("No. of projects fetched " + this.projects.length);
      } catch (e) {
        this.notifyErr(e.message);
      } finally {
        this.isLoading = false;
      }
    },

    gotosubpage: (id) => {
      this.$router.push(`${id}`);
    },
    formateDate(d) {
      return new Date(d).toLocaleString();
    },
    editProject(project) {
      this.resetAllValues();
      this.isProjectEditing = true;
      this.project = {...project};

      this.project.fromDate  =  dayjs(project.fromDate).format("YYYY-MM-DD hh:mm:ss");
      this.project.toDate  =  dayjs(project.toDate).format("YYYY-MM-DD hh:mm:ss");


      // CHECK IF TELEGRAM AND TWITTER EXISTS AND UPDATE THE DATA STRUCTURE
      this.project.social = {
        twitter: {
          isEnabled: true,
          twitterHandle: this.project.twitterHandle,
          twitterPostFormat: this.project.twitterPostFormat
        },
        telegram: {
           isEnabled: true,
          telegramHandle: this.project.telegramHandle,
          telegramAnnouncementChannel : this.project.telegramAnnouncementChannel
        }
      }
    
      this.socialOptions.forEach(media => {
        if(media.value){
          media.value.fields.map(field => {
            field.value = this.project[field.name]
          })
        }
      })

      this.socialOptions.map(x =>{ 
        if(x.value){
            this.addedSocialMedias.push(x.value)
        }
      })

      this.blockchainType = project.blockchainType
      this.themeColor = project.themeColor
      this.fontColor = project.fontColor
      this.projectStatus = project.projectStatus
     // console.log(project.actions)
      this.eventActionList = project.actions
    
    
      this.$root.$emit('bv::toggle::collapse', 'sidebar-right')
    },
    
    async saveProject() {
      
      try {

        if(this.checkIfEverythingIsFilled() !==  true){
            return this.notifyErr( this.checkIfEverythingIsFilled());   
        }
        
        if(this.isProjectNameValid()!==true){
          return this.notifyErr(this.isProjectNameValid());
        }
       
        if (this.isLogoUrlValid() !== true) {
          return this.notifyErr(this.isLogoUrlValid());
        }

        this.isLoading = true;
        const url = `${this.$config.studioServer.BASE_URL}api/v1/project`;
        let headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.authToken}`,
        };

        let method = "POST";

        if (this.isProjectEditing) {
          method = "PUT";
        }

        this.project.toDate = new Date(this.project.toDate).toISOString();
        this.project.fromDate = new Date(this.project.fromDate).toISOString();
       
        this.project.themeColor = this.themeColor.trim().length ?  this.themeColor :  this.themeColorDefault
        this.project.fontColor = this.fontColor.trim().length ?  this.fontColor :  this.fontColorDefault
        this.project.blockchainType = this.blockchainType
        this.project.actions = this.eventActionList
        
    
        const resp = await apiClientMixin.makeCall({url, body:this.project, method, header: headers })

          if(!this.isProjectEditing){
            ////  not using this for the time being just  to test
            // this.whitelistingLink =  window.location.origin + ( resp.data.slug && resp.data.slug != "" ?  "/app/form/" + resp.data.slug :  "/app/form?projectId=" + resp.data._id ) 
            this.whitelistingLink =  window.location.origin + ( resp.data.slug && resp.data.slug != "" ?  "/event/" + resp.data.slug :  "/app/form?projectId=" + resp.data._id ) 
            
          }
        

        setTimeout(() => {
          this.whitelistingLink = "";
        }, 10000);
        this.notifySuccess("Project is saved. Id = " + resp.data._id);
        this.resetAllValues();

        if(this.isProjectEditing){
           await this.fetchProjects();
            this.$root.$emit('bv::toggle::collapse', 'sidebar-right')
          return;
        }
    
      
        /// WARNING:: This code is redundant it seems. 
        /// Not removing but handling the condition.
        const userProjects = JSON.parse(localStorage.getItem("userProjects"));
        if(userProjects){
          userProjects.count += 1
          userProjects.projects.push(resp.data)
          localStorage.setItem("userProjects", JSON.stringify(userProjects))
        }
       
        await this.fetchProjects();
        this.$bvModal.hide("create-project-modal");
        this.$root.$emit('bv::toggle::collapse', 'sidebar-right')
        
        
      } catch (e) {
        
        if(e.errors){
            this.errors = e.errors
            this.$bvModal.show("err-modal");
        }
        this.notifyErr(e || e.message);
      } finally {
        this.isLoading = false;
        // this.clear();
      }
    },

    checkIfEverythingIsFilled(){

        if(!this.project.projectName){
          return "Please Specify a project name"
        }   
        if(!this.project.logoUrl){
          return "Please specify a Banner Url"
        }
        if(! (this.project.fromDate && this.project.toDate)){
          return "Please specify a start and end date"
        }

        // if(!Object.keys(this.project.social).length){
        //   return "Please fill in social configuration";
        // }

        // if(!Object.keys(this.project.social).includes("twitter")){
        //   return "Add Twitter Info your project"
        // }

        // if(!Object.keys(this.project.social).includes("telegram")){
        //   return "Add Telegram Info your project"
        // }
        
        // if(this.project.social.twitter){



        //     if(!this.project.social.twitter.twitterHandle || this.project.social.twitter.twitterHandle.trim() == ""){
        //         return "Please provide a twitter handle"
        //     }
        //     if(!this.project.social.twitter.twitterPostFormat || this.project.social.twitter.twitterPostFormat.trim() == ""){
        //         return "Please provide a Twitter Post Format"
        //     }
        // }


        // if(this.project.social.telegram){

        //      if(!this.project.social.telegram.telegramHandle || this.project.social.telegram.telegramHandle.trim() == ""){
        //          return "Please provide a telegram handle"
        //      }
        // }        
       
         if(!this.blockchainType){
          return "Please provide Blockchain Type"
        }

        if(this.themeColor == "#ffffff"){
          return "Theme color cannot be white"
        }

        if(this.themeColor == this.fontColor && (this.themeColor.trim().length && this.themeColor.trim().length) ){
          return "Theme color and font color cannot be same"
        }
        return true

      
    },  

    isProjectNameValid(){
      if(isValidURL(this.project.projectName)){
        return "Please provide valid project name";
      }
      return true;
    },
    isLogoUrlValid() {
          if (!isValidURL(this.project.logoUrl)) {
            return "Banner Url is not Valid";
          }
          return true;
        },

    clear() {
      this.isProjectEditing = false;
      this.project = {
        _id: "",
        projectName: "",
        logoUrl: "",
        fromDate: "",
        toDate: "",
        onwerDid: "",
        twitterHandle: "",
        telegramHandle: "",
      };
    },

    resetAllValues(){
       this.project = {
         _id: "",
        projectName: "",
        logoUrl: "",
        fromDate: "",
        toDate: "",
        ownerDid: "did:hs:QWERTlkasd090123SWEE12322",
        investorsCount: 0,
        social: {},
        projectStatus: true,
        actions: []
      }, 
      this.eventActionList = []
        this.selectedSocialMedia = null,
        this.addedSocialMedias = [],
        this.socialOptions = [
            {value: null, label: "Select a Social Profile"},
            {
                label: "Twitter",
                
                value: {
                    media: "twitter",
                    icon: "fab fa-twitter",
                    fields: [ 
                        {name: "twitterHandle", type: "text", placeholder: "Twitter Handle", value:"" } ,
                        {name: "twitterPostFormat", type: "text", placeholder: "Twitter Post Format", value: "" }
                    ]
                }, 
                
            },
            {
                label: "Telegram", 
                value: {
                    media: "telegram",
                    icon:"fab fa-telegram-plane",
                    fields: [ 
                        {name: "telegramHandle", type: "text", placeholder: "Telegram Handle", value: "" } ,
                        {name: "telegramAnnouncementChannel", type: "text", placeholder: "Telegram Announcement Channel", value: "", optional: true }
                    ]
                }, 
                
            }
      ]

    }
  },
  mixins: [notificationMixins]
};
</script>
