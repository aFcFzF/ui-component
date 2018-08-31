<template>
    <div :class="showCls">
        <slot></slot>
        <div class="ui-tooltip-inner-content">{{content}}<slot name="content"></slot></div>
    </div>
</template>
<script>
import Tooltip from '../../plugins/tooltip';

const prefix = 'ui-tooltip';

export default {
    props: {
        trigger: {
            type: String, // click or hover
            default: 'hover'
        },
        content: String,
        placement: {
            type: String,
            default: 'top'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        className: {
            type: String
        },
        theme: String,
        delay: {
            type: Number,
            default: 0
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        show() {
            this.tooltip && this.tooltip.show();
        },
        hide() {
            this.tooltip && this.tooltip.hide();
        },
        update() {
            this.tooltip && this.tooltip.update();
        },
        init() {
            this.$nextTick(() => {
                let el = this.$el;
                let content = this.$el.querySelector('.ui-tooltip-inner-content');
                this.tooltip = new Tooltip(el, {
                    content,
                    theme: this.theme,
                    html: true,
                    trigger: this.trigger,
                    className: this.className,
                    container: document.body,
                    placement: this.placement,
                    disabled: this.disabled,
                    delay: this.delay,
                    events: {
                        show: () => this.$emit('show'),
                        hide: () => this.$emit('hide')
                    }
                });
            });
        }
    },
    watch: {
        disabled() {
            if (!this.tooltip) {
                return;
            }
            // disabled 切换时应该立刻显示
            !this.disabled ? (this.tooltip.enabled(), this.show()) : (this.tooltip.disabled(), this.hide());
        },
        content() {
            if (!this.tooltip) {
                return;
            }
            this.tooltip.update();
        }
    },
    computed: {
        tooltipCls() {
            return {
                [`${prefix}`]: true
            };
        },
        showCls() {
            return {
                [`${prefix}-show`]: true
            };
        },
        groupCls() {
            return {
                [`${prefix}`]: true
            };
        }
    }
};
</script>