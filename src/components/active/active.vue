<template>
    <div>
      <div class="swipe-wrapper">
        <mt-swipe :auto="3000" ref="swipeWrapper">
          <mt-swipe-item class="swip-item-1 item"><img src="../../../static/images/p1.jpg"/></mt-swipe-item>
          <mt-swipe-item class="swip-item-1 item"><img src="../../../static/images/p2.jpg"/></mt-swipe-item>
        </mt-swipe>
      </div>
      <!--投票活动-->
      <div class="vote">
        <div class="title">投票活动</div>
        <div>
          <dl>
            <dt><img src="../../../static/images/play.png"/><span>3天18小时24分</span></dt>
            <dd><span>活动标题活动标题活动标题活动标题</span><span>参与人数4556人</span></dd>
          </dl>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
      route: {
        canReuse: false,
      },
      data(){
        return{
        }
      },
      methods:{

      },
    }
</script>

<style scoped>
  /*swiper开始*/
  .swipe-wrapper{
    width: 100%;
    height: 150px;
  }
  .swip-item-1{
    width: 100%;
    height: 100%;
    background: #fff;
  }
  .item img{
    width: 100%;
    max-width: 100%;
  }
  /*投票活动*/
  .vote .title{
    background: #e4e7ed;
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
  }
  .vote dl{
    overflow: hidden;
    padding-left: 5px;
  }
  .vote dl dt,.vote dl dd{
    float: left;
  }
  .vote dl dt{
    margin-right: 10px;
    width: 100px;
    height: 100px;
    position: relative;
  }
  .vote dl dt img{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top:0;
  }
  .vote dl dt span{
    position: absolute;
    left: 0;
    bottom: 0;
    height: 25px;
    line-height: 25px;
    font-weight: normal;
    color: #fff;
    background: rgba(0,0,0,0.5);
  }
  .vote dl dd{
    width: 70%;
  }
  .vote dl dd span:first-of-type{
    width: auto;
    padding-top: 5px;
    height: 80px;
    text-align: left;
    overflow: hidden;
  }
  .vote dl dd span:last-of-type{
    color: #666;
    text-align: left;
  }
</style>
