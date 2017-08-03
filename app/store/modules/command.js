import { spawn } from 'child_process'

/**
 * Get the default state used on store creation
 */

function getDefaultState () {
  return {
    pid: null,
    command: null,
    args: [],
    options: {},
    error: null,
    alive: false,
    process: null
  }
}

/**
 * Base state on store creation
 */

export const state = getDefaultState()

/**
 * Computed properties
 */

export const getters = { }

/**
 * Store mutation functions
 */

export const mutations = {

  /**
   * TODO docs
   */

  setCommandStatus (state, data) {
    Object.assign(
      state,
      getDefaultState(),
      data
    )
  },

  /**
   * TODO docs
   */

  updateCommandStatus (state, data) {
    Object.assign(state, data)
  }

}

/**
 * Async store functions
 */

export const actions = {

  /**
   * spawn a command process
   */

  spawnCommand ({ commit, dispatch, getters, state }, data) {
    if (state.alive) {
      return Promise.reject(new Error('Another command is running'))
    }

    let process
    try {
      process = spawn(data.command, data.args, data.options)
    } catch (err) {
      return Promise.reject(err)
    }

    commit('setCommandStatus', {
      pid: process.pid,
      command: data.command,
      args: data.args,
      options: data.options,
      error: null,
      alive: true,
      process
    })

    const done = err => commit('updateCommandStatus', {
      error: err || null,
      alive: false
    })

    process.once('error', done)

    process.once('exit', (code, signal) => {
      if (signal) {
        done(new Error(`Process killed with signal ${signal}`))
      } else if (code !== 0) {
        done(new Error(`Process exited with code ${code}`))
      } else {
        done()
      }
    })
  },

  /**
   * kill running command
   */

  killCommand ({ commit, dispatch, getters, state }, data) {
    if (state.alive) {
      state.process.kill()
    } else {
      return Promise.reject(new Error('No process to kill'))
    }
  }

}
