<template>
<section id="app" class="hero is-info is-fullheight">

  <!-- Hero header: will stick at the top -->
  <div class="hero-head">
    <header class="nav">
      <div class="container">
        <div class="nav-left">
          <a class="nav-item">
            <img src="http://bulma.io/images/bulma-type-white.png" alt="Logo" />
          </a>
        </div>
        <div class="nav-right nav-menu">
          <!--<span class="nav-item">
            <a class="button is-info is-inverted" v-on:click="openSettings">
              <span class="icon">
                <i class="fa fa-cog"></i>
              </span>
            </a>
          </span>-->
        </div>
      </div>
    </header>
  </div>

  <!-- Hero content: will be in the middle -->
  <div class="hero-body">
    <component :is="currentView"></component>
  </div>

  <!-- Hero footer: will stick at the bottom -->
  <div class="hero-foot">
    <nav class="tabs is-boxed is-fullwidth">
      <div class="container">
        <ul>

          <li v-on:click="openSettings"
              v-bind:class="{ 'is-active': currentView === 'settings-view' }">
            <a>
              Settings
            </a>
          </li>

          <li v-for="profile in profiles"
              v-bind:key="profile.id"
              v-bind:class="{ 'is-active': profile.active }"
              v-on:click="openProfile(profile)">
            <a>
              {{ profile.name }}
            </a>
          </li>

          <li v-on:click="createProfile">
            <a>
              <i class="fa fa-plus-square"></i>
            </a>
          </li>

        </ul>
      </div>
    </nav>
  </div>

  <notification
    v-for="n in notifications"
    :key="n.id"
    :type="n.type"
    :message="n.message"
    :dismissable="n.dismissable"
    v-on:dismiss="dismissNotification(n)"
    >
  </notification>

</section>
</template>

<script>
import Settings from './settings.vue'
import Profile from './profile.vue'
import Notification from '../components/notification.vue'

export default {

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
</script>
