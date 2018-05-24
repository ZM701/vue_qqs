<template>
    <div>
      <div class="navMy">
        <span @click="$router.go(-1)"><i class="	glyphicon glyphicon-chevron-left"></i></span>
        <span>我的</span>
      </div>
      <div class="userInfo">
        <div class="userImage"><img :src="infoUser.image"></div>
        <div class="userName">{{infoUser.nickname}}</div>
        <ul>
          <li @click="attention"><span>{{infoUser.followNum}}</span><span>关注</span></li>
          <li><span>{{infoUser.fansNum}}</span><span>粉丝</span></li>
          <li><span>{{infoUser.collectionNum}}</span><span>收藏</span></li>
        </ul>
      </div>
      <!--<div class="myOrder">
        <div>我的订单</div>
        <ul>
          <li>待付款</li>
          <li>待发货</li>
          <li>待收货</li>
          <li>已完成</li>
        </ul>
      </div>-->
      <div class="contentTitle">
        <ul>
          <li>金币攻略</li>
          <li><span>金币收益</span><span>778</span></li>
          <li><span>我的文章</span><span><i class="	glyphicon glyphicon-chevron-right"></i></span></li>
          <li><span>参与活动</span><span><i class="	glyphicon glyphicon-chevron-right"></i></span></li>
        </ul>
      </div>
      <!--全部文章------------------------------------------------>
     <!-- <div class="totalArticle" v-show="flage1" v-for="(item,index) in info.article">
        <div class="edit">
          &lt;!&ndash;article_status  0=草稿          article_authority  0=公开&ndash;&gt;
          <span v-show="item.article_status==0">草稿</span>
          <span v-show="item.article_status==1">公开</span>
          <span>{{item.article_sendtime}}分钟前&nbsp;&nbsp;阅读量{{item.article_readnum}}</span>
          <span @click="f3"><i class="glyphicon glyphicon-tasks"></i></span>
          <div style="clear:both;"></div>
          <div class="reEdit" v-show="flage3">
            <ul>
              <li>删除</li>
              <li>再次编辑</li>
            </ul>
          </div>
        </div>
        <div class="articleContent">
          <div class="articleTitle">
            {{item.article_title}}
          </div>
          <div class="articleImages" v-show="item.imgSrc.length==0">
            <div><img :src="item.article_cover"/></div>
          </div>
          <div class="articleImages" v-for="(imgs,index) in item.imgSrc">
            <div><img :src="imgs"/></div>
          </div>
        </div>
        <div class="articleDescription">
          <span><img :src="item.image"/>{{item.nickname}}</span>
          <span>评论{{item.article_agreenum}}</span>
          <span>转发{{item.article_agreenum}}</span>
          &lt;!&ndash;<span>赏金7869</span>&ndash;&gt;
        </div>
      </div>-->
      <!--参与活动-------------------------------------------------------------->
     <!-- <div class="joinActivities" v-show="flage2" v-for="(item,index) in info.activity">
        <div class="myJoin">
          &lt;!&ndash;activity  我投票的活动          myActivity  我参与的&ndash;&gt;
          <div>
            <p>我参与的</p>
            <div class="imgs"><img src="../../../static/images/play.png"/></div>
            <div class="titles">标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题</div>
            <div class="time">12:20 &nbsp;参与人数778</div>
          </div>
          <div>
            <p>我投票的</p>
            <div class="imgs"><img src="../../../static/images/play.png"/></div>
            <div class="titles">标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题</div>
            <div class="time">12:20 &nbsp;参与人数778</div>
          </div>
        </div>
      </div>-->

    </div>
</template>

