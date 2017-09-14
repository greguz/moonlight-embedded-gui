export default {
  props: {
    state: {
      type: String,
      validator: value => value == null || [ 'loading', 'hovered', 'focused' ].includes(value),
      default: null
    }
  },
  computed: {
    stateClass () {
      return this.state ? `is-${this.color}` : null
    }
  }
}
