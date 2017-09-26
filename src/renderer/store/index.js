import Vue from 'vue'
import Vuex from 'vuex'
import i18n from 'vuex-i18n'
import { remote } from 'electron'

import { pick } from '../../utils/object'

import * as command from './modules/command'
import * as moonlight from './modules/moonlight'
import * as notifications from './modules/notifications'
import * as profiles from './modules/profiles'
import * as settings from './modules/settings'

import makePersistencePlugin from './plugins/persistence'

Vue.use(Vuex)

export const store = new Vuex.Store({

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
      dir: remote.app.getPath('userData'),
      filename: 'moonlight',
      reducer: (state) => pick(state, 'moonlight', 'profiles', 'settings')
    })
  ]

})

Vue.use(i18n.plugin, store)
Vue.i18n.fallback('en')

export default store
