<style scoped>
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
      <!-- <button @click="invite()" class="btn button-theme" :style="buttonThemeCss">
         Invite <i class="fas fa-plus text-black"></i>
      </button> -->
      <hf-buttons
      name="Invite"
      @executeAction="openInvite()"
      iconClass="fas fa-plus text-black"
      ></hf-buttons>
    </div>
    <hf-page-message v-if="!this.teammates.length" :message="msg"
    >
    </hf-page-message>
    <hf-pop-up
    Header="Invite Form"
    >
     <div class="row g-3 align-items-center w-100  mt-4">
            <div class="col-lg-3 col-md-3 text-left">
                <label for="email" class="col-form-label">Email Id :</label>
            </div>
            <div class=" col-lg-9 col-md-9 px-0">
                <input v-model="email" type="text" placeholder="john@gmail.com" id="email" class="form-control w-100" >
            </div>   
    </div>
    <div class="row g-3 align-items-center w-100  mt-4">
            <div class="col-lg-3 col-md-3 text-left">
                <label for="email" class="col-form-label">Name :</label>
            </div>
            <div class=" col-lg-9 col-md-9 px-0">
                <input v-model="name" type="text" placeholder="john" id="name" class="form-control w-100" >
            </div>   
    </div>


    <div class="mt-4 text-center">
    <hf-buttons
    name="Send Invitation"
    title="Send Invitation"
    @executeAction="invite()"
    ></hf-buttons>
    </div>
    </hf-pop-up>
    <h3 v-if="teammates.length">Your Team</h3>
    <div class="row" style="margin-top: 2%">
      <div class="col-md-12">
        <table
          v-if="teammates.length"
          class="table event-card"
          style="background: #ffff"
        >
          <thead class="thead-light">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in teammates" :key="row._id">
              <th>
                {{ row.name }}
              </th>
              <td>{{ row.email }}</td>
              <td v-if="row.status === `active`">
                <h5>
                  <b-badge
                    style="text-transform: uppercase"
                    variant="success"
                    title="Teammate has accepted the invitation"
                    >{{ row.status }}</b-badge
                  >
                </h5>
              </td>
              <td v-else>
                <h5>
                  <b-badge style="text-transform: uppercase" variant="danger"
                  title="Teammate has not yet accepted the invitation">{{
                    row.status
                  }}</b-badge>
                </h5>
              </td>
              <td>
                <!-- <button
                  style="text-transform: uppercase"
                  class="btn btn-danger btn-sm"
                  title="Click to remove the teammate"
                >
                  <i class="fas fa-trash"></i>
                </button> -->
              <span @click="remove(row._id)"
              title="Click to remove the teammate"
              style="cursor:pointer"
              ><i class="fas fa-trash"></i></span>
              </td>
            </tr>
          </tbody>
        </table>

       
        <h3 v-if="$accounts.length" class="leftAlign">Team's you are part of</h3>
         <table  v-if="$accounts.length" class="table event-card" style="background:#FFFF">

          <thead class="thead-light">
            <tr>
              <th>Admin Name</th>
              <th>Admin Email</th>
            
              <th>Login As</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in $accounts" :key="row._id">
              <th>
                {{ row.adminName }}
              </th>
              <td>{{ row.email }}</td>

              <td v-if="isAdmin(row.email)">
                <h5>
                <b-badge
                class="badge bg-success">
                  ACTIVE
                </b-badge>
                </h5>
              </td>

              <td v-else>
                <!-- <button
                  style="text-transform: uppercase"
                  class="btn btn-danger btn-sm"
                  title="Click to switch to this account"
                >Switch
                </button> -->               
                <span
                title="Click to switch to this account"
                style="cursor:pointer"
                @click="switchAccount(row)"
                ><i class="fas fa-sync" aria-hidden="true"></i>
                </span>
              
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import config from "../../config";
import notificationMixins from "../../mixins/notificationMixins";
import SimpleVueValidation from "simple-vue-validator";
import { isValidURL,isValidText } from '../../mixins/fieldValidationMixin';
import HfPageMessage from "../../components/elements/HfPageMessage.vue"
import Messages from "../../utils/messages/admin/en"
import HfButtons from "../../components/elements/HfButtons.vue"
import HfPopUp from "../../components/elements/HfPopUp.vue"
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  name: "Teammate",
  components: {HfPageMessage, HfButtons, HfPopUp, Loading},
  computed:{
 buttonThemeCss() {
      return {
        '--button-bg-color': config.app.buttonBgColor,
        '--button-text-color':config.app.buttonTextColor
      }
     },
     teammates(){
      return this.$store.state.teammates
    }
  },
  data() {
    return {
      email: "",
      name: "",
      user: {},
      accessuser: {},
      appName: "",
      authToken: localStorage.getItem("authToken"),
      msg:Messages.TEAMMATES.NO_TEAMS_FOUND,
      isLoading:false,
      fullPage:true
    };
  },
  created() {
    const usrStr = localStorage.getItem("user");
    this.user = {
      ...JSON.parse(usrStr),
    };
    const aceesUser = localStorage.getItem("accessuser");
    this.accessuser = {
      ...JSON.parse(aceesUser),
    };
  },
  methods: {
     isEmail(email){
      const Validator = SimpleVueValidation.Validator;
      if(Validator.value(email).required().email()._messages[0]===undefined){
        return true;
      }else{
        return false
      }
    },
    
    isAdmin(email) {
      if (this.accessuser.adminEmail !== undefined) {
        return this.accessuser.adminEmail === email;
      } else if (this.user.email === email) {
        return true;
      }
      return false;
    },
  switchAccount(row) {
    if(row.adminName ==="Self"){
        localStorage.removeItem("authToken");
        localStorage.removeItem("accessuser");
        localStorage.removeItem("accessToken");
        localStorage.setItem("authToken", row.authToken);

        this.$router.push("/admin/dashboard");
        this.$store.dispatch('getApps',row.authToken);
      } else {
        localStorage.setItem("accessToken", row.authToken);
        //console.log(row);
        localStorage.setItem(
          "accessuser",
          JSON.stringify({
            adminName: row.adminName,
            adminEmail: row.email,
            adminDid: row.adminDid,
          })
        );
         this.$router.push("/admin/dashboard");
         this.$store.dispatch('getApps',this.authToken);
        
      }
    },
    gotosubpage: (id) => {
      this.$router.push(`${id}`);
    },
     openInvite() {
    this.clearAll();
    this.$root.$emit('modal-show')
    },
    async invite(){
      try{
        if (!this.email || !this.isEmail(this.email)|| !this.name || isValidURL(this.name) || !isValidText(this.name)){
          return this.notifyErr("Please enter valid email and name")
        }
        if(this.name.length>20){
         return this.notifyErr("Please enter name upto 20 character")
        }
        this.isLoading = true
         const url = `${this.$config.studioServer.BASE_URL}api/v1/admin/team/add`;
            let headers = {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.authToken}`,
            };
            const resp = await fetch(url, {
              method: "POST",
              body: JSON.stringify({
                name: this.name,
                email: this.email,
              }),
              headers,
            });
            const json = await resp.json();
            if (json) {
              if (!resp.ok) {
                return this.notifyErr(json);
              } else {
                this.$root.$emit('modal-close');
                this.notifySuccess("Invitation Sent");
                this.$store.commit('addTeammate',json)
              }
            } else {
              throw new Error("Error while Invitation sending");
            }

      }catch(e){
        this.notifyErr(e)
      }
      finally{
        this.isLoading = false 
      }
    },

    async remove(id) {
      try{
      this.isLoading = true
      if (id) {
        const url = `${this.$config.studioServer.BASE_URL}api/v1/admin/team/delete`;
        let headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.authToken}`,
        };
        const resp = await fetch(url, {
          method: "DELETE",
          body: JSON.stringify({
            id: id,
          }),
          headers,
        });
        const json = await resp.json();
        if (json) {
          if (!resp.ok) {
            return this.notifyErr(json);
          } else {
            this.notifySuccess("Removed teammate Successfully");
            this.$store.commit('removeTeammate',json._id)
          }
        } else {
          throw new Error("Error while Removing");
        }
      }
      }catch(e){
        this.notifyErr(e)
      }
      finally{
        this.isLoading = false
      }
    },
    clearAll(){
      this.email = "",
      this.name = ""
    }
  },
  mixins: [notificationMixins],
};
</script>
