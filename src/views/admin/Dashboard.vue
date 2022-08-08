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
     <h3 v-if="accessuser.adminName && accessuser.adminName!=='Self'"  class="leftAlign">Welcome {{user.name}},  you have logged in as  {{accessuser.adminName}} ! </h3>
      <h3 v-else class="leftAlign">Welcome {{user.name}}!</h3>
     <div  class="row">
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
import Profile from '@/components/admin/Profile.vue'
import Charts from '@/components/admin/Charts.vue'
import notificationMixins from '../../mixins/notificationMixins';
import eventBus from '../../eventBus';


export default {
  name: "PanelPage",
  mounted() {
  },
  components: { 
    Profile,
    Charts
  },
  data() {
    return {
      appList: [],
     
      user: {},
      accessuser:{},
      appName: "",
      authToken: localStorage.getItem('authToken'),
       accessToken: localStorage.getItem('accessToken')
    };
  },
  created() {
    const usrStr = localStorage.getItem('user');   
    const accessUser=localStorage.getItem('accessuser') 
     this.user = {
       ...JSON.parse(usrStr)
     }
     if(accessUser){
     this.accessuser={
        ...JSON.parse(accessUser)
     }
    }
  },
  methods: {
    gotosubpage: id => {
      this.$router.push(`${id}`);
    },
  },
  mixins: [notificationMixins]
  
};
</script>