<script type="text/ecmascript-6">
  import qs from 'qs';
    export default {
        data(){
          return{
            flage1:true,  //全部文章
            flage2:false,   //参与活动
            flage3:false,   // 删除或再次编辑
            status:0,   // 0文章  1活动
            info:{},  //数据渲染
            infoUser:{},  //用户信息
          }
        },
      methods:{
          attention(){
            this.$router.push({
              path: '/attention',
              name: 'attention',
              params: {
                // keyWords: this.input,
              }
            })
          },
        /*f1(){
          this.flage1 = true;
          this.flage2 = false;
          this.status = 0;
          this.information();
        },
        f2(){
          this.flage1 = false;
          this.flage2 = true;
          this.status = 1;
          this.information();
        },
        f3(){
          this.flage3 = !this.flage3;
        },*/
        information(){
          var _this = this;
          this.$http.post('/api/mine', qs.stringify({
            uid: uid,
            pageNum: 1,
            pageSize: 5,
            status:this.status   // 0文章  1活动
          })).then((response) => {
            _this.info = response.data;
            this.infoUser = response.data.user;
            console.log(response.data)
          });
        }
      },
      created(){
        this.information();
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
  .userInfo{
    text-align: center;
    border-bottom: 1px solid #e4e7ed;
    margin-bottom: 10px;
  }
  .userInfo .userImage{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 10px auto;
  }
  .userInfo .userImage img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  .userInfo ul{
    overflow: hidden;
    margin: 10px;
  }
  .userInfo ul li{
    list-style: none;
    float: left;
    width: 33%;
    text-align: center;
  }
  .contentTitle ul li{
    list-style: none;
    padding: 0 20px;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #e4e7ed;
  }
  .contentTitle ul li span{
    width: auto;
    float: left;
  }
  .contentTitle ul li span:last-of-type{
    float: right;
  }
  .active{
    color: #66B672;
    border-bottom: 1px solid #66B672;
  }
  .unacticve{
    color: #000;
    border:none;
  }
  /*全部文章*/
  .totalArticle{
    padding: 0px 5px;
    margin-bottom: 50px;
  }
  .totalArticle .edit{
    /*overflow: hidden;*/
    position: relative;
  }
  .totalArticle .edit span{
    width: auto;
    margin-right: 5px;
    float: left;
    color: #666;
  }
  .totalArticle .edit span:first-of-type{
    padding:0 5px;
    border:1px solid #e4e7ed;
    border-radius: 5px;
  }
  .totalArticle .edit span:nth-of-type(2){
    padding:0 5px;
    border:1px solid #e4e7ed;
    border-radius: 5px;
  }
  .totalArticle .edit span:last-of-type{
    float: right;
    font-size: 12px;
  }
  .totalArticle .edit .reEdit{
    background: #fff;
    position: absolute;
    right: 2px;
    top:20px;
    z-index: 99;
    width: 50%;
    border-radius: 2px;
    box-shadow: 0px 0px 8px #ccc;
    border-right: 1px solid #e4e7ed;
  }
  .totalArticle .edit .reEdit ul{
    margin: 0;
    padding: 0;
  }
  .totalArticle .edit .reEdit li{
    padding-left: 8px;
    list-style: none;
    line-height: 30px;
    border-bottom: 1px solid #e4e7ed;
  }
  .articleContent .articleTitle,.titles{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    word-wrap:break-word;
    word-break:break-all;
    margin-bottom: 5px;
    margin-top: 5px;
  }
  .articleContent .articleImages{
    display: flex;
    flex-direction: row;
    margin: 10px auto;
  }
  .articleImages>div{
    width: 100%;
    margin-right: 5px;
  }
  .articleImages>div img{
    width: 100%;
    height: 100%;
  }
  .articleDescription{
    overflow: hidden;
  }
  .articleDescription span{
    width: auto;
    float: left;
    line-height: 25px;
    margin-right: 10px;
  }
  .articleDescription img{
    width: 20px;
    height: 20px;
    vertical-align: middle;
  }
  /*参与活动*/
  .joinActivities{
    margin-bottom: 50px;
    padding: 5px;
  }
  .joinActivities .myJoin{
    overflow: hidden;
    margin-bottom: 10px;
  }
  .joinActivities .myJoin p{
    padding: 3px;
    background: rgba(255,250,227,1);
    position: absolute;
    left: 0;
    top:0;
  }
  .joinActivities .myJoin>div{
    position: relative;
    float: left;
    width: 49%;
    margin-right: 5px;
  }
  .joinActivities .myJoin>div:nth-of-type(2n){
    margin-right: 0px;
    padding-right: 0;
  }
  .joinActivities .myJoin .imgs img{
    width: 100%;
    height: 100%;
  }
</style>

