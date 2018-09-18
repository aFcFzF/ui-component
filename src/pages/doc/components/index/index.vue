<template>
    <ui-scrollbar style="height: 100%">
        <div class="index-page">
            <h1 class="index-title">网页表单成型工具</h1>
            <p class="title-desc">Tiny-UI,一套专注于OA系统的mvvm组件库</p>
            <div :class="['demo-group', {'demo-play': play}]" @click="playHdl">
                <img class="demo-play" src="./img/play-blue.svg" alt="播放图标">
                <img class="form-img" src="./img/form.png" alt="form-img">
                <div class="vdo">
                    <ui-video :sources="video.sources" :options="video.options" ref="vdo"/>
                </div>
            </div>
            <h1 class="feature-title">组件特性</h1>
            <div class="feature-section">
                <div class="item item-easy">
                    <img class="item-icon" src="./img/tiny.svg">
                    <div class="item-desc">
                        <p class="caption">轻量易用</p>
                        <p class="detail">Tiny</p>
                    </div>
                </div>
                <div class="item item-efficiency">
                    <img class="item-icon" src="./img/efficiency.svg">
                    <div class="item-desc">
                        <p class="caption">直观高效</p>
                        <p class="detail">Efficiency</p>
                    </div>
                </div>
                <div class="item item-consistency">
                    <img class="item-icon" src="./img/consistency.svg">
                    <div class="item-desc">
                        <p class="caption">一致体验</p>
                        <p class="detail">Consistency</p>
                    </div>
                </div>
                <div class="item item-controllablity">
                    <img class="item-icon" src="./img/controllablity.svg">
                    <div class="item-desc">
                        <p class="caption">结果可控</p>
                        <p class="detail">Controllablity</p>
                    </div>
                </div>
            </div>
            <div class="footer-info">
                © 2017-2018 SAU. All Rights Reserved.
            </div>
        </div>
    </ui-scrollbar>
</template>
<style lang="less">
.index-page {
    text-align: center;
    margin-top: 70px;

    .index-title {
        color: @secondary-color;
    }

    .title-desc {
        color: @describe-color;
        line-height: 18px;
        font-size: 18px;
        margin-bottom: 60px;
    }

    .demo-group {
        width: 900px;
        margin: 0 auto;
        position: relative;
        cursor: pointer;

        .demo-play {
            position: absolute;
            left: 50%;
            top: 50%;
            width: 0;
            height: 0;
            transform: translate(-50%, -50%);
            z-index: 3;
            opacity: 0;
            transition: all .3s;
        }

        &:hover {
            .demo-play {
                height: 100px;
                width: 100px;
                opacity: 1;
            }

            .form-img {
                filter: brightness(.3);
            }
        }

        &.demo-play {
            @keyframes playAni {
                form {
                    transform: scale(.7);
                }
                to {
                    transform: scale(3);
                    opacity: 0;
                    z-index: -1;
                }
            }

            .demo-play {
                height: 100px;
                width: 100px;
                opacity: 0;
            }

            .form-img {
                animation: .6s playAni forwards;
            }
        }

        .form-img {
            width: 100%;
            position: relative;
            z-index: 2;
            filter: brightness(1);
            transition: filter .3s;
        }

        .vdo {
            background: url(./img/bg.png) center no-repeat;
            background-size: contain;
            text-align: center;
            width: 900px;
            height: 506px;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 0;
            #app {
                width: 772px;
                display: inline-block;
                height: 433px;
                position: absolute;
                top: 49px;
                left: 59px;
                border-radius: 5px;
                overflow: hidden;
            }
        }
    }

    .feature-title {
        margin-top: 120px;
        margin-bottom: 50px;
        color: @secondary-color;
    }

    .feature-section {
        display: flex;
        justify-content: space-around;

        .item {
            &-icon {
                width: 128px;
            }

            &-desc {
                .caption {
                    font-size: 20px;
                    line-height: 30px;
                }
            }
        }
    }
}
</style>

<script>
import Video from 'vue-video';
import mp4 from '../../common/movie/demo.mp4';

export default {
    components: {
        uiVideo: Video
    },
    data() {
        return {
            video: {
                sources: [{
                    src: mp4,
                    type: 'video/mp4'
                }],
                options: {
                    autoplay: false,
                    volume: 1
                    // poster: 'http://covteam.u.qiniudn.com/poster.png'
                }
            },
            play: false
        };
    },
    methods: {
        playHdl() {
            this.play = true;
            this.$refs.vdo.play();
        }
    }
};
</script>

