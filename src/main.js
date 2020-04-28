import Vue from 'vue'
import App from './App.vue'
import router from "./router/index";
import store from './store/index'

import iView from 'iview';
Vue.use(iView);
import 'iview/dist/styles/iview.css';

Vue.config.productionTip = false;
import './registerServiceWorker'

import axios from "axios"
Vue.prototype.$http=axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
