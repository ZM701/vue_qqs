<template>
  <div>
    <!--接收articleDetail传递的值-->
    <video :src="$route.params.video_url" autoplay></video>
    <!--<h1>{{$route.params.video_url}}</h1>-->
  </div>
</template>

<script>

  export default {
    data(){
      return{

      }
    },
  }
</script>
<style>
  video{
    width: 100%;
    object-fit: fill;
  }
</style>
