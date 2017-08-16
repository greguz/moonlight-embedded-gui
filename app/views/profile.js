import template from './profile.html'

export default {

  template,

  computed: {

    name: {
      get: function () {
        return this.$store.getters.activeProfile.name
      },
      set: function (name) {
        this.$store.commit('updateProfile', { name })
      }
    },

    host: {
      get: function () {
        return this.$store.getters.activeProfile.host
      },
      set: function (host) {
        this.$store.commit('updateProfile', { host })
      }
    },

    paired: function () {
      return this.$store.getters.activeProfile.paired
    }

  }

}
