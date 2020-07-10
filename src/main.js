import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

window.JQuery=require('jquery')
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-css-only/css/bootstrap.min.css"
import VueMaterial from "vue-material"
import BootstrapVue from "bootstrap-vue"

import "@fortawesome/fontawesome-free/css/all.css"
import "vue-material/dist/vue-material.min.css"
import "vue-material/dist/theme/default.css"
import "./styles/global.css"

import "@/plugins/echarts"
import "@/plugins/slick"

Vue.use(VueMaterial)
Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
