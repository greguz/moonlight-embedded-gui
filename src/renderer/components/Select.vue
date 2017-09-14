<template>
<div :class="divClass">
  <select :name="name"
          :class="selectClass"
          v-model="localValue"
          :multiple="multiple"
          :size="(multiple || selectSize >= 2) ? selectSize : null"
          :disabled="disabled"
          :required="required"
  >
    <option v-for="option in selectOptions"
            :value="option.value"
            v-html="option.text"
            :disabled="option.disabled"
            :key="option.value || option.text"
    >
    </option>
    <slot></slot>
  </select>
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
    options: {
      type: [ Array, Object ],
      default: () => []
    },
    valueField: {
      type: String,
      default: 'value'
    },
    textField: {
      type: String,
      default: 'text'
    },
    multiple: {
      type: Boolean,
      default: false
    },
    selectSize: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      localValue: this.value
    }
  },
  computed: {
    selectOptions () {
      let options = this.options || {}

      if (options instanceof Array) {
        return options.map(option => {
          if (typeof option === 'object') {
            return {
              value: option[this.valueField],
              text: option[this.textField],
              disabled: option.disabled || false
            }
          } else {
            return {
              text: String(option),
              value: option || {}
            }
          }
        })
      } else {
        return Object.keys(options).map(value => {
          let option = options[value] || {}

          if (typeof option !== 'object') {
            option = {text: String(option)}
          }

          option.value = option[this.valueField] || value
          option.text = option[this.textField] || value

          return option
        })
      }
    },
    divClass () {
      return [
        'select',
        this.multiple ? 'is-multiple' : null,
        this.colorClass,
        this.sizeClass,
        this.state === 'loading' ? this.stateClass : null
      ]
    },
    selectClass () {
      return [
        this.state !== 'loading' ? this.stateClass : null
      ]
    }
  },
  watch: {
    localValue (value, oldValue) {
      if (value !== oldValue) {
        this.$emit('input', value)
      }
    },
    value (value, oldValue) {
      if (value !== oldValue) {
        this.localValue = value
      }
    }
  }
}
</script>
