import path from 'path'
import fs from 'fs-extra'
import os from 'os'
import VuexPersistence from 'vuex-persist'

const FILE = path.join(os.homedir(), 'moonlight.json')

const persistence = new VuexPersistence({

  key: 'moonlight-embedded-gui',

  restoreState: (key) => {
    return fs.readJsonSync(FILE, {
      encoding: 'utf8',
      throws: false
    })
  },

  saveState: (key, state) => {
    fs.outputJsonSync(FILE, state, {
      encoding: 'utf8',
      spaces: 2
    })
  },

  reducer: (state) => {
    return {
      moolight: state.moonlight,
      profiles: state.profiles,
      settings: state.settings
    }
  }

})

export default persistence.plugin
