<template>
  <div id="app">
   <NavBar :title="name" :show="showUserNav" :themeData="themeData" :isForm="isForm" /> 
    <!-- <NavBar title="Fyre" :show="showUserNav" /> -->

    <!-- <div :class="[
        showNavbar & !showUserNav
          ? isSidebarCollapsed
            ? 'showNavbar collapsed'
            : 'showNavbar notCollapsed'
          : 'hideNavbar',
      ]"> -->
    <div :class="[
      isSidebarCollapsed 
          ? 'container-collapsed-not hideNavbar'
          : 'container-collapsed',
    ]">
      <sidebar-menu class="sidebar-wrapper" @toggle-collapse="onToggleCollapse" :collapsed="isSidebarCollapsed"
        @item-click="onItemClick" :theme="'white-theme'" width="220px" :menu="isSubscribed? menu : unsubsSubscribedMenu"
        v-if="showNavbar">
        <div slot="header" style="background:#363740">
          <div class="ml-1 mt-3 mb-2" style="padding-left:1px; text-align:center; margin-right: 2.25rem !important;">
            <a v-if="!isSidebarCollapsed" href="/admin/dashboard">
              <img :src="require('./assets/Fyre_Small.png')" alt="logo" width="130vw" /></a>
            <a v-if="isSidebarCollapsed" href="/admin/dashboard"><img :src="require('./assets/favicon.png')" alt="logo"
                width="35vw" /></a>
          </div>
          <!-- <p class="header-text">{{ $config.app.name }}</p> -->
          <hr class="rule" />
        </div>
        <span slot="footer" class="text-center" style="font-size:14px; padding: 7px; border: 1px solid #80808014;">
          <a href="https://docs.fyre.hypersign.id/" target="_blank"
            style="text-decoration: none; background-color: transparent;color: #8B8B8B;">Docs</a></span>
        <span slot="footer" class="text-center" style="font-size: 12px; padding: 7px;">{{ $config.app.version }}</span>
      </sidebar-menu>
      <!-- <div class="content-wrapper"> -->
      <div :class="[
        showNavbar
            ? 'content-wrapper'
            : 'content-wrapper-not',
      ]">
        <router-view />
      </div>
      <div class="footer">Powered By: <a href="https://hypersign.id/" target="_blank"> HyperSign</a></div>
    </div>
    <notifications group="foo" />
    <KommunicateChat v-if="showChat" />
  </div>
