import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import Notifications from 'vue-notification'
import config from './config'
import VuejsDialog from 'vuejs-dialog';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vuejs-dialog/dist/vuejs-dialog.min.css';

// Tell Vue to install the plugin.
Vue.use(VuejsDialog, {
    html: true,
    // loader: true,
    okText: 'Proceed',
    cancelText: 'Cancel',
    // animation: 'bounce'
});
// Tell Vue to install the plugin.
// Vue.use(VuejsDialog.main.default);

// Vue.use(vDialog);
Vue.config.productionTip = false
Vue.use(BootstrapVue);
Vue.use(Notifications)

Vue.prototype.$config = config

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')