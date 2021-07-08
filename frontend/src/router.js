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
      redirect: "/login",
    },
    // {
    //   path: "/login",
    //   redirect: "/login",
    // },
    // {
    //   path: "/studio",
    //   redirect: "/login",
    // },
    
    {
      path: "/login",
      name: "PKIIdLogin",
      component: () => import(/* webpackChunkName: "investorLogin" */ './views/PKIIdLogin.vue'),
    },
    {
      path: "/connectwithtwitter",
      name: "ConnectWithTwitter",
      component: () => import(/* webpackChunkName: "investorLogin" */ './views/connectWIthTwitter.vue'),
    },
    {
      path: "/form/:slug",
      name: "investor",
      component: () => import(/* webpackChunkName: "investor" */ './views/Investor.vue') ,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/form",
      name: "investor",
      component: () => import(/* webpackChunkName: "investor" */ './views/Investor.vue') ,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/admin",
      redirect: "/admin/login",
    },
    {
      path: "/admin/login",
      name: "AdminLogin",
      component: () => import(/* webpackChunkName: "adminLogin" */ './views/AdminLogin.vue'),
    },
    {
      path: "/admin/dashboard",
      name: "Dashboard",
      component: () => import(/* webpackChunkName: "dashboard" */ './views/Dashboard.vue') ,
      meta: {
        requiresAuth: true,
        admin: true,
      },
    },
    {
      path: "/admin/investors",
      name: "investors",
      component: () => import(/* webpackChunkName: "investors" */ './views/Investors.vue') ,
      meta: {
        requiresAuth: true,
        admin: true,
      },
    },
    {
      path: "/admin/project",
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
    // console.log("Requires auth");
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
            next();
          }
        })
        .catch((e) => {
          next({
            path: to.meta.admin ? "/admin/login" : "/login",
            params: { nextUrl: to.fullPath },
          });
        });
    } else {
      // console.log({
      //   param_slug: to.params["slug"],
      //   queryProjID : to.query["projectId"]
      // })

      // we first check if the url has projectId or slug
      // Then remove the old store
      // then depending upon what is present  in route,
      // create the store
      // When the call come ffrom logout
      // we dont do anything. 
      console.log({
        slug:to.params["slug"]
      })
      if((to.params["slug"] || to.query["projectId"]) && (to.params["slug"] != "" || to.query["projectId"] != "")){
        console.log("first we need to remove all these items projectDetails, projectSlug, projectId")
        localStorage.removeItem("projectDetails");
        localStorage.removeItem("projectSlug");
        localStorage.removeItem("projectId");
        if(!to.params["slug"]){
          if(!to.query["projectId"]){
            // i guess no need to do anything here
          }else{
            localStorage.setItem("projectId", to.query["projectId"]);
          }
        }else{        
          localStorage.setItem("projectSlug", to.params["slug"]);  
        }
        
      }else{
        console.log("ProjectId or slug is blank");
        console.log("Not doing anything but just sending to next route");
      }

      next({
        path: to.meta.admin ? "/admin/login" : "/login",
        params: { nextUrl: to.fullPath },
      });
    }
  } else {
    next();
  }
});
export default router;
