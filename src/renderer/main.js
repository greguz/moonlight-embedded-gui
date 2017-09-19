import Vue from 'vue'
import store from './store'
import './i18n'
import App from './App'

// Vue.config.productionTip = false

export default new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
