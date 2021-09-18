<template>
  <div id="app">
    <NavBar title="HyperFyre" :show="showUserNav"/>
    <div :class="[
        showNavbar & !showUserNav
          ? isSidebarCollapsed
            ? 'showNavbar collapsed'
            : 'showNavbar notCollapsed'
          : 'hideNavbar',
      ]">
      <sidebar-menu class="sidebar-wrapper" @toggle-collapse="onToggleCollapse" @item-click="onItemClick" :theme="'white-theme'" width="220px" :menu="menu" v-if="showNavbar">
        <span slot="header">
          <div class="ml-1 mt-3 mb-2" style="padding-left: 18px;">
            <img :src="require('./assets/Fidato_logo.png')" alt="logo" width="150px" />
          </div>
          <!-- <p class="header-text">{{ $config.app.name }}</p> -->
          <hr class="rule" />
        </span>
        <span slot="footer" class="text-center">{{ $config.app.version }}</span>
      </sidebar-menu>
      <div class="content-wrapper">
        <router-view />
      </div>
    </div>
    <notifications group="foo" />
  </div>
</template>
<script>
// Ref:  fa icons:  https://fontawesome.com/
import NavBar from "./components/v4/NavBar.vue"
export default {
  components:{
    NavBar
  },
  data() {
    return {
      authToken: localStorage.getItem("authToken"),
      isSidebarCollapsed: false,
      authRoutes: ["register", "PKIIdLogin"],
      showNavbar: false,
      menu: [{
          href: "/app/admin/dashboard",
          title: "Dashboard",
          icon: "fas fa-tachometer-alt",
        },
        {
          href: "/app/admin/project",
          title: "Events",
          icon: "fas fa-plane-departure",
        },
        {
          href: "/app/admin/investors",
          title: "Users",
          icon: "fas fa-users",
          exactPath: true,
        },
        {
          href: "/app/admin/subscription",
          title: "Subscriptions",
          icon: "fas fa-tags",
          exactPath: true,
        },
        {
          href: "/app/admin/login",
          title: "Logout",
          icon: "fas fa-sign-out-alt",
          exactPath: true,
        },
      ],

      // Nav for user's end
      showUserNav: false,
    };
  },

  mounted() {
    setTimeout(() => {
      this.filterMenu();
    }, 500);

    this.showUserNav = window.location.pathname.includes("/event") ? true : false
  },

  updated() {
    this.showNavbar =
      window.location.pathname.includes("/app/admin/investors") ||
      window.location.pathname.includes("/app/admin/project") ||
      window.location.pathname.includes("/app/admin/dashboard") ||
      window.location.pathname.includes("/app/admin/subscription") ?
      true :
      false;

    // this.filterMenu();
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
        window.location.pathname.includes("/app/admin/subscription")
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

/*
.nav-style {
  text-align: left;
  background-color: rgb(58, 58, 58);
  padding-bottom: 10px;
  margin-bottom: 50px;
}
.nav-style .nav-logo {
  z-index: 10;
  padding: 15px 30px;
  width: 25%;
  text-align: center;
  background-color: #fff;
  border-bottom-right-radius: 20px;
} */
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

#app {
  padding: 0;
  margin: 0;
  width: 100%;
  min-height: 100vh;
  background: #f6f6f687;
}

.subtitle {
  padding-left: 10px;
  color: gray;
  font-size: larger;
  margin-top: auto;
  /* padding-top: 10px; */
  margin-bottom: 1%;
}

.showNavbar .content-wrapper {
  padding: 50px 20px;
}

.showNavbar.notCollapsed>.content-wrapper {
  width: calc(100vw - 200px);
  margin-left: auto;
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