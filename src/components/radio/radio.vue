<template>
    <label
        class="el-radio"
        :name=name
        :class="[
            size && `el-radio--${size}`,
            border && `el-radio--${border}`,
            {
                'is-disabled': disabled,
                'is-radioSize': size,
                'is-bordered': border,
                'is-checked': value === label
            }
        ]"
    >
        <span
            class="el-radio__input"
            :class="{
                'is-disabled': disabled,
                'is-checked': value === label
            }"
        >
            <i class="el-radio__inner">
            <input
                :value="label"
                type="radio"
                v-model="tmpValue"
                :name="name"
                @change="changeHandler"
                class="el-radio__original"
                tabindex="-1"
                :disabled="disabled"
            >
            </i>
        </span>
        <span class="el-radio__label">
            <slot></slot>
            <template v-if="!$slots.default">{{label}}</template>
        </span>
    </label>
</template>

<script>
    export default {
        props: {
            disabled: Boolean,
            label: [String, Number, Boolean],
            size: String,
            name: String,
            border: Boolean,
            value: null
        },

        methods: {
            changeHandler() {
                this.$nextTick(() => {
                    this.$emit('change', this.model);
                });
            }
        },

        computed: {
            tmpValue: {
                get() {
                    return this.value
                },
                set(val) {
                    this.$emit('input', val)
                }
            }
        },

        created() {

        }
    }
</script>
