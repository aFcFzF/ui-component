<template>
<div class="ui-progress">
    <div class="ui-progress-title" v-if="$slots.title">
        <slot name="title"></slot>
    </div>
    <div class="ui-progress-inner" :style="progressInnerStyle">
        <div class="ui-progress-bg" :style="progressBgStyle" :class="progressBgClass">
            <span class="ui-progress-inner-text"><slot name="progress-text"></slot></span>
        </div>
    </div>
    <div class="ui-progress-text" v-if="$slots.text">
        <slot name="text"></slot>
    </div>
</div>
</template>

<script>
const prefix = 'ui-progress';
const colors = ['red', 'blue', 'primary', 'gray', 'yellow', 'green'];

export default {
    name: 'hProgress',
    props: {
        color: {
            type: String,
            default: 'primary'
        },
        percent: {
            type: Number,
            default: 0
        },
        strokeWidth: {
            type: Number,
            default: 10
        }
    },
    data() {
        return {};
    },
    computed: {
        progressInnerStyle() {
            let s = {
                height: `${this.strokeWidth}px`
            };
            return s;
        },
        progressBgStyle() {
            let s = {
                width: `${this.percent}%`,
                height: `${this.strokeWidth}px`
            };
            !colors.includes(this.color) && (s['background-color'] = this.color);
            return s;
        },
        progressBgClass() {
            let s = {};
            colors.includes(this.color) && (s[`bg-${this.color}-color`] = true);
            return s;
        }
    }
};
</script>
