<template>
  <div>
    <!--搜索栏-->
    <div class="search">
      <div class="find">
        <router-link to="/search">
          <input/>
          <i class="glyphicon glyphicon-search"></i>
        </router-link>
      </div>
      <div class="my">
        <router-link to="/my">我的</router-link>
      </div>
    </div>
    <div class="nav">
      <ul class="nav-list" @click="tabKeywords">
        <li class="item" v-for="(item,index) in navList" :class="{'active': nowIndex===index}" @click="tabClick(index);">{{item}}</li>
      </ul>
    </div>
  </div>
</template>


<script type="text/ecmascript-6">
  import VueRouter from 'vue-router';
  import qs from 'qs';

  export default {
    data() {
      return {
        nowIndex: 0,
        navList:["关注","精选"],  //初始化的导航栏
      }
    },
    created(){
     // this.dataInit("关注");
      this.$root.eventHub.$on('navList', (navList) => { // 点击导航键跳转相应内容区
        this.navList = navList
        // console.log(this.keyWords)
      });
    },
    mounted() {
      this.$nextTick(() => {
        // 初始化，保证刷新页面后内容区和导航键一致
        this.initPage();
      });
      // 接收swiper组件发射的index进行导航按钮切换高亮和更新模板地址
      this.$root.eventHub.$on('slideTab', this.slideTab);
    },
    methods: {
      //数据初始化，ajax请求
     /* dataInit(keywords){
        // var that = this;
        // console.log(this.keywords)
        this.$http.post('/api/index', qs.stringify({
          uid: uid,
          keywords: keywords,
          pageNum: 1,
          pageSize: 10
        })).then((response) => {
          this.addNav = [];
          this.navList=["关注","精选"];
          for(var i=0;i<response.data.column.length;i++){
            this.addNav.push(response.data.column[i].column_name);
          }
          this.navList = this.navList.concat(this.addNav); //完善导航栏
          //console.log(response.data)
        })
      },*/
      initPage() {
        this.nowIndex = this.$route.path === '/one' ? 0 : this.$route.path === '/two' ? 1 : this.$route.path === '/three' ? 2 : this.$route.path === '/four' ? 3 : this.$route.path === '/five' ? 4 : 0;
      },
      tabClick(index) {
        this.nowIndex = index;
        //this.dataInit($("li").eq(index).text());
        //console.log(keywords)
        //this.dataInit(keywords);
        //console.log(this.keywords);
        // 点击导航按钮时向swiper组件发射index
        this.$root.eventHub.$emit('changeTab', index);
      },
      slideTab(index) {
        this.nowIndex = index;
        //this.dataInit($("li").eq(index).text());
        //console.log($("li").eq(index).text());
        let router = new VueRouter();
        let href = index === 0 ? '/one' : index === 1 ? '/two' : index === 2 ? '/three' : index === 3 ? '/four' : index === 4 ? '/five' : '/one';
        // 利用路由的push方法更新路径地址
        router.push(href);
      },
      //传递事件,像swiper中发射keyWords
      tabKeywords(keyWords){
        keyWords = $("li").eq(this.nowIndex).text();
        this.$root.eventHub.$emit('changeKeywords', keyWords);
      },

    },
    /*watch:{
      keywords(val, oldVal){//普通的watch监听
        console.log("a: "+val);
        //this.dataInit();
      },
    }*/
  }
</script>

<style scoped>
  .search{
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 50px;
    left: 0;
    top:0;
    background: #7DBE24;
    overflow: hidden;
    line-height: 50px;
    padding-left: 20%;
  }
  .search .find,.search .my{
    float: left;
  }

  .search .my{
    height: 50px;
    width: 40px;
  }
  .search .my a{
    display: block;
    width: 100%;
    height: 100%;
  }
  .search .find{
    position: relative;
    width: 80%;
    margin-right: 4%;
  }
  .search .find input{
    padding-left: 30px;
    outline: none;
    width: 100%;
    height: 30px;
    border: none;
    border-radius: 4px;
  }
  .search .find i {
    left: 1%;
    top:22%;
    position: absolute;
    font-size: 16px;
    color:#ccc;
    line-height: 30px;
  }
  .nav{
    position: fixed;
    background: #fff;
    left: 0;
    top:50px;
    width: 100%;
    z-index: 999;
    margin-bottom: 30px;
  }
  .nav-list{
    width: 100%;
    display: flex;
    flex-direction: row;
  }
  .item{
    width: 100%;
    text-align: center;
    height: 40px;
    line-height: 40px;
    list-style: none;
  }
  .active{
    color: #66B672;
    border-bottom: 1px solid #66B672;
  }

</style>
