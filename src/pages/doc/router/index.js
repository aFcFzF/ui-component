/**
*@file: router.js
*@author: afcfzf (9301462@qq.com)
*/

import Vue from 'vue';
import VueRouter from 'vue-router';
// import routes from './routes';
import Home from '../components/home/home.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    }
];

export default new VueRouter({
    routes
});
