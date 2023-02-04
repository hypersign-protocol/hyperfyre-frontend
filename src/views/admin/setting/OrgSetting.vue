<template>
    <div class="home marginLeft marginRight">
        <loading :active.sync="isLoading" :can-cancel="true" :is-full-page="true"></loading>
        <h3>Org Setting</h3>
        <div class="row">
            <div class="col-md-12">

                <div class="card event-card">
                    <div class="card-body">

                        <div class="row g-3 align-items-center w-100 mt-4">
                            <div class="text-left col-lg-8 col-md-8 text-left">
                                <tool-tips infoMessage="Enter color in HEX format"></tool-tips><label for="name"
                                    class="col-form-label">Theme Color
                                    <span style="color: red">*</span>:
                                </label>
                            </div>
                            <div class="col-lg-4 col-md-4 px-0">
                                <input type="color" id="name" v-model="orgSetting.themeColor" class="form-control w-100"
                                    :placeholder="themeColor" />
                            </div>
                        </div>
                        <div class="row g-3 align-items-center w-100 mt-4">
                            <div class="text-left col-lg-8 col-md-8 text-left">
                                <tool-tips infoMessage="Enter color in HEX format"></tool-tips><label for="name"
                                    class="col-form-label">Button Color
                                    <span style="color: red">*</span>:
                                </label>
                            </div>
                            <div class="col-lg-4 col-md-4 px-0">
                                <input type="color" id="name" v-model="orgSetting.buttonBGColor"
                                    class="form-control w-100" :placeholder="buttonBGColor" />
                            </div>
                        </div>
                        <div class="row g-3 align-items-center w-100 mt-4">
                            <div class="text-left col-lg-8 col-md-8 text-left">
                                <tool-tips infoMessage="Enter color in HEX format"></tool-tips><label for="name"
                                    class="col-form-label">Button Font Color
                                    <span style="color: red">*</span>:
                                </label>
                            </div>
                            <div class="col-lg-4 col-md-4 px-0">
                                <input type="color" id="name" v-model="orgSetting.buttonTextColor"
                                    class="form-control w-100" :placeholder="buttonTextColor" />
                            </div>
                        </div>
                        <div class="row g-3 align-items-center w-100 mt-4">
                            <div class="text-left col-lg-8 col-md-8 text-left">
                                <tool-tips infoMessage="Logo (Maximum size 400kb)"></tool-tips><label for="name"
                                    class="col-form-label">Logo:
                                </label>
                            </div>
                            <div class="col-lg-4 col-md-4 px-0">
                                <div style="display:flex;">
                                <div placeholder="Maximum size 400kb" id="name" class="form-control w-100">
                                <input type="file" id="file" accept="image/jpeg, image/png" @change="fileUpload">
                            </div>    
                            </div>
                            <a href="#" style="float:right;color:#495057" @click.prevent="preview">Preview</a>                               
                            </div>
                        </div>
                        <div class="row g-3 align-items-center w-100 mt-4" style="float:right; padding-right: 1.5%">
                            <div class="text-left col-lg-6 col-md-6 text-right">

                            </div>

                            <div class="text-left col-lg-6 col-md-6 text-right">
                                <!-- <button class="btn  button-theme" :style="buttonThemeCss" type="submit"
                                    @click="update">Update</button> -->
                                    <hf-buttons
                                    name="Update"
                                    @executeAction="update()"
                                    ></hf-buttons>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ToolTips from "../../../components/basic/toolTips";
