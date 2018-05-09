<template>
    <button
        class="el-button"
        :disabled="loading || disabled"
        @click="clkHandler"
        :class="[
            type && `el-button--${type}`,
            size && `el-button--${size}`,
            {
                'is-plain': plain,
                'is-disabled': disabled,
                'is-loading': loading,
                'is-round': round,
                'is-circle': circle
            }
        ]"
    >
    <i class="el-icon-loading" v-if="loading"></i>
    <i :class="icon" v-if="icon && !loading"></i>
    <span v-if="$slots.default"><slot></slot></span>
    </button>
</template>

<script>

    export default {
        name: 'UiButton',

        props: {
            type: {
                type: String,
                default: 'default'

            },
            size: String,
            plain: Boolean,
            disabled: Boolean,
            loading: Boolean,
            round: Boolean,
            circle: Boolean,
            icon: String
        },

        methods: {
            clkHandler(evt) {
                this.$emit('click', evt);
            }
        }

    }
</script>
