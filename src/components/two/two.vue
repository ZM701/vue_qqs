<template>
  <div class="two">
    <div class="loading" v-show="show">
      <p>内容加载中......</p>
    </div>
    <div class="content" v-show="toggleShow">
      <v-banner :banner="banner"></v-banner>
      <v-article :msg="msg"></v-article>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import article from "../articleDetail/articleDetail"
  import banner from "../banner/banner"
  export default {
    props: {
      "msg":{
        type:Array
      },
      "userInfo":{
        type:Array
      },
      "banner":{
        type:Array
      }
    },
    data() {
      return {
        show: true,
        toggleShow: false,
        isLoad: false,
      }
    },
    mounted() {
      this.initFunc();
    },
    methods: {
      initFunc() {
        if (!this.isLoad) {
          setTimeout(() => {
            this.show = false;
            this.toggleShow = true;
            this.isLoad = true;
          }, 2000)
        } else {
          this.show = false;
          this.toggleShow = true;
        }
      }
    },
    components:{
      'v-article':article,
      'v-banner':banner
    },
    watch: {
      '$route' (to, from) {
        // console.log(from.path)
        if(from.path=='/task'){
          location.reload() //页面刷新
        }
      }
    }
  }
</script>

<style scoped>
  .two p{
    text-align: center;
    height: 30px;
  }

</style>
