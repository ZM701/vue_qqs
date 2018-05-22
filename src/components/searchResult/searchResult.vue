<template>
  <div>
    <v-search></v-search>
    <div class="atricle">
      <div @click="f1" :class="flage1?'active':'unacticve'">相关用户</div>
      <div @click="f2" :class="flage2?'active':'unacticve'">相关文章</div>
      <div @click="f3" :class="flage3?'active':'unacticve'">相关活动</div>
    </div>
    <!--相关用户----------------------------------------------------------------------------------------------------------------------------->
    <div class="users" v-show="flage1">
      <div v-for="(item,index) in info.user">
        <img :src="item.image"/>
        <span>{{item.nickname}}</span>
      </div>
    </div>
    <!--相关文章----------------------------------------------------------------------------------------------------------------------------->
    <div class="mainAtricle" v-show="flage2" v-for="(item,index) in info.article">
      <div class="user"><img :src="item.image">{{item.nickname}}</div>
      <div class="time">{{item.article_sendtime}}</div>
      <div class="articleContant">
        <img :src="item.article_cover">
        <div class="description">
          <span>{{item.article_title}}</span>
          <span>{{item.article_type}}</span>
          <span>阅读量：{{item.article_readnum}} &nbsp; &nbsp; &nbsp;点赞：{{item. article_agreenum}}</span>
        </div>
      </div>
    </div>
    <!--相关活动----------------------------------------------------------------------------------------------------------------------------->
    <div class="actives" v-show="flage3" v-for="(item,index) in info.activity">
      <div class="articleContant">
        <img :src="item.goods_banner">
        <div class="description">
          <span>{{item.title}}</span>
          <span>参与人数{{item.count}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import qs from "qs";
  import search from "../Search/Search";
  export default {
    data(){
      return{
        flage1:true,
        flage2:false,
        flage3:false,
        info:[],
        status:1, // 3:activity相关活动   2:article 相关文章  1:user相关用户  0:所有
      }
    },
    components:{
      'v-search':search
    },
    created(){
   // console.log(this.$route.params.keyWords)
      this.information();

    },
    methods:{
      f1(){
        this.flage1 = true;
        this.flage2 = false;
        this.flage3 = false;
        this.status = 1;
        this.information();
      },
      f2(){
        this.flage1 = false;
        this.flage2 = true;
        this.flage3 = false;
        this.status = 2;
        this.information();
      },
      f3(){
        this.flage1 = false;
        this.flage2 = false;
        this.flage3 = true;
        this.status = 3;
        this.information();
      },
      information(){
        var _this = this;
        this.$http.post('/api/search', qs.stringify({
          uid: uid,
          keywords: this.$route.params.keyWords,
          pageNum: 1,
          pageSize: 5,
          status:this.status   // 3:activity相关活动   2:article 相关文章  1:user相关用户  0:所有
        })).then((response) => {
          _this.info = response.data.search;
         // console.log(_this.info)
        });
      }
    }
  }
</script>

<style scoped>
  .atricle{
    margin-top: 10px;
    margin-bottom: 5px;
    display: flex;
    flex-direction: row;
  }
  .atricle>div{
    width: 100%;
    text-align: center;
    padding-bottom: 3px;
  }
  .atricle>div a{
    display: block;
    width: 100%;
    height: 100%;
  }
  .active{
    color: #66B672;
    border-bottom: 1px solid #66B672;
  }
  .unacticve{
    color: #000;
  }
  /*相关用户*/
  .users{
    padding: 5px 5px 0 5px;
    overflow: hidden;
    margin-bottom: -15px;
  }
  .users>div{
    float: left;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-left: 3%;
    margin-bottom: 20px;
    text-align: center;
  }
  .users div:last-of-type{
    margin-right: 0;
  }
  .users div img{
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }
  .users span{
    display: block;
    text-align: center;
    width: 100%;
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  /*相关文章*/
  .mainAtricle{
    overflow: hidden;
    margin-top: 5px;
  }
  .mainAtricle>div{
    float: left;
  }
  .user{
    width: 75%;
  }
  .user img{
    border-radius: 50%;
    width: 20px;
    height: 20px;
    margin-right: 4px;
  }
  .time{
    float: right;
  }
  .articleContant{
    margin-top: 5px;
    padding-bottom: 5px;
    width: 100%;
    height: 100px;
    overflow: hidden;
    border-bottom: 1px solid #F5F5F5;
  }
  .articleContant img{
    float: left;
    margin-right: 5px;
    width: 40%;
    height: 100%;
  }
  .articleContant .description{
    float: right;
    height: 100%;
    width:58%;
  }
  .description span:nth-of-type(1),.description span:nth-of-type(2),.description span:nth-of-type(3){
    text-align: left;
    font-size: 1rem;
    height: 35px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    word-wrap:break-word;
    word-break:break-all;
    margin-bottom: 2px;
  }
</style>
