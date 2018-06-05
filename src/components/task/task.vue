<template>
    <div>
      <!--签到-->
      <div class="signIn">
        <!--//0未签到  1已签到-->
        <div class="coins"><span>{{sign.integral_now}}积分</span><span v-if="sign.isSignin==0">签到</span><span span v-if="sign.isSignin==1">已签到</span></div>
        <div>已连续签到{{sign.daynum}}天</div>
        <!--<div class="aa">明日签到可得{{sign.num}}积分</div>-->
        <div class="days">
          <li class="date"><span :class="date[0]==1?'on':''">{{sign.num}}v</span></li>
          <span class="line" :class="date[1]==2?'on':''"></span>
          <li class="date"><span :class="date[1]==2?'on':''">{{sign.num}}v</span></li>
          <span class="line" :class="date[2]==3?'on':''"></span>
          <li class="date"><span  :class="date[2]==3?'on':''">{{sign.num}}v</span></li>
          <span class="line" :class="date[3]==4?'on':''"></span>
          <li class="date"><span :class="date[3]==4?'on':''">{{sign.num}}v</span></li>
          <span class="line" :class="date[4]==5?'on':''"></span>
          <li class="date"><span :class="date[4]==5?'on':''">{{sign.num}}v</span></li>
          <span class="line" :class="date[5]==6?'on':''"></span>
          <li class="date"><span :class="date[5]==6?'on':''">{{sign.num}}v</span></li>
          <span class="line" :class="date[6]==7?'on':''"></span>
          <li class="date"><span :class="date[6]==7?'on':''">{{sign.num}}v</span></li>
        </div>
        <div class="time">
          <li class="date"><span>1</span></li>
          <span class="line"></span>
          <li class="date"><span>2</span></li>
          <span class="line"></span>
          <li class="date"><span>3</span></li>
          <span class="line"></span>
          <li class="date"><span>4</span></li>
          <span class="line"></span>
          <li class="date"><span>5</span></li>
          <span class="line"></span>
          <li class="date"><span>6</span></li>
          <span class="line"></span>
          <li class="date"><span>7</span></li>
        </div>
      </div>
      <!--日常任务-->
      <div class="dailyTask">
        <div class="daily">日常任务</div>
        <div class="tasks">
          <div><span>认真阅读文章或视频</span><span>每次奖励{{rule.num10}}积分，每天{{rule.num9}}次</span></div>
          <div><span>领{{rule.num10}}积分</span></div>
        </div>
        <div class="tasks">
          <div><span>分享文章或视频</span><span>每次分享奖励{{rule.num12}}积分，每天{{rule.num11}}次</span></div>
          <div><span>领{{rule.num12}}积分</span></div>
        </div>
        <div class="question">
          如有疑问请参考<span @click="profitStrategy">赚钱攻略</span>
        </div>
      </div>
      <!--兑换商品-->
      <div class="exchange">
        <exchange-detail :productList="productList" :money="money"></exchange-detail>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import qs from 'qs'
  import exchangeDetail from '../exchangeDetail/exchangeDetail'
    export default {
      components:{
        exchangeDetail
      },
      data(){
        return{
          productList:[],   // 商品列表
          rule:{},   //日常任务
          sign:{},   //登录签到
          date: [1, 2, 3, 4],
          money:null,  //积分收益
        }
      },
      created(){
        this.taskInt();
      },
      methods:{
        //跳转到赚钱攻略
        profitStrategy(){
          this.$router.push({
            path: '/profitStrategy',
            name: 'profitStrategy',
            params: {
            }
          })
        },
        //页面请求
        taskInt(){
          var _this = this;
          this.$http.post('/book/integral/taskCenter', qs.stringify({
            user_token: user_token,
            uuid: uuid,
            unionid:unionid,
            pageNum: 1,
            pageSize: 10
          })).then((response) => {
            this.productList = response.data.product.productList;
            this.rule = response.data.rule;
            this.sign = response.data.sign;
            this.money = this.sign.integral_now;
          });
        }
      },

    }
</script>

<style scoped>
  .signIn{
    padding: 10px;
    border-bottom: 1px solid #e4e7ed;
    margin-bottom: 10px;
  }
  .signIn .coins{
    overflow: hidden;
  }
  .signIn .coins span:first-of-type{
    font-weight: bolder;
    font-size: 1.6rem;
    width: auto;
    float: left;
  }
  .signIn .coins span:last-of-type{
    float: right;
    background: #3a8ee6;
    width: 80px;
    height: 30px;
    line-height: 30px;
    color: #fff;
    border-radius: 20px;
  }
  .signIn .days,.signIn .time{
    display: flex;
    flex-direction: row;
    margin-top: 5px;
  }
  .signIn .days li,.signIn .days span,.signIn .time li,.signIn .time span{
    list-style: none;
    width: 100%;
    font-size: 0.5rem;
  }
  .signIn .days li span{
    text-align: center;
    width: 24px;
    height: 24px;
    line-height: 24px;
    border-radius: 50%;
    background: #ccc;
    color: #666;
  }
  .days>span{
    background: #ccc;
    height: 1px;
    margin-top: 10px;
    padding-right: 8px;

  }
  /*选中签到的样式*/
  .signIn .days span.on {
    background: orangered;
    color: #fff;
  }
  /*日常任务*/
  .dailyTask{
    /*padding: 10px;*/
  }
  .dailyTask .daily{
    padding:10px;
    border-bottom:1px solid #e4e7ed;
  }
  .dailyTask .tasks{
    overflow: hidden;
    padding: 20px 10px;
    border-bottom: 1px solid #e4e7ed;
  }
  .dailyTask .tasks>div:first-of-type{
    float: left;
  }
  .dailyTask .tasks>div span{
    text-align: left;
  }
  .dailyTask .tasks>div:last-of-type{
    float: right;
  }
  .dailyTask .tasks>div:last-of-type span{
    background: #3a8ee6;
    width: 80px;
    height: 30px;
    line-height: 30px;
    color: #fff;
    border-radius: 20px;
    text-align: center;
  }
  .question{
    text-align: center;
    margin: 20px 0;
  }
  .question span{
    display: inline-block;
    width: auto;
    color: #3a8ee6;
    border-bottom: 1px solid #3a8ee6;
    margin-left: 5px;
  }
  .exchange{
    margin-bottom: 100px;
    max-height: 970px;
    overflow: hidden;
  }

</style>

