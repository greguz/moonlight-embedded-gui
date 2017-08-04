import template from './app.html'
import Settings from './settings'
import Profile from './profile'
import Notification from '../components/notification'

export default {

  template,

  computed: {

    currentView: function () {
      return this.$store.getters.activeProfile ? 'profile-view' : 'settings-view'
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

    dismissNotification: function (notification) {
      this.$store.commit('deleteNotification', notification)
    }

  },

  components: {
    'notification': Notification,
    'settings-view': Settings,
    'profile-view': Profile
  }

}
