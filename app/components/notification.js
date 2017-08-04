import template from './notification.html'

export default {

  template,

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
