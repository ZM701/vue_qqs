<template>
  <div class="one">
    <v-user :userInfo="userInfo"></v-user>
    <v-article :msg="msg"></v-article>
  </div>
</template>

<script type="text/ecmascript-6">
  import article from "../articleDetail/articleDetail"
  import user from "../userInfo/userInfo"
  export default {
    props: {
      "msg":{
        type:Array
      },
      "userInfo":{
        type:Array
      }
    },
    components:{
      'v-article':article,
      'v-user':user
    },
    mounted(){
    }
  }
</script>

<style scoped>
  .one p{
    text-align: center;
    height: 30px;
  }

</style>
