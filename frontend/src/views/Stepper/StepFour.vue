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
  <div style="padding:20px; float:left">
    <h2>Thank You!</h2>
    <h3>You are successfully registered,<h3></h3>You will receive a confirmation email if you qualify.</h3>
  </div>
  <div style="padding:20px; float:right">
    <h2>Referal</h2>
    <p>
      Total points gained: {{this.totalInvestorsPoints}}
    </p>
    <p v-if="referalLink && referalLink != ''">
      Refer your friends to earn 10 points each with this link. Your friend will also earn 5 points.
    </p>
    <p v-if="referalLink && referalLink != ''"> 
      <input type="text" disabled v-model="referalLink" size="50" /><i class="far fa-copy" @click="copy" style="padding:10px; font-size: x-large; cursor: pointer;"></i>
    </p>
  </div>
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
     this.referalLink = `${window.location}?referrer=${userDid}`
   }

   if(localStorage.getItem("investorPoints")){
     this.totalInvestorsPoints = localStorage.getItem("investorPoints");
   }
  },
  methods: {
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
