<template>
    <div>
      <div class="exchangeDetail">
        <div class="navChange">兑换商品</div>
        <dl v-for="(item,index) in productList">
          <dt><img :src="item.goods_img"></dt>
          <dd><span>{{item.goods_name}}</span><span class="money">{{item.goods_price}}元</span></dd>
        </dl>
      </div>
    </div>
</template>

<script>
    export default {
        props:['productList']
    }
</script>

<style scoped>
  .navChange{
    background: #e0e0e0;
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
    font-weight: bolder;
    font-size: 1.5rem;
  }
  .exchangeDetail dl{
    padding: 5px;
    overflow: hidden;
    margin-bottom: 5px;
    border-bottom:1px solid #e4e7ed;
  }
  .exchangeDetail dl dt{
    float: left;
    width: 28%;
    margin-right: 10px;
  }
  .exchangeDetail dl dt img{
    width: 100px;
    height: 100px;
  }
  .exchangeDetail dl dd{
    width: 66%;
    float: left;
    padding: 5px 0;
  }
  .exchangeDetail dl dd span:first-of-type{
    text-align: left;
    height: 55px;
  }
  .exchangeDetail dl dd .money{
    width: 100%;
    text-align: right;
    color: red;
    font-size: 2rem;
  }

</style>
