<template>
    <div>
      <div class="navMy">
        <span @click="goback"><i class="	glyphicon glyphicon-chevron-left"></i></span>
        <span>参与活动</span>
      </div>
      <!--参与活动-------------------------------------------------------------->
       <div class="joinActivities">
         <div class="myJoin">
           <!--state :1 我参与的      state :2   我投票的活动-->
           <div class="changeTab">
             <span @click="f1" :class="flage1?'active':'unacticve'">我参与的</span>
             <span  @click="f2" :class="flage2?'active':'unacticve'">我投票的</span>
           </div>
           <div class="change" v-show="flage1" v-for="(item,index) in info.myActivity">
             <div class="imgs"><img :src="item.goods_banner"/></div>
             <div class="titles">{{item.title}}</div>
             <div class="time">{{item.start_time}} &nbsp;参与人数{{item.activityNum}}</div>
           </div>
           <div class="change" v-show="flage2" v-for="(item,index) in info.activity">
             <div class="imgs"><img :src="item.goods_banner"/></div>
             <div class="titles">{{item.title}}</div>
             <div class="time">{{item.start_time}} &nbsp;参与人数{{item.activityNum}}</div>
           </div>
         </div>
       </div>

    </div>
</template>

<script type="text/ecmascript-6">
  import qs from "qs";
    export default {
      data(){
        return{
          flage1:true,  //我参与的
          flage2:false,   //我投票的
          info:{},  //数据渲染
          status:1,   // 1参与的   2投票的
        }
      },
      methods:{
          goback() {
            this.$router.push({
              path: '/my',
              name: 'my',
            })
          },
        //我参与的
        f1(){
          this.flage1 = true;
          this.flage2 = false;
          this.status = 1;
          this.information();
        },
        //我投票的
        f2(){
          this.flage1 = false;
          this.flage2 = true;
          this.status = 2;
          this.information();
        },
        information(){
          var _this = this;
          this.$http.post('/api/mine', qs.stringify({
            uid: uid,
            pageNum: 1,
            pageSize: 5,
            status:this.status,   // 1活动
          })).then((response) => {
            _this.info = response.data;
            console.log(response.data)
          });
        },
      },
      created(){
        this.information()
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
  .active{
    color: #66B672;
    border-bottom: 1px solid #66B672;
  }
  .unacticve{
    color: #000;
    border:none;
  }
  /*参与活动*/
  .changeTab{
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
  }
  .changeTab span{
    width: 100%;
    line-height: 30px;
  }
  .joinActivities{
    margin-bottom: 50px;
    padding: 5px;
  }
  .joinActivities .myJoin{
    overflow: hidden;
    margin-bottom: 10px;
  }
  .joinActivities .myJoin .change{
    float: left;
    width: 49%;
    margin-right: 5px;
    height: 150px;
    margin-bottom: 10px;
  }
  .joinActivities .myJoin .change:nth-of-type(2n+1){
    margin-right: 0px;
    padding-right: 0;
  }
  .joinActivities .myJoin .imgs{
    width: 100%;
    height: 100px;
  }
  .joinActivities .myJoin .imgs img{
    width: 100%;
    height: 100%;
  }
</style>
