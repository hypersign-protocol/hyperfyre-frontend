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
</style>
<template>
  <div class="home marginLeft marginRight">
    <h3 class="leftAlign">Welcome, {{ user.name }} !</h3>

     <div class="text-right">
            <button @click="invite()" class="btn btn-warning button-theme"><i class="fas fa-plus text-black"></i> Invite Teammate </button>
          </div>
    <div class="row" style="margin-top: 2%;">
      <div class="col-md-12">
        <table  v-if="teammates.length" class="table table-bordered" style="background:#FFFF">
          <thead class="thead-light">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
             
            </tr>
          </thead>
          <tbody>
            <tr  v-for="row in teammates" :key="row._d">
              <th>
                {{ row.name }}
              </th>
              <td>{{ row.email}}</td>
              <td>{{ row.status }}</td>
             
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>


<script>
import notificationMixins from "../../mixins/notificationMixins";
export default {
  name: "Teammate",
  components: {},
  data() {
    return {
    teammates:[],
      user: {},
      appName: "",
      authToken: localStorage.getItem("authToken"),
    };
  },
 async mounted(){
    await this.getTeammates();
  },
  created() {
    const usrStr = localStorage.getItem("user");
    this.user = {
      ...JSON.parse(usrStr),
    };
  },
  methods: {
  async getTeammates(){
      const url = `${this.$config.studioServer.BASE_URL}api/v1/admin/team/`;
        const headers = {
          Authorization: `Bearer ${this.authToken}`,
        };
        const resp = await fetch(url, {
          headers,
          method: "GET",
        });
    
        if (!resp.ok) {
          return this.notifyErr(resp.statusText);
        }
        else{
            this.teammates = await resp.json();
        }
    },
    gotosubpage: (id) => {
      this.$router.push(`${id}`);
    },
    async invite() {
    await this.$swal.fire({
    title: 'Invite Form',
    html: `<input type="email" id="email" class="swal2-input" placeholder="Email">
    <input type="name" id="name" class="swal2-input" placeholder="Name">`,
    confirmButtonText: 'Add Teammate',
    focusConfirm: false,
    showCloseButton:true,
    allowOutsideClick:false,
    preConfirm: () => {
    const email = this.$swal.getPopup().querySelector('#email').value
    const name = this.$swal.getPopup().querySelector('#name').value
    if (!email || !name) {
      this.$swal.showValidationMessage(`Please enter email and name`)
    }
   
    return {  name: name, email: email }
   
  }
}).then(async(data) => {
  if(data.value){
  const url = `${this.$config.studioServer.BASE_URL}api/v1/admin/team/add`;
        let headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.authToken}`,
        };
        const resp = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            data
          }),
          headers,
        });
        const json = await resp.json();
        if(json){
          if (!resp.ok) {
            return this.notifyErr(json);
          }else{
           this.notifySuccess("sent Successfully");
           console.log(json);
           await this.getTeammates();
           }
        }else{
          throw new Error('Error while Invitation se');
        }
}
    })

    },
  },
  mixins: [notificationMixins],
};
</script>
