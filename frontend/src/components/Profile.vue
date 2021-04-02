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
.dot {
  height: 15px;
  width: 15px;
  background-color: green;
  border-radius: 50%;
  display: inline-block;
  margin-top: 5px;
  float: right;
}

.tile {
  font-size: xxx-large;
  background: aliceblue;
  border-bottom: 1px solid #8080802b;
}
.fVal {
  font-size: initial;
  color: gray;
  word-wrap: break-word;
}

.card{
  border-radius: 10px;
}

</style>


<template>  
  <div class="row">

    <div class="col-md-10 leftAlign">
      <div class="card">
        <div class="card-body">
          <h5>PROFILE</h5>
              <hr/>
          <div class="row">
            <!-- <div class="col-md-4">
              <img
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn2.iconfinder.com%2Fdata%2Ficons%2Fbusiness-management-52%2F96%2FArtboard_20-512.png&f=1&nofb=1"
                alt="John"
                style="color:grey;margin-top:30%;margin-left:10%;width:80%;height: 50%;"
              />
            </div> -->
            <div class="col-md-12" style="flex-wrap: wrap; padding:20px">
              
              <!-- <p>DID</p>
              <p class="fVal"><a :href="`${$config.nodeServer.BASE_URL}${$config.nodeServer.DID_RESOLVE_EP}`+user.id" target="_blank">{{user.id}}</a></p> -->
              <p>Email</p>
              <p class="fVal">{{user.Email}}</p>
              <p>Role</p>
              <p class="fVal">{{user.Name.split(':')[1]}}</p>
              <p v-if="user.phoneNumber">Phone Number: {{user.phoneNumber}}</p>
              <!-- <p>PUBLIC KEY</p>
              <p class="fVal">{{user.publicKey}}</p> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "Profile",
  mounted() {},
  components: {},
  data() {
    return {
      active: 0,
      userKeys: [],
      appList: [],
      schemaCount: 0,
      credentialCount: 0,
      acceptedList:[],
      dispatchedList:[],
      schemaList:[],
      user: {
        id: "",
        publicKey: "",
        email: "",
        phoneNumber: "",
        fname: "",
        Email: "",
        Name: ""
      },
      authToken: localStorage.getItem("authToken"),
    };
  },
  created() {
    const usrStr = localStorage.getItem("user");
    //console.log(usrStr);
    this.user = { ...JSON.parse(usrStr) };
    //console.log(this.user);
    this.userKeys = Object.keys(this.user);
    // this.fetchProcurment()
  },
  methods: {
    fetchData(url,options){
      return fetch(url, options)
            .then((res) => res.json())
            .then((j) => {              
              return j.message
            })
            .catch((e) => alert(`Error: ${e.message}`));
    },
    fetchProcurment() {
      const url = `${this.$config.studioServer.BASE_URL}${this.$config.studioServer.PROCURMENT_LIST}`;
      fetch(url)
        .then((res) => res.json())
        .then((j) => {
          console.log(j)
          // if (j.status != 200) throw new Error(j.error);
          this.schemaList = j;
          if (this.schemaList && this.schemaList.length > 0) {
            this.acceptedList = this.schemaList.filter(
              (x) => {
                 return x.state == 'ACCEPTED'
              }
            );
            this.dispatchedList = this.schemaList.filter(
              (x) => {
                 return x.state == 'DISPATCHED' || x.state == 'ADDED'
              }
            );
          }
        })
        .catch((e) => this.notifyErr(`Error: ${e.message}`));
    },
    pollData(){
      let url = `${this.$config.nodeServer.BASE_URL}${this.$config.nodeServer.SCHEMA_LIST_EP}`;
      let options = {}
      this.fetchData(url).then(data => {
        if (data && data.length > 0) {
          data = data.filter(
            (x) => x.owner === this.user.id
          );
          this.schemaCount = data.length;
        }
      })

      url = `${this.$config.studioServer.BASE_URL}${this.$config.studioServer.CRED_LIST_EP}`;
      options  = {
          method: "GET",
          headers: {'x-auth-token': this.authToken}
        }
      this.fetchData(url,options).then(data => {
        if (data) {
          this.credentialCount = data.count;
        }
      })
    },
    gotosubpage: (id) => {
      this.$router.push(`${id}`);
    },
  },
};
</script>
