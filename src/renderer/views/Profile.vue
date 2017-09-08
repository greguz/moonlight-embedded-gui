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
      <input class="input" type="text" v-model="host">
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
    }
  }

}
</script>
