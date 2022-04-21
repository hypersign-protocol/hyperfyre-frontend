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
						<h4>Create Your App</h4>
					</div>
					<div class="card-body">
						<form>
							<div class="form-group">
								<input type="text" class="form-control"  id="name" placeholder="App name" v-model="app.appName">
							</div>
							<div class="form-group">
								<input type="text" class="form-control"  id="baseUrl" placeholder="App base URL" v-model="app.baseUrl">
							</div>
              <div class="form-group" v-if="app._id || _id">
								<input type="text"  disabled class="form-control"  id="appId" placeholder="App ID" v-model="app._id">
							</div>
							<button class="btn btn-success button-theme" type="submit" @click.prevent="generateApp">Generate</button>
              <button v-if="isEdit" class="btn btn-danger button-theme slight-left-margin" type="button" @click.prevent="cancel">Cancel</button>
						</form>
					</div>
				</div>
			</div>
      <div class="row" style="margin-top: 4%; ">
      <div class="col-md-12">
            <table class="table table-bordered" style="background:#FFFF">

          <thead class="thead-light">
            <tr>
              <th>AppID</th>
              <th>App Name</th>
            
              <th>App URL</th>
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
              
              <button
                  style="text-transform: uppercase; float:right;"
                  class="btn btn-warning button-theme btn-sm"
                  title="Click to update app information"
                  @click="updateBtn(row)"
                >
                  Update
                </button>
                
              
                
              </td>
            </tr>
          </tbody>
        </table>
        </div>
        </div>
		</div>
    
</template>

<script>
import notificationMixins from "../../mixins/notificationMixins";
import elliptic from "elliptic"
import FileDownload from "js-file-download";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import {
  isValidURL,
  isValidText
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
        publicKey:""
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
    cancel(){
      this.isEdit=false;
      this.clearselected();
    },
    updateBtn(row){
      this.isEdit= true;
      console.log(row);
      this.app = {...row};
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
                this.notifySuccess("App generated Successfully");
                FileDownload(privatekey, `PrivateKey.csv`);
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
      this.app.publicKey="";
    }
  },
  mixins: [notificationMixins],
};
</script>
