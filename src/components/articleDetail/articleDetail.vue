<template>
<div>
  <div v-for="(item,index) in msg">
    <!--item.type == 0代表的是文章  1代表的是视频-->
    <!--<router-link class="panel" v-if="item.type == 0 && item.imgSrc.length>1" :to="{
      name:'articleDescription',
      params:{
      imgSrc:item.imgSrc,
      userImage:item.image,
      nickName:item.nickname,
      article_title:item.article_title,
      article_content:item.article_content,
      article_sendtime:item.article_sendtime,
      article_format:item.article_format,
      uid:item.uid,
      relation_status:item.relation_status,
      article_commentnum:article_commentnum,
      article_transpondnum:article_transpondnum
    }}">-->
    <div v-if="item.type == 0 && item.imgSrc.length>1" class="panel" >
    <router-link :to="articleType==11?{name:'beforeDescription',params:{article_id:item.article_id,article_content:item.article_content,article_format:item.article_format,sourceType:item.type}}:{name:'articleDescription',params:{article_id:item.article_id,article_content:item.article_content,article_format:item.article_format,sourceType:item.type}}">
    <div class="panelTitle">{{item.article_title}}</div>
        <div class="sp1">
          <div class="img_con" v-for="(imgs,index) in item.imgSrc">
            <img :src="imgs" class="small"/>
          </div>
        </div>
      <div style="clear: both;"></div>
    </router-link>
        <div class="user_info">
          <div class='nick_img'>
            <img class="user_img" :src='item.image'/>
            <div class="nickname">{{item.nickname}}</div>
          </div>
          <div class='related'>
            <div class=""> <span class='iconfont icon-conment lightGrey'></span>评论 {{item.article_commentnum}}</div>
            <div class=""> <span class='iconfont icon-turn lightGrey'></span>转发 {{item.article_transpondnum}}</div>
          </div>
          <!--收藏按钮-->
          <div v-if="icon" class="collection" @click.stop="f3(index)">
            <div class="icon" ><span class="glyphicon glyphicon-tasks"></span></div>
          </div>
          <div class="cancleCollection" @click.stop="cancleCollection(index,item.article_id)">取消收藏</div>
        </div>
    </div>

    <div  v-if="item.type == 0 && item.imgSrc.length<=1" class='pane2' >
    <router-link :to="articleType==11?{name:'beforeDescription',params:{article_id:item.article_id,article_content:item.article_content,article_format:item.article_format,sourceType:item.type}}:{name:'articleDescription',params:{article_id:item.article_id,article_content:item.article_content,article_format:item.article_format,sourceType:item.type}}">
      <div class='pane2_box'>
        <div class="panelTitle">{{item.article_title}}</div>
        <div class="img_con">
          <img :src="item.image" class="big"/>
        </div>
      </div>
    </router-link>
      <div class="user_info">
        <div class='nick_img'>
          <img class="user_img" :src='item.image'/>
          <div class="nickname">{{item.nickname}}</div>
        </div>
        <div class='related'>
          <div> <span class='iconfont icon-conment lightGrey '></span>评论 {{item.article_commentnum}}</div>
          <div> <span class='iconfont icon-turn lightGrey '></span>转发 {{item.article_transpondnum}}</div>
        </div>
        <!--收藏按钮-->
        <div v-if="icon" class="collection" @click.stop="f3(index)">
          <div class="icon"><span class="glyphicon glyphicon-tasks"></span></div>
        </div>
        <div class="cancleCollection" @click.stop="cancleCollection(index,item.article_id)">取消收藏</div>
      </div>
    </div>

    <div class="pane3"  v-if="item.type == 1">
      <router-link :to="articleType==11?{name:'beforeDescription',params:{article_id:item.article_id,sourceType:item.type}}:{name:'articleDescription',params:{article_id:item.article_id,sourceType:item.type}}">
      <div class="panelTitle">{{item.article_title}}</div>
      <div class="img_con">
        <!--<router-link :to="{name:'videoDetail',params:{video_url:item.video_url}}"><video :src="item.video_url" class='videos'></video></router-link>-->
        <!--<router-link :to="{name:'videoDetail',params:{video_url:item.video_url}}" class="cover"><img :src="item.article_cover" class="video_cover"/><img class="playBtn" src='../../../static/images/play.png'/></router-link>-->
        <div class="cover"><img :src="item.article_cover" class="video_cover"/><img class="playBtn" src='../../../static/images/play.png'/></div>
      </div>
      </router-link>
      <div class="user_info">
        <div class='nick_img'>
          <img class="user_img" :src='item.image'/>
          <div class="nickname">{{item.nickname}}</div>
        </div>
        <div class='related'>
          <div class=""> <span class='iconfont icon-conment lightGrey'></span>评论 {{item.article_commentnum}}</div>
          <div class=""> <span class='iconfont icon-turn lightGrey'></span>转发 {{item.article_transpondnum}}</div>
        </div>
        <!--收藏按钮-->
        <div v-if="icon" class="collection" @click.stop="f3(index)">
          <div class="icon"><span class="glyphicon glyphicon-tasks"></span></div>
        </div>
        <div class="cancleCollection" @click.stop="cancleCollection(index,item.article_id)">取消收藏</div>
      </div>
    </div>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
  import qs from 'qs';
    export default {
      props: {
        "msg":{
          type:Array
        },
        "icon":{
          type:Boolean
        },
        "articleType":{
            type:Number
        }
      },
      data(){
        return{
        }
      },
      methods:{
        //取消收藏的显示隐藏   向collection发送事件
        f3(index){
          this.$emit('childSay',index);
        },
        //点击取消收藏    向collection发送事件
        cancleCollection(index,article_id){
          this.$emit('childCollectionSay',index,article_id);
        }
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
   text-align: left;
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
    height: 20px;
    position: relative;
  }
  .user_info .nick_img{
    overflow: hidden;
    float: left;
    width: 50%;
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
    text-align: left;
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
    position: relative;
    width: 100%;
    height: 150px;
  }
  .pane3 .img_con .video_cover{
    position: absolute;
    left: 0;
    top:0;
    width: 100%;
    height: 100%;
  }
  .pane3 .img_con .playBtn{
    position: absolute;
    left: 50%;
    top: 50%;
    width: 50px;
    height: 50px;
    margin-left: -25px;
    margin-top: -25px;
  }
  .pane3 .img_con img{
    width: 32%;
    height: 100px;
    margin-right: 5px;
  }
  /*收藏按钮*/
  .collection{
    float: right;
    margin-right: 5px;
  }
  /*取消收藏*/
  .cancleCollection{
    text-align: center;
    background: #fff;
    width: 100px;
    height: 30px;
    line-height: 30px;
    position: absolute;
    right: 5px;top:20px;
    border-radius: 2px;
    box-shadow: 0px 0px 8px #ccc;
    border-right: 1px solid #e4e7ed;
    display: none;
  }
</style>

