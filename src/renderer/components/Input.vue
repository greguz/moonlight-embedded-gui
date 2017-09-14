<template>
<div :class="divClass">
  <input  :class="inputClass"
          :name="name"
          :value="localValue"
          :type="localType"
          :disabled="disabled"
          :required="required"
          :readonly="readonly"
          :placeholder="placeholder"
          @input="onInput($event.target.value, $event)"
          @change="onChange($event.target.value, $event)"
  />
  <span :class="leftIconClass" v-if="hasLeftIcon">
    <slot name="left-icon"></slot>
  </span>
  <span :class="rightIconClass" v-if="hasRightIcon">
    <slot name="right-icon"></slot>
  </span>
</div>
</template>

<script>
import fieldMixin from '../mixins/field'
import colorMixin from '../mixins/color'
import sizeMixin from '../mixins/size'
import stateMixin from '../mixins/field-state'

export default {
  mixins: [
    fieldMixin,
    colorMixin,
    sizeMixin,
    stateMixin
  ],
  props: {
    value: {
      default: null
    },
    type: {
      type: String,
      default: 'text',
      validator: value => [ 'text', 'password', 'email' ].includes(value)
    },
    placeholder: {
      type: String,
      default: null
    },
    formatter: {
      type: Function,
      default: value => value
    },
    lazy: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      localValue: this.value
    }
  },
  computed: {
    divClass () {
      return [
        'control',
        this.state === 'loading' ? this.stateClass : null,
        this.state === 'loading' ? this.sizeClass : null,
        this.hasLeftIcon ? 'has-icons-left' : null,
        this.hasRightIcon ? 'has-icons-right' : null
      ]
    },
    inputClass () {
      return [
        'input',
        this.colorClass,
        this.sizeClass,
        this.state !== 'loading' ? this.stateClass : null
      ]
    },
    hasLeftIcon () {
      return !!this.$slots['left-icon']
    },
    leftIconClass () {
      return [
        'icon',
        'is-left',
        this.sizeClass
      ]
    },
    hasRightIcon () {
      return !!this.$slots['right-icon']
    },
    rightIconClass () {
      return [
        'icon',
        'is-right',
        this.sizeClass
      ]
    }
  },
  watch: {
    value (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.localValue = newVal
      }
    },
    localValue (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$emit('input', newVal)
      }
    }
  },
  methods: {
    onInput (value, e) {
      if (!this.lazy) {
        this.localValue = this.formatter(value, e)
      }
    },
    onChange (value, e) {
      this.localValue = this.formatter(value, e)
      this.$emit('change', this.localValue)
    },
    focus () {
      if (!this.disabled) {
        this.$el.focus()
      }
    }
  }
}
</script>
