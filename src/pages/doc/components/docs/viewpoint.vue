<template>
    <div class="doc-page">
        <!-- <p>我是viewpoint额</p> -->
        <!-- <Button>按钮</Button> -->
        <div class="component-list">
            <ui-menu :datas="menuList" className="ui-menu-white" @select="menuSelHdl"></ui-menu>
        </div>
        <div class="component-doc">
            <router-view></router-view>
        </div>
    </div>
</template>
<style lang="less">
.doc-page {
    margin-top: 50px;
    .component-list {
        width: 200px;
        float: left;
        border-right: solid 1px #eee;
    }
    .component-doc {
        padding: 0 40px;
        overflow: hidden;

        h3 {
            margin: 55px 0 20px;
        }

        table {
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

        ul:not(.timeline) {
            margin: 10px 0;
            padding: 0 0 0 20px;
            font-size: 14px;
            color: #5e6d82;
            line-height: 2em;
        }
  }
}
</style>

<script>
import list from '@/pages/doc/common/config/menu.json';
const convertDts = o =>
Object.entries(o).map(([k, v]) => {
    const d = {
        title: v.name || k,
        key: k,
        disabled: v.disabled,
        open: v.open,
        emphasis: v.emphasis
    };
    let child = null;
    v.subList && (child = convertDts(v.subList));
    child && ((d.children = child), (d.open = true));
    return d;
});
const menuList = convertDts(list);

export default {
    data() {
        return {
            menuList
            // menuList: [{
            //     title: '收藏',
            //     key: 'favor',
            //     icon: 'ui-icon-star',
            //     count: 20,
            //     open: true,
            //     children: [
            //         {
            //             title: '类型-1',
            //             count: 100,
            //             key: '2-1'
            //         },
            //         {
            //             title: '类型-2',
            //             key: '3-2',
            //             open: true,
            //             disabled: true,
            //             children: [
            //                 {
            //                     title: '类型-2-3',
            //                     key: '2-3'
            //                 },
            //                 {
            //                     title: '类型-2-4',
            //                     key: '3-4'
            //                 }
            //             ]
            //         }
            //     ]
            // }]
        };
    },
    methods: {
        menuSelHdl(e) {
            this.$router.push(e.key);
        }
    }
};
</script>
