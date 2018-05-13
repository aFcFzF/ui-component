<template>
  <div class="slider" ref="container">
      <div class="line"></div>
      <span class="btn" ref="btn" @mousedown="mouseHandler"></span>
  </div>
</template>

<style lang="less">
    .slider {
        height: 30px;
        line-height: 30px;
        width: 100%;
        position: relative;
        user-select: none;
        .line {
            border: solid 3px #999;
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
        .btn {
            position: absolute;
            left: 0px;
            display: inline-block;
            height: 24px;
            width: 24px;
            background: #f1f1f1;
            cursor: pointer;
            border: solid 3px #10e;
            vertical-align: middle;
            user-select: none;
            transform: translateX(-50%) scale(0.9);
            &:hover {
                transform: translateX(-50%) ;
            }
        }
    }
</style>

<script>
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
                btn: null // 按钮dom
            }
        },

        created() {

            document.addEventListener('mousemove', evt => {
                const {down, btn, btnOffsetX, startX, containerWidth} = this;
                if (down !== true) return null;
                const screenX = (evt || w.event).clientX; // 鼠标移动时候的x轴坐标
                const to = btnOffsetX + (screenX - startX); // 按钮相对于父元素的X轴坐标 + （目前移动的X轴坐标 - 初始x轴坐标）
                const toPercent = (to / containerWidth).toFixed(2) * 100;
                toPercent >= 0 && toPercent <= 100 && !(toPercent % 10) && (btn.style.left = toPercent + '%');
            });

            document.addEventListener('mouseup', evt => {
                this.down = false;
            });
        },

        methods: {
            mouseHandler(evt) {
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
