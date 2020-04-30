import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

window.JQuery=require('jquery')
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-css-only/css/bootstrap.min.css"
import VueMaterial from "vue-material"
import BootstrapVue from "bootstrap-vue"
import Slick from "vue-slick"

import "slick-carousel/slick/slick.css"
import 'slick-carousel/slick/slick-theme.css'
import "@fortawesome/fontawesome-free/css/all.css"
import "vue-material/dist/vue-material.min.css"
import "vue-material/dist/theme/default.css"
import "./styles/global.css"

Vue.use(VueMaterial)
Vue.use(BootstrapVue)
Vue.use(Slick)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
