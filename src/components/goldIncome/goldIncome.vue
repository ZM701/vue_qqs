<template>
  <div>
    <div class="navMy">
      <span @click="goback"><i class="	glyphicon glyphicon-chevron-left"></i></span>
      <span>金币收益</span>
    </div>
     <div>
       <!--金币收益，兑换规则-->
       <div class="navBar">
         <div>
           <span>金币收益（个）</span>
           <span class="coinNum">30</span>
         </div>
         <div>
           <span>兑换规则</span>
           <span class="btn" @click="exchangeGoods">去兑换</span>
         </div>
       </div>
       <!--青青说  商城 -->
       <div class="navTab">
         <span @click="f1" :class="flage1?'active':''">青青说</span>
         <span @click="f2" :class="flage2?'active':''">商城</span>
       </div>
       <div v-if="flage1" class="content">
         <dl>
           <dt><span>签到</span><span>2018.08.09</span></dt>
           <dd>+10</dd>
         </dl>
         <dl>
           <dt><span>签到</span><span>2018.08.09</span></dt>
           <dd>+10</dd>
         </dl>
         <div class="fotter">系统仅展示最近30天的收益</div>
       </div>
       <div v-if="flage2">
         商城
       </div>
     </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import qs from 'qs';
  export default {
    data(){
      return{
        flage1:true,
        flage2:false,
        info:null
      }
    },
    created(){
      this.information()
    },
    methods:{
      // 返回到上一层
      goback() {
        this.$router.push({
          path: '/my',
          name: 'my',
        })
      },
      // 点击切换到青青说
      f1(){
        this.flage1 = true;
        this.flage2 = false;
      },
      // 点击切换到商城
      f2(){
        this.flage1 = false;
        this.flage2 = true;
      },
      //点击跳转到兑换商品页面
      exchangeGoods(){
        this.$router.push({
          path: '/exchangeGoods',
          name: 'exchangeGoods',
          params: {
          }
        })
      },
      information(){
        var _this = this;
        this.$http.post('https://nwsapi.nanniwan.com/nws_cms/article/mine', qs.stringify({
          uid: uid,
          pageNum: 1,
          pageSize: 5,
          status:this.status   // 0文章  1活动
        })).then((response) => {
          this.info = response.data
          console.log(this.info)
        });
      },
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
  .navBar,.navTab{
    display: flex;
    flex-direction: row;
    margin: 10px auto;
    border-bottom: 1px solid #e4e7ed;
  }
  .navBar>div,.navTab>span{
    width: 100%;
    text-align: center;
    margin-bottom: 5px;
    margin-top: 5px;
  }
  .navBar div span{
    height: auto;
    margin-bottom: 10px;
  }
  .navBar div .coinNum{
    font-size: 2rem;
    color: red;
    font-weight: bold;
  }
  .navBar div .btn{
    background: #3a8ee6;
    width: 100px;
    color: #fff;
    border-radius: 20px;
  }
  .navTab{
    padding-bottom: 10px;
  }
  .navTab span:first-of-type{
    border-right: 1px solid #e4e7ed;
  }
  .active{
    color: #4cae4c;
  }
  .content dl{
    overflow: hidden;
    margin-bottom: 10px;
    padding: 5px 10px;
    border-bottom: 1px solid #e4e7ed;
  }
  .content dl dt{
    float: left;
    font-weight: normal;
  }
  .content dl dt span{
    text-align: left;
  }
  .content dl dd{
    float: right;
    line-height: 42px;
    color: red;
  }
  .fotter{
    text-align: center;
  }
</style>
