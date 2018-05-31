<template>
<div>
  <div class="navMy">
    <span @click="goback"><i class="	glyphicon glyphicon-chevron-left"></i></span>
    <span>兑换商品</span>
  </div>
  <div class="navCoin">
    <div><span>总金币（个）</span><span class="coinNum">30</span></div>
    <div><span>兑换规则</span></div>
  </div>
  <div>
    <exchange-detail></exchange-detail>
  </div>
  <div class="footerBar">
    <span>当前余额不足，快去做任务赚钱</span>
    <span @click="goTask">马上做任务赚钱</span>
  </div>
</div>
</template>

<script>
  import exchangeDetail from '../exchangeDetail/exchangeDetail'
    export default {
      components:{
        exchangeDetail
      },
      methods: {
        // 返回到上一层
        goback() {
          this.$router.push({
            path: '/goldIncome',
            name: 'goldIncome',
          })
        },
        //点击跳转到任务
        goTask(){
          this.$router.push({
            path: '/task',
            name: 'task',
            params: {
            }
          })
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
  .navCoin{
    overflow: hidden;
    padding: 10px;
  }
  .navCoin>div:first-of-type{
    float: left;
    width: 80%;
    text-align: center;
  }
  .navCoin>div:last-of-type{
    float: right;
  }
  .navCoin div .coinNum{
    font-size: 2.5rem;
    color: red;
    font-weight: bold;
  }
  .footerBar{
    margin-top: 10px;
  }
  .footerBar span:last-of-type{
    width: 200px;
    margin: 8px auto;
    height: 40px;
    line-height: 40px;
    background: #3A8EE6;
    color: #fff;
    border-radius: 20px;
  }
</style>
