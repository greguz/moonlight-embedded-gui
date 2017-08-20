import uuid from 'uuid/v4'

/**
 * Base state on store creation
 */

export const state = []

/**
 * Computed properties
 */

export const getters = {

  /**
   * get currently active profile
   */

  activeProfile (state, getters) {
    return state.find(p => p.active) || null
  }

}

/**
 * Store mutation functions
 */

export const mutations = {

  /**
   * create a new profile
   */

  createProfile (state, { name = 'New profile', host = null }) {
    for (let profile of state) {
      profile.active = false
    }

    state.push({
      id: uuid(),
      name,
      host,
      paired: false,
      active: true,
      apps: []
    })
  },

  /**
   * update a profile data
   */

  updateActiveProfile (state, data) {
    Object.assign(state.find(p => p.active), data)
  },

  /**
   * delete a profile
   */

  deleteProfile (state, profile) {
    state.splice(state.findIndex(p => p.id === profile.id), 1)
  },

  /**
   * set a profile as active
   */

  setProfileAsActive (state, profile) {
    for (let p of state) {
      p.active = p.id === profile.id
    }
  },

  /**
   * set all profiles as NOT active
   */

  unsetActiveProfile (state) {
    for (let profile of state) {
      profile.active = false
    }
  }

}

/**
 * Async store functions
 */

export const actions = { }
