<template>

<select @input="updateValue">
  <option
    v-for="option in options"
    :value="option.value"
    :key="option.value"
    :selected="option.value === value"
    >
    {{ option.label }}
  </option>
</select>

</template>

<script>
export default {

  props: [ 'value' ],

  methods: {
    updateValue: function () {
      this.$emit('input', {
        month: this.$refs.monthPicker.value,
        year: this.$refs.yearPicker.value
      })
    }
  }

}
</script>
