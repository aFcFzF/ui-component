<template>
    <div :class="badgeCls">
        <span :class="badgeCountCls">
            <slot name="content" v-if="$slots.content"></slot>
            <template v-else>{{showCount}}</template>
        </span>
        <slot></slot>
    </div>
</template>
<script>
const prefix = 'ui-badge';

export default {
    props: {
        count: {
            type: Number,
            default: 0
        },
        maxCount: {
            type: Number,
            default: 100
        },
        showZero: {
            type: Boolean,
            default: false
        },
        dot: {
            type: Boolean,
            default: false
        },
        position: {
            type: String,
            validator(value) {
                return ['right', 'left', 'center'].indexOf(value) > -1;
            }
        }
    },
    data() {
        return {};
    },
    methods: {},
    computed: {
        showCount() {
            return this.dot ? ''
                : this.count > this.maxCount ? `${this.maxCount}+` : this.count;
        },
        badgeCls() {
            return {
                [`${prefix}`]: true,
                [`${prefix}-position-right`]: this.position === 'right',
                [`${prefix}-position-center`]: this.position === 'center'
            };
        },
        badgeCountCls() {
            return {
                [`${prefix}-count`]: true,
                [`${prefix}-count-show`]: this.count > 0 || this.showZero,
                [`${prefix}-count-dot`]: this.dot
            };
        }
    }
};
</script>