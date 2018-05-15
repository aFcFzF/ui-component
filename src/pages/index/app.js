/**
 * @file: index.js
 * @author: jialipeng
 * @File Created: Tuesday, 8th May 2018 8:06:28 pm
 */


import Vue from 'vue';
import App from './App.vue';

import comp from '@components';
Vue.use(comp);

new Vue({
    el: '#app',
    render: h => h(App)
});
