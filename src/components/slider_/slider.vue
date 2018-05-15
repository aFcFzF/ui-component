<template>
  <div class="slider"
    ref="container"
    :class="{
        'is-disabled': disabled
    }"
  >
      <div class="line"></div>
      <div class="progress" :style="{width: tmpValue + '%'}"></div>
      <span class="btn" ref="btn" :style="{left: tmpValue + '%'}" @mousedown="mouseHandler"></span>
  </div>
</template>

<style lang="less">
    .slider {
        height: 30px;
        line-height: 30px;
        width: 100%;
        position: relative;
        user-select: none;
        &.is-disabled {
            .progress {
                border-color: #d5d6d8;
            }
            .btn {
                cursor: not-allowed;
                border-color: #eee;
            }
        }
        .line, .progress {
            border: solid 3px #E4E7ED;
            border-radius: 3px;
            height:0;
            position: absolute;
            top: 50%;
            left: 0;
            width: 100%;
            transform: translateY(-50%);
            box-sizing: border-box;
            user-select: none;
        }
        .progress {
            border-color: #3388FF;
            z-index: 1;
        }
        .btn {
            position: absolute;
            left: 0px;
            display: inline-block;
            height: 24px;
            line-height: 26px;
            width: 14px;
            background: #F3F8FF;
            cursor: pointer;
            border: solid 1px #3388FF;
            border-radius: 25px;
            vertical-align: middle;
            user-select: none;
            transform: translateX(-50%);
            z-index: 2;
            text-align: center;
        }
    }
</style>

<script>
    import SliderBtn from  '../button/button';

    export default {
        mounted() {
            this.btn = this.$refs.btn;
            this.containerWidth = this.$refs.container.clientWidth;
        },

        data() {
            return {
                containerWidth: 0,
                startX: 0, // 初始点击位置
                down: false, // 是否按下
                btnOffsetX: 0, // 按钮目前所处的位置
                btn: null, // 按钮dom
                oldValue: 0,
            }
        },

        props: {
            disabled: Boolean,
            value: {
                type: Number,
                default: 0
            },
            max: {
                type: Number,
                default: 100
            },
            min: {
                type: Number,
                default: 0
            },
            formatValue: Function
        },

        created() {
            const initEvt = _ => {
                document.addEventListener('mousemove', evt => {
                const {down, btn, btnOffsetX, startX, containerWidth} = this;
                if (down !== true) return null;
                const screenX = (evt || w.event).clientX; // 鼠标移动时候的x轴坐标
                const to = btnOffsetX + (screenX - startX); // 按钮相对于父元素的X轴坐标 + （目前移动的X轴坐标 - 初始x轴坐标）
                this.tmpValue = Math.round(to / containerWidth * 100); // 1次1像素。
                // 放在这会卡顿。所以还是放在computed里面了
                // if (toPercent >= 0 && toPercent <= 100) {
                //     this.value = toPercent;
                // }
                });

                document.addEventListener('mouseup', evt => {
                    this.down = false;
                });
            }

            !this.disabled && initEvt();
        },

        computed: {
            tmpValue: {
                get() {
                    return this.value;
                },

                set(val) {
                    let r = val;
                    const {max, min} = this;
                    r >= max && (r = max);
                    r <= min && (r = min);
                    if (this.oldValue === r) return null;
                    this.$emit('input', r);
                    this.$emit('change', r);
                    this.oldValue = r;
                }
            },
            enableFormat() {
                return typeof this.formatValue === 'function';
            }
        },

        methods: {
            mouseHandler(evt) {
                if (this.disabled) return false;
                switch(evt.type) {
                    case 'mousedown' :
                        this.startX = evt.clientX;
                        this.btnOffsetX = this.btn.offsetLeft;
                        this.down = true;
                    break;
                    case 'default' :
                    break;
                }
            }
        }
    }
</script>
