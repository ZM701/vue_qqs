<template>
  <div>
    <div class="navMy">
      <span @click="goback"><i class="	glyphicon glyphicon-chevron-left"></i></span>
      <span>金币收益</span>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    methods:{
      goback() {
        this.$router.push({
          path: '/my',
          name: 'my',
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
</style>
