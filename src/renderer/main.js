import Vue from 'vue'
import store from './store'
import App from './App'
import renderErrorPage from './error'

// Vue.config.productionTip = false

async function bootstrap () {
  return new Vue({
    el: '#app',
    store,
    render: h => h(App)
  })
}

bootstrap().catch(renderErrorPage)
