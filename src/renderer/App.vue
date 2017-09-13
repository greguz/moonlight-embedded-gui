<template>
<section id="app" class="hero is-info is-fullheight">

  <div class="hero-head">
    <app-header></app-header>
  </div>

  <div class="hero-body">
    <component :is="currentView"></component>
  </div>

  <div class="hero-foot">
    <app-footer></app-footer>
  </div>

  <notification
    v-for="n in notifications"
    :key="n.id"
    :type="n.type"
    :message="n.message"
    :dismissable="n.dismissable"
    :timeout="n.timeout"
    v-on:dismiss="dismissNotification(n)"
    >
  </notification>

</section>
</template>

<script>
import Settings from './views/Settings.vue'
import Profile from './views/Profile.vue'
import Notification from './components/Notification.vue'
import Header from './views/Header.vue'
import Footer from './views/Footer.vue'

export default {

  computed: {
    currentView () {
      return this.$store.getters.activeProfile ? 'profile-form' : 'settings-form'
    },
    notifications () {
      return this.$store.state.notifications
    }
  },

  methods: {
    dismissNotification (notification) {
      this.$store.commit('deleteNotification', notification)
    }
  },

  components: {
    'notification': Notification,
    'settings-form': Settings,
    'profile-form': Profile,
    'app-header': Header,
    'app-footer': Footer
  }

}
</script>
