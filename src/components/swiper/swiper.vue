<template>
  <div>
    <!--滑块区域-->
    <div class="swiper-box">
      <pull-to :top-load-method="refresh" :bottom-load-method="loadMore">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item, index) in list">
              <keep-alive>
                <component :is="item.component" :attentionArticle="attentionArticle" :msg="item.msg" :userInfo="item.userInfo" :banner="item.banner"></component>
              </keep-alive>
            </div>
          </div>
        </div>
      </pull-to>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Swiper from 'swiper';
  import PullTo from 'vue-pull-to';
  import 'swiper/dist/css/swiper.min.css';
  import 'swiper/dist/js/swiper.js';
  import one from '../../components/one/one.vue';
  import two from '../../components/two/two.vue';
  import three from '../../components/three/three.vue';
  import four from '../../components/four/four.vue';
  import five from '../../components/five/five.vue';
  import qs from 'qs';

  export default {
    components: {
      one,
      two,
      three,
      four,
      five,
      PullTo
    },
    data() {
      return {
        nowIndex:0,     //当前位置的索引
        attentionArticle:[],  //关注部分的数据
        banner:[],    //精选部分的banner图
        userInfo:[],   //关注用户信息
        navList:["关注","精选"],  //初始化的导航栏
        addNav:[],      //添加的导航栏
        keyWords:"关注",   //请求接口的关键字
        pageNum:1,
        list: [
          {path: '/index/one', component: one},
          {path: '/index/two', component: two},
          {path: '/index/three', component: three},
          {path: '/index/four', component: four},
          {path: '/index/five', component: five}
        ]
      }
    },
    created(){
      this.dataInit();

    },
    mounted() {
      //this.attentionArticle = this.attentionArticle;
      var mySwiper = new Swiper('.swiper-container', {
        // 设定初始化时slide的索引
        initialSlide: this.$route.path === '/index/one' ? 0 : this.$route.path === '/index/two' ? 1 : this.$route.path === '/index/three' ? 2 : this.$route.path === '/index/four' ? 3 : this.$route.path === '/index/five' ? 4 : 0
      });
      mySwiper.on('slideChange', () => { // 监控滑动后当前页面的索引，将索引发射到导航组件
        // 左右滑动时将当前slide的索引发送到nav组件
        this.$root.eventHub.$emit('slideTab', mySwiper.activeIndex);
        //监听变化
        this.nowIndex = mySwiper.activeIndex;
        this.keyWords = this.navList[mySwiper.activeIndex];
      });
      // 接收nav组件传过来的导航按钮索引值，跳转到相应内容区
      this.$root.eventHub.$on('changeTab', (index) => { // 点击导航键跳转相应内容区
        this.nowIndex = index;
        mySwiper.slideTo(index, 0, false);
      });
      //接受nav组件传过来的keyWords
      this.$root.eventHub.$on('changeKeywords', (keyWords) => { // 点击导航键跳转相应内容区
        this.keyWords = keyWords
       // console.log(this.keyWords)
      });
    },
    methods:{
      dataInit() {
        // var that = this;
        // console.log(this.keywords)
        this.$http.post('/api/article/index', qs.stringify({
          uid: uid,
          keywords: this.keyWords,
          pageNum: this.pageNum,
          pageSize: 5
        })).then((response) => {
          if(this.nowIndex==0){
            var temp = response.data.article;
            this.attentionArticle = this.attentionArticle.concat(temp);
          }else if(this.nowIndex==1){
            var temp = response.data.article;
            this.attentionArticle = this.attentionArticle.concat(temp);
          }else{
            this.attentionArticle = response.data.article
          }

          //this.attentionArticle = this.attentionArticle.concat(temp);
          // this.attentionArticle = response.data.article;   //关注部分数据
          this.userInfo = response.data.user;   //关注用户信息
          // 导航栏
          this.addNav = [];
          this.navList=["关注","精选"];
          for(var i=0;i<response.data.column.length;i++){
            this.addNav.push(response.data.column[i].column_name);
          }
          this.navList = this.navList.concat(this.addNav); //完善导航栏
          //console.log(this.navList)
          // 导航栏结束
          if(response.data.banner != "undefined"){
            this.banner = response.data.banner;  //精选部分的banner图
          }
          //初始化每个list里面msg的内容
          for(var i=0;i<this.list.length;i++){
            this.list[i].msg = this.attentionArticle;
            this.list[i].userInfo = this.userInfo;
            this.list[i].banner = this.banner;
          }
          this.$root.eventHub.$emit('navList', this.navList);
         //console.log(this.list)
        })
      },
      loadMore(loaded) {
        setTimeout(() => {
          if(this.nowIndex==0){
            this.pageNum = this.pageNum+1;
          }else if(this.nowIndex==1){
            this.pageNum = this.pageNum+1;
          }else{
            this.pageNum = 1;
          }
          this.dataInit();
          loaded('done');
        }, 500);
      },
      refresh(loaded){
        setTimeout(() => {
          this.pageNum = 1;
          this.dataInit();
          loaded('done');
        }, 500);
      }
    },
    watch:{
      nowIndex(val, oldVal){//普通的watch监听
        this.pageNum = 1;  //每次改变的时候初始化
        this.dataInit();
        this.attentionArticle = [];  //每次点击或滑动的时候清空所有的数据
      },
      keyWords(val, oldVal){//普通的watch监听
        this.pageNum = 1;  //每次改变的时候初始化
        this.dataInit();
        this.attentionArticle = []; //每次点击或滑动的时候清空所有的数据
      },
    }
  }
</script>

<style scoped>
  .swiper-container{
    padding-top: 100px;
  }
</style>
