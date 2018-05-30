<template>
    <div>
      <div class="navMy">
        <span @click="goback"><i class="	glyphicon glyphicon-chevron-left"></i></span>
        <span>收藏</span>
      </div>
      <div class="collentionNav">
        <div @click="f1" :class="flage1?'active':''">文章</div>
        <div @click="f2" :class="flage2?'active':''">视频</div>
      </div>
      <div v-if="flage1" >
        <v-article :msg="msg" :icon="icon" @childSay="listenToF3" @childCollectionSay="listenToCollection"></v-article>
      </div>
      <div v-if="flage2" >
        <v-article :msg="msg" :icon="icon" @childSay="listenToF3" @childCollectionSay="listenToCollection"></v-article>
      </div>
    </div>
</template>

<script>
  import qs from 'qs';
  import article from "../articleDetail/articleDetail"
    export default {
      data(){
        return{
          msg:null,
          flage1:true,  //文章
          flage2:false,   //视频
          status:0,   // 0文章  1视频
          icon:true,  //是否存在取消收藏的按钮
        }
      },
      components:{
        'v-article':article
      },
      created(){
        this.information();
      },
        methods:{
          //取消收藏的显示隐藏
          listenToF3(index){
            var display = $(".cancleCollection").eq(index).css("display");
            if(display=="none"){
              $(".cancleCollection").eq(index).css("display","block")
            }else{
              $(".cancleCollection").eq(index).css("display","none")
            }
          },
          //点击取消收藏
          listenToCollection(index,article_id){
            var _this = this;
            this.$confirm('确认取消收藏?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            })
              .then(() => {
                // event.preventDefault();
                this.listenToF3(index);
                //调用删除的接口
                this.$http.post("/api/article/collection", qs.stringify({
                  uid: uid,
                  article_id:article_id,
                  status:1   //0=添加 1=取消
                })).then(response => {
                  //提示取消成功
                  _this.$message({
                    type: 'success',
                    message: '取消成功!'
                  });
                  //刷新页面
                  _this.information();
                })
              })
              .catch(() => {
                this.listenToF3(index);
              });
          },
          information(target){
            var _this = this;
            this.$http.post('/api/article/collection_list', qs.stringify({
              uid: uid,
              pageNum: 1,
              pageSize: 10,
              status:this.status   // 3:activity相关活动   2:article 相关文章  1:user相关用户  0:所有
            })).then((response) => {
              //_this.info = response.data.search;
              this.msg = response.data.list
              //console.log(response.data)
            });
            // this.$root.eventHub.$emit('information', target);
          },
          goback() {
            this.$router.push({
              path: '/my',
              name: 'my',
            })
          },
          //文章
          f1(){
            this.flage1 = true;
            this.flage2 = false;
            this.status = 0;
            this.information();
          },
          //视频
          f2(){
            this.flage1 = false;
            this.flage2 = true;
            this.status = 1;
            this.information();
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
  .collentionNav{
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
  }
  .collentionNav div{
    width: 100%;
    text-align: center;
    padding-bottom: 10px;
  }
  .active{
    color: #66B672;
    border-bottom: 1px solid #66B672;
  }
 /* .unacticve{
    color: #000;
    border:none;
  }*/
</style>
