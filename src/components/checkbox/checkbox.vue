<template>
  <label
    class="el-checkbox"
    :class="[
        size && `el-checkbox--${size}`,
        {
            'is-disabled': disabled,
            'is-checked': checked,
            'is-bordered': border
        }
    ]"
  >
  <span
    class="el-checkbox__input"
    :class="{
        'is-checked': checked,
        'is-disabled': disabled,
    }"
  >
    <i class="el-checkbox__inner">
        <input
            type="checkbox"
            class="el-checkbox__original"
            tabindex="-1"
            :value="label"
            :disabled=disabled
            :name="name"
            :border="border"
            v-model="tmpChecked"
        >
    </i>
  </span>
  <span class="el-checkbox__label"><slot></slot></span>
  <template v-if="!$slots.default">{{label}}</template>
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
