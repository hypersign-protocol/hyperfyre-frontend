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
    <h3 v-if="accessuser.adminName && accessuser.adminName !== 'Self'" class="leftAlign">
      Welcome {{ user.name }}, you have logged in as {{ accessuser.adminName }} !
    </h3>
    <h3 v-else class="leftAlign">Welcome {{ user.name }}!</h3>
    <div class="row">
      <div class="col-md-6">
        <Profile />
      </div>

      <div class="col-md-6">
        <Charts />
      </div>
    </div>
  </div>
</template>

<script>
import Profile from "@/components/admin/Profile.vue";
import Charts from "@/components/admin/Charts.vue";
import notificationMixins from "../../mixins/notificationMixins";
import eventBus from "../../eventBus";

export default {
  name: "PanelPage",
  mounted() {},
  components: {
    Profile,
    Charts,
  },
  data() {
    return {
      appList: [],

      user: {},
      accessuser: {},
      appName: "",
      authToken: localStorage.getItem("authToken"),
      accessToken: localStorage.getItem("accessToken"),
    };
  },
  created() {
    const usrStr = localStorage.getItem("user");
    const accessUser = localStorage.getItem("accessuser");
    this.user = {
      ...JSON.parse(usrStr),
    };
    if (accessUser) {
      this.accessuser = {
        ...JSON.parse(accessUser),
      };

      this.fetchSubscription();
    }
  },
  methods: {
    async fetchSubscription() {
      try {
        this.isLoading = true;

        // if (!this.user.id) throw new Error("No project owner found");

        const url = `${this.$config.studioServer.BASE_URL}api/v1/subscription?usage=true`;
        const headers = {
          Authorization: `Bearer ${this.authToken}`,
          AccessToken: `Bearer ${this.accessToken}`,
        };
        const resp = await fetch(url, {
          headers,
          method: "GET",
        });

        if (!resp.ok) {
          return this.notifyErr(resp.statusText);
        }
        const json = await resp.json();
        this.subscriptions = json["subscriptions"];
        this.activeSubscriptions = this.subscriptions.filter((x) => (x.paymentData ? true : x.isActive === true));
        this.paidSubscriptions = this.subscriptions.filter((x) => {
          return x.paymentData ? true : x.isPaid === true;
        });

        const usage = json["usage"];

        if (usage && usage.totalUsed >= usage.totalAvailable) {
          this.$router.push("/admin/subscription");
          eventBus.$emit("UpdateAdminNav", false);
        }

        if (usage && usage.totalAvailable > 0) {
          eventBus.$emit("UpdateAdminNav", true);
        } else {
          eventBus.$emit("UpdateAdminNav", false);
        }
        // localStorage.setItem("subscriptions", JSON.stringify(json));
        // this.notifySuccess("No. of projects fetched " + this.projects.length);
      } catch (e) {
        this.notifyErr(e.message);
      } finally {
        this.isLoading = false;
      }
    },
    gotosubpage: (id) => {
      this.$router.push(`${id}`);
    },
    logout() {
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
  mixins: [notificationMixins],
};
</script>
