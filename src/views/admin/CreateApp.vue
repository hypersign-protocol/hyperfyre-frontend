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
}
.table{
  padding-left: 15px;
  padding-top: 4%;
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
			<div class="col-md-8">
				<div class="card">
					<div class="card-header">
						<h4 v-if="!isEdit">Create Your App</h4>
            <h4 v-else>Edit Your App</h4>
					</div>
					<div class="card-body">
						<form>
               <div class="row g-3 align-items-center w-100 mt-4" >
                <div class="text-left col-lg-3 col-md-3 text-left">
                 <label for="appId" class="col-form-label">App ID : </label>
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
                 <label for="name" class="col-form-label">App Name
                   <span style="color: red">*</span>: 
                 </label>
                </div>
                <div class="col-lg-9 col-md-9 px-0">
                 <input
                    v-model="app.appName"
                    type="text"
                    id="name"
                    class="form-control w-100"
                    placeholder="Enter Name for your App"
                  />
                </div>
              </div>
            <div class="row g-3 align-items-center w-100 mt-4">
                <div class="text-left col-lg-3 col-md-3 text-left">
                 <label for="baseUrl" class="col-form-label">Base URL
                   <span style="color: red">*</span>: 
                 </label>
                </div>
                <div class="col-lg-9 col-md-9 px-0">
                 <input
                    v-model="app.baseUrl"
                    type="text"
                    id="baseUrl"
                    class="form-control w-100"
                    placeholder="Enter base URL for your App"
                  />
                </div>
            </div>
            <div class="row g-3 align-items-center w-100 mt-4" v-if="isEdit">
                <div class="col-lg-3 col-md-3 text-left">
                 <label for="endDate" class="col-form-label">Generate new Public and Private key
                <span style="color: red">*</span>:  
                </label>
                </div>
               <div class="col-lg-9 col-md-9 px-0"> 
                <b-form-checkbox v-model="app.toggle" name="check-button" switch>
                </b-form-checkbox>
              </div>  
            </div>
            <div class="allButtons">
							<button v-if="!isEdit" class="btn btn-warning button-theme" type="submit" @click.prevent="generateApp">Generate</button>
              <button v-if="isEdit" class="btn btn-warning button-theme" type="submit" @click.prevent="update">Update</button>
              <button v-if="isEdit" class="btn btn-danger button-theme slight-left-margin" type="button" @click.prevent="cancel">Cancel</button>
            </div>
            </form>
					</div>
				</div>
			</div>
      <div class="table">
      <h3 v-if="apps.length">Your Apps</h3>
      <div class="row" >
      <div class="col-md-12">
            <table class="table table-bordered" 
            style="background:#FFFF"
            v-if="apps.length">
          <thead class="thead-light">
            <tr>
              <th>AppID</th>
              <th>App Name</th>
              <th>App URL</th>
              <th>Public Key</th>
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
              <i class="fas fa-pencil-alt"
                  style="text-transform: uppercase; float:right; cursor: pointer;"
                  title="Click to edit the app and generate new keypair"
                  @click="editbtn(row)"
                >
              </i>
              </td>
              <td style="display:flex;"
              ><p
              >{{truncate1(row.publicKey,15)}}</p>
              <i class="far fa-copy"
              title="Copy public key to clipboard"
              @click="copy(row.publicKey,'Public Key')"
              ></i>
              </td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>
        </div>
		</div>
    
</template>

<script>
import notificationMixins from "../../mixins/notificationMixins";
import elliptic from "elliptic"
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import {
  isValidURL,
  isValidText,
  truncate
} from "../../mixins/fieldValidationMixin"
import Messages from "../../utils/messages/admin/en"
export default {
  name: "CreateApp",
  components: {Loading},
  data() {
    return {
      isEdit:false,
      app:{
        appName: "",
        baseUrl: "",
        _id:"",
        publicKey:"",
        toggle:false,
      },
      isLoading: false,
      fullPage: true,
      errors: [],
      apps: [],
      authToken: localStorage.getItem("authToken"),
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
        let privatekey;
        this.isLoading=true;
        if(this.app.toggle){
          const ec = new elliptic.ec('secp256k1');
          const keyPair = ec.genKeyPair();
          const privKey = keyPair.getPrivate();
          const pubKey = keyPair.getPublic();
          const publickey=pubKey.encode('hex');
          privatekey=privKey.toString('hex');
          this.app.publicKey = publickey;
          this.downloadCredentials(privatekey);
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
                publicKey:this.app.publicKey,
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
      console.log(row);
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
          const ec = new elliptic.ec('secp256k1');
          const keyPair = ec.genKeyPair();
          const privKey = keyPair.getPrivate();
          const pubKey = keyPair.getPublic();
          const publickey=pubKey.encode('hex');
          const privatekey=privKey.toString('hex');
          this.app.publicKey = publickey;
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
                publicKey:this.app.publicKey,
                _id:"" || this.app._id
                }),
              headers,
            });
            const json = await resp.json();
            if (json) {
              if (!resp.ok) {
                return this.notifyErr(json);
              } else {
                this.notifySuccess(Messages.APP.APP_GENERATED_SUCCESSFULLY);
                this.downloadCredentials(privatekey);
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
    copy(textToCopy, contentType) {
      if (textToCopy) {
        navigator.clipboard
          .writeText(textToCopy)
          .then(() => {
            this.notifySuccess(
              `${contentType}, ${Messages.EVENTS.CREATE_EDIT_EVENT.COPIED_TO_CLIPBOARD}`
            );
          })
          .catch((err) => {
            this.notifyErr(
              Messages.EVENTS.CREATE_EDIT_EVENT.ERROR_WHILE_COPYING,
              err
            );
          });
      }
    },
    clearselected(){
      this.app.appName="";
      this.app.baseUrl="";
      this.app._id="";
      this.app.publicKey="";
      this.app.toggle=false;
    },
    truncate1(str, number) {
      return truncate(str, number);
    },
     forceFileDownload(data, fileName) {
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
    },
    downloadCredentials(privatekey) {
      this.forceFileDownload(
        JSON.stringify(privatekey),
        "privatekey.json"
      );
    },
  },
  mixins: [notificationMixins],
};
</script>
