import Vue from "vue";
import Antd from "ant-design-vue";

import App from "./App.vue";
import store from "./store";

import "ant-design-vue/dist/antd.css";


// import axios from 'axios'
// import './common/common.ts'
// @ts-ignore
// axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? `http://${document.location.host}/smartpark-web` : 'api'
Vue.use(Antd);
Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
