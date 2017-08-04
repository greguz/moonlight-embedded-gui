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

  createNotification (state, { type = 'warning', message, dismissable = true }) {
    state.push({
      id: uuid(),
      type,
      message,
      dismissable
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

export const actions = {

  /**
   * create notification and dismiss it after timeout
   */

  showNewNotification ({ commit, dispatch, getters, state }, { type, message, dismissable, timeout = 5000 }) {
    commit('createNotification', {
      type,
      message,
      dismissable
    })

    if (timeout) {
      const notification = state[ state.length - 1 ]
      setTimeout(() => commit('deleteNotification', notification), timeout)
    }
  }

}
