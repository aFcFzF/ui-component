/**
*@file: main.js
*@author: afcfzf (9301462@qq.com)
*/


import App from './App.vue';
import Vue from 'vue';
import router from './router';

// doc全局引入组件
import comp from '@components';
console.log('comp', comp);
Vue.use(comp);

new Vue({
    el: '#app',
    router,
    render: h => h(App)
});
