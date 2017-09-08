<template>
<header class="nav">
  <div class="container">
    <div class="nav-left">
      <a class="nav-item">
        <img src="http://bulma.io/images/bulma-type-white.png" alt="Logo" />
      </a>
    </div>
    <div class="nav-right nav-menu">

      <!--<a class="nav-item">
        Documentation
      </a>-->

      <span class="nav-item">
        <a class="button is-primary is-inverted">
          <span class="icon">
            <i class="fa fa-github"></i>
          </span>
          <span>
            Pair
          </span>
        </a>
      </span>

      <span class="nav-item">
        <a class="button is-danger" v-on:click="deleteProfile">
          <span class="icon">
            <i class="fa fa-times"></i>
          </span>
        </a>
      </span>

    </div>
  </div>
</header>
</template>

<script>
export default {

  computed: {
    paired: function () {
      return this.$store.getters.activeProfile.paired
    }
  },

  methods: {
    deleteProfile: function () {
      this.$store.commit('deleteProfile', this.$store.getters.activeProfile)
    },
    pairProfile: async function () {
      try {
        await this.$store.dispatch(
          'pair',
          this.$store.getters.activeProfile
        )
      } catch (err) {
        this.$store.commit('createNotification', {
          type: 'danger',
          message: err.message,
          dismissable: true,
          timeout: 10
        })
      }
    }
  }

}
</script>
