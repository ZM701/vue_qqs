<template>
    <div>
      <div class="navMy">
        <span @click="goback"><i class="	glyphicon glyphicon-chevron-left"></i></span>
        <span>关注</span>
      </div>
      <div style="padding-bottom: 100px;">
        <div class="user">
          <div><img :src="userImage"/></div>
          <div><span>{{nickName}}</span><span>粉丝789</span></div>
          <!--<div class="attention" @click="attentionClick(uid)">关注</div>-->
          <div class="attention" v-if="relation_status == 0" @click="attentionClick(uid)" >关注</div>
          <div class="attention already" v-if="relation_status == 1" @click="attentionClick(uid)" >已关注</div>
        </div>
        <div class="content">
          <div>{{article_title}}</div>
          <div>{{article_sendtime}} &nbsp;&nbsp;来自oopo</div>
          <div v-if="article_format==1">
            <div v-for="(item,idex) in article_content" class="content1">
              <span><img :src="'https://nwsapi.nanniwan.com/nws_cms/article/fileDownload.api?name='+item.img"/></span>
              <span>{{item.text}}</span>
            </div>
          </div>
          <div v-if="article_format==0" class="content1">
            <div v-html="article_content" class="imgs"></div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import qs from 'qs';
    export default {
      data(){
        return{
          userImage:this.$route.params.userImage, //用户头像
          nickName:this.$route.params.nickName, //用户名称
          article_title:this.$route.params.article_title,  //文章标题
          imgSrc:this.$route.params.imgSrc,   //有几张图片
          article_content:null, //内容
          article_sendtime:this.$route.params.article_sendtime,   //时间
          article_format:this.$route.params.article_format,   //0是富文本格式的   1是json格式的
          uid: this.$route.params.uid,  //用户uid
          relation_status:this.$route.params.relation_status,  // 0=未关注 1=关注
          state:null,  // 0=未关注 1=关注
        }
      },
      created(){
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
          console.log(relationUid);
          this.$http.post('/api/user/update_follow.api', qs.stringify({
            uid:uid,
            relation_touid:relationUid
          })).then((response) => {
            console.log(response.data)
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
      color: #D4D4D4;
      border: 1px solid #D4D4D4;
    }
  .cancle{
      color: #000;
      border:1px solid red;
    }
</style>
