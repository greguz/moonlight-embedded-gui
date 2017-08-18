import Vue from 'vue'
import store from './store'
import App from './views/app.vue'

export default new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
