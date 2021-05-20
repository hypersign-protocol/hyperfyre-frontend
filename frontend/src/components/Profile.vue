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
  font-size: small;
  color: gray;
  word-wrap: break-word;
}

.card {
  border-radius: 10px;
}
</style>


<template>
  <div>
    <div class="row" style="margin-top: 2%">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body tile">{{ credentialCount }}</div>
          <div class="card-header">Projects</div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card">
          <div class="card-body tile">{{ schemaCount }}</div>
          <div class="card-header">Investors</div>
        </div>
      </div>
      
    </div>
    <div class="row" style="margin-top: 5%">
      <div class="col-md-12 leftAlign">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-md-4">
                <img
                  src="../assets/avatarUploadLabel.png"
                  alt="John"
                  style="width: 100%; height: 100%"
                />
              </div>
              <div class="col-md-6" style="flex-wrap: wrap; padding: 20px">
                <p>DID</p>
                <p class="fVal">
                  <a
                    :href="
                      `/` +
                      user.id
                    "
                    target="_blank"
                    >{{ user.id }}</a
                  >
                </p>
                <p>Email</p>
                <p class="fVal">{{ user.email }}</p>
                <p v-if="user.phoneNumber">
                  Phone Number: {{ user.phoneNumber }}
                </p>
              </div>
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
      user: {
        id: "did:hs:123123",
        publicKey: "0x2123ASSD12312",
        email: "vishu.anand1@gmail.com",
        phoneNumber: "+91-12312312",
        fname: "vishwas",
        Email: "vishu.anand1@gmail.com",
        Name: "Vishwas",
      },
      authToken: localStorage.getItem("authToken"),
    };
  },
  created() {
    // const usrStr = localStorage.getItem("user");
    // this.user = { ...JSON.parse(usrStr) };
    // this.userKeys = Object.keys(this.user);
    // this.pollData();
  },
  methods: {
    // fetchData(url, options) {
    //   return fetch(url, options)
    //     .then((res) => res.json())
    //     .then((j) => {
    //       return j.message;
    //     })
    //     .catch((e) => this.notifyErr(`Error: ${e.message}`));
    // },
    // fetchSchemas() {
    //   const url = `${this.$config.studioServer.BASE_URL}hs/api/v2/schema/get`;
    //   fetch(url, {
    //                 headers: {
    //                     "Authorization": `Bearer ${this.authToken}`
    //                 },
    //                 method: "GET"
    //             },)
    //     .then((res) => res.json())
    //     .then((j) => {
    //       if (j.status != 200) throw new Error(j.error);
    //       const schemas =  j.message;
    //       this.schemaCount = schemas.length;
    //     })
    //     .catch((e) => this.notifyErr(`Error: ${e.message}`));
    // },
    // pollData() {
    //   this.fetchSchemas();
      
    //   const url = `${this.$config.studioServer.BASE_URL}hs/api/v2/app`;
    //   const options = {
    //     method: "GET",
    //     headers: { Authorization: `Bearer ${this.authToken}` },
    //   };
    //   this.fetchData(url, options).then((data) => {
    //     if (data) {
    //       this.credentialCount = data.length;
    //     }
    //   });
    // },
    // gotosubpage: (id) => {
    //   this.$router.push(`${id}`);
    // },
  },
};
</script>
