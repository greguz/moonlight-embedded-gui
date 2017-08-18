<template>
  <div v-bind:class="[ 'notification', 'is-' + type ]">
    <button class="delete" v-if="dismissable" v-on:click="dismiss"></button>
    <span v-html="message">
      <!-- message text -->
    </span>
  </div>
</template>

<script>
  export default {

    props: {
      type: {
        type: String,
        default: 'primary'
      },
      dismissable: {
        type: Boolean,
        default: true
      },
      message: {
        type: String,
        required: true
      }
    },

    methods: {
      dismiss: function () {
        this.$emit('dismiss')
      }
    }

  }
</script>
