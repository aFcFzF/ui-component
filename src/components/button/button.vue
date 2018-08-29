<template>
    <button :class="buttonCls" :disabled="!!this.disabled" @click="trigger">
        <i :class="iconCls" v-if="!!iconCode"></i>
        <template v-if="hasText">
            <slot></slot>
        </template>
    </button>
</template>
<script>
const prefix = 'ui-btn';
export default {
    props: {
        color: String,
        textColor: String,
        icon: String,
        loading: Boolean,
        circle: Boolean,
        block: Boolean,
        noBorder: Boolean,
        disabled: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            validator(value) {
                return ['l', 's', 'xs'].indexOf(value) > -1;
            }
        },
        text: Boolean,
        iconCircle: Boolean
    },

    data() {
        return {};
    },

    methods: {
        trigger() {
            this.$emit('click');
        }
    },

    computed: {
        hasText() {
            let slot = this.$slots.default;
            if (slot && slot.length > 0) {
                return true;
            }
            return false;
        },

        buttonCls() {
            return {
                [`${prefix}`]: true,
                [`${prefix}-circle`]: !!this.circle || !!this.iconCircle,
                [`${prefix}-icon-circle`]: !!this.iconCircle,
                [`${prefix}-text`]: !!this.text,
                [`${prefix}-loading`]: !!this.loading,
                [`${prefix}-block`]: !!this.block,
                [`${prefix}-text-${this.textColor}`]: !!this.textColor,
                [`${prefix}-${this.color}`]: !!this.color,
                [`${prefix}-${this.size}`]: !!this.size,
                [`${prefix}-no-border`]: this.noBorder === true
            };
        },

        iconCode() {
            return this.loading ? 'ui-icon-loading' : this.icon;
        },

        iconCls() {
            const iconCode = this.loading ? 'ui-icon-loading' : this.icon;
            return {
                [`${iconCode}`]: !!iconCode
            };
        }
    }
};
</script>
