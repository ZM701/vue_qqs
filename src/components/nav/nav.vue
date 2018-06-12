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
        <router-link to="/my"> <span class="glyphicon glyphicon-user"></span></router-link>
      </div>
    </div>
    <div class="nav">
      <nav class="nav-list" @click="tabKeywords">
        <li class="item" v-for="(item,index) in navList" :class="{'active': nowIndex===index}" @click="tabClick(index);">{{item}}</li>
      </nav>
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
        this.nowIndex = this.$route.path === '/index/one' ? 0 : this.$route.path === '/index/two' ? 1 : this.$route.path === '/index/three' ? 2 : this.$route.path === '/index/four' ? 3 : this.$route.path === '/index/five' ? 4 : 0;
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
        let href = index === 0 ? '/index/one' : index === 1 ? '/index/two' : index === 2 ? '/index/three' : index === 3 ? '/index/four' : index === 4 ? '/index/five' : '/index/one';
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
    border:1px solid #7DBE24;
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 50px;
    left: 0;
    top:0;
    background: #7DBE24;
    overflow: hidden;
    padding-left: 10%;
    overflow: hidden;
  }
  .search .find,.search .my{
    float: left;
  }
  .search .my span{
    font-size: 16px;
    color: #fff;
  }

  .search .my{
    height: 50px;
    width: 40px;
    line-height: 50px;
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
    margin-top: 10px;
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
    top:10%;
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
    /*margin-bottom: 10px;*/
  }

  .nav-list{
    padding: 0 10px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    /*flex-direction: row;*/
    -webkit-box-align: middle;
    -ms-flex-align: middle;
    align-items: middle;
    overflow: auto;
  }

  .item{
    text-align: center;
    font-size: 1.5rem;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    padding: 5px 10px;
    /*margin: 5px;*/
  }
  .active{
    color: #66B672;
    border-bottom: 1px solid #66B672;
  }

</style>
