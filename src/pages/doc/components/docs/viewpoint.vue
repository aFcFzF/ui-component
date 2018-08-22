<template>
    <div class="doc-page">
        <p>我是viewpoint额</p>
        <!-- <Button>按钮</Button> -->
        <div class="component-list">
            <Menu :datas="menuList" className="ui-menu-white" @select="menuSelHdl"></Menu>
        </div>
        <div class="component-doc">
            <router-view></router-view>
        </div>
    </div>
</template>
<style lang="less">
.doc-page {
    .component-list {
        width: 200px;
        float: left;
        border-right: solid 1px #eee;
    }
    .component-doc {
        padding: 0 10px;
        overflow: hidden;
    }
}
</style>

<script>
import list from '@/pages/doc/common/config/menu.json';
const convertDts = o => Object.entries(o).map(([k, v]) => {
    const d = {
        title: v.name || k,
        key: k,
        disabled: v.disabled,
        open: v.open,
        emphasis: v.emphasis
    };
    let child = null;
    v.subList && (child = convertDts(v.subList));
    child && (d.children = child, d.open = true);
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
