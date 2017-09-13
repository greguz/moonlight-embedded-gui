export default {
  props: {
    color: {
      type: String,
      default: null,
      validator: value => value == null || [ 'primary', 'info', 'success', 'warning', 'danger' ].includes(value)
    }
  },
  computed: {
    colorClass () {
      return this.color ? `is-${this.color}` : null
    }
  }
}
