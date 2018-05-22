<template>
    <div>
      <div class="atricle">
        <div>相关用户</div>
        <div>相关文章</div>
        <div>相关活动</div>
      </div>
      <div class="users" v-show="flage">
        相关用户
      </div>
      <div class="mainAtricle">
        相关文章
      </div>
      <div class="active">
        相关活动
      </div>
     <!-- <div class="mainAtricle">
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
      </div>-->
    </div>
</template>

<script>
    export default {
        data(){
          return{
            flage:true
          }
        }
    }
</script>

<style scoped>
  .atricle{
  margin-top: 10px;
    display: flex;
    flex-direction: row;
  }
  .atricle>div{
    width: 100%;
    text-align: center;
  }
  .atricle>div a{
    display: block;
    width: 100%;
    height: 100%;
  }
  .router-link-active{
    color: #66B672;
    border-bottom: 1px solid #66B672;
  }
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
