import { spawn, fork } from 'child_process'

/**
 * module globals
 */

let COMMAND_PROCESS = null

/**
 * Get the default state used on store creation
 */

function getDefaultState () {
  return {
    pid: null,
    command: null,
    args: [],
    options: {},
    err: null,
    alive: false,
    stdout: null,
    stderr: null,
    ts: new Date()
  }
}

/**
 * Base state on store creation
 */

export const state = getDefaultState()

/**
 * Computed properties
 */

export const getters = {

  /**
   * get currently running child process
   */

  commandProcess (state, getters) {
    if (state.alive) {
      return COMMAND_PROCESS
    } else {
      return null
    }
  }

}

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
      data,
      { ts: new Date() }
    )
  },

  /**
   * TODO docs
   */

  updateCommandStatus (state, data) {
    Object.assign(
      state,
      data,
      { ts: new Date() }
    )
  }

}

/**
 * Async store functions
 */

export const actions = {

  /**
   * spawn a command process
   */

  spawnCommand ({ commit, dispatch, getters, state }, { command, args, options = {} }) {
    if (state.alive) {
      return Promise.reject(new Error('Another command is running'))
    }

    if (options.shell == null) options.shell = process.platform === 'win32'
    try {
      COMMAND_PROCESS = (/\.js$/i.test(command) ? fork : spawn)(command, args, options)
    } catch (err) {
      return Promise.reject(err)
    }

    commit('setCommandStatus', { command, args, options, stdout: '', stderr: '' })

    return new Promise((resolve, reject) => {
      COMMAND_PROCESS.stdout.on('data', data => {
        commit('updateCommandStatus', { stdout: state.stdout + data.toString('utf8') })
      })
      COMMAND_PROCESS.stderr.on('data', data => {
        commit('updateCommandStatus', { stderr: state.stderr + data.toString('utf8') })
      })

      COMMAND_PROCESS.stdout.once('data', () => {
        commit('updateCommandStatus', { pid: COMMAND_PROCESS.pid, alive: true })
        resolve()
      })
      COMMAND_PROCESS.once('error', (err) => {
        commit('updateCommandStatus', { err, alive: false })
        reject(err)
      })

      COMMAND_PROCESS.once('exit', (code, signal) => {
        let err = null

        if (signal) {
          err = new Error(`Process killed with signal "${signal}"`)
        } else if (code !== 0) {
          err = new Error(`Process exited with code ${code}`)
        }

        commit('updateCommandStatus', { err, alive: false })
        err ? reject(err) : resolve()
      })
    })
  },

  /**
   * kill running command
   */

  killCommand ({ commit, dispatch, getters, state }, { signal }) {
    let process = getters.commandProcess

    if (!process) {
      return Promise.reject(new Error('No process to kill'))
    }

    return new Promise(resolve => {
      process.once('error', resolve)
      process.once('exit', resolve)

      process.kill(signal)
    })
  }

}
