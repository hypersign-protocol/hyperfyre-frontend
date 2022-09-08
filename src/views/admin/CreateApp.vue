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

.noBullet {
  list-style-type: none;
}

.title {
  color: grey;
  font-size: 18px;
}
.slight-left-margin{
  margin-left: 15px;
  }
.far{
  cursor: pointer;
  margin-top: 5px;
  margin-left: 5px;
}
.allButtons{
  padding-top: 20px;
  padding-right: 16px;
  float: right;
}
.table{
  padding-left: 15px;
  padding-top: 4%;
}
.button-theme{
  background-color:  var(--button-bg-color);
  border-collapse: var(--button-bg-color);
  color: var(--button-text-color);
  border: 0;
}
</style>
<template>
  <div class="home marginLeft marginRight">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    ></loading>

    <div class="text-right">
    </div>
			<div class="col-md-12">
        <h3 v-if="!isEdit">Create Your App</h3>
        <h3 v-else>Edit Your App</h3>
				<div class="card">
					
					<div class="card-body">
						<form>
               <div class="row g-3 align-items-center w-100 mt-4" >
                <div class="text-left col-lg-3 col-md-3 text-left">
                 <label for="appId" class="col-form-label"> 
                  <tool-tips infoMessage="Application ID, generated once you create an app"></tool-tips>App ID : </label>
                </div>
                <div class="col-lg-9 col-md-9 px-0">
                 <input
                    disabled
                    v-model="app._id"
                    type="text"
                    id="appId"
                    class="form-control w-100"
                  />
                </div>
              </div>
              <div class="row g-3 align-items-center w-100 mt-4">
                <div class="text-left col-lg-3 col-md-3 text-left">
                 <tool-tips infoMessage="Name of the application"></tool-tips><label for="name" class="col-form-label">App Name
                   <span style="color: red">*</span>: 
                 </label>
                </div>
                <div class="col-lg-9 col-md-9 px-0">
                 <input
                    v-model="app.appName"
                    type="text"
                    id="name"
                    class="form-control w-100"
                    placeholder="Demo Application"
                  />
                </div>
              </div>
            <div class="row g-3 align-items-center w-100 mt-4">
                <div class="text-left col-lg-3 col-md-3 text-left">
                 <tool-tips :infoMessage='`Enter base URL of your server. This URL will be whitelisted to access data from ${appName}`'></tool-tips><label for="baseUrl" class="col-form-label">Base URL
                   <span style="color: red">*</span>: 
                 </label>
                </div>
                <div class="col-lg-9 col-md-9 px-0">
                 <input
                    v-model="app.baseUrl"
                    type="text"
                    id="baseUrl"
                    class="form-control w-100"
                    placeholder="http://localhost:3003/"
                  />
                </div>
            </div>
            <div class="row g-3 align-items-center w-100 mt-4" v-if="isEdit">
                <div class="col-lg-3 col-md-3 text-left">
                 <tool-tips infoMessage="Switch to assign new credentials to your app"></tool-tips><label for="endDate" class="col-form-label">Generate Credentials:  
                </label>
                </div>
               <div class="col-lg-9 col-md-9 px-0"> 
                <b-form-checkbox v-model="app.toggle" name="check-button" switch>
                </b-form-checkbox>
              </div>  
            </div>
            </form>
            <div class="allButtons" style="float:right">
							<!-- <button v-if="!isEdit" class="btn button-theme " :style="buttonThemeCss" type="submit" @click.prevent="generateApp">Create</button> -->
              <hf-buttons
              v-if="!isEdit"
              name="Create"
              @executeAction="generateApp()"
              ></hf-buttons>
              <!-- <button v-if="isEdit" class="btn  button-theme" :style="buttonThemeCss" type="submit" @click.prevent="update">Update</button> -->
              <hf-buttons
              v-if="isEdit"
              name="Update"
              @executeAction="update()"
              ></hf-buttons>
              <!-- <button v-if="isEdit" class="btn btn-danger slight-left-margin" type="button" @click.prevent="cancel">Cancel</button> -->
              <hf-buttons
              v-if="isEdit"
              name="Cancel"
              customClass="btn btn-danger slight-left-margin"
              @executeAction="cancel()"
              ></hf-buttons>
            </div>
					</div>
				</div>
			</div>
      <div class="table" v-if="apps.length">
      <h3 v-if="apps.length">Your Apps</h3>
      <!-- <div class="row" > -->
      <!-- <div class="col-md-12"> -->
            <!-- <table class="table table-bordered" 
            style="background:#FFFF"
            v-if="apps.length">
          <thead class="thead-light">
            <tr>
              <th>AppId</th>
              <th>Name</th>
              <th>Base URL</th>
              <th>Wallet Address</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in apps" :key="row._id">
              <th>
                <p>{{row._id}}</p>
              </th>
              <td><p>{{row.appName}}</p></td>
              <td>
              <p style="display:inline-block;">{{row.baseUrl}}</p>
              </td>
              <td style="display:flex;"
              ><p
              >{{truncate1(row.appWalletAddress, 15)}}</p>
              <i class="far fa-copy"
              title="Copy public key to clipboard"
              @click="copy(row.appWalletAddress,'AppWallet Address')"
              ></i>
              </td>
              <td>
                   <i class="fas fa-pencil-alt"
                  style="text-transform: uppercase; float:right; cursor: pointer;"
                  title="Click to edit the app and generate new keypair"
                  @click="editbtn(row)"
                >
              </i>
              </td>
            </tr>
          </tbody>
        </table> -->
        <hf-table
        :items="apps"
        :fields="appHeader"
        @updateRecord="row => editbtn(row)"
        customStyle="table-bordered"
        ></hf-table>
        <!-- </div> -->
      <!-- </div> -->
        </div>
		</div>
    
