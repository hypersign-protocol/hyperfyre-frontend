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
.floatLeft{
  float: left;
}

.floatRight{
  float: right;
}

.noBullet{
  list-style-type:none;
}

.title {
  color: grey;
  font-size: 18px;
}

</style>
<template>
   <div class="home  marginLeft marginRight">
      <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    ></loading>
     <h3 class="leftAlign">Welcome, {{user.name}} !</h3>
     <div class="row">
        <div class="col-md-6">
            <Profile/>
        </div>
        <div class="col-md-6">
            <Charts/>
        </div>
     </div>    
  </div>
</template>


<script>
import Profile from '@/components/Profile.vue'
import Charts from '@/components/Charts.vue'
import notificationMixins from '../mixins/notificationMixins';
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  name: "PanelPage",
  mounted() {
   setTimeout(()=>{
     this.isLoading=false
   },700)
  },
  components: { 
    Profile,
    Charts,
    Loading
  },
  data() {
    return {
      appList: [],
     
      user: {},
      appName: "",
      authToken: localStorage.getItem('authToken'),
       isLoading: true,
      fullPage: true
    };
  },
  created() {
  
    const usrStr = localStorage.getItem('user');    
     this.user = {
       ...JSON.parse(usrStr)
     }
   
  },
  methods: {
    gotosubpage: id => {
      this.$router.push(`${id}`);
    },
    logout(){
      // console.log("Dashboard:: Logout method...")
      // localStorage.removeItem('authToken')
      // localStorage.removeItem('user')
      // localStorage.removeItem("credentials")
      // localStorage.removeItem("userData")
      
      // if(this.$route.params.nextUrl != null){
      //               this.$router.push(this.$route.params.nextUrl)
      //           }else{
      //   this.$router.push('/login')
      //           }
    },
  },
  mixins: [notificationMixins]
  
};
</script>
