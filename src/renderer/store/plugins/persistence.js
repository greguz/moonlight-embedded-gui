import path from 'path'
import fs from 'fs'
import VuexPersistence from 'vuex-persist'

/**
 * read and parse a JSON file without throwing errors
 */

function readJsonSync (file, options) {
  if (!fs.existsSync(file)) return {}
  const content = fs.readFileSync(file, options)
  let parsed
  try {
    parsed = JSON.parse(content)
  } catch (err) {
    parsed = {}
  }
  return parsed
}

/**
 * ensure that dir exists inside the FS
 */

function ensureDirSync (dir, mode) {
  if (fs.existsSync(dir)) {
    return false
  } else {
    ensureDirSync(path.dirname(dir))
    fs.mkdirSync(dir, mode)
    return true
  }
}

/**
 * write a JSON file and ensure dirs hierarchy
 */

function outputJsonSync (file, object, options = {}) {
  ensureDirSync(path.dirname(file))
  const json = JSON.stringify(object, options.replacer, options.spaces)
  fs.writeFileSync(file, json, options)
}

/**
 * make store JSON persistance plugin
 *
 * @param {Object} options
 * @param {string} options.dir                      store dir path
 * @param {string} [options.filename='moonlight']   store filename
 * @param {string} [options.encoding='utf8']        file encoding
 * @param {number|string} [options.spaces=2]        JSON indentation
 * @param {Function} [options.reducer]              store reducer function
 * @return {Function}
 */

export default function makePlugin ({
  dir,
  filename = 'moonlight',
  encoding = 'utf8',
  spaces = 2,
  reducer
}) {
  const key = filename.replace(/\.json$/i, '')
  const file = path.join(dir, key + '.json')
  const persist = new VuexPersistence({
    key,
    restoreState: (key) => readJsonSync(file, { encoding }),
    saveState: (key, state) => outputJsonSync(file, state, { encoding, spaces }),
    reducer
  })

  return persist.plugin
}
