<template>
  <div class="slider">
      <div class="line"></div>
      <span class="block" ref="block" @mousedown.stop="mouseHandler"></span>
  </div>
</template>

<style lang="less">
    .slider {
        height: 30px;
        line-height: 30px;
        width: 300px;
        position: relative;
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
        }
        .block {
            position: absolute;
            left: 0px;
            display: inline-block;
            height: 24px;
            width: 24px;
            background: #f1f1f1;
            cursor: pointer;
            border: solid 3px #10e;
            vertical-align: middle;
        }
    }
</style>

<script>
    let start = 0, down = false, left = 0, block = null, w = window, screenX = 0;
    export default {
        mounted() {
            block = this.$refs.block;
        },

        created() {
            document.addEventListener('mousemove', evt => {
                if (down !== true) return null;
                screenX = (evt || w.event).clientX;
                block.style.left = left + (screenX - start)+ 'px';
                console.log('移动。。')
            });

            document.addEventListener('mouseup', evt => {
                down = false;
                console.log('鼠标弹起了')
            });

            console.log('created', block);
        },

        methods: {
            mouseHandler(evt) {
                switch(evt.type) {
                    case 'mousedown' :
                        start = evt.clientX;
                        left = block.offsetLeft;
                        down = true;
                        console.log('鼠标按下')
                    break;
                    case 'default' :
                    break;
                }
                // switch(evt.type) {
                //     case 'mousedown' :
                //         start = evt.clientX;
                //         left = block.offsetLeft;
                //         down = true;
                //         console.log('mousedown', evt);
                //     break;
                //     case 'mousemove' :
                //         if (!down) return;
                //         const offsetX = evt.offsetX - start; // 这是鼠标移动的距离
                //         console.log('鼠标移动的距离： ', offsetX)
                //         block.style.left = left + offsetX + 'px';
                //     break;
                //     case 'mouseup' :
                //         down = false;
                //         console.log('鼠标弹起了')
                //     break;
                //     case 'mouseleave' :
                //         down = false;
                //     break;
                //     default:
                //     break;
                // }


            }
        }
    }
</script>