</template>

<script>
import notificationMixins from "../../mixins/notificationMixins";
import ToolTips from "../../components/basic/toolTips";
import Web3 from "web3"
import config from "../../config"
import {mnemonicToSeed,generateMnemonic} from "bip39"
import HDKey from "hdkey"
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import {
  isValidURL,
  isValidText,
} from "../../mixins/fieldValidationMixin"
import Messages from "../../utils/messages/admin/en"
import HfButtons from "../../components/elements/HfButtons.vue"
import HfTable from "../../components/elements/HfTable.vue"
export default {
  name: "CreateApp",
  components: {Loading, ToolTips, HfButtons, HfTable},
  computed:{
       buttonThemeCss() {
      return {
        '--button-bg-color': config.app.buttonBgColor,
        '--button-text-color':config.app.buttonTextColor
      }
     }
  },
  data() {
    return {
      isEdit:false,
      appName: config.appName,
      app:{
        appName: "",
        baseUrl: "",
        _id:"",
        appWalletAddress:"",
        toggle:false,
      },
      isLoading: false,
      fullPage: true,
      errors: [],
      apps: [],
      authToken: localStorage.getItem("authToken"),
      appHeader:[
        {key:"_id",label:"AppID",type:"text"},
        {key:"appName",label:"Name",type:"text"},
        {key:"baseUrl",label:"Base URL",type:"text"},
        {key:"appWalletAddress",label:"Wallet Address",type:"text",isCopy:true},
        {key:"action", label:"Action",type:"action", editOnly:true },
      ]
    };
  },
  async mounted() {
this.getApp();
  },
  methods: {
   async update(){
        try{
        if (this.isEverythingisValid() !== true) {
          return this.notifyErr(this.isEverythingisValid());
        }
        this.isLoading=true;
        let credential;
        if(this.app.toggle){
           credential= await  this.generateWallet();
           credential['appId']=this.app._id;
          this.app.appWalletAddress = credential.appWalletAddress;
        }
            const url = `${this.$config.studioServer.BASE_URL}api/v1/app`;
            let headers = {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.authToken}`,
            };
            const resp = await fetch(url, {
              method: "PUT",
              body: JSON.stringify({
                appName: this.app.appName,
                baseUrl: this.app.baseUrl,
                appWalletAddress:this.app.appWalletAddress,
                _id:this.app._id,
                generateNewKeyPair:this.app.toggle
                }),
              headers,
            });
            const json = await resp.json();
            if (json) {
              if (!resp.ok) {
                return this.notifyErr(json);
              } else {
                if(this.app.toggle){
                  this.downloadCredentials(credential);
                }
                this.notifySuccess(Messages.APP.APP_UPDATED_SUCCESSFULLY);
                this.clearselected();
                this.getApp();
                this.isEdit=false;
              }
            } else {
              throw new Error("Error while generating App");
            }
        }catch (e) {
        if (e.errors) {
          this.errors = e.errors;
        }
        this.notifyErr(e || e.message || e.msg);
      } finally {
        this.isLoading = false;
      }
    },
    cancel(){
      this.isEdit=false;
      this.clearselected();
    },
    editbtn(row){
      //console.log(row);
      this.isEdit= true;
      this.app = {...row};
      this.app.toggle=false;
    },
    async getApp() {
      this.isLoading=true;
      const url = `${this.$config.studioServer.BASE_URL}api/v1/app`;
      const headers = {
        Authorization: `Bearer ${this.authToken}`,
      };
      const resp = await fetch(url, {
        headers,
        method: "GET",
      });

      if (!resp.ok) {
        return this.notifyErr(resp.statusText);
      } else{
        this.apps = await resp.json();
        this.isLoading=false;
      }
    },
    async generateApp() {
        try{
        if (this.isEverythingisValid() !== true) {
          return this.notifyErr(this.isEverythingisValid()); 
        }
        else{
          this.isLoading=true;
          const credential= await  this.generateWallet();
          this.app.appWalletAddress = credential.appWalletAddress;
            const url = `${this.$config.studioServer.BASE_URL}api/v1/app`;
            let headers = {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.authToken}`,
            };
            const resp = await fetch(url, {
              method: "POST",
              body: JSON.stringify({
                appName: this.app.appName,
                baseUrl: this.app.baseUrl,
                appWalletAddress:this.app.appWalletAddress,
                _id:"" || this.app._id
                }),
              headers,
            });
            const json = await resp.json();
            if (json) {
              if (!resp.ok) {
                return this.notifyErr(json);
              } else {
                credential['appId']= json.AppId
                this.notifySuccess(Messages.APP.APP_GENERATED_SUCCESSFULLY);
                this.downloadCredentials(credential);
                this.clearselected();
                this.getApp();
              }
            } else {
              throw new Error("Error while generating App");
            }
        }
        }catch (e) {
        if (e.errors) {
          this.errors = e.errors;
        }
        this.notifyErr(e || e.message || e.msg);
      } finally {
        this.isLoading = false;
      }
    },
    isEverythingisValid(){
      if(this.app.appName==""){
        return Messages.APP.APP_NAME_NOT_EMPTY;
      }
      if ((isValidURL(this.app.appName))||(!isValidText(this.app.appName))) {
        return Messages.APP.APP_NAME_URL;
      }  
      if(!this.app.baseUrl || this.app.baseUrl==""){
        return Messages.APP.APP_BASE_URL_EMPTY;
      }
      if(!(isValidURL(this.app.baseUrl))){
        return Messages.APP.APP_BASE_URL_NOT_VALID
     }
      return true
    },
    clearselected(){
      this.app.appName="";
      this.app.baseUrl="";
      this.app._id="";
      this.app.appWalletAddress="";
      this.app.toggle=false;
    },
     forceFileDownload(data, fileName) {
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
    },
    downloadCredentials(credential) {
      this.forceFileDownload(
        JSON.stringify(credential),
        "Appcredential.json"
      );
    },
  async generateWallet(){
  const web3=new Web3()
  const mneomonic = await generateMnemonic(256);
  const seed = await mnemonicToSeed(mneomonic);
  const masterKeyBuff = HDKey.fromMasterSeed(seed);
  const BIP32EXTENDED = await masterKeyBuff.derive("m/44'/60'/0'/0/0");
  const credential = {
    appWalletAddress: web3.eth.accounts.privateKeyToAccount(
      BIP32EXTENDED.privateKey.toString("hex"),
      true
    ).address,
    appPrivateKey: "0x" + BIP32EXTENDED.privateKey.toString("hex"),
    appPublicKey: "0x" + BIP32EXTENDED.publicKey.toString("hex"),
    recoveryPhrase: mneomonic,
  }
    return credential

    }
  },
  mixins: [notificationMixins],
};
</script>
