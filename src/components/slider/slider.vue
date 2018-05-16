<template>
  <div class="slider"
    ref="container"
    :class="[
        size && `slider-size-${size}`,
        {
            'is-disabled': disabled
        }
    ]"
  >
      <div class="line" @click ="clkHandler">
        <div class="progress" :style="{width: tmpValue + '%'}"></div>
      </div>
      <span class="btn"
        ref="btn"
        :style="{left: tmpValue + '%'}"
        @mousedown="mouseHandler"
       >
       </span>
  </div>
</template>

<style lang="less">
    .slider {
        height: 30px;
        line-height: 30px;
        width: 100%;
        position: relative;
        user-select: none;
        margin: 0 10px;

        &&-size-medium {
            .line, .progress {
                height: 9px;
            }
            .btn {
                height: 18px;
            }
        }

        &&-size-small {
            .line, .progress {
                height: 6px;
            }
            .btn {
                height: 16px;
            }
        }

        &&-size-mini {
            .line, .progress {
                height: 3px;
            }
            .btn {
                height: 14px;
            }
        }

        &.is-disabled {
            .progress {
                background-color: #d5d6d8;
            }
            .btn {
                cursor: not-allowed;
                border-color: #eee;
            }
        }

        .line, .progress {
            background-color: #E4E7ED;
            border-radius: 25px;
            height: 14px;
            position: absolute;
            top: 50%;
            left: 0;
            width: 100%;
            transform: translateY(-50%);
            box-sizing: border-box;
            user-select: none;
            cursor: pointer;
        }

        .progress {
            background-color: #3388FF;
            z-index: 1;
        }

        .btn {
            position: absolute;
            left: 0px;
            top: 50%;
            height: 24px;
            width: 14px;
            background: #F3F8FF;
            cursor: pointer;
            border: solid 1px #3388FF;
            border-radius: 25px;
            user-select: none;
            transform: translate(-50%, -50%);
            z-index: 2;
            text-align: center;
        }

    }
</style>

<script>
    import SliderBtn from  '../button/button';

    export default {
        mounted() {
            const btn = this.btn = this.$refs.btn;
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
            formatValue: Function,
            size: String
        },

        watch: {
            tmpValue(oldVal, val) {
                console.log('监控的值是: ', oldVal, val);
            }
        },

        created() {
            const initEvt = _ => {
                document.addEventListener('mousemove', evt => {
                const {down, btn, btnOffsetX, startX, containerWidth} = this;
                if (down !== true) return null;
                const moveX = (evt || w.event).clientX; // 鼠标移动时候的x轴坐标
                const to = btnOffsetX + (moveX - startX); // 按钮相对于父元素的X轴坐标 + （目前移动的X轴坐标 - 初始x轴坐标）
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
            },

            clkHandler(evt) {
                !this.disabled && (this.tmpValue = Math.round(evt.offsetX / this.containerWidth * 100));
            }
        }
    }
</script>
