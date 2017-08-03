import Vue from 'vue'
import Vuex from 'vuex'

import * as command from './modules/command'
import * as moonlight from './modules/moonlight'
import * as notifications from './modules/notifications'
import * as profiles from './modules/profiles'
import * as settings from './modules/settings'

Vue.use(Vuex)

export default new Vuex.Store({

  strict: true,

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

  plugins: [] // TODO persistent storage

})
