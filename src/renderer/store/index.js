import Vue from 'vue'
import Vuex from 'vuex'
import os from 'os'
import path from 'path'

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
      dir: process.env.APPDATA || (
        process.platform === 'darwin'
          ? path.join(os.homedir(), 'Library', 'Preferences')
          : path.join(os.homedir(), '.config')
      ),
      filename: 'moonlight',
      reducer: (state) => pick(state, 'moonlight', 'profiles', 'settings')
    })
  ]

})