</template>
<script>
// Ref:  fa icons:  https://fontawesome.com/
import NavBar from "./components/participant/NavBar.vue"
import eventBus from "./eventBus";
import KommunicateChat from "./components/admin/KommunicateChat.vue"
import config from "./config"
export default {
  components: {
    NavBar,KommunicateChat
  },
  data() {
    return {
      themeData: {
        themeColor: "",
        logoPath: ""
      },
      name: config.appName,
      hover: false,
      authToken:null,
      isSidebarCollapsed: true,
      authRoutes: ["register", "PKIIdLogin"],
      showNavbar: false,
      menu: [{
          href: "/admin/dashboard",
          title: "Dashboard",
          icon: "fas fa-tachometer-alt",
        },
        
        {
          href: "/admin/events",
          title: "Events",
          icon: "fas fa-calendar-alt",
        },
        {
          href: "/admin/participants",
          title: "Participants",
          icon: "fas fa-users",
          exactPath: true,
        },
        {
          title: "Settings",
          icon: "fas fa-cog",
          badge: {
            text: 'new',
            class: 'vsm--badge_default'
            // attributes: {}
            // element: 'span'
          },
          child: [
            {
              href: "/admin/teams",
              title: "Teams",
              icon: "fas fa-user-plus",
              exactPath: true,
            },
            {
              href: "/admin/setting/org",
              title: "Org",
              icon: "fa fa-university",
              exactPath: true,
            },
            {
              href: "/admin/createapp",
              title: "Apps",
              icon: "fa fa-code",
              exactPath: true,
            },
            {
              href: "/admin/subscription",
              title: "Subscriptions",
              icon: "fas fa-receipt",
              exactPath: true,
            }
          ]
        },
         {
          href: "/admin/marketplace",
          title: "Marketplace",
          icon: "fas fa-store",
          exactPath: true,
        },
        {
          href: "/admin/login",
          title: "Logout",
          icon: "fas fa-sign-out-alt",
          exactPath: true,
        },
      ],
      unsubsSubscribedMenu: [
        {
          href: "/admin/dashboard",
          title: "Dashboard",
          icon: "fas fa-tachometer-alt",
          exactPath:true,
        },
        {
          href: "/admin/subscription",
          title: "Subscriptions",
          icon: "fas fa-receipt",
          exactPath: true,
        },
        {
          href: "/admin/login",
          title: "Logout",
          icon: "fas fa-sign-out-alt",
          exactPath: true,
        },
      ],
      isSubscribed: true,

      // Nav for user's end
      showUserNav: false,
      showChat:false,
      isForm:false,
    };
  },

  mounted() {

    if(localStorage.getItem("authToken")){
      this.authToken = localStorage.getItem("authToken")
    }
    eventBus.$on('UpdateAdminNav',   (isSubscribed) => {
        this.isSubscribed = isSubscribed;
    })

    if(this.authToken && !window.location.pathname.includes("/form")){
      this.$store.dispatch('getApps',this.authToken);
      this.$store.dispatch('getTeammates',this.authToken);
    }
    eventBus.$on("UpdateThemeEvent", (themeData) => {
      Object.assign(this.themeData, { ...themeData })
      this.isForm = window.location.pathname.includes("/form") ? true : false
    })
    if(this.$route.meta.admin){
      this.showNavbar =
          window.location.pathname.includes("/admin/participants") ||
          window.location.pathname.includes("/admin/events") ||
          window.location.pathname.includes("/admin/dashboard") ||
          window.location.pathname.includes("/admin/subscription") ||
          window.location.pathname.includes("/admin/teams") ||
          window.location.pathname.includes("/admin/setting/org") ||
          window.location.pathname.includes("/admin/createapp") ||
          window.location.pathname.includes("/admin/marketplace") ?
          true :
          false;
    }else{
      this.showUserNav = window.location.pathname.includes("/form") ||
        window.location.pathname.includes("/user") || window.location.pathname.includes("/sa/home")?true : false
        this.isForm= window.location.pathname.includes("/form")? true:false
    }
  },
  updated() {
    this.showNavbar =
          window.location.pathname.includes("/admin/participants") ||
          window.location.pathname.includes("/admin/events") ||
          window.location.pathname.includes("/admin/dashboard") ||
          window.location.pathname.includes("/admin/subscription") ||
          window.location.pathname.includes("/admin/teams") ||
      window.location.pathname.includes("/admin/setting/org") ||
          window.location.pathname.includes("/admin/createapp") ||
          window.location.pathname.includes("/admin/marketplace") ?
          true :
          false;
    this.showChat = 
          window.location.pathname.includes("/admin/participants") ||
          window.location.pathname.includes("/admin/events") ||
          window.location.pathname.includes("/admin/dashboard") ||
          window.location.pathname.includes("/admin/subscription") ||
          window.location.pathname.includes("/admin/teams") ||
      window.location.pathname.includes("/admin/setting/org") ||
          window.location.pathname.includes("/admin/createapp") ||
          window.location.pathname.includes("/admin/marketplace") ?
          true :
          false;
  },

  methods: {
    filterMenu() {
      if (localStorage.getItem("user")) {
        const user = JSON.parse(localStorage.getItem("user"));

        if (user.isSubscribed) {
          return;
        }
        this.menu = this.menu.filter(
          (x) =>
             x.title.toLowerCase().includes("subscription") ||
          x.title.toLowerCase().includes("logout")
        );
      }
    },

    goToNextPage(route) {
      const r = this.menu.find((x) => x.name === route);
      if (r.name === "Logout") this.logout();
      this.$router.push(r.path);
      if (this.$route.params.nextUrl != null) {
        this.$router.push(this.$route.params.nextUrl);
      } else {
        this.$router.push(r.path);
      }
    },
    onToggleCollapse(collapsed) {
      if (collapsed) {
        this.isSidebarCollapsed = true;
      } else {
        this.isSidebarCollapsed = false;
      }
    },
    onItemClick() {
      if (
        window.location.pathname.includes("investors") ||
        window.location.pathname.includes("project") ||
        window.location.pathname.includes("dashboard") ||
        window.location.pathname.includes("/admin/subscription")||
        window.location.pathname.includes("/admin/teams") ||
        window.location.pathname.includes("/admin/createapp") ||
        window.location.pathname.includes("/admin/marketplace")
      ) {
        this.showNavbar = true;
      } else {
        this.showNavbar = false;
      }
    },
  },
};
</script>
<style scoped>
.logo {
  /* width: 144px; */
  padding-top: 1.5%;
  padding-left: 25px;
}

.selectedButton {
  border-bottom: 1px solid #8080809e;
  font-weight: bold;
}

.nav-style {
  background: #ffffff;
  margin-bottom: 1%;
  padding: 5px;
  padding-left: 1.5%;
  text-align: left;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 2px 0px,
    rgba(0, 0, 0, 0.02) 0px 3px 1px -2px, rgba(0, 0, 0, 0.01) 0px 1px 5px 0px;
}

.rightAlign {
  text-align: end;
}

.card-radius {
  border-radius: 10px;
}

.logo-style {
  width: 144px;
  /* height: 40px; */
  margin-top: 9px;
  margin-left: 5px;

}

.v-sidebar-menu.vsm_white-theme .vsm--mobile-bg{
  background: #ffc107;
}

.subtitle {
  padding-left: 10px;
  color: gray;
  font-size: larger;
  margin-top: auto;
  /* padding-top: 10px; */
  margin-bottom: 1%;
}

.content-wrapper {
  padding: 50px 20px;
}
.container-collapsed {
  padding-left: 150px;
}
.showNavbar.notCollapsed>.content-wrapper {
  width: calc(100vw - 200px);
  margin-left: auto;
}

.sidebar-wrapper{
  box-shadow: 0 0 15px 0 rgba(34,41,47,.05);
}

.showNavbar.collapsed .sidebar-wrapper {
  overflow: hidden;
}

.header-text {
  text-align: center;
  color: grey;
  margin: 0;
  font-size: small;
}

.showNavbar.collapsed .header-text {
  display: none;
}

.header-text+hr {
  width: 80%;
}

.v-sidebar-menu.vsm_white-theme {
  background-color: white !important;
  color: grey !important;
}

.v-sidebar-menu.vsm_white-theme .vsm--link {
  color: #fff !important;
}
</style>