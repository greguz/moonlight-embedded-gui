<template>
  <div class="container">

    <div class="field">
      <label class="label">
        Name
      </label>
      <div class="control">
        <input class="input" type="text" v-model="name">
      </div>
    </div>

    <div class="field">
      <label class="label">
        Host
      </label>
      <div class="control">
        <input class="input" type="text" v-model="host" :disabled="paired">
      </div>
    </div>

    <div class="field is-grouped">

      <div class="control" v-if="!paired">
        <button class="button is-success" v-on:click="pairProfile">
          Pair
        </button>
      </div>

      <div class="control" v-if="paired">
        <button class="button is-warning" v-on:click="unpairProfile">
          Unpair
        </button>
      </div>

      <div class="control">
        <button class="button is-danger" v-on:click="deleteProfile">
          Delete
        </button>
      </div>

    </div>

  </div>
</template>

<script>
  export default {

    computed: {
      name: {
        get: function () {
          return this.$store.getters.activeProfile.name
        },
        set: function (value) {
          this.$store.commit('updateActiveProfile', { name: value })
        }
      },
      host: {
        get: function () {
          return this.$store.getters.activeProfile.host
        },
        set: function (value) {
          this.$store.commit('updateActiveProfile', { host: value })
        }
      },
      paired: function () {
        return this.$store.getters.activeProfile.paired
      }
    },

    methods: {
      pairProfile: function () {
        const store = this.$store
        let profile = store.getters.activeProfile

        store.dispatch('pair', profile).then(process => {
          console.log(process, store.state.command)
        }).catch(err => {
          console.log('disable pair button')

          store.dispatch('showNotification', {
            type: 'danger',
            message: err.message,
            dismissable: false
          }).then(() => {
            console.log('enable pair button')
          })
        })
      },
      unpairProfile: function () {
        throw new Error()
      },
      deleteProfile: function () {
        this.$store.commit('deleteProfile', this.$store.getters.activeProfile)
      }
    }

  }
</script>
