import Vue from "vue"
import App from "./App.vue"
import store from "./store"
// import axios from 'axios'
// import './common/common.ts'

// @ts-ignore
// axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? `http://${document.location.host}/smartpark-web` : 'api'

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount("#app")
