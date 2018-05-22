<template>
    <div>
      <div class="atricle">
        <div @click="f1" :class="flage1?'active':'unacticve'">相关用户</div>
        <div @click="f2" :class="flage2?'active':'unacticve'">相关文章</div>
        <div @click="f3" :class="flage3?'active':'unacticve'">相关活动</div>
      </div>
      <!--相关用户----------------------------------------------------------------------------------------------------------------------------->
      <div class="users" v-show="flage1">
        <div>
          <img src="../../../static/images/play.png"/>
          <span>{{input}}</span>
        </div>
      </div>
      <!--相关文章----------------------------------------------------------------------------------------------------------------------------->
      <div class="mainAtricle" v-show="flage2">
        <div class="user"><img src="../../../static/images/play.png">用户昵称</div>
        <div class="time">2018-03-24</div>
        <div class="articleContant">
          <img src="../../../static/images/play.png">
          <div class="description">
            <span>文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题</span>
            <span>文章摘要</span>
            <span>阅读量：1978  点赞：4789</span>
          </div>
        </div>
      </div>
      <!--相关活动----------------------------------------------------------------------------------------------------------------------------->
      <div class="actives" v-show="flage3">
        <div class="articleContant">
          <img src="../../../static/images/play.png">
          <div class="description">
            <span>文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题</span>
            <span>参与人数2568</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      props:{
        "input":{
          type:String
        }
      },
      data(){
          return{
            flage1:true,
            flage2:false,
            flage3:false
          }
        },
      methods:{
          f1(){
            this.flage1 = true;
            this.flage2 = false;
            this.flage3 = false;
          },
        f2(){
          this.flage1 = false;
          this.flage2 = true;
          this.flage3 = false;
        },
        f3(){
          this.flage1 = false;
          this.flage2 = false;
          this.flage3 = true;
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
    display: flex;
    flex-direction: row;
    height: 95px;
    margin-bottom: -15px;
  }
  .users>div{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-left: 3%;
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
    height: 100%;
  }
  .articleContant .description{
    float: right;
    height: 100%;
    width:65%;
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
