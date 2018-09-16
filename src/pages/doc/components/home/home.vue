<template>
    <div class="home-page" :class="currentPage">
        <div class="navigator doc">
            <div class="navigator-wrapper">
                <router-link class="logo" to="/">
                    <img class="logo-icon" src="./img/logo.svg" alt="tiny-logo">
                    <span class="logo-caption">Tiny-UI</span>
                </router-link>
                <div class="tabs">
                    <router-link to="/docs/introduction" class="tab"><i class="ui-icon-edit"/><span>文档</span></router-link>
                    <router-link to="/docs/button" class="tab"><i class="ui-icon-calendar"/><span>组件</span></router-link>
                    <router-link to="/demos" class="tab"><i class="ui-icon-star-on"/><span>例子</span></router-link>
                </div>
            </div>
        </div>
        <div class="router-view">
            <transition name="component-fade" mode="out-in">
                <router-view></router-view>
            </transition>
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

    &.demos {
        .navigator.doc {
            box-shadow: none;
        }
    }

    .navigator {
        height: 70px;
        line-height: 70px;
        background: @white-color;
        // min-width: 1200px;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 2;

        &.doc {
            box-shadow: 0 2px 2px @split-color;
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
                    color: @secondary-color;
                }
            }

            .tabs {
                float: right;
                font-size: 14px;

                .tab {
                    font-size: 18px;
                    text-decoration: none;
                    color: @secondary-color;
                    margin-left: 20px;
                    transition: color .3s;

                    > span,
                    > i {
                        vertical-align: middle;
                    }

                    > span {
                        padding-left: 5px;
                    }

                    &:hover {
                        color: @primary-color;
                    }

                    &.router-link-active {
                        color: @primary-color;
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

<script>
export default {
    computed: {
        currentPage() {
            return {
                'demos': this.$route.meta.path && this.$route.meta.path === 'demos'
            };
        }
    }
};
</script>
