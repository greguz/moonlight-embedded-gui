import template from './profile.html'

export default {

  template,

  computed: {

    name: {
      get: function () {
        return this.$store.getters.getActiveProfile.name
      },
      set: function (value) {
        this.$store.commit('updateProfile', { name: value })
      }
    },

    host: {
      get: function () {
        return this.$store.getters.getActiveProfile.host
      },
      set: function (value) {
        this.$store.commit('updateProfile', { host: value })
      }
    },

    paired: function () {
      return this.$store.getters.getActiveProfile.paired
    }

  }

}
