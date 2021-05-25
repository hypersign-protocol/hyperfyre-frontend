import Vue from "vue";
import Router from "vue-router";
import config from "./config";
import fetch from "node-fetch";

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
      component: () => import(/* webpackChunkName: "investorLogin" */ './views/PKIIdLogin.vue'),
    },
    {
      path: "/studio/form",
      name: "investor",
      component: () => import(/* webpackChunkName: "investor" */ './views/Investor.vue') ,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/studio/admin",
      redirect: "/studio/admin/login",
    },
    {
      path: "/studio/admin/login",
      name: "AdminLogin",
      component: () => import(/* webpackChunkName: "adminLogin" */ './views/AdminLogin.vue'),
    },
    {
      path: "/studio/admin/dashboard",
      name: "Dashboard",
      component: () => import(/* webpackChunkName: "dashboard" */ './views/Dashboard.vue') ,
      meta: {
        requiresAuth: true,
        admin: true,
      },
    },
    {
      path: "/studio/admin/investors",
      name: "investors",
      component: () => import(/* webpackChunkName: "investors" */ './views/Investors.vue') ,
      meta: {
        requiresAuth: true,
        admin: true,
      },
    },
    {
      path: "/studio/admin/project",
      name: "project",
      component: () => import(/* webpackChunkName: "project" */ './views/Project.vue') ,
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
