import Vue from 'vue'
import App from './App.vue'
import router from "./router/index";
import store from './store/index'
import './registerServiceWorker'

import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);

Vue.use(router);

Vue.config.productionTip = false;

import axios from "axios"
Vue.prototype.$http = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
