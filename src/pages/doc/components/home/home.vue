<template>
    <div class="home-page">
        <div class="navigator doc">
            <div class="navigator-wrapper">
                <router-link class="logo" to="/">
                    <img class="logo-icon" src="./img/logo.png" alt="tiny-logo">
                </router-link>
                <div class="tabs">
                    <router-link to="/docs" class="tab"><span>文档</span></router-link>
                    <router-link to="/example" class="tab"><span>示例</span></router-link>
                </div>
            </div>
            <div class="router-view">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<style lang="stylus">
.home-page
    height 100%
    .navigator
        height 70px
        line-height 70px
        background #ffffff
        min-width 1200px

        &.doc
            box-shadow 0 2px 10px #eee
        &-wrapper
            width 1200px
            margin 0 auto
            font-size 0
            .logo
                width 300px
                height 70px
                &-icon
                    vertical-align middle

            .tabs
                float right
                font-size 14px
</style>