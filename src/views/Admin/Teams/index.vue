<template>
  <v-container>
    <div class="overview__wrap">
      <div class="d-flex align-center justify-space-between">
        <p class="white--text mt-24 font-20 font-weight-medium line-h-24">
          Your Teams
        </p>
        <v-btn
          :ripple="false"
          class="background-theme gradient py-2 px-4 width-133 height-41 letter-s-0 text-capitalize font-16 line-h-19 font-weight--medium white--text"
          depressed
          rounded
          x-large
          @click="invitePopup = true"
        >
          Invite
        </v-btn>
      </div>
      <v-data-table
        v-if="!loading"
        class="result-table mt-6"
        :headers="teamHeaders"
        :items="teams"
        item-key="name"
        dark
      >
        <template v-slot:item.status="{ item }">
          <v-chip
            dark
            outlined
            :color="item.status === 'active' ? '#2AD798' : 'red'"
            class="height-25 letter-s-0 text-capitalize font-14 line-h-17 font-weight--bold px-3 mr-2 mt-2"
          >
            {{ item.status | capitalize }}
          </v-chip>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn @click="deleteItem(item)" color="red" icon :ripple="false">
            <v-icon>mdil-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>

      <div class="d-flex align-center justify-space-between">
        <p class="white--text mt-24 font-20 font-weight-medium line-h-24">
          Teams you are part of
        </p>
      </div>
      <v-data-table
        v-if="!loading"
        class="result-table mt-6"
        :headers="headers"
        :items="$accounts"
        item-key="name"
        dark
      >
        <template v-slot:item.login="{ item }">
          <v-chip
            dark
            outlined
            color="#2AD798"
            class="height-25 letter-s-0 text-capitalize font-14 line-h-17 font-weight--bold px-3 mr-2 mt-2"
            v-if="isAdmin(item.email)"
          >
            Active
          </v-chip>

          <v-chip
            dark
            v-else
            outlined
            color="#2AD798"
            class="height-25 letter-s-0 text-capitalize font-14 line-h-17 font-weight--bold px-3 mr-2 mt-2"
            @click="switchAccount(item)"
          >
            Switch
          </v-chip>
        </template>
      </v-data-table>
    </div>
    <v-dialog v-model="invitePopup" :elevation="0">
      <v-card flat color="#26264F" width="450" class="ma-auto pa-6">
        <v-card-title
          class="px-0 pt-0 pb-5 white--text text-left d-flex align-center justify-space-between"
        >
          <h2
            class="font-24 line-h-31 white--text text-left font-weight--medium font"
          >
            Invite
          </h2>
          <v-icon color="white" size="25" @click="invitePopup = false"
            >mdi-close</v-icon
          >
        </v-card-title>
        <v-card-text class="white--text px-0">
          <v-form ref="form">
            <div class="mb-6">
              <label class="font-14 line-h-17 font-weight-regular mb-2"
                >Name
              </label>
              <v-text-field
                hide-details="auto"
                v-model="form.name"
                :rules="rules.name"
                dark
                flat
                solo
                outlined
                class="form-input"
                placeholder="Please enter name"
              ></v-text-field>
            </div>
            <div class="mb-6">
              <label class="font-14 line-h-17 font-weight-regular mb-2"
                >Email
              </label>
              <v-text-field
                hide-details="auto"
                v-model="form.email"
                :rules="rules.email"
                dark
                flat
                solo
                outlined
                class="form-input"
                placeholder="Please enter email"
              ></v-text-field>
            </div>
            <div class="d-flex align-center justify-center">
              <v-btn
                :ripple="false"
                class="background-theme gradient py-2 px-4 width-133 height-41 letter-s-0 text-capitalize font-16 line-h-19 font-weight--medium white--text"
                depressed
                rounded
                x-large
                @click="invite"
                :loading="loading"
              >
                Send Invitation
              </v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: "index",

  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
      accessUser: JSON.parse(localStorage.getItem("accessuser")),
      authToken: localStorage.getItem("authToken"),
      accessToken: localStorage.getItem("accessToken"),
      loading: false,
      invitePopup: false,
      form: {
        email: null,
        name: null,
      },
      rules: {
        name: [(v) => !!v || "Please enter name"],
        email: [
          (v) => !!v || "Please enter email address",
          (v) =>
            /.+@.+\..+/.test(v) ||
            "Please enter a valid email address e.g. example@example.com",
        ],
      },
      teamHeaders: [
        { text: "Name", value: "name" },
        { text: "Email", value: "email" },
        { text: "Status", value: "status" },
        { text: "", value: "actions" },
      ],
      headers: [
        { text: "Admin Name", value: "adminName" },
        { text: "Admin Email", value: "email" },
        { text: "Login As", value: "login" },
      ],
      teams: [],
    };
  },
  mounted() {
    this.getTeammates();
  },
  methods: {
    isAdmin(email) {
      if (this.accessUser !== null) {
        return this.accessUser.adminEmail === email;
      } else if (this.user.email === email) {
        return true;
      }

      return false;
    },
    async invite() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const url = `${this.$config.studioServer.BASE_URL}api/v1/admin/team/add`;
        let headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.authToken}`,
        };
        const resp = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            name: this.form.name,
            email: this.form.email,
          }),
          headers,
        });
        const json = await resp.json();
        if (json) {
          if (!resp.ok) {
            this.$store.dispatch("snackbar/SHOW", {
              type: "error",
              message: json,
            });
            this.loading = false;
            this.$store.dispatch("snackbar/SHOW", {
              type: "success",
              message: json,
            });
          } else {
            this.$store.dispatch("snackbar/SHOW", {
              type: "success",
              message: "Invitation sent success!",
            });
            this.invitePopup = false;
            this.loading = false;
            this.$refs.form.reset();
            await this.getTeammates();
          }
        } else {
          this.loading = false;
          this.$store.dispatch("snackbar/SHOW", {
            type: "success",
            message: "Error while Invitation sending",
          });
        }
      }
    },

    switchAccount(item) {
      if (item.adminName === "Self") {
        localStorage.removeItem("authToken");
        localStorage.removeItem("accessuser");
        localStorage.removeItem("accessToken");
        localStorage.setItem("authToken", item.authToken);

        this.$router.push("/overview");
      } else {
        localStorage.setItem("accessToken", item.authToken);
        //console.log(item);
        localStorage.setItem(
          "accessuser",
          JSON.stringify({
            adminName: item.adminName,
            adminEmail: item.email,
            adminDid: item.adminDid,
          })
        );
        this.$router.push("/overview");
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
        this.$store.dispatch("snackbar/SHOW", {
          type: "success",
          message: resp.statusText,
        });
      } else {
        this.teams = await resp.json();
      }
    },

    async deleteItem(item) {
      if (item._id) {
        const answer = window.confirm("Do you really wish to delete teammate?");
        if (answer) {
          const url = `${this.$config.studioServer.BASE_URL}api/v1/admin/team/delete`;
          let headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.authToken}`,
          };
          const resp = await fetch(url, {
            method: "DELETE",
            body: JSON.stringify({
              id: item._id,
            }),
            headers,
          });
          const json = await resp.json();
          if (json) {
            if (!resp.ok) {
              this.$store.dispatch("snackbar/SHOW", {
                type: "success",
                message: json,
              });
            } else {
              this.$store.dispatch("snackbar/SHOW", {
                type: "success",
                message: "Teammate got removed success!",
              });
              await this.getTeammates();
            }
          } else {
            this.$store.dispatch("snackbar/SHOW", {
              type: "success",
              message: "Something went wrong, please try again after some time",
            });
          }
        } else {
          return false;
        }
      }
    },
  },
};
</script>

<style lang="css" scoped></style>
