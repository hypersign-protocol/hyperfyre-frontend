<style scoped>
.paginationContainer {
  display: flex;
  list-style: none;

  justify-content: center;
}
.paginationContainer >>> li {
  padding: 2px 10px;
  margin: 0 2px;
  border-radius: 3px;
}
.paginationContainer >>> li.active {
  background-color: #f1b319;
  color: #fff;
}
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
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            <tr  v-for="row in teammates" :key="row._id">
              <th>
                {{ row.name }}
              </th>
              <td>{{ row.email}}</td>
              <td v-if="row.status===`active`"><h5>  <b-badge style="text-transform:uppercase;" variant="success">{{  row.status}}</b-badge></h5></td>
              <td v-else><h5> <b-badge style="text-transform:uppercase;" variant="danger">{{  row.status}}</b-badge></h5></td>
              <td @click="remove(row._id)"><button style="text-transform:uppercase;" class="btn btn-danger button-theme btn-sm"><i class="fas fa-trash"></i> Remove</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
   <div class="d-flex mt-5">
      <paginate
        :pageCount="Math.ceil(this.teammates.length / this.perPage)"
        :clickHandler="paginateChange"
        :prevText="'Prev'"
        v-model="paginateValue"
        :nextText="'Next'"
        :containerClass="'paginationContainer'"
        :page-class="'paginationItem '"
      >
      </paginate>
    </div>
  </div>
</template>


<script>
import notificationMixins from "../../mixins/notificationMixins";
import Paginate from "vuejs-paginate";
export default {
  name: "Teammate",
  components: {Paginate},
  data() {
    return {
    paginateValue: 1,
    perPage: 10,
    currentPage: 2,
    length:[],
    pageSelectDropdown: [],
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
    confirmButtonText: '<span style="color:black">Invite</span>',
    confirmButtonColor:'#f1b319',
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
  async remove(id){
      if(id){
        console.log(id);
  const url = `${this.$config.studioServer.BASE_URL}api/v1/admin/team/delete`;
        let headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.authToken}`,
        };
        const resp = await fetch(url, {
          method: "DELETE",
          body: JSON.stringify({
            _id:id
          }),
          headers,
        });
        const json = await resp.json();
        if(json){
          if (!resp.ok) {
            return this.notifyErr(json);
          }else{
           this.notifySuccess("Removed Successfully");
           console.log(json);
           await this.getTeammates();
           }
        }else{
          throw new Error('Error while Removing ');
        }
}
  }
  },
  mixins: [notificationMixins],
};
</script>
