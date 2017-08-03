import template from './app.html'
import Settings from './settings'
import Profile from './profile'

export default {

  template,

  computed: {

    currentView: function () {
      return this.$store.getters.getActiveProfile ? 'Profile' : 'Settings'
    },

    profiles: function () {
      return this.$store.state.profiles
    },

    notifications: function () {
      return this.$store.state.notifications
    }

  },

  methods: {

    openSettings: function () {
      this.$store.commit('unsetActiveProfile')
    },

    createProfile: function () {
      this.$store.commit('createProfile')
    },

    openProfile: function (profile) {
      if (!profile.active) {
        this.$store.commit('setProfileAsActive', profile)
      }
    },

    dismissNotification: function (notifications) {
      this.$store.commit('deleteNotification', notifications)
    }

  },

  components: {
    Settings,
    Profile
  }

}
