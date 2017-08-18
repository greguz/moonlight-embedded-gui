<template>
  <div class="container">

    <div class="columns">

      <div class="column">

        <h1 class="title">
          Moonlight setting
        </h1>

        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">
              Surround 5.1
            </label>
          </div>
          <div class="field-body">
            <div class="field is-narrow">
              <div class="control">
                <div class="select is-fullwidth">
                  <select v-model="surround">
                    <option value="true">Enable</option>
                    <option value="false">Disable</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">
              Codec
            </label>
          </div>
          <div class="field-body">
            <div class="field is-narrow">
              <div class="control">
                <div class="select is-fullwidth">
                  <select v-model="codec">
                    <option v-for="option in codec_options" :value="option.value">{{ option.label }}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">
              FPS
            </label>
          </div>
          <div class="field-body">
            <div class="field is-narrow">
              <div class="control">
                <div class="select is-fullwidth">
                  <select v-model="fps">
                    <option v-for="option in fps_options">{{ option }}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="column">

        <h1 class="title">
          Application setting
        </h1>

      </div>

    </div>

  </div>
</template>

<script>
  import * as ENUMS from '../enums/moonlight'

  /**
   * property types
   */

  const TYPES = {
    'string': value => value,
    'int': value => parseInt(value, 10),
    'bool': value => value === 'true'
  }

  /**
   * make vuex computed property function by property name
   * @param {string} name
   * @param {function} [cast]
   * @return {any}
   */

  function makeComputedProperty (name, cast = TYPES.string) {
    return {
      get: function () {
        return this.$store.state.moonlight[ name ]
      },
      set: function (value) {
        this.$store.commit('updateMoonlightOptions', { [name]: cast(value) })
      }
    }
  }

  /**
   * make options list from an enumerator
   * @param {any} enumerator
   * @return {any[]}
   */

  function makePropertyOptionsFromEnum (enumerator) {
    let options = []
    for (let prop in enumerator) {
      if (prop !== 'properties') {
        options.push({
          label: prop,
          value: enumerator[ prop ]
        })
      }
    }
    return options
  }

  /**
   * component definition
   */

  export default {

    data: function () {
      return {
        codec_options: makePropertyOptionsFromEnum(ENUMS.CODEC),
        fps_options: [ 30, 60 ]
      }
    },

    computed: {
      surround: makeComputedProperty('surround', TYPES.bool),
      codec: makeComputedProperty('codec', TYPES.int),
      fps: makeComputedProperty('fps', TYPES.int)
    }

  }
</script>
