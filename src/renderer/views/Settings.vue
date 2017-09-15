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
              <b-select v-model="surround" :options="surround_options"></b-select>
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
              <b-select v-model="codec" :options="codec_options"></b-select>
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
              <b-select v-model="fps" :options="fps_options"></b-select>
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
import bSelect from '../components/select'

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
    get () {
      return this.$store.state.moonlight[ name ]
    },
    set (value) {
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
        text: prop,
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
  data () {
    return {
      codec_options: makePropertyOptionsFromEnum(ENUMS.CODEC),
      fps_options: [
        30,
        60
      ],
      surround_options: [{
        text: 'Enabled',
        value: true
      }, {
        text: 'Disabled',
        value: false
      }]
    }
  },
  computed: {
    surround: makeComputedProperty('surround', TYPES.bool),
    codec: makeComputedProperty('codec', TYPES.int),
    fps: makeComputedProperty('fps', TYPES.int)
  },
  components: {
    bSelect
  }
}
</script>
