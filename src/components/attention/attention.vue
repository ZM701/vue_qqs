<template>
    <div>
      <div class="navMy">
        <span @click="goback"><i class="	glyphicon glyphicon-chevron-left"></i></span>
        <span v-show="type == 1 ">关注</span>
        <span v-show="type == 2 ">粉丝</span>
      </div>
      <div>
        <attention-fans :info="info" :type="type" :fenInfo="fenInfo"></attention-fans>
      </div>
    </div>
</template>

<script>
  import attentionFans from '../../components/attentionFans/attentionFans';
    export default {
      data(){
        return{
          info:null,  //关注数据
          type:null,
          fenInfo:null,   //粉丝数据
        }
      },
      methods: {
        //返回上一页
        goback() {
          this.$router.push({
            path: '/my',
            name: 'my',
          })
        },
        //关注请求
        attention(){
          this.$http.get("/api/user/get_follows.api", {
            params: {
              uid:uid,
              pageNum:1,
              pageSize:10
            }
          }).then(response => {
            this.info =  response.data.follows;
            /*console.log("关注:")
            console.log(this.info);*/
          }, response => {
            console.log("获取信息失败");
            console.log(response);
          })
        },
        //粉丝请求
        fans(){
          this.$http.get("/api/user/get_followers.api", {
            params: {
              relation_touid:uid,
              pageNum:1,
              pageSize:10
            }
          }).then(response => {
            // this.info =  response.data;
            this.fenInfo = response.data.followers;
            /*console.log("粉丝:")
            console.log(this.fenInfo);*/
          }, response => {
            console.log("获取信息失败");
            console.log(response);
          })
        }
      },
      components: {
        attentionFans
      },
      created(){
        this.type = this.$route.params.type;
        this.attention();   //关注
        this.fans();
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
