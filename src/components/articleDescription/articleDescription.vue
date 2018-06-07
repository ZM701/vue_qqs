<template>
    <div>
      <!--<div class="navMy">
        <span @click="goback"><i class="	glyphicon glyphicon-chevron-left"></i></span>
        <span>关注</span>
      </div>-->
      <div style="padding-bottom: 50px;" v-if="msgInfo!=null">
        <div class="user">
          <div><img :src="msgInfo.image"/></div>
          <div><span>{{msgInfo.nickname}}</span><span>粉丝{{fansNum}}</span></div>
          <!--<div class="attention">已关注</div>-->
          <!--0=未关注 1=关注-->
          <div class="attention" v-if="total.relation_status == 0" @click="attentionClick(msgInfo.uid)" >关注</div>
          <div class="attention already" v-if="total.relation_status == 1" @click="attentionClick(msgInfo.uid)" >已关注</div>
        </div>
        <div class="content">
          <div>{{msgInfo.article_title}}</div>
          <div>{{msgInfo.article_sendtime*1000 | formatDate}} 来自{{msgInfo.phone_type}} 浏览数{{msgInfo.article_readnum }}</div>
          <!--对文章的处理-->
          <div v-if="sourceType==0" class="articleHeight">
            <div v-if="msgInfo.article_format==1">
              <div v-for="(item,idex) in article_content" class="content1">
                <span><img :src="'https://nwsapi.nanniwan.com/nws_cms/article/fileDownload.api?name='+item.img"/></span>
                <span>{{item.text}}</span>
              </div>
            </div>
            <div v-if="msgInfo.article_format==0" class="content1">
              <div v-html="article_content" class="imgs"></div>
            </div>
          </div>
          <!--对视频的处理-->
          <div v-if="sourceType==1">
            <video :src="msgInfo.video_url" autoplay id="video"></video>
            <span>{{msgInfo.video_desc}}</span>
          </div>
        </div>
      </div>
      <div class="footBanner"  v-if="msgInfo!=null">
        <div>评论{{msgInfo.article_commentnum}}</div>
        <div @click="collectionPage(msgInfo.article_id)">收藏</div>
        <div>分享{{msgInfo.article_transpondnum}}</div>
      </div>
    </div>
</template>

