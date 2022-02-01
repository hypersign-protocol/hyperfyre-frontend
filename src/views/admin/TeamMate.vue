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
        <table  class="table table-bordered" style="background:#FFFF">
          <thead class="thead-light">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
             
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>
                {{ result.name }}
              </th>
              <td>{{ result.email}}</td>
              <td>{{ result.status }}</td>
             
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
  mounted() {},
  components: {},
  data() {
    return {
    result:{
      email: "",
      name: "",
      status:"",
    },
      user: {},
      appName: "",
      authToken: localStorage.getItem("authToken"),
    };
  },
  created() {
    const usrStr = localStorage.getItem("user");
    this.user = {
      ...JSON.parse(usrStr),
    };
  },
  methods: {
    gotosubpage: (id) => {
      this.$router.push(`${id}`);
    },
    async invite() {
    await this.$swal.fire({
  title: 'Login Form',
  html: `<input type="email" id="email" class="swal2-input" placeholder="Email">
  <input type="name" id="name" class="swal2-input" placeholder="Name">`,
  confirmButtonText: 'Add Teammate',
  focusConfirm: false,
  preConfirm: () => {
    const email = this.$swal.getPopup().querySelector('#email').value
    const name = this.$swal.getPopup().querySelector('#name').value
    if (!email || !name) {
      this.$swal.showValidationMessage(`Please enter email and name`)
    }
    this.result.email=email;
    this.result.name=name;
    return { email: email, name: name }
   
  }
}).then(async(data) => {
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
            return this.notifyErr(json)
          }else{
           this.notifySuccess("sent Successfully");
           this.result.status='Invitation sent'
          }
        }else{
          throw new Error('Error while Invitation se')
        }
})

    },
  },
  mixins: [notificationMixins],
};
</script>
