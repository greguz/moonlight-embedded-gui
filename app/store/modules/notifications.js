import uuid from 'uuid/v4'

/**
 * Base state on store creation
 */

export const state = [{
  type: 'warning',
  message: 'Test 1 2 3 4',
  dismissable: true
}]

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

  createNotification (state, options) {
    options = Object.assign(
      {
        type: 'warning',
        message: 'EMPTY NOTIFICATION',
        dismissable: true
      },
      options,
      {
        id: uuid()
      }
    )

    state.push(options)
  },

  /**
   * delete single notification
   */

  deleteNotification (state, notification) {
    state.splice(state.findIndex(n => n.id === notification.id), 1)
  },

  /**
   * delete all notifications
   */

  deleteAllNotifications (state) {
    state.splice(0, state.length)
  }

}

/**
 * Async store functions
 */

export const actions = {

  showNewNotification ({ commit, dispatch, getters, state }, options) {
    options = Object.assign({
      timeout: 5 * 1000
    }, options)

    commit('createNotification', options)

    if (options.timeout) {
      return new Promise(resolve => {
        const notification = state[ state.length - 1 ]

        setTimeout(() => {
          commit('deleteNotification', notification)
          resolve()
        }, options.timeout)
      })
    }
  }

}