<script>
  import qs from 'qs';
  import {formatDate} from '../../../static/js/common.js';
    export default {
      data(){
        return{
          msgInfo:null,  //获取信息
          article_content:null, //内容
          article_format:this.$route.params.article_format,   //0是富文本格式的   1是json格式的
          fansNum:null, //粉丝数
          total:{}, //获取所有信息
          article_id:this.$route.params.article_id,   //文章id
          state:null,   //0=未关注 1=关注
          sourceType:this.$route.params.sourceType,  //0文章  1视频
        }
      },
      created(){
        this.detail();
        var str = this.$route.params.article_content;
        if(this.article_format==1){
          this.article_content = "["+str+"]";
          this.article_content = JSON.parse(this.article_content);
        }
        if(this.article_format==0){
          //转义&lt;&gt;
          var strs = str.replace(/&lt;/g, "<")
                      .replace(/&gt;/g, ">");
          this.article_content = strs;
        }
        //调用滚动事件
        this.scroll();
      },
      mounted(){
        //文章篇幅过短判断是否读完的处理
        var _this = this;
        setTimeout(function(){
          var articleHeight = $(".articleHeight").height();
          /*var video=document.getElementById("video");
          global.totalTime = video.duration;*/
          if(articleHeight<=window.innerHeight){
            _this.articleEnd()
            console.log(111)
          }
        },1000)
        //对视频是否看完的处理
        /*setTimeout(function () {
          var video=document.getElementById("video");//video标签对象
          video.currentTime;//获取视频当前播放时间
          var durations = video.duration;
         //当前播放时间大于等于50秒即可获得积分
          if(video.currentTime >= durations/2){
            _this.articleEnd()
          }
        },totalTime*1000)*/

      },
      methods:{
        goback(){
          this.$router.push({
            path: '/index',
            name: 'index',
          })
        },
        //点击跳转到关注
        attentionClick(relationUid){
          // this.$root.eventHub.$emit('childAttention', relationUid);
          this.$http.post('/api/user/update_follow.api', qs.stringify({
            uid:uid,
            relation_touid:relationUid
          })).then((response) => {
            // console.log(response.data)
            this.state=response.data.relation_state;
            if(this.state==1){
              // 1  已关注
              $(".attention").html("已关注")
              $(".attention").removeClass("cancle")
              $(".attention").addClass("already");
              // this.relation_status = 1;
            }
            if(this.state==0){
              $(".attention").html("关注")
              $(".attention").removeClass("already")
              $(".attention").addClass("cancle")
              // this.relation_status = 0;
            }
          });
        },
        detail(){
          this.$http.get("/api/article/article_find.api", {
            params: {
              uid:uid,
              article_id:this.article_id,
              tran:0,  //tran 是否为转发 0不是,1是
              article_format:1  // article_format 小程序=1 ,后台=0
          }
          }).then(response => {
            this.total = response.data;
            this.msgInfo = response.data.article;
            this.fansNum = response.data.fansNum;
            //console.log(response.data);
          }, response => {
            console.log("获取信息失败");
            console.log(response);
          })
        },
        //点击收藏
        collectionPage(article_id){
          var _this = this;
          this.$confirm('确认收藏?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              //调用添加的接口
              this.$http.post("/api/article/collection", qs.stringify({
                uid: uid,
                article_id:article_id,
                status:0   //0=添加 1=取消
              })).then(response => {
                //提示收藏成功
                _this.$message({
                  type: 'success',
                  message: '收藏成功!'
                });
              })
            })
            .catch(() => {
            });
        },
        //文章过长判断是否读完的处理
        scroll() {
          window.onscroll = () => {
           // console.log(article_ids)
            // 距离底部的距离
            let bottomOfWindow = document.documentElement.scrollHeight-document.documentElement.scrollTop-document.documentElement.clientHeight
            if(bottomOfWindow<=200){
              //调用文章读完的接口
             this.articleEnd();
            }
          }
        },
        //文章读完
        articleEnd(){
          var _this = this;
          _this.$http.post('/api/article/mark_info', qs.stringify({
            uid:uid,
            article_id:_this.article_id,
            from_type:0,
            status:1
          })).then((response) => {
            //console.log(response.data)
          });
        }
      },
      filters: {
        //时间戳的转换
        formatDate(time) {
          var date = new Date(time);
          return formatDate(date, 'yyyy-MM-dd');
          // return formatDate(date, 'yyyy-MM-dd hh:mm');
        }
      }
    }
</script>

<style scoped>
  .navMy{
    width: 100%;
    overflow: hidden;
    margin: 10px;
  }
  .navMy span{
    text-align: left;
    width: auto;
    float: left;
    margin-right: 4px;
  }
  .user{
    overflow: hidden;
    margin: 20px 10px 0px 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e4e7ed;
  }
  .user>div{
    float: left;
  }
  .user>div:first-of-type{
    width: 50px;
    height: 50px;
  }
  .user>div:first-of-type img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  .user>div:nth-of-type(2){
    width: 30%;
    margin-left: 10px;
    margin-top: 10px;
  }
  .user>div:nth-of-type(2) span{
    text-align: left;
  }
  .user>div:nth-of-type(3){
    margin-top: 5px;
    float: right;
    border: 1px solid red;
    width: 60px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background: red;
    color: #fff;
    border-radius: 5px;
  }
  .content1{
    width: 100%;
    padding: 5px;
  }
  .content1>div{
    margin: 5px 0px;
  }
  .content1>div:nth-of-type(2){
    margin-bottom: 10px;
  }
  p,span{
    text-align: left !important;
  }
    .already{
      /*background: #e0e0e0;*/
      color: #D4D4D4;
      border: 1px solid #D4D4D4;
    }
  .cancle{
      color: #000;
      border:1px solid red;
    }
  .footBanner{
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    background: #fff;
    height: 60px;
    line-height: 60px;
    text-align: center;
    display: flex;
    flex-direction: row;
  }
  .footBanner div{
    width: 100%;
  }
  video{
    width: 100%;
    object-fit: fill;
  }
</style>
