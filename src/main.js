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
import task from '@/components/task/task'
import my from '@/components/my/my'
import videoDetail from '@/components/videoDetail/videoDetail'
import Search from '@/components/Search/Search'
import headerBar from '@/components/headerBar/headerBar'
import searchPage from '@/components/searchPage/searchPage'
import searchResult from '@/components/searchResult/searchResult'
import attention from '@/components/attention/attention'
import articleDescription from '@/components/articleDescription/articleDescription'
import myActives from '@/components/myActives/myActives'
import myArticle from '@/components/myArticle/myArticle'
import goldIncome from '@/components/goldIncome/goldIncome'




// import store from './store/index'

import $ from 'jquery'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';

//全局变量的显示
global.uid=8389;
// global.uid=5190;
// global.uid=1;


import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);

//引入mint-ui
import 'mint-ui/lib/style.css';
import 'mint-ui/lib/index.js';
//swiper
import { Swipe, SwipeItem } from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
//下拉/上拉刷新，支持自定义 HTML 模板。
import { Loadmore } from 'mint-ui';
Vue.component(Loadmore.name, Loadmore);

Vue.config.productionTip = false;

Vue.use(VueRouter);
//ajax请求
import axios from 'axios'
Vue.prototype.$http= axios

//引入vuex
// import Vuex from 'vuex'
// Vue.use(Vuex)

// 定义路由
// 每个路由应该映射一个组件。
let router = new VueRouter({
  routes: [
    {path: '/', redirect: '/index'},
   /* {path: '/one',name:'one', component: one},
    {path: '/two',name:'two', component: two},
    {path: '/three',name:'three', component: three},
    {path: '/four',name:'four', component: four},
    {path: '/five',name:'five', component: five},*/
    {
      path: '/index',
      name:'index',
      component: index,
      children:[
        { path: '/index/one', name:'one', component: one},
        { path: '/index/two', name:'two', component: two},
        { path: '/index/three', name:'three', component: three},
        { path: '/index/four', name:'four', component: four},
        { path: '/index/five', name:'five', component: five}
      ]
    },
    {
      path: '/active',
      name:'active',
      component: active
    },
    {
      path: '/task',
      name:'task',
      component: task
    },
    {
      path: '/my',
      name:'my',
      component: my
    },
    {
      path: '/videoDetail',
      name:'videoDetail',
      component: videoDetail
    },
    {
      path: '/search',
      name:'search',
      component: Search
    },
    {
      path: '/headerBar',
      name:'headerBar',
      component: headerBar
    },
    {
      path: '/searchPage',
      name:'searchPage',
      component: searchPage
    },
    {
      path: '/searchResult',
      name:'searchResult',
      component: searchResult
    },
    {
      path: '/attention',
      name:'attention',
      component: attention
    },
    {
      path: '/articleDescription',
      name:'articleDescription',
      component: articleDescription
    },
    {
      path: '/myActives',
      name:'myActives',
      component: myActives
    },
    {
      path: '/myArticle',
      name:'myArticle',
      component: myArticle
    },
    {
      path: '/goldIncome',
      name:'goldIncome',
      component: goldIncome
    }



  ]
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  // store:store,
  template: '<App/>',
  components: {App},
  data: {
    eventHub: new Vue() // 使用集中的事件处理器,一劳永逸的在任何组件调用事件发射、接受的方法
  }
});
