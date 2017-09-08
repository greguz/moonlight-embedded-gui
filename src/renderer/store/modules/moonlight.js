import * as ENUMS from '../../enums/moonlight'

/**
 * cast state data to moonlight CLI options
 * @param {any} state
 * @return {string[]}
 */

function getMoonlightOptionsFromState (state) {
  let options = []

  // screen resolution
  if (!state.width || !state.height) {
    options.push('-' + ENUMS.RESOLUTION.properties[ state.resolution ].value)
  } else {
    options.push(
      '-width',
      state.width,
      '-height',
      state.height
    )
  }

  // parametrics
  if (state.fps) options.push('-fps', state.fps)
  // TODO bitrate
  // TODO packet size

  // booleans
  if (state.unsupported) options.push('-unsupported')
  if (state.remote) options.push('-remote')
  if (state.surround) options.push('-surround')
  if (state.windowed) options.push('-windowed')

  // enumerators
  if (state.codec) options.push('-codec', ENUMS.CODEC.properties[ state.codec ].value)

  return options
}

/**
 * Base state on store creation
 */

export const state = {
  width: null,
  height: null,
  resolution: ENUMS.RESOLUTION.HD,
  fps: 60,
  bitrate: null,
  packetsize: null,
  codec: ENUMS.CODEC.AUTO,
  remote: true, // Enable the optimizations for remote connections in GFE.
  nosops: false, // Stop GFE from changing the graphical settings of the requested game or application.
  unsupported: false, // Try streaming if GFE version is unsupported
  debug: ENUMS.DEBUG.HIGH,
  surround: false, // Enable 5.1 surround sound instead of stereo.

  /*
    -localaudio
    Play the audio on the host computer instead of this device.

    -keydir [DIRECTORY]
    Change the directory to save encryption keys to DIRECTORY. By default the encryption keys are stored in $XDG_CACHE_DIR/moonlight or ~/.cache/moonlight

    -mapping [MAPPING]
    Use MAPPING as the mapping file for all inputs.
    This mapping file should have the same format as the gamecontrollerdb.txt for SDL2.
    By default the gamecontrollerdb.txt provided by Moonlight Embedded is used.

    -platform [PLATFORM]
    Select platform for audio and video output and input. <PLATFORM> can be pi, imx, aml, x11, x11_vdpau, sdl or fake.

    -input [INPUT]
    Enable the INPUT device. By default all available input devices are enabled. Only evdev devices /dev/input/event* are supported.

    -audio [DEVICE]
    Use <DEVICE> as audio output device. The default value is 'sysdefault' for ALSA and 'hdmi' for OMX on the Raspberry Pi.
  */

  windowed: false
}

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

  updateMoonlightOptions (state, data) {
    Object.assign(state, data)
  }

}

/**
 * Async store functions
 */

export const actions = {

  /**
   * Spawn a new moonlight command instance
   */

  async spawnMoonlight ({ commit, dispatch, getters, state }, { action, profile, verify }) {
    profile = profile || getters.activeProfile
    verify = verify || (() => Promise.resolve())

    if (!profile) throw new Error('Profile not found')
    await verify(profile)

    return dispatch('spawnCommand', {
      command: 'moonlight',
      // TODO use fake moonlight while NOT testing on a RasPi
      // command: path.join(process.cwd(), 'bin', 'moonlight.js'),
      args: [
        action,
        ...getMoonlightOptionsFromState(state),
        profile.host
      ],
      options: {
        shell: false,
        detached: false
      }
    })
  },

  /**
   * Pair this computer with the host
   */

  pair ({ commit, dispatch, getters, state }, profile) {
    return dispatch('spawnMoonlight', {
      action: 'pair',
      profile,
      verify: async (profile) => {
        if (profile.paired) {
          throw new Error('Profile is already paired')
        }
      }
    })
  },

  /**
   * Unpair this computer with the host
   */

  unpair ({ commit, dispatch, getters, state }, profile) {
    return dispatch('spawnMoonlight', {
      action: 'unpair',
      profile,
      verify: async (profile) => {
        if (!profile.paired) {
          throw new Error('This profile is not paired')
        }
      }
    })
  },

  /**
   * Stream game from host to this computer
   */

  stream ({ commit, dispatch, getters, state }, profile) {
    return dispatch('spawnMoonlight', {
      action: 'stream',
      profile,
      verify: async (profile) => {
        if (!profile.paired) {
          throw new Error('This profile is not paired')
        }
      }
    })
  },

  /**
   * List all available games and application on host
   */

  list ({ commit, dispatch, getters, state }, profile) {
    return dispatch('spawnMoonlight', {
      action: 'list',
      profile,
      verify: async (profile) => {
        if (!profile.paired) {
          throw new Error('This profile is not paired')
        }
      }
    })
  },

  /**
   * Quit the current running game or application on host
   */

  quit ({ commit, dispatch, getters, state }, profile) {
    return dispatch('spawnMoonlight', {
      action: 'quit',
      profile,
      verify: async (profile) => {
        if (!profile.paired) {
          throw new Error('This profile is not paired')
        }
      }
    })
  }

}
