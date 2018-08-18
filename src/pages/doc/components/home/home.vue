<template>
    <div class="home-page">
        <div class="navigator doc">
            <div class="navigator-wrapper">
                <router-link class="logo" to="/">
                    <img class="logo-icon" src="./img/logo.png" alt="tiny-logo">
                </router-link>
            </div>
            <div class="tabs">
                <i></i>
                <slot name="nav"></slot>
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
</style>


