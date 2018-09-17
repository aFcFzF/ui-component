<template>
    <div class="doc-page">
        <!-- <div class="component-list" > -->
            <!-- <ui-scrollbar style="height: 100%">
                <ui-menu ref="sideList" :datas="menuList" className="ui-menu-white" @select="menuSelHdl"></ui-menu>
            </ui-scrollbar> -->
        <!-- </div> -->
        <div class="demo-page">
            <header class="tab-card">
                <ui-tabs v-model="activeVal" @click="menuSelHdl" :datas="tabs1" class-name="ui-tabs-card"></ui-tabs>
            </header>
            <article class="tab-content">
                <setting-bar></setting-bar>
                <ui-scrollbar style="height: 100%;">
                    <transition name="component-fade" mode="out-in">
                        <router-view class="comp-section"></router-view>
                    </transition>
                    <div class="footer-info">
                        © 2017-2018 SAU. All Rights Reserved.
                    </div>
                </ui-scrollbar>
            </article>
        </div>
    </div>
</template>
<style lang="less">
.home-page.demos {
    .doc-page {
        position:relative;
        .side-toolbar {
            position: absolute;
            z-index: 1;
        }
    }
}


.doc-page {
    height: 100%;
    .tab-card {
        padding-top: 10px;
        background: @white-color;
    }
    .tab-content {
        height: calc(~"100% - 44px");
    }

    .demo-page {
        height: 100%;
        overflow: hidden;
        background: @split-color;

        .side-toolbar {
            background: transparent;
            transition: background .5s ease-in-out;
            &:hover {
                // background: @white-color;
                background: rgba(255, 255, 255, .8);
            }
            &.open {
                background: @white-color;
                position: relative;
                background: rgba(255, 255, 255, 1);
            }
        }

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
            padding: 60px;
            text-align: center;
            width: 100%;
            overflow: hidden;
        }
  }
}
</style>

<script>
import list from '@/pages/doc/demos/menu.json';
import SettingBar from './settingBar';
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
console.log(menuList);

export default {
    data() {
        return {
            menuList,
            hgt: 0,
            tabs1: [
                {label: '测试页面1', value: 'page01'},
                {label: '测试页面2', value: 'page02'}
            ],
            activeVal: 'page01'
        };
    },
    methods: {
        menuSelHdl(e) {
            this.$router.push(this.activeVal);
        }
    },
    beforeRouteUpdate(to, from, next) {
        const m = to.path.match(/\/docs\/(\w+)/);
        const compName = m && m[1];
        const sideList = this.$refs.sideList;
        sideList && sideList.status.selected !== compName && sideList.select(compName);
        next();
    },
    components: {
        SettingBar
    }
};
</script>
