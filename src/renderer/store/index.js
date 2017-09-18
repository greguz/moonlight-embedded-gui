import Vue from 'vue'
import Vuex from 'vuex'
import os from 'os'

import { pick } from '../../utils/object'

import * as command from './modules/command'
import * as moonlight from './modules/moonlight'
import * as notifications from './modules/notifications'
import * as profiles from './modules/profiles'
import * as settings from './modules/settings'

import makePersistencePlugin from './plugins/persistence'

Vue.use(Vuex)

export default new Vuex.Store({

  strict: process.env.NODE_ENV !== 'production',

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
    makePersistencePlugin({
      dir: os.homedir(), // TODO choose a better place for the config file
      filename: 'moonlight',
      reducer: (state) => pick(state, 'moonlight', 'profiles', 'settings')
    })
  ]

})
