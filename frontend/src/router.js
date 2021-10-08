import Vue from "vue";
import Router from "vue-router";
import config from "./config";
import fetch from "node-fetch";

Vue.use(Router);

const router = new Router({
  mode: "history",  
  routes: [
    {
      path: "/event/:slug",
      name: "Event",
      component: () => import(/* webpackChunkName: "investorLogin" */ './views/participant/Event.vue'),
    },
    {
      path: "/",
      redirect: "/admin/login"
    },
     {
      path: "/app",
      redirect: "/admin/login",
    },
    {
      path: "/admin",
      redirect: "/admin/login",
    },
    {
      path: "/admin/login",
      name: "AdminLogin",
      component: () => import(/* webpackChunkName: "adminLogin" */ './views/admin/AdminLogin.vue'),
    },
    {
      path: "/admin/dashboard",
      name: "Dashboard",
      component: () => import(/* webpackChunkName: "dashboard" */ './views/admin/Dashboard.vue') ,
      meta: {
        requiresAuth: true,
        admin: true,
      },
    },
    {
      path: "/admin/participants",
      name: "Participants",
      component: () => import(/* webpackChunkName: "investors" */ './views/admin/Participants.vue') ,
      meta: {
        requiresAuth: true,
        admin: true,
      },
    },
    {
      path: "/admin/events",
      name: "Events",
      component: () => import(/* webpackChunkName: "project" */ './views/admin/Events.vue') ,
      meta: {
        requiresAuth: true,
        admin: true,
      },
    },
    {
      path: "/admin/subscription",
      name: "subscription",
      component: () => import(/* webpackChunkName: "subscription" */ './views/admin/Subscription.vue') ,
      meta: {
        requiresAuth: true,
        admin: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      // console.log("Yes auth token");
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
              path: to.meta.admin ? "/admin/login" : "/login",
              params: { nextUrl: to.fullPath },
            });
          } else {
            localStorage.setItem("user", JSON.stringify(json.message));
            // console.log(to.path);
            if (to.meta.admin && !json.message.isSubscribed && to.path != "/admin/subscription") {
              next({
                  path: '/admin/subscription',
                  params: { nextUrl: to.fullPath }
              })
            } else {
                next()
            }
          }
        })
        .catch((e) => {
          console.log(e)
          next({
            path: to.meta.admin ? "/admin/login" : "/login",
            params: { nextUrl: to.fullPath },
          });
        });
    } else {
      next({
        path: to.meta.admin ? "/admin/login" : (
          !to.query["referrer"] ? 
          `/login/${to.params["slug"]}` :
          `/login/${to.params["slug"]}?referrer=${to.query["referrer"]}`
        ),
        params: { nextUrl: to.fullPath },
      });
    }
  } else {
    next();
  }
});
export default router;
