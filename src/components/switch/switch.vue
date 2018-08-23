<template>
    <label class="ui-switch" :class="{'ui-switch-small':small}">
        <span class="ui-switch-text before" v-if="$slots.before"><slot name="before"></slot></span>
        <span class="ui-switch-span"
            :checked="value"
            :disabled="disabled"
            :style="{
                backgroundColor: !!value ? activeColor : inactiveColor,
                borderColor: !!value ? activeColor : inactiveColor
            }"
            :class="inactiveColor ? 'cusStyle' : ''"
            @click="setvalue(!value)"
        ></span>
        <span class="ui-switch-text after" v-if="$slots.after"><slot name="after"></slot></span>
    </label>
</template>
<style scoped lang="less">
.cusStyle {
    &:before {
        display: none;
    }
}
</style>

<script>
export default {
    props: {
        label: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        small: {
            type: Boolean,
            default: false
        },
        value: {
            type: Boolean,
            default: false
        },
        activeColor: {
            type: String,
            default: ''
        },
        inactiveColor: {
            type: String,
            default: ''
        }
    },
    data() {
        return {};
    },
    methods: {
        setvalue(value) {
            if (this.disabled) {
                return;
            }
            this.$emit('input', value);
            let event = document.createEvent('CustomEvent');
            event.initCustomEvent('setvalue", true, true, this.value');
            this.$el.dispatchEvent(event);
        }
    }
};
</script>
