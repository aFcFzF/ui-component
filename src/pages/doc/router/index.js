/**
*@file: router.js
*@author: afcfzf (9301462@qq.com)
*/

import Vue from 'vue';
import VueRouter from 'vue-router';
import docRoute from './routes.js';
import Home from '../components/home/home.vue';
import Index from '../components/index/index.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: Home,
        children: [
            {
                path: '',
                component: Index
            },
            docRoute
        ]
    }
];

console.log('router: ', routes);

export default new VueRouter({
    routes
});
