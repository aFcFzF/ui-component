<template>
  <label
    class="el-checkbox-button"
    :class="[
        size && `el-checkbox-button--${size}`,
        {
            'is-disabled': disabled,
            'is-checked': checked,
            'is-bordered': border
        }
    ]"
  >
    <input
        type="checkbox"
        class="el-checkbox-button__original"
        tabindex="-1"
        :value="label"
        :disabled=disabled
        :name="name"
        :border="border"
        v-model="tmpChecked"
    >
    <span class="el-checkbox-button__inner">
        <template v-if="!$slots.default">{{label}}</template>
        <slot></slot>
    </span>
  </label>
</template>

<script>
    export default {

        data() {
            return {
                checked: false
            }
        },

        props: {
            size: String,
            name: String,
            disabled: Boolean,
            tabIndex: Number,
            label: String,
            border: Boolean,
            checkedItem: Array
        },

        methods: {
            changeHandler() {
                this.$emit('change', this.value);
            }
        },

        created() {
            const {label, checkedItem} = this;
            this.checked = checkedItem.indexOf(label) > -1;
        },

        computed: {
            tmpChecked: {
                get() {
                    return this.checked;
                },
                set(val) {
                    this.$emit('input', val);
                    this.$emit('change', this.label, val);
                    this.checked = val;
                }
            },
        }

    }
</script>
