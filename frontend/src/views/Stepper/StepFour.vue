<style scoped>
h3 {
  font-size: 15px;
}
.btn{
  border: 1px solid #494949;
  margin: 20px 0;
  bottom: 0;
  right: 0;
}
</style>
<template>
<div>
  <div>
    <h2>Thank You!</h2>
    <h3>You are successfully registered,<h3></h3>You will receive a confirmation email if you qualify.</h3>
    <p><button class="btn btn-sm outline" @click="showReferalPopup()">Refer your friend</button></p>
  </div>
  <b-modal hide-footer size="lg"  id="referal-modal" title="Referal" >
    <div style="padding:10px; text-align: center; color: gray" >
      <p>
        <span style="font-size: xxx-large;font-weight: bold;">{{this.totalInvestorsPoints}}</span> points earned.
      </p>
      <p v-if="referalLink && referalLink != ''">
        Refer your friends to earn 10 points each with this link. Your friend will also earn 5 points.
      </p>
      <!-- <div class="form-group"> -->
        <!-- <label for="usr">Name:</label> -->
        <!-- <input type="text" class="form-control"  disabled v-model="referalLink" size="50" /><i class="far fa-copy" @click="copy" style="padding:10px; font-size: x-large; cursor: pointer;"></i> -->
      <!-- </div> -->
      <p v-if="referalLink && referalLink != ''" class="form-group"> 
        <input type="text" class="form-control"  disabled v-model="referalLink" size="50" />
        <span @click="copy" style="padding:10px; font-size: x-large; cursor: pointer;"><i class="far fa-copy"></i></span>
      </p>
    </div>
  </b-modal>
  
</div>
</template>

<script>
// This components will have the content for each stepper step.
import notificationMixin from "../../mixins/notificationMixins.js";
export default {
  name: "StepFour",
  data(){
    return {
      totalInvestorsPoints: 0,
      referalLink: ""
    }
  },
  created(){
    let userDid
    if(localStorage.getItem("user")){
      userDid = JSON.parse(localStorage.getItem("user")).id;
    }
   if(userDid){
     this.referalLink = `${window.location.protocol + "//" + window.location.host + window.location.pathname}?referrer=${encodeURIComponent(userDid)}`
   }

   if(localStorage.getItem("investorPoints")){
     this.totalInvestorsPoints = localStorage.getItem("investorPoints");
   }
  },
  methods: {
    showReferalPopup(){
      this.$bvModal.show("referal-modal")
    },
    copy(){
      if(this.referalLink){
        navigator.clipboard.writeText(this.referalLink).then(() => {
                this.notifySuccess('Text copied to clipboard');
              })
              .catch(err => {
                this.notifyErr('Error in copying text: ', err);
              });
      }
    },
    // logout() {
    //   localStorage.removeItem("authToken");
    //   localStorage.removeItem("user");
    //   localStorage.removeItem("credentials");
    //   localStorage.removeItem("userData");
    //   this.$router.push("/login");
    // },
  },
  mixins: [notificationMixin]
};
</script>
