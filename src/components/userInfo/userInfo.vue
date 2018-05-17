<template>
    <div>
      <div class="users">
        <div v-for="(item,index) in userInfo">
          <img :src="item.image"/>
          <span>{{item.nickname}}</span>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      props: {
        "userInfo":{
          type:Array
        }
      },
    }
</script>

<style scoped>
  .users{
    padding: 5px 5px 0 5px;
    display: flex;
    flex-direction: row;
    height: 95px;
    margin-bottom: -15px;
  }
  .users>div{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-left: 3%;
  }
  .users div:last-of-type{
    margin-right: 0;
  }
  .users div img{
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }
  span{
    display: block;
    text-align: center;
    width: 100%;
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
