import Vue from 'vue'
import Vuex from 'vuex'

import * as command from './modules/command'
import * as moonlight from './modules/moonlight'
import * as notifications from './modules/notifications'
import * as profiles from './modules/profiles'
import * as settings from './modules/settings'

import persistencePlugin from './plugins/persistence'

Vue.use(Vuex)

export default new Vuex.Store({

  strict: true, // TODO disable on production

  state: { },

  getters: { },

  mutations: { },

  actions: { },

  modules: {
    command,
    moonlight,
    notifications,
    profiles,
    settings
  },

  plugins: [
    persistencePlugin
  ]

})
