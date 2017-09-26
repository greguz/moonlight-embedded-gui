import util from 'util'
import path from 'path'
import fs from 'fs'
import Vue from 'vue'

/**
 * promisification
 */

const readFile = util.promisify(fs.readFile)

/**
 * Base state on store creation
 */

export const state = {
  locale: 'en'
}

/**
 * Computed properties
 */

export const getters = { }

/**
 * Store mutation functions
 */

export const mutations = { }

/**
 * Async store functions
 */

export const actions = {

  /**
   * load locale translations
   */

  async loadLocale ({ commit, dispatch, getters, state }, locale) {
    locale = locale || state.locale || 'en'
    const translations = JSON.parse(
      await readFile(
        path.join(__static, 'locales', locale + '.json'),
        'utf8'
      )
    )
    Vue.i18n.replace(locale, translations)
    Vue.i18n.set(locale)
  }

}
