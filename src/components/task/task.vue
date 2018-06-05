<template>
    <div>
      <!--签到-->
      <div class="signIn">
        <div class="coins"><span>30金币</span><span>签到</span></div>
        <div>明日签到可得15金币</div>
        <div class="days">
          <div><span>1天</span><span>30</span></div>
          <div><span>2天</span><span>15</span></div>
          <div><span>3天</span><span>15</span></div>
          <div><span>4天</span><span>15</span></div>
          <div><span>5天</span><span>15</span></div>
          <div><span>6天</span><span>15</span></div>
          <div><span>7天</span><span>15</span></div>
        </div>
      </div>
      <!--日常任务-->
      <div class="dailyTask">
        <div class="daily">日常任务</div>
        <div class="tasks">
          <div><span>认真阅读文章或视频</span><span>每次奖励{{rule.num10}}金币，每天{{rule.num9}}次</span></div>
          <div><span>领{{rule.num10}}金币</span></div>
        </div>
        <div class="tasks">
          <div><span>分享文章或视频</span><span>每次分享奖励{{rule.num12}}金币，每天{{rule.num11}}次</span></div>
          <div><span>领{{rule.num12}}金币</span></div>
        </div>
        <div class="question">
          如有疑问请参考<span @click="profitStrategy">赚钱攻略</span>
        </div>
      </div>
      <!--兑换商品-->
      <div class="exchange">
        <exchange-detail :productList="productList"></exchange-detail>
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
            console.log(response.data)
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
  .signIn .days{
    display: flex;
    flex-direction: row;
    margin-top: 5px;
  }
  .signIn .days>div{
    width: 100%;
  }
  .signIn .days>div span{
    width: auto;
    height: auto;
    /*font-size: 0.5rem;*/
  }
  .signIn .days>div span:last-of-type{
    border:1px solid #ccc;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    line-height: 25px;
    margin: 0 auto;
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
  }
</style>
