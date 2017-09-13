<template>
<div v-if="localShow" :class="notificationClass">
  <button class="delete" v-if="dismissable" v-on:click="dismiss"></button>
  <slot></slot>
</div>
</template>

<script>
import colorMixin from '../mixins/color'

export default {
  mixins: [
    colorMixin
  ],
  props: {
    show: {
      type: Boolean,
      default: true
    },
    dismissable: {
      type: Boolean,
      default: false
    },
    timeout: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      timer: null,
      dismissed: false
    }
  },
  computed: {
    notificationClass () {
      return [
        'notification',
        this.colorClass
      ]
    },
    localShow () {
      return !this.dismissed && this.show
    }
  },
  methods: {
    dismiss () {
      if (!this.dismissed) {
        this.dismissed = true
        this.$emit('dismiss')
      }
    },
    startTimer () {
      if (!this.dismissed && typeof this.timer !== 'number' && typeof this.timeout === 'number') {
        this.timer = setTimeout(() => this.dismiss(), this.timeout)
      }
    },
    clearTimer () {
      if (typeof this.timer === 'number') {
        clearTimeout(this.timer)
      }
    }
  },
  mounted () {
    this.startTimer()
  },
  destroyed () {
    this.clearTimer()
  },
  watch: {
    show(value) {
      if (value && !this.dismissed) {
        this.startTimer()
      }
    }
  }
}
</script>
