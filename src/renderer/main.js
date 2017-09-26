import Vue from 'vue'
import store from './store'
import App from './App'
import renderErrorPage from './error'

async function bootstrap () {
  // load default locale
  await store.dispatch('loadLocale')

  // render application
  return new Vue({
    el: '#app',
    store,
    render: h => h(App)
  })
}

bootstrap().catch(renderErrorPage)
