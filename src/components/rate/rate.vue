<template>
    <div class="ui-rate" :readonly="readonly" @mouseleave="mouseleave()">
        <span v-for="n of count" @click="setvalue(n)" :class="starCls(n)" @mouseover="mouseover(n)" :key="'_' + n">
            <i :class="icon ? icon : 'ui-icon-star-on'"></i>
        </span>
        <span v-if="showText.length" class="ui-rate-value">
            {{showText[0] ? showText[0] : ''}}{{value}}{{showText[1] ? showText[1] : ''}}
        </span>
    </div>
</template>
<script>
export default {
    props: {
        readonly: {
            type: Boolean,
            default: false
        },
        showText: {
            type: Array,
            default: () => []
        },
        value: {
            type: [String, Number],
            default: 0
        },
        icon: {
            type: String,
            default: ''
        },
        count: {
            type: Number,
            default: 5
        }
    },
    data() {
        return {
            mouseValue: false
        };
    },
    methods: {
        setvalue(value) {
            if (this.readonly) {
                return;
            }
            this.$emit('input', value);
            let event = document.createEvent('CustomEvent');
            event.initCustomEvent('setvalue', true, true, value);
            this.$el.dispatchEvent(event);
        },
        mouseover(n) {
            if (this.readonly) {
                return;
            }
            this.mouseValue = n;
        },
        mouseleave() {
            if (this.readonly) {
                return;
            }
            this.mouseValue = false;
        },
        starCls(n) {
            let v = this.mouseValue || Number(this.value);
            return {
                'ui-rate-on': v >= n,
                'ui-rate-off': v < n
            };
        }
    },
    filters: {
        isInclude(key, value) {
            return value.includes(key);
        }
    }
};
</script>
