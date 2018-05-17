<template>
  <div>
    <div class="swipe-wrapper">
      <mt-swipe :auto="3000" ref="swipeWrapper">
        <mt-swipe-item class="swip-item-1 item" v-for="(item,index) in banner" :key="index"><img :src="item.image"/></mt-swipe-item>
      </mt-swipe>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props:[
      "banner"
    ]
  }
</script>

<style scoped>
  /*swiper开始*/
  .swipe-wrapper{
    width: 100%;
    height: 150px;
  }
  .swip-item-1{
    background: red;
  }
  .item img{
    width: 100%;
    max-width: 100%;
  }
</style>