import config from "../../../config"
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import Messages from "../../../utils/messages/admin/en"
import notificationMixins from "../../../mixins/notificationMixins";
import HfButtons from "../../../components/elements/HfButtons.vue"
import {
    isValidURL
} from "../../../mixins/fieldValidationMixin";
export default {
    name: "OrgSetting",
    components: { Loading, ToolTips, HfButtons },
    computed: {
        buttonThemeCss() {
            return {
                '--button-bg-color': config.app.buttonBgColor,
                '--button-text-color': config.app.buttonTextColor
            }
        }
    },
    data(){
        return{
            orgSetting: {
                buttonBGColor: "#f1b319",
                buttonTextColor: "#000000",
                themeColor: "#363740",
                logoPath: "",
                _id:"",
            },
            isLoading: false,
            authToken: localStorage.getItem("authToken"),
            accessToken: localStorage.getItem('accessToken'),
            project: {
                "isArchived": false,
                "investorsCount": 5,
                "tags": [
                    {
                        "type": "PLAY2EARN_TAG",
                        "id": "TAGS_0"
                    }
                ],
                "_id": "62b6e0506616ed23f7dd96e1",
                "projectName": "Kelros Test",
                "logoUrl": "https://i.ibb.co/f8xqFj0/Screenshot-2022-07-06-122507.png",
                "did": "did:hs:9e62dad7-ceb8-4576-ac96-551f31e8e008",
                "fromDate": "2022-07-14 03:52:00",
                "toDate": "2022-08-19 10:14:00",
                "ownerDid": "vishwasbhushan001@gmail.com",
                "projectStatus": true,
                "slug": "kelros-test-1",
                "isNotificaionEnabled": false,
                "createdAt": "2022-06-25T10:15:44.515Z",
                "updatedAt": "2022-06-25T10:15:44.515Z",
                "refereePoint": 10,
                "referralPoint": 5,
                "__v": 0,
                "actions": [
                    {
                        "_id": "62b6e0506616ed23f7dd96e5",
                        "eventId": "62b6e0506616ed23f7dd96e1",
                        "order": 1,
                        "type": "PUSH_NOTIFICATION",
                        "title": "Subscribe  Notification",
                        "score": 5,
                        "isManadatory": true,
                        "value": "",
                        "placeHolder": "Subscription",
                        "__v": 0
                    },
                    {
                        "_id": "62d03bad4bbeb4643547b187",
                        "eventId": "62b6e0506616ed23f7dd96e1",
                        "order": 3,
                        "type": "TWITTER_FOLLOW",
                        "title": "Follow our twitter handle",
                        "placeHolder": "",
                        "isManadatory": true,
                        "value": "hypersignchain",
                        "score": 10,
                        "slug": "",
                        "__v": 0
                    },
                    {
                        "_id": "62d03bbc4bbeb4643547b194",
                        "eventId": "62b6e0506616ed23f7dd96e1",
                        "order": 4,
                        "type": "TELEGRAM_JOIN",
                        "title": "Join our Telegram channel",
                        "placeHolder": "",
                        "isManadatory": true,
                        "value": "hypersignchain",
                        "score": 10,
                        "slug": "",
                        "__v": 0
                    },
                    {
                        "_id": "62d03beb4bbeb4643547b1a2",
                        "eventId": "62b6e0506616ed23f7dd96e1",
                        "order": 5,
                        "type": "DISCORD_JOIN",
                        "title": "Join our Discord server",
                        "placeHolder": "",
                        "isManadatory": true,
                        "value": "https://discord.gg/SfzezRJq",
                        "score": 10,
                        "slug": "",
                        "__v": 0
                    }
                ],
                "whitelisting_link": "http://localhost:9002/form/kelros-test-1",
                "investors_link": "http://localhost:9002/admin/participants?projectId=62b6e0506616ed23f7dd96e1",
                "social": {
                    "twitter": {
                        "isEnabled": true,
                        "twitterHandle": "__vue_devtool_undefined__",
                        "twitterPostFormat": "__vue_devtool_undefined__"
                    },
                    "telegram": {
                        "isEnabled": true,
                        "telegramHandle": "__vue_devtool_undefined__",
                        "telegramAnnouncementChannel": "__vue_devtool_undefined__"
                    }
                }
            }
        }
    },
    async created(){
        try{
            const url = `${this.$config.studioServer.BASE_URL}api/v1/admin/org`;

            const resp = await fetch(url, {
                headers: this.getHeaders(),
                method: "GET",
            });

            if (!resp.ok) {
                return this.notifyErr(resp.statusText);
            } else {
                const result = await resp.json();
                Object.assign(this.orgSetting, {...result})
            }
        }catch(e){

        }
    },
    methods: {
    fileUpload(e) {                 
    var file
        if((file = e.target.files[0])) {
        if(file.size>config.banner.bannersize)
        {
        return this.notifyErr('File size is more than 400kb')
        }        
        const reader = new FileReader()
        reader.readAsDataURL(file)
        // let dataUrl
        reader.onload=e=>{
            this.orgSetting.logoPath= e.target.result
        }
    }    

       
    },
    preview(){    
    this.$swal.fire({
    position:'center',
    title: 'Preview',
    imageUrl: this.orgSetting.logoPath,
    imageWidth: 400,
    imageHeight: 300,
    imageAlt: 'Custom image',
    confirmButtonColor:'rgb(241, 179, 25)',
})
  },
        checkIfValidHex(hex){
            
            if(hex){
                if (!hex.startsWith("#")){
                    throw new Error('Color in HEX format should start with #')
                }

                if (hex.length != 7) {
                    throw new Error('Color is not in HEX format')
                }
            } else{
                throw new Error('Color can not be empty')
            }
        },
        isAllFieldsValid(){
            if (!this.orgSetting.buttonBGColor){
                throw new Error('Button background color can not be empty')
            }
            if (!this.orgSetting.buttonTextColor) {
                throw new Error('Button font color can not be empty')
            }
            if (!this.orgSetting.themeColor) {
                throw new Error('Theme color can not be empty')
            }
            if(this.orgSetting.logoPath){
                 if (!isValidURL(this.orgSetting.logoPath)){
                   throw new Error('Invalid URL')
            }
            }
            this.checkIfValidHex(this.orgSetting.buttonBGColor)
            this.checkIfValidHex(this.orgSetting.buttonTextColor)
            this.checkIfValidHex(this.orgSetting.themeColor)
        },
        getHeaders(){
            let headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.authToken}`,
                AccessToken: `Bearer ${this.accessToken}`,
            };

            return headers;
        },
        async update(){
            try{

                this.isLoading = true;

                this.isAllFieldsValid()
                
                const url = `${this.$config.studioServer.BASE_URL}api/v1/admin/org`;
                const resp = await fetch(url, {
                    method: "PUT",
                    body: JSON.stringify({
                        ...this.orgSetting
                    }),
                    headers: this.getHeaders(),
                });

                const json = await resp.json();
                if (json) {
                    if (!resp.ok) {
                        return this.notifyErr(json);
                    } else {
                        this.notifySuccess(Messages.ORGDATA.ORG_UPDATED_SUCCESSFULLY);                        
                    }
                } else {
                    throw new Error("Error while updating your setting");
                }
            }catch(e){
                this.notifyErr(e)
            } finally {
                this.isLoading = false;
            }
        }
    },
    mixins: [notificationMixins],

}

</script>

<style scoped>
.uploading-image{
     display:flex;
   }
.button-theme {
    background-color: var(--button-bg-color);
    border-collapse: var(--button-bg-color);
    color: var(--button-text-color);
    border: 0;
}
.slight-left-margin-5 {
  margin-left: 5px;
}

</style>