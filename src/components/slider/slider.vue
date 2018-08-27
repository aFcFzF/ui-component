<template>
<div :class="sliderCls">
    <div class="ui-slider-container">
        <div class="ui-slider-line"></div>
        <div class="ui-slider-track" :style="trackStyle"></div>
        <div class="ui-slider-node ui-slider-start-node" @mousedown="mousedown('start', $event)" v-if="hasStart" :style="{'left': values.start + '%'}"></div>
        <div class="ui-slider-node ui-slider-end-node" @mousedown="mousedown('end', $event)" :style="{'left': values.end + '%'}"></div>
        <span class="ui-slider-end-node-value ui-tooltip-inner-content" v-if="showtip">{{showContent(values.end)}}</span>
        <span class="ui-slider-start-node-value ui-tooltip-inner-content" v-if="showtip&&hasStart">{{showContent(values.start)}}</span>
    </div>
</div>
</template>

<script>
import utils from '../../utils/utils';
import Tooltip from '../../plugins/tooltip';

const prefix = 'ui-slider';

export default {
    props: {
        readonly: {
            type: Boolean,
            default: false
        },
        step: {
            type: Number,
            default: 1
        },
        value: {
            type: [Number, Object],
            default: 0
        },
        show: Function,
        multiple: {
            type: Boolean,
            default: false
        },
        showtip: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            eventControl: {
                type: null,
                x: null,
                init: null
            },
            tooltip: {
                start: null,
                end: null
            }
        };
    },
    mounted() {
        this.$nextTick(() => {
            if (!this.showtip) {
                return;
            }
            if (this.hasStart) {
                let startNode = this.$el.querySelector('.ui-slider-start-node');
                this.tooltip.start = new Tooltip(startNode, {
                    content: this.$el.querySelector('.ui-slider-start-node-value'),
                    theme: this.theme,
                    html: true,
                    trigger: 'manual hover',
                    container: document.body,
                    placement: this.placement
                });
            }
            let endNode = this.$el.querySelector('.ui-slider-end-node');
            this.tooltip.end = new Tooltip(endNode, {
                content: this.$el.querySelector('.ui-slider-end-node-value'),
                theme: this.theme,
                html: true,
                trigger: 'manual hover',
                container: document.body,
                placement: this.placement
            });
        });
    },
    methods: {
        showContent(value) {
            return this.show ? this.show.call(null, value) : (value || 0);
        },
        mousedown(type, event) {
            if (this.readonly) {
                return;
            }
            utils.addClass(event.target, 'ui-slider-node-dragging');
            this.eventControl.type = type;
            this.eventControl.x = event.clientX;
            this.eventControl.init = this.values[type];
            document.body.addEventListener('mousemove', this.mousemove);
            document.body.addEventListener('mouseup', this.mouseup);
            this.tooltip[type] && this.tooltip[type].show();
        },
        mousemove(event) {
            if (this.readonly) {
                return;
            }
            let postition = event.clientX - this.eventControl.x;
            if (postition === 0) {
                return;
            }
            let nowPosition = parseInt(
                postition / this.$el.querySelector('.ui-slider-line').clientWidth * 100,
                10
            );
            nowPosition = this.eventControl.init + nowPosition;
            let positionStep = nowPosition % this.step;
            positionStep !== 0 && (nowPosition = nowPosition - positionStep);
            nowPosition = Math.max(nowPosition, 0);
            nowPosition = Math.min(nowPosition, 100);
            let nowValue = null;
            let type = this.eventControl.type;
            if (!this.hasStart) {
                nowValue = nowPosition;
                this.$emit('input', nowValue);
                type = 'end';
            }
            else {
                nowValue = {};
                if (this.values.start > nowPosition && type === 'end') {
                    type = 'start';
                    nowValue = utils.extend(this.values, {
                        start: nowPosition,
                        end: this.values.start
                    });
                }
                else if (this.values.end < nowPosition && type === 'start') {
                    type = 'end';
                    nowValue = utils.extend(this.values, {
                        start: this.values.end,
                        end: nowPosition
                    });
                }
                else {
                    nowValue = utils.extend(this.values, {
                        [type]: nowPosition
                    });
                }
            }

            if (this.eventControl.type !== type) {
                utils.removeClass(
                    this.$el.querySelector('.ui-slider-node-dragging'),
                    'ui-slider-node-dragging'
                );
                utils.addClass(
                    this.$el.querySelector(`.ui-slider-${type}-node`),
                    'ui-slider-node-dragging'
                );
                if (this.tooltip[this.eventControl.type]) {
                    this.tooltip[this.eventControl.type].hide();
                }
                this.eventControl.type = type;
            }

            this.$emit('input', nowValue);
            let evt = document.createEvent('CustomEvent');
            evt.initCustomEvent('setvalue', true, true, nowValue);
            this.$el.dispatchEvent(evt);
            if (this.tooltip[type]) {
                this.tooltip[type].show();
                this.tooltip[type].update();
            }
        },
        mouseup() {
            if (this.readonly) {
                return;
            }
            document.body.removeEventListener('mousemove', this.mousemove);
            document.body.removeEventListener('mouseup', this.mouseup);
            utils.removeClass(
                this.$el.querySelector('.ui-slider-node-dragging'),
                'ui-slider-node-dragging'
            );
            let type = this.eventControl.type;
            if (this.tooltip[type]) {
                this.tooltip[type].hide();
            }
        }
    },
    computed: {
        hasStart() {
            return this.multiple;
        },
        trackStyle() {
            return {
                left: `${this.values.start}%`,
                right: `${100 - this.values.end}%`
            };
        },
        values() {
            if (!this.multiple) {
                return {
                    start: 0,
                    end: this.value || 0
                };
            }
            return utils.extend({
                    start: 0,
                    end: 0
                },
                this.value
            );
        },
        sliderCls() {
            return {
                [`${prefix}`]: true
            };
        }
    }
};
</script>
