import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import one from './components/one/one.vue';
import two from './components/two/two.vue';
import three from './components/three/three.vue';
import four from './components/four/four.vue';
import five from './components/five/five.vue';
import index from '@/components/index/index'
import active from '@/components/active/active'
import shopCart from '@/components/shopCart/shopCart'
import my from '@/components/my/my'

import $ from 'jquery'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';

//全局变量的显示
global.uid=8389;

//引入mint-ui
import 'mint-ui/lib/style.css';
import 'mint-ui/lib/index.js';
//swiper
import { Swipe, SwipeItem } from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

Vue.config.productionTip = false;

Vue.use(VueRouter);
//ajax请求
import axios from 'axios'
Vue.prototype.$http= axios

// 定义路由
// 每个路由应该映射一个组件。
let router = new VueRouter({
  routes: [
    {path: '/', redirect: '/index'},
    {path: '/one', component: one},
    {path: '/two', component: two},
    {path: '/three', component: three},
    {path: '/four', component: four},
    {path: '/five', component: five},
    {
      path: '/index',
      component: index
    },
    {
      path: '/active',
      component: active
    },
    {
      path: '/shopCart',
      component: shopCart
    },
    {
      path: '/my',
      component: my
    },
  ]
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  template: '<App/>',
  components: {App},
  data: {
    eventHub: new Vue() // 使用集中的事件处理器,一劳永逸的在任何组件调用事件发射、接受的方法
  }
});
