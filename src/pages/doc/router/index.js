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
        redirect: '/index',
        component: Home,
        children: [
            {
                path: 'index',
                component: Index
            },
            ...docRoute
        ],
        beforeEnter: (to, from, next) => {
            console.log(this, 'befire');
            next();
        // ...
        }
    }
];

console.log('all-router', docRoute);
export default new VueRouter({
    routes
});
