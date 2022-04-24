import Vue from "vue";
import VueRouter from "vue-router";
import config from "../config";
import fetch from "node-fetch";
import eventBus from "../eventBus";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    meta: { name: "Login" },
    redirect: "/login",
  },
  {
    name: "Login",
    path: "/login",
    meta: { name: "Login" },
    component: () => import(/* webpackChunkName: "login" */ "../views/Auth"),
  },
  {
    path: "/",
    component: require("../views/Admin").default,
    meta: { name: "Overview" },
    redirect: "/overview",
    name: "Home",
    children: [
      {
        name: "Overview",
        path: "/overview",
        meta: {
          requiresAuth: true,
          admin: true,
          name: "Overview",
          slug: "overview",
        },
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/Admin/Overview.vue"),
      },
      {
        name: "Subscription",
        path: "/subscriptions",
        meta: {
          requiresAuth: true,
          admin: true,
          name: "Subscription",
          slug: "subscription",
        },
        component: () =>
          import(
            /* webpackChunkName: "subscription" */
            "../views/Admin/Subscription.vue"
          ),
      },
      {
        name: "Campaigns",
        path: "/campaigns",
        meta: {
          requiresAuth: true,
          admin: true,
          name: "Campaigns",
          slug: "campaigns",
        },
        component: () =>
          import(
            /* webpackChunkName: "campaigns" */ "../views/Admin/Campaigns/index.vue"
          ),
      },
      {
        name: "Referrals",
        path: "/referrals",
        meta: {
          requiresAuth: true,
          admin: true,
          name: "Referrals",
          slug: "referrals",
        },
        component: () =>
          import(
            /* webpackChunkName: "referrals" */ "../views/Admin/Referral.vue"
          ),
      },
      {
        name: "Create Campaign",
        path: "/create-campaign",
        meta: {
          requiresAuth: true,
          admin: true,
          name: "Create Campaign",
          slug: "create-campaign",
        },
        component: () =>
          import(
            /* webpackChunkName: "create-campaign" */
            "../views/Admin/Campaigns/campaign.vue"
          ),
      },
      {
        name: "Edit Campaign",
        path: "/edit-campaign/:id",
        meta: {
          requiresAuth: true,
          admin: true,
          name: "Edit Campaign",
          slug: "edit-campaign",
        },
        component: () =>
          import(
            /* webpackChunkName: "create-campaign" */
            "../views/Admin/Campaigns/campaign.vue"
          ),
      },

      {
        name: "Participants",
        path: "/participants",
        meta: {
          requiresAuth: true,
          admin: true,
          name: "Participants",
          slug: "participants",
        },
        component: () =>
          import(
            /* webpackChunkName: "participants" */
            "../views/Admin/Participants"
          ),
      },
      {
        name: "Teams",
        path: "/teams",
        meta: {
          requiresAuth: true,
          admin: true,
          name: "Teams",
          slug: "teams",
        },
        component: () =>
          import(
            /* webpackChunkName: "teams" */
            "../views/Admin/Teams"
          ),
      },
    ],
  },

  {
    name: "Task View",
    path: "/task-view",
    meta: {
      requiresAuth: true,
      admin: true,
      name: "Task View",
      slug: "task-view",
    },
    component: () =>
      import(/* webpackChunkName: "task-view" */ "../views/TaskView.vue"),
  },

  {
    path: "/form/:slug",
    name: "Event",
    component: () =>
      import(/* webpackChunkName: "investorLogin" */ "../views/Participant"),
    meta: {
      requiresAuth: false,
      admin: false,
      name: "Investor Login",
      slug: "form",
    },
  },
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.name) {
    window.document.title =
      to.meta && to.meta.name ? `Solawind | ${to.meta.name}` : `Solawind`;
  }

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
              path: "/login",
              params: { nextUrl: to.fullPath },
            });
          } else {
            localStorage.setItem("user", JSON.stringify(json.message));
            Vue.prototype.$accounts = json.accounts;
            if (json.accounts.length == 0) {
              localStorage.removeItem("accessToken");
              localStorage.removeItem("accessuser");
            }
            if (
              to.meta.admin &&
              !json.message.isSubscribed &&
              to.path != "/subscription"
            ) {
              eventBus.$emit("UpdateAdminNav", false);
              next({
                path: "/subscription",
                params: { nextUrl: to.fullPath },
              });
            } else {
              next();
            }
          }
        })
        .catch((e) => {
          console.log(e);
          next({
            path: "/login",
            params: { nextUrl: to.fullPath },
          });
        });
    } else {
      next({
        path: "/login",
      });
    }
  } else {
    next();
  }
});

export default router;
