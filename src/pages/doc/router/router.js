/**
*@file: router.js
*@author: afcfzf (9301462@qq.com)
*/
import {event} from '@/common/util.js';
import menuCfg from '../common/config/menu.json';

const routeMap = {};

console.log(menuCfg)
// 要解析成
// [
//     {
//         path: '/',
//         component: Xxx,
//         children: [
//             {

//             }
//         ]
//     }
// ]
// Object.keys(menuCfg).forEach(section => {
//     const notifyLoad = p => {
//         event.$emit('begin-loading');
//         return p.then(mod => (event.$emit('finish-loading'), mod));
//     };
//     const childRouter = [];
//     const docsRoute = {
//         path: 'docs',
//         redirect: './docs/introduction',
//         component: () => notifyLoad(import('../components/docs/viewpoint.vue'))
//     };

// });