import Vue from "vue";
import Router from "vue-router";
import config from "./config";
import fetch from "node-fetch";
import eventBus from "./eventBus";

Vue.use(Router);

const router = new Router({
    mode: "history",
    routes: [{
            path: "/form/:slug",
            name: "Event",
            component: () =>
                import (
                    /* webpackChunkName: "investorLogin" */
                    "./views/participant/Event.vue"
                ),
            meta: (route) => ({
                requiresAuth: false,
                title: `${config.appName} - ` + route.params.slug,
                tabbar: false,
            }),
        },
        {
            path: "/user/home/",
            name: "Home",
            component: () =>
                import (
                    /* webpackChunkName: "investorLogin" */
                    "./views/participant/Home.vue"
                ),
            meta: () => ({ requiresAuth: true, title: `${config.appName} - User Home` })
        },
        {
            path: "/",
            redirect: "/admin/login",
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
            path: "/invitation",
            name: "Invitation",
            component: () =>
                import ( /* webpackChunkName: "adminLogin" */ "./views/Invitation.vue"),
        },
        {
            path: "/admin/login",
            name: "AdminLogin",

            component: () =>
                import ( /* webpackChunkName: "adminLogin" */ './views/admin/AdminLogin.vue'),
            meta: () => ({ requiresAuth: true, title: `${config.appName} - Admin Login`, tabbar: false })

        },
        {
            path: "/404",
            name: "PageNotFound",

            component: () =>
                import ( /* webpackChunkName: "adminLogin" */ './views/404.vue'),
            meta: {
                title: `${config.appName} - 404`
            }
        },
        {
            path: "/admin/dashboard",
            name: "Dashboard",
            component: () =>
                import (
                    /* webpackChunkName: "dashboard" */
                    "./views/admin/Dashboard.vue"
                ),
            meta: {
                requiresAuth: true,
                admin: true,
                title: `${config.appName} - Admin Dashboard`
            },
        },
        {
            path: "/admin/teams",
            name: "Teams",
            component: () =>
                import (
                    /* webpackChunkName: "dashboard" */
                    "./views/admin/TeamMate.vue"
                ),
            meta: {
                requiresAuth: true,
                admin: true,
                title: `${config.appName} - Teams`
            },
        },
        {
            path: "/admin/setting/org",
            name: "Org",
            component: () =>
                import (
                    /* webpackChunkName: "dashboard" */
                    "./views/admin/setting/OrgSetting.vue"
                ),
            meta: {
                requiresAuth: true,
                admin: true,
                title: `${config.appName} - Org`
            },
        },
        {
            path: "/admin/createapp",
            name: "CreateApp",
            component: () =>
                import (
                    /* webpackChunkName: "dashboard" */
                    "./views/admin/CreateApp.vue"
                ),
            meta: {
                requiresAuth: true,
                admin: true,
                title: `${config.appName} - CreateApp`
            },
        },
        {
            path: "/admin/participants",
            name: "Participants",
            component: () =>
                import (
                    /* webpackChunkName: "investors" */
                    "./views/admin/Participants.vue"
                ),
            meta: {
                requiresAuth: true,
                admin: true,
                title: `${config.appName} - Participants`,
            },
        },
        {
            path: "/admin/events",
            name: "Events",
            component: () =>
                import ( /* webpackChunkName: "project" */ "./views/admin/Events.vue"),
            meta: {
                requiresAuth: true,
                admin: true,
                title: `${config.appName} - Events`
            },
        },
        {
            path: "/admin/subscription",
            name: "subscription",
            component: () =>
                import (
                    /* webpackChunkName: "subscription" */
                    "./views/admin/Subscription.vue"
                ),
            meta: {
                requiresAuth: true,
                admin: true,
                title: `${config.appName} - Subscription`
            },
        },
        {
            path: "/sa/home",
            name: "SuperAdmin Home",
            component: () =>
                import ( /* webpackChunkName: "project" */ "./views/superAdmin/Home.vue"),
            meta: {
                requiresAuth: false,
                admin: false,
                title: `${config.appName} - SuperAdmin Home`
            },
        },
    ],
});

router.beforeEach((to, from, next) => {

    if (to.matched.length < 1) {
        document.title = to.meta.title;
        next(false);
        return router.push('/404');
    }

    if (to.matched.some((record) => record.meta.requiresAuth)) {
        const authToken = localStorage.getItem("authToken");

        if (authToken) {
            let usage = true;
            if (to.path === "/admin/subscription") {
                usage = false;
            }
            const url = `${config.studioServer.BASE_URL}hs/api/v2/auth/protected?usage=${usage}`;
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
                        Vue.prototype.$accounts = json.accounts;
                        if (json.accounts.length == 0) {

                            localStorage.removeItem("accessToken")
                            localStorage.removeItem("accessuser")
                        }
                        if (
                            to.meta.admin
                        ) {
                            if (!json.message.isSubscribed &&
                                (to.path != "/admin/subscription" && to.path != "/admin/dashboard")) {
                                eventBus.$emit("UpdateAdminNav", false);
                                next({
                                    path: "/admin/subscription",
                                    params: { nextUrl: to.fullPath },
                                });
                            } else {
                                // if he is subscired
                                const usage = json.message.usage;
                                if (usage && usage.totalUsed >= usage.totalAvailable) {
                                    next({
                                        path: "/admin/subscription",
                                        params: { nextUrl: to.fullPath },
                                    });
                                    eventBus.$emit("UpdateAdminNav", false);
                                } else {
                                    eventBus.$emit("UpdateAdminNav", true);
                                    next();
                                }
                            }
                        } else {
                            next();
                        }
                    }
                })
                .catch((e) => {
                    console.log(e);
                    next({
                        path: to.meta.admin ? "/admin/login" : "/login",
                        params: { nextUrl: to.fullPath },
                    });
                });
        } else {
            next({
                path: to.meta.admin ?
                    "/admin/login" :
                    !to.query["referrer"] ?
                    `/login/${to.params["slug"]}` : `/login/${to.params["slug"]}?referrer=${to.query["referrer"]}`,
                params: { nextUrl: to.fullPath },
            });
        }
    } else {
        next();
    }
});
export default router;