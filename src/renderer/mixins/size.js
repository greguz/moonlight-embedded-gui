export default {
  props: {
    size: {
      type: String,
      default: null,
      validator: value => value == null || [ 'small', 'medium', 'large' ].includes(value)
    }
  },
  computed: {
    sizeClass () {
      return this.size ? `is-${this.size}` : null
    }
  }
}
