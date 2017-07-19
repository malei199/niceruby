import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import Element from "element-ui"
import VueMoment from 'vue-moment'
import store from '../src/js/store'
import Swiper from 'vue-awesome-swiper'
import 'font-awesome/css/font-awesome.css'
//import 'element-ui/lib/theme-default/index.css'
import $ from 'jquery'
import '../theme/element-dream.css'
import './../static/wangEditor/css/wangEditor.min.css'
import './../static/wangEditor/js/lib/jquery-1.10.2.min.js'
import './../static/wangEditor/js/wangEditor.js'
Vue.use(Element);
Vue.use(Vuex)
Vue.use(Element)
Vue.use(VueMoment)
Vue.use(Swiper)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
