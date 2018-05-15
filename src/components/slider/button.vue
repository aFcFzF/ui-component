<template>
    <span
        class="el-slider__button-wrapper"
        @mouseenter="mouseEnterHandler"
        @mouseleave="mouseLeaveHandler"
        @mousedown.prevent="mouseDownHandler"
        :class="{
            'hover': hovering,
            'dragging': dragging
        }"
        ref="button"
    >
    </span>
</template>

<script>
    export default {
        data() {
            return {
                hovering: false,
                dragging: false,
                isClick: false, // isClick是啥？
                startX: 0,
                startY: 0,
                startPos: 0
            }
        },

        props: {
            value: {
                type: Number,
                default: 0
            },
            vertical: {
                type: Boolean,
                default: false
            }
        },

        computed: {
            min() {
                return this.$parent.min;
            },
            max() {
                return this.$parent.max;
            },
            step() {
                return this.$parent.step;
            }
        },

        methods: {
            mouseDownHandler(evt) {
                if (this.disabled) return;
                this.onDragStart(evt);
                const d = document;
                d.addEventListener('mousemove', this.onDragging);
                d.addEventListener('mouseup', this.onDragEnd);
            },

            onDragStart(evt) {
                this.dragging = true;
                this.isClick = true;
                this.vertical ? this.startY = evt.clientY : this.startX = evt.clientX;
            },

            onDragging(evt) {
                const {vertical, startX, startY, $parent} = this;
                const sliderSize = $parent.sliderSize;
                if (this.dragging) {
                    this.isClick = false;
                    let diff = 0;

                    if (vertical) {
                        const currY = event.clientY;
                        diff = (startY - currY) / sliderSize * 100;
                    } else {
                        const currX = event.clientX;
                        diff = (startX - currX) / sliderSize * 100;
                    }
                }
            },


        }
    }
</script>
