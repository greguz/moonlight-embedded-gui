<template>
 <nav class="tabs is-boxed is-fullwidth">
  <div class="container">
    <ul>

      <li v-on:click="openSettings"
          v-bind:class="{ 'is-active': !activeProfile }">
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
</template>

<script>
export default {

  computed: {
    activeProfile: function () {
      return this.$store.getters.activeProfile
    },
    profiles: function () {
      return this.$store.state.profiles
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
    }
  }

}
</script>
