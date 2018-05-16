/**
 * @file: index.js
 * @author: jialipeng
 * @File Created: Tuesday, 8th May 2018 8:06:28 pm
 */


import Vue from 'vue';
import App from './App.vue';

import comp from '@components';
Vue.use(comp);

import Router from 'vue-router';
Vue.use(Router);

import Foo from './Foo.vue';
import Foo1 from './Foo1.vue';
import Foo2 from './Foo2.vue';

import Test from './Test.vue';
import SubItem from './SubItem.vue';
// const Foo = { template: '<div>这是foo组件部分</div>'};
// const Test = { template: '<div style="color: #e10; fontWeight: bold">这是foo组件部分</div>'};

// const abc = Vue.component('uiabc', {
//     template: `<div>{{text}}</div>`,
//     data() {
//         return {
//             text: `我就是问题欧耶`
//         }
//     },
//     mounted() {
//         console.log('mounted: ', this)
//     }
// });

// Vue.use({
//     uiabc
// })

// console.log('我是 abc', abc, this);
console.log('我是Foo： ', Foo);
console.log('我是Test： ', Test);

import Nav from './Nav';
import UserSettings from './UserSettings';
import UserEmails from './UserEmailsSubscriptions';
import UserProfile from './UserProfilePreview';

const routes = [
    {
        path: '/foo',
        name: 'b',
        components: {
            a: Foo,
            b: Foo1,
            c: Foo2
        },
        children: [
            {
                path: 'subItem/:id',
                component: SubItem
            }
        ]
    },
    {
        path: '/test',
        name: 'd',
        component: Test
    },
    {
        path: '/embed',
        name: 'hie',
        components: {
            nav: Nav,
            userSettings: UserSettings,
            helper: UserProfile
        },
        children: [
            {
                path: 'email/:id',
                component: UserEmails
            }
        ]
    }
];

const router = new Router({
    routes
});

new Vue({
    el: '#app',
    router,
    render: h => h(App)
});

// const routes = [
//     {path: '/foo', component: Foo},
//     {path: '/bar', component: Bar}
// ];

// const Foo = Vue.component('Foo', {
//     template: '<div>这是foo组件部分</div>',
//     beforeRouteUpdate(to, from, next) {
//         console.log('beforeRouteUpdate:', to, from , next);
//     }
// });

// console.log('Foo: ', Foo)
// const Test = Vue.component('Test', {
//     template: '<div style="color: #e10; fontWeight: bold">这是foo组件部分</div>'
// });



