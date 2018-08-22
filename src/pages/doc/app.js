/**
*@file: main.js
*@author: afcfzf (9301462@qq.com)
*/


import App from './App.vue';
import Vue from 'vue';
import router from './router';

// doc全局引入组件
import uiComp from '@components';
import demoBlock from './components/docs/demo-block';

Vue.use(uiComp);
Vue.component('DemoBlock', demoBlock);

new Vue({
    el: '#app',
    router,
    render: h => h(App)
});
