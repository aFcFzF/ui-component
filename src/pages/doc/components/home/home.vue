<template>
    <div class="home-page">
        <div class="navigator doc">
            <div class="navigator-wrapper">
                <router-link class="logo" to="/">
                    <img class="logo-icon" src="./img/logo.svg" alt="tiny-logo">
                    <span class="logo-caption">Tiny-UI</span>
                </router-link>
                <div class="tabs">
                    <router-link to="/docs" class="tab"><span>文档</span></router-link>
                    <router-link to="/example" class="tab"><span>组件</span></router-link>
                </div>
            </div>
        </div>
        <div class="router-view">
            <router-view></router-view>
        </div>
    </div>
</template>
<style lang="less">
html,
body {
    height: 100%;
}
.home-page {
    height: 100%;
    overflow: hidden;

    .navigator {
        height: 70px;
        line-height: 70px;
        background: #ffffff;
        min-width: 1200px;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 1;

        &.doc {
            box-shadow: 0 2px 2px #eee;
        }

        &-wrapper {
            // width: 1200px;
            // margin: 0 auto;
            padding: 0 30px;
            font-size: 0;

            .logo {
                display: inline-block;
                width: 300px;
                height: 70px;

                &-icon {
                    vertical-align: middle;
                    height: 60px;
                }

                &-caption {
                    font-size: 20px;
                    vertical-align: middle;
                    display: inline-block;
                    padding-left: 10px;
                    text-decoration: none;
                    color: #555;
                }
            }

            .tabs {
                float: right;
                font-size: 14px;

                .tab {
                    font-size: 18px;
                    text-decoration: none;
                    color: #555;
                    margin-left: 10px;
                    transition: color .3s;

                    &:hover {
                        color: #4C8EFF;
                    }

                    &.router-link-active {
                        color: #4C8EFF;
                        font-weight: 700;
                    }
                }
            }
        }
    }

    .router-view {
        // width: 1200px;
        // margin: 0 auto;
        // height: 100%;
        height: calc(~"100% - 70px");
        margin-top: 70px;
    }
}
</style>