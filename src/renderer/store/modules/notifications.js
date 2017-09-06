import uuid from 'uuid/v4'

/**
 * Base state on store creation
 */

export const state = []

/**
 * Computed properties
 */

export const getters = { }

/**
 * Store mutation functions
 */

export const mutations = {

  /**
   * create a new notification
   */

  createNotification (state, { type = 'warning', message, dismissable = true, timeout }) {
    state.push({
      id: uuid(),
      type,
      message,
      dismissable,
      timeout
    })
  },

  /**
   * delete notification
   */

  deleteNotification (state, { id }) {
    state.splice(state.findIndex(n => n.id === id), 1)
  }

}

/**
 * Async store functions
 */

export const actions = { }
