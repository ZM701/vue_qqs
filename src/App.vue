<template>
  <div id="app">
    <div>
      <div class="display" v-show="this.$route.path.indexOf('index')==-1">
        <router-view></router-view>
      </div>
      <div class="find" v-show="this.$route.path.indexOf('index')==1">
        <v-nav class="vNav"></v-nav>
        <v-swiper></v-swiper>
      </div>
    </div>

    <div class="footer" v-show="this.$route.path=='/index'||this.$route.path=='/active'||this.$route.path=='/task'||this.$route.path=='/index/one'||this.$route.path=='/index/two'||this.$route.path=='/index/three'||this.$route.path=='/index/four'||this.$route.path=='/index/five'">
      <div><router-link to="/index">发现</router-link></div>
      <div><router-link to="/active">活动</router-link></div>
      <div><router-link to="/task">任务</router-link></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import $route from 'vue-router';
  import nav from './components/nav/nav.vue';
  import swiper from './components/swiper/swiper.vue';
  export default {
    data(){
      return{
      }
    },
    components: {
      'v-nav': nav,
      'v-swiper': swiper
    }

  }
</script>

<style>
  *{
    margin: 0;
    padding: 0;
  }
  .footer{
    background: #fff;
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    flex-direction: row;
    z-index: 9999;
  }
  .footer>div{
    height: 40px;
    line-height: 40px;
    width: 100%;
    text-align: center;
  }
  a,span{
    display: block;
    width: 100%;
    height: 100%;
    color: #000;
    text-align: center;
  }
  a:hover, a:focus {
    color: green;
    text-decoration: none;
  }
  .display{
    width: 100%;
    height: 100px;
  }
  .add{
    display: block;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #4cae4c;
    color: #fff;
    font-size: 20px;
    line-height: 32px;
    margin: 5px auto;
  }
  .router-link-active{
    color: green;
  }
  .content1 img{
    width: 100% !important;
  }
  .content1 span{
    text-align: left !important;
    display: inline;
  }
</style>
