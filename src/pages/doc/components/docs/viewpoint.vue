<template>
    <div class="doc-page">
        <div class="component-list" >
            <ui-scrollbar style="height: 100%">
                <ui-menu ref="sideList" :datas="menuList" className="ui-menu-white" @select="menuSelHdl"></ui-menu>
            </ui-scrollbar>
        </div>
        <div class="component-doc">
            <ui-scrollbar style="height: 100%">
                <transition name="component-fade" mode="out-in">
                    <router-view class="comp-section"></router-view>
                </transition>
                <div class="footer-info">
                    © 2017-2018 SAU. All Rights Reserved.
                </div>
            </ui-scrollbar>
        </div>
    </div>
</template>
<style lang="less">
.doc-page {
    height: 100%;
    .component-list {
        width: 300px;
        float: left;
        border-right: solid 1px #eee;
        height: 100%;
        // padding-bottom: 120px;
        .ui-scrollbar__bar {
            &.is-vertical {
                right: 0;
            }
        }

        .ui-menu {
            padding-top: 40px;
            padding-bottom: 100px;
        }
    }
    .component-doc {
        height: 100%;
        overflow: hidden;
        .comp-section {
            padding: 0 40px;
            margin-top: 40px;
        }

        h3 {
            margin: 55px 0 20px;
        }

        .table {
            border-collapse: collapse;
            width: 100%;
            background-color: #fff;
            font-size: 14px;
            margin-bottom: 45px;
            line-height: 1.5em;

            strong {
                font-weight: normal;
            }

            td,
            th {
                border-bottom: 1px solid #d8d8d8;
                padding: 15px;
                max-width: 250px;
            }

            th {
                text-align: left;
                white-space: nowrap;
                color: #333;
                font-weight: 700;
                background: #eee;
            }

            td {
                color: #333;
            }

            th:first-child,
            td:first-child {
                padding-left: 10px;
            }
        }

        .tip {
            padding: 8px 16px;
            background-color: #f9f9f9;
            border-left: 4px solid #457EFF;
            margin: 20px 0;
        }

        > ul:not(.timeline) {
            margin: 10px 0;
            padding: 0 0 0 20px;
            font-size: 14px;
            color: #5e6d82;
            line-height: 2em;
        }

        .component-fade-enter-active,
        .component-fade-leave-active {
            transition: opacity .1s ease;
        }

        .component-fade-enter,
        .component-fade-leave-to
        {
            opacity: 0;
        }

        .footer-info {
            padding: 80px;
            text-align: center;
            width: 100%
        }
  }
}
</style>

<script>
import list from '@/pages/doc/common/config/menu.json';
const convertDts = o =>
Object.entries(o).map(([k, v]) => {
    const d = {
        title: v.name || v,
        key: k,
        disabled: v.disabled,
        open: v.open,
        emphasis: v.emphasis,
        icon: v.icon
    };
    let child = null;
    v.subList && (child = convertDts(v.subList));
    child && ((d.children = child), (d.open = true));
    return d;
});
const menuList = convertDts(list);
let binded = false;


export default {
    data() {
        return {
            menuList,
            hgt: 0
        };
    },
    methods: {
        menuSelHdl(e) {
            this.$router.push(e.key);
        }
    },
    beforeRouteUpdate(to, from, next) {
        const m = to.path.match(/\/docs\/(\w+)/);
        const compName = m && m[1];
        const sideList = this.$refs.sideList;
        sideList && sideList.status.selected !== compName && sideList.select(compName);
        next();
    },
    // mounted() {
    //     const listenHeight = _ => {
    //         console.log('mounted!');
    //         binded = true;
    //         let timer = null;
    //         const getHgt = _ => {
    //             this.hgt = window.innerHeight;
    //             this.$nextTick(_ => console.log('获取了高度', this.hgt));
    //         };
    //         getHgt();
    //         window.addEventListener('resize', _ => {
    //             clearTimeout(timer);
    //             timer = setTimeout(getHgt, 500);
    //         });
    //     };
    //     !binded && listenHeight();
    // },
    // computed: {
    //     hgtSyl() {
    //         console.log('哈哈计算了');
    //         return this.hgt ? `height: ${this.hgt}px` : '';
    //     }
    // }
};
</script>
