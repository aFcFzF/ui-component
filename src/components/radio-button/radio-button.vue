<template>
  <label
    class="el-radio-button"
    :class="[
        size && `el-radio-button--${size}`,
        {
          'is-active': value === label,
          'is-disabled': disabled,
        }
    ]"
    :tabindex="tabIndex"
  >
    <input
      class="el-radio-button__orig-radio"
      :value="label"
      type="radio"
      v-model="tmpValue"
      :name="name"
      @change="changeHandler"
      :disabled="disabled"
      tabindex="-1"
    >
    <span
      class="el-radio-button__inner"
      :style="value === label && activeStyle"
    >
      <slot></slot>
      <template v-if="!$slots.default">{{label}}</template>
    </span>
  </label>
</template>

<script>
    export default {
        props: {
            value: null,
            label: null,
            size: String,
            fill: String,
            textColor: String,
            disabled: Boolean,
            name: String,
            tabIndex: String,
            activeStyle: {
              type: String,
              default: ''
            }
        },

        computed: {
          tmpValue: {
            get() {
              return this.value
            },
            set(val) {
              this.$emit('input', val);
            }
          }
        },

        methods: {
          changeHandler() {
            this.$emit('change', this.label)
          }
        }
    }
</script>
