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
  computed: {
    formOptions () {
      let options = this.options || {}

      if (options instanceof Array) {
        // Normalize flat arrays to object Array
        options = options.map(option => {
          if (typeof option === 'object') {
            return {
              value: option[this.valueField],
              text: option[this.textField],
              disabled: option.disabled || false
            }
          }

          return {
            text: String(option),
            value: option || {}
          }
        })
      } else {
        // Normalize Objects keys to Array
        options = Object.keys(options).map(value => {
          let option = options[value] || {}

          // Resolve text
          if (typeof option !== 'object') {
            option = {text: String(option)}
          }

          // Resolve value (uses key as value if not provided)
          option.value = option[this.valueField] || value

          // Resolve text field (uses key as value if not provided)
          option.text = option[this.textField] || value

          return option
        })
      }

      return options
    },
    selectedValue () {
      const formOptions = this.formOptions
      if (this.returnObject && !this.multiple) {
        for (let i = 0; i < formOptions.length; i++) {
          if (formOptions[i].value === this.localValue) {
            return formOptions[i]
          }
        }
        return null
      } else {
        return this.localValue
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
        this.$emit('input', this.selectedValue)
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
