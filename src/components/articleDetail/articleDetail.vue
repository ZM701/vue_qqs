<template>
<div>
  <div v-for="(item,index) in msg">
    <!--item.type == 0代表的是文章  1代表的是视频-->
    <div class="panel" v-if="item.type == 0 && item.imgSrc.length>1">
        <div class="panelTitle">{{item.article_title}}</div>
        <div class="sp1">
          <div class="img_con" v-for="(imgs,index) in item.imgSrc">
            <img :src="imgs" class="small"/>
          </div>
        </div>
      <div style="clear: both;"></div>
        <div class="user_info">
          <div class='nick_img'>
            <img class="user_img" :src='item.image'/>
            <div class="nickname">{{item.nickname}}</div>
          </div>
          <div class='related'>
            <div class=""> <span class='iconfont icon-conment lightGrey'></span>评论 {{item.article_commentnum}}</div>
            <div class=""> <span class='iconfont icon-turn lightGrey'></span>转发 {{item.article_transpondnum}}</div>
          </div>
        </div>
    </div>

    <div class='pane2' v-if="item.type == 0 && item.imgSrc.length==0">
      <div class='pane2_box'>
        <div class="panelTitle">{{item.article_title}}</div>
        <div class="img_con">
          <img :src="item.image" class="big"/>
        </div>
      </div>
      <div class="user_info">
        <div class='nick_img'>
          <img class="user_img" src='../../../static/images/end.png'/>
          <div class="nickname">{{item.nickname}}</div>
        </div>
        <div class='related'>
          <div> <span class='iconfont icon-conment lightGrey '></span>评论 {{item.article_commentnum}}</div>
          <div> <span class='iconfont icon-turn lightGrey '></span>转发 {{item.article_transpondnum}}</div>
        </div>
      </div>
    </div>

    <div class="pane3"  v-if="item.type == 1">
      <div class="panelTitle">{{item.article_title}}</div>
      <div class="img_con">
        <video :src="item.video_url" class='videos' autoplay></video>
      </div>
      <div class="user_info">
        <div class='nick_img'>
          <img class="user_img" :src='item.image'/>
          <div class="nickname">{{item.nickname}}</div>
        </div>
        <div class='related'>
          <div class=""> <span class='iconfont icon-conment lightGrey'></span>评论 {{item.article_commentnum}}</div>
          <div class=""> <span class='iconfont icon-turn lightGrey'></span>转发 {{item.article_transpondnum}}</div>
        </div>
      </div>
    </div>

  </div>
</div>
</template>

<script type="text/ecmascript-6">
    export default {
      props: {
        "msg":{
          type:Array
        }
      },
      mounted(){
      }
    }
</script>

<style scoped>
  .panel,.pane2,.pane3{
    padding: 5px;
    margin-bottom: 20px;
    background-color: #fff;
    border: 1px solid transparent;
    border-radius: 4px;
    box-shadow: 0 1px 1px rgba(0,0,0,.05);
  }
 .panelTitle{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    word-wrap:break-word;
    word-break:break-all;
    margin-bottom: 5px;
  }
  .panel .img_con{
    overflow: hidden;
    width: 32%;
    height: 100px;
    margin-right: 4px;
    float: left;
  }
  .panel .img_con:last-of-type{
    margin-right: 0;
  }
  .panel .img_con img{
    overflow: hidden;
    display: block;
    float: left;
    /*width: 100%;*/
    height: 100px;
  }
  .user_info{
    margin-top: 10px;
  }
  .user_info .nick_img{
    overflow: hidden;
    float: left;
    width: 60%;
  }
  .user_info{
    overflow: hidden;
  }
  .user_info .related{
    float: left;
    overflow: hidden;
  }
  .user_info .nick_img img{
    float: left;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    vertical-align: middle;
    margin-right: 2px;
  }
  .user_info .nick_img .nickname{
    float: left;
    width: 50%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .user_info .related>div{
    float: left;
    margin-right: 5px;
  }
  .pane2_box{
   overflow: hidden;
  }
  .pane2_box>div{
    float: left;
  }
  .pane2_box .panelTitle{
    width: 65%;
    margin-right: 5px;
  }
  .pane2_box .img_con{
    width: 32%;
    height: 100px;
  }
  .pane2_box .img_con img{
    width: 100%;
    height: 100%;
  }
  .sp1{
    overflow:hidden;
    height: 100px;
  }
  /*视频样式*/
  .pane3 .img_con{
    width: 100%;
    height: 150px;
  }
  .pane3 .img_con video{
    width: 100%;
    height: 150px;
    object-fit: fill ;
  }
  .pane3 .img_con img{
    width: 32%;
    height: 100px;
    margin-right: 5px;
  }
</style>

