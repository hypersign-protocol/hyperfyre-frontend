import Vue from "vue";
import Router from "vue-router";
import PKIIdLogin from "./views/PKIIdLogin.vue";
import AdminLogin from "./views/AdminLogin.vue";
import config from "./config";
import Dashboard from "./views/Dashboard.vue";
import fetch from "node-fetch";
import Investor from "./views/Investor.vue";
import Investors from "./views/Investors.vue";
import Project from "./views/Project.vue";
import Stepper from "./views/Stepper.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/studio/login",
    },
    {
      path: "/login",
      redirect: "/studio/login",
    },
    {
      path: "/studio",
      redirect: "/studio/login",
    },
    {
      path: "/studio/login",
      name: "PKIIdLogin",
      component: PKIIdLogin,
    },
    {
      path: "/studio/form",
      name: "investor",
      component: Investor,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/studio/admin",
      redirect: "/studio/admin/login",
    },
    {
      path: "/studio/admin/login",
      name: "AdminLogin",
      component: AdminLogin,
    },
    {
      path: "/studio/admin/dashboard",
      name: "Dashboard",
      component: Dashboard,
      meta: {
        requiresAuth: true,
        admin: true,
      },
    },
    {
      path: "/studio/admin/investors",
      name: "investors",
      component: Investors,
      meta: {
        requiresAuth: true,
        admin: true,
      },
    },
    {
      path: "/studio/admin/project",
      name: "project",
      component: Project,
      meta: {
        requiresAuth: false,
        admin: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    console.log("Requires auth");
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      console.log("Yes auth token");
      const url = `${config.studioServer.BASE_URL}hs/api/v2/auth/protected`;
      fetch(url, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        method: "POST",
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.status == 403) {
            next({
              path: to.meta.admin ? "/studio/admin/login" : "/studio/login",
              params: { nextUrl: to.fullPath },
            });
          } else {
            localStorage.setItem("user", JSON.stringify(json.message));
            next();
          }
        })
        .catch((e) => {
          next({
            path: to.meta.admin ? "/studio/admin/login" : "/studio/login",
            params: { nextUrl: to.fullPath },
          });
        });
    } else {
      console.log("No auth token");
      localStorage.setItem("projectId", to.query["projectId"]);
      next({
        path: to.meta.admin ? "/studio/admin/login" : "/studio/login",
        params: { nextUrl: to.fullPath },
      });
    }
  } else {
    next();
  }
});
export default router;
