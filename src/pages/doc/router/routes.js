/**
*@file: router.js
*@author: afcfzf (9301462@qq.com)
*/
import {event} from '@/common/util.js';
import menuCfg from '../common/config/menu.json';
import('../components/docs/viewpoint.vue').then(mod => console.log(mod));

event.$on('begin-loading', () => console.log('哈哈哈哈哈'));
event.$on('finish-loading', () => console.log('结束了'));
const notifyLoad = p => {
    event.$emit('begin-loading');
    return p.then(({default: r}) => {
        event.$emit('finish-loading');
        return r.default || r;
    });
};

const docsChildrenRoute = [];

const getSubList = group => {
    let subList = [];
    Object.keys(group.subList).forEach(key => {
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

export default {
    path: '/docs',
    redirect: '/docs/introduction',
    component: () => notifyLoad(import('../components/docs/viewpoint.vue')),
    children: docsChildrenRoute
};
