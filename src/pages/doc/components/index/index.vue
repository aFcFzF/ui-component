<template>
    <ui-scrollbar style="height: 100%">
        <div class="index-page">
            <h1 class="index-title">网页表单成型工具</h1>
            <p class="title-desc">Tiny-UI,一套专注于OA系统的mvvm组件库</p>
            <div class="img-group">
                <img class="form-img" src="./img/form.png" alt="form-img">
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

    .form-img {
        width: 900px;
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

