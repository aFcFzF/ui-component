/**
*@file: main.js
*@author: afcfzf (9301462@qq.com)
*/


import App from './App.vue';
import Vue from 'vue';
import router from './router';
import './common/all.styl';

new Vue({
    el: '#app',
    router,
    render: h => h(App)
});
