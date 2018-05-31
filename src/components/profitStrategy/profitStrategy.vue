<template>
    <div>
      <div class="navMy">
        <span @click="goback"><i class="	glyphicon glyphicon-chevron-left"></i></span>
        <span>赚钱攻略</span>
      </div>
      <div class="strategyNav">
        <div @click="f1" :class="flage1?'active':''">图文教程</div>
        <div @click="f2" :class="flage2?'active':''">视频教程</div>
      </div>
      <div v-if="flage1" class="box1">
        <ul>
          <li>金币</li>
          <li>金币是什么<i class="	glyphicon glyphicon-chevron-right"></i></li>
          <li>金币如何兑换代金券？<i class="	glyphicon glyphicon-chevron-right"></i></li>
        </ul>
      </div>
      <div v-if="flage2" class="box2">
        22
      </div>

    </div>
</template>

<script>
    export default {
      data(){
        return{
          flage1:true,  //图文教程
          flage2:false,   //视频教程
        }
      },
      methods:{
        // 返回到上一层
        goback() {
          this.$router.push({
            path: '/task',
            name: 'task',
          })
        },
        //文章
        f1(){
          this.flage1 = true;
          this.flage2 = false;
        },
        //视频
        f2(){
          this.flage1 = false;
          this.flage2 = true;
        },
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
  .strategyNav{
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
    margin-top: 10px;
  }
  .strategyNav div{
    width: 100%;
    text-align: center;
    padding-bottom: 10px;
  }
  .box1 ul li{
    padding: 10px;
    border-bottom: 1px solid #e4e7ed;
    position: relative;
  }
  .box1 ul li i{
    position: absolute;
    right: 5px;
    top:10px;
    color: #ccc;
  }
  .active{
    color: #66B672;
    border-bottom: 1px solid #66B672;
  }
</style>
