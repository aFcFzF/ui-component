<template>
    <router-view></router-view>
</template>

<style lang="less">
@import '~@/themes/index.less';
@import '~highlight.js/styles/agate.css';
#app {
    width: 100%;
    height: 100%;
    background-color: #fff;

    .ov-hidden {
        overflow: hidden;
    }
}
</style>

<script>
export default {
    data() {
        return {
            oldPath: window.location.hash
        };
    },
    mounted() {
        // const docViewEle = document.body;
        // docViewEle.addEventListener('click', e => {
        //     let target = e.target;
        //     while (target && target.className !== 'anchor') {
        //         target = target.parentNode;
        //     }
        //     if (target) {
        //         e.preventDefault();
        //         this.scrollToHash(target.getAttribute('href'));
        //     }
        // });
    },
    watch: {
        // $route(to, from) {
        //     this.oldPath = `#${to.path}`;
        //     this.scrollToHash(to.hash);
        // }
    },
    methods: {
        // scrollToHash(hash) {
        //     const pattern = /#cube-(.*)-anchor/;
        //     let newUrl = '';
        //     let matcher = null;
        //     if (!hash) {
        //         matcher = window.location.hash.match(pattern);
        //         matcher && (hash = matcher[0]);
        //     }
        //     else {
        //         matcher = hash.match(pattern);
        //         newUrl = this.oldPath + hash;
        //         window.location.hash = newUrl;
        //         setTimeout(() => {
        //             const anchor = decodeURIComponent(matcher[1]);
        //             const el = document.querySelector(`#${anchor}`);
        //             el && el.scrollIntoView();
        //         });
        //     }
        // }
    }
};
</script>
