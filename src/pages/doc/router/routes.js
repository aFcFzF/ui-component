/**
*@file: router.js
*@author: afcfzf (9301462@qq.com)
*/
import {event} from '@/common/util.js';
import menuCfg from '../common/config/menu.json';
import loadBar from '@/plugins/loadingBar';

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

export default [
    {
        path: '/docs',
        redirect: '/docs/introduction',
        component: () => notifyLoad(import('../components/docs/viewpoint.vue')),
        children: docsChildrenRoute
    }
];
