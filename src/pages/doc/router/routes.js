/**
*@file: router.js
*@author: afcfzf (9301462@qq.com)
*/
import {event} from '@/common/util.js';
import menuCfg from '../common/config/menu.json';
import loadBar from '@/plugins/loadingBar';
import demoMenu from '../demos/menu.json';

event.$on('begin-loading', () => loadBar.start());
event.$on('finish-loading', () => loadBar.success());
event.$on('error-loading', () => loadBar.fail());

const notifyLoad = p => {
    event.$emit('begin-loading');
    return p.then(({default: r}) => {
        event.$emit('finish-loading');
        return r.default || r;
    }).catch(e => {
        event.$emit('error-loading');
        console.error('错误信息：' + e.message);
    });
};

const docsChildrenRoute = [];

const getSubList = group => {
    let subList = [];
    group.subList && Object.keys(group.subList).forEach(key => {
        const item = group.subList[key];
        if (typeof item === 'string') {
            subList.push(key);
        }
        else {
            subList = subList.concat(getSubList(item));
        }
    });
    return subList;
};

Object.keys(menuCfg).forEach(name => {
    getSubList(menuCfg[name]).forEach(key => {
        docsChildrenRoute.push({
            path: key,
            component: () => notifyLoad(import(`../docs/${key}.md`))
        });
    });
});


// 获取demo页面的内容

const demoChildrenRoute = [];
console.log('demoMenu: ', demoMenu);
Object.keys(demoMenu).forEach(name => {
    getSubList(demoMenu[name]).forEach(key => {
        demoChildrenRoute.push({
            path: key,
            name: key,
            meta: {path: 'demos'},
            component: () => notifyLoad(import(`../demos/${key}.vue`))
        });
    });
});

export default [
    {
        path: '/docs',
        redirect: '/docs/introduction',
        component: () => notifyLoad(import('../components/docs/viewpoint.vue')),
        children: docsChildrenRoute
    },
    {
        path: '/demos',
        redirect: '/demos/page01',
        component: () => notifyLoad(import('../components/docs/demoViewPoint.vue')),
        children: demoChildrenRoute
    }
];
