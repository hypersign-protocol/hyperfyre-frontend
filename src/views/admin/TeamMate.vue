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
    <h3 v-if="!teammates.length" class="leftAlign">No teams found, click on 'Invite' button to add team</h3>
    <div class="text-right">
      <button @click="invite()" class="btn btn-warning button-theme">
         Invite <i class="fas fa-plus text-black"></i>
      </button>
    </div>
    <h3 v-if="teammates.length">Your Team</h3>
    <div class="row" style="margin-top: 2%">
      <div class="col-md-12">
        <table
          v-if="teammates.length"
          class="table table-bordered"
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
              <td @click="remove(row._id)">
                <button
                  style="text-transform: uppercase"
                  class="btn btn-danger button-theme btn-sm"
                  title="Click to remove the teammate"
                >
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>

       
        <h3 v-if="$accounts.length" class="leftAlign">Team's you are part of</h3>
         <table  v-if="$accounts.length" class="table table-bordered" style="background:#FFFF">

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
                <button
                  :disabled="true"
                  style="text-transform: uppercase"
                  class="btn btn-success button-theme btn-sm"
                >
                  Active
                </button>
              </td>

              <td v-else @click="switchAccount(row)">
                <button
                  style="text-transform: uppercase"
                  class="btn btn-danger button-theme btn-sm"
                  title="Click to switch to this account"
                >
                  Switch
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import notificationMixins from "../../mixins/notificationMixins";
import SimpleVueValidation from "simple-vue-validator";
import { isValidURL,isValidText } from '../../mixins/fieldValidationMixin';
export default {
  name: "Teammate",
  components: {},
  data() {
    return {
      email: "",
      name: "",
      teammates: [],
      user: {},
      accessuser: {},
      appName: "",
      authToken: localStorage.getItem("authToken"),
    };
  },
  async mounted() {
    
    await this.getTeammates();
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
        
      }
    },
    async getTeammates() {
      const url = `${this.$config.studioServer.BASE_URL}api/v1/admin/team`;
      const headers = {
        Authorization: `Bearer ${this.authToken}`,
      };
      const resp = await fetch(url, {
        headers,
        method: "GET",
      });

      if (!resp.ok) {
        return this.notifyErr(resp.statusText);
      } else{
        this.teammates = await resp.json();
      }
    },
    gotosubpage: (id) => {
      this.$router.push(`${id}`);
    },
    async invite() {
      await this.$swal
        .fire({
          title: "Invite Form",
          html: `<input type="email" id="email" class="swal2-input" placeholder="Email">
    <input type="name" id="name" class="swal2-input" placeholder="Name">`,
          confirmButtonText: '<span style="color:black">Send Invitation</span>',
          confirmButtonColor: "#f1b319",
          focusConfirm: false,
          showCloseButton: true,
          allowOutsideClick: false,
          preConfirm: () => {
            this.email = this.$swal.getPopup().querySelector("#email").value;
            this.name = this.$swal.getPopup().querySelector("#name").value;
            if (!this.email || !this.isEmail(this.email)|| !this.name || isValidURL(this.name) || !isValidText(this.name)) {
              this.$swal.showValidationMessage(
                `Please enter valid email and name`
              );
            }
            if(this.name.length>20){
              this.$swal.showValidationMessage(
                `Please enter name upto 20 character`
              );
            }
            return { name: this.name, email: this.email };
          },
        })
        .then(async (data) => {
          if (data.value) {
            const url = `${this.$config.studioServer.BASE_URL}api/v1/admin/team/add`;
            let headers = {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.authToken}`,
            };
            const resp = await fetch(url, {
              method: "POST",
              body: JSON.stringify({
                name: data.value.name,
                email: data.value.email,
              }),
              headers,
            });
            const json = await resp.json();
            if (json) {
              if (!resp.ok) {
                return this.notifyErr(json);
              } else {
                this.notifySuccess("Invitation Sent");
                await this.getTeammates();
              }
            } else {
              throw new Error("Error while Invitation sending");
            }
          }
        });
    },
    async remove(id) {
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
            await this.getTeammates();
          }
        } else {
          throw new Error("Error while Removing");
        }
      }
    },
  },
  mixins: [notificationMixins],
};
</script>
