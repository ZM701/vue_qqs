<template xmlns:v-popover="http://www.w3.org/1999/xhtml">
  <div id="search">
    <div class="searchBar">
      <!--<router-link to="/index" class="box1">返回</router-link>-->
      <div class="top">
        <div @click="$router.go(-1)" class="box1">返回</div>
        <el-input
          v-model="input"
          placeholder="请输入内容"
          @keyup.native.enter="search(input)"
          class="searchInput fl box2">
        </el-input>
        <span class="sousuo">搜索</span>
      </div>
      <el-popover
        ref="popover4"
        placement="bottom"
        trigger="click"
        id="popover">
        <ul class="searchList" v-show="test.length != 0">
          <li class="searchListItems" v-for="(item,index) in test">
						<span @click="historySearch(item)">
              <i class="glyphicon glyphicon-search" size="14" style="color: #ccc;vertical-align: middle;margin-right: 3px;"></i>
							{{item}}
						</span>
            <i class="el-icon-delete fr" @click.prevent="clearThisHistory(index)"></i>
            <div style="clear:both;"></div>
          </li>
          <div class="clearHistory" @click="clearHistory" style="margin-top: 10px;">清空历史记录</div>
        </ul>
        <ul class="noHistory" v-show="test.length == 0">
          暂无历史搜索记录
        </ul>
      </el-popover>
      <span class="toutiaoIcon box3" v-popover:popover4 >历史记录</span>
      <div style="clear: both;"></div>
    </div>
    <div v-show="loading" v-loading="loading" element-loading-text="拼命加载中" style="width: 100%" class="loading"></div>
    <div class="searchNews">
      <div>
        <!--<router-link
          v-for="(val,index) in con"
          :to="{
                    name:'newsdetail',
                    params:
                        {   id:val.tag_id,
                            title:val.title,
                            media_info:val.media_info,
                            media_name:val.media_name,
                            datetime:val.datetime,
                            abstract:val.abstract,
                            image_list:val.image_list,
                            repin_count:val.repin_count,
                            comment_count:val.comment_count,
                            keywords:val.keywords
                        }
                }"
          :key="index"
          class="searchNewsItem"
          v-show="val.media_creator_id&&val.title"
        >-->
        <!--<v-searchpage :input="input"></v-searchpage>-->
        <!--<h3>{{val.article_title}}</h3>-->
        <!-- <p class="title" v-html="replace(val.title,input)"></p>
         <div>
           <img alt="加载出错" v-for="(img,index) in val.image_list" :key="index" v-lazy="img.url">
           <div class="bottomInfo clearfix">
             <Icon type="fireball" size="10" color="#d43d3d" v-show="val.hot===1"></Icon>
             <span class="avIcon" v-show="val.label==='广告'">广告</span>
             <span class="writer">{{val.media_name}}</span> &nbsp;&nbsp;
             <span class="comment_count">评论&nbsp;{{val.comment_count}}</span>
             <span class="datetime">{{val.datetime}}</span>
           </div>
         </div>-->
      </div>
    </div>
    <div style="border:1px solid red; margin-top: 60px;">哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</div>
  </div>
</template>
<script>
  import qs from 'qs';
  import store from '../../store.js'
  export default{
    data(){
      return {
        loading:false,
        flag:true,
        input:'',
        con:[],
        test:store.fetch(),
        searchCon:'',
        status:0,   //  0=搜索结果  1=查看更多用户   2=查看更多文章  3=查看更多活动
      }
    },
    watch: {
      test: {
        handler: function(val, oldVal) {
          store.save(val);
        },
        deep: true
      }
    },
    beforeRouteLeave (to, from, next){
      if(to.name == 'home'){
        this.con = [];
        this.input = '';
        //document.getElementsByClassName('el-popover')[0].style.display = 'none';
        next();
      }
      next();
    },
    methods:{
      replace(title,inp){
        const reg = new RegExp(''+inp+'','gim');
        if(title){
          return title.replace(reg,'<font class="red">'+inp+'</font>')
        }else{
          return title;
        }
      },
      historySearch(item){
        this.input = item;
        this.flag = false;
        this.search(item);
        this.con = [];
        this.$nextTick(function(){
          //document.getElementsByClassName('el-popover')[0].style.display = 'none';
        })
      },
      clearHistory() {
        this.$confirm('确认清空历史记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.test = [];
            var val = JSON.parse(JSON.stringify(this.test))
            store.save(val);
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          })
          .catch(() => {

          });
      },
      clearThisHistory(index){
        this.$confirm('确认删除此条历史记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.test.splice(index,1);
            var val = JSON.parse(JSON.stringify(this.test))
            store.save(val);
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          })
          .catch(() => {

          });
      },
      //回车搜索
      search(input){
        //搜索跳转
        this.$router.push({
          path: '/searchResult',
          name: 'searchResult',
          params: {
            keyWords: this.input,
          }
        })
        console.log(111)
        const _this = this;
        input = input.trim();
        if(input){
          if(this.searchCon == input){
            if(this.flag){
              return ;
            }
          }
          _this.loading = true;

          /*jsonp('http://www.toutiao.com/search_content/?offset=0&format=json&keyword='+input+'&autoload=true&count=20&cur_tab=1',function(err,res){
           _this.con = res.data;
           _this.loading = false;
         })*/
         /* this.$http.post('/api/search', qs.stringify({
            uid: uid,
            keywords: this.input,
            pageNum: 1,
            pageSize: 5,
            status:this.status
          })).then((response) => {
            _this.con = response.data.search.article;
            _this.loading = false;
            //console.log(_this.con)
          });*/
          //存储数据
          this.test.unshift(input);
          var val = JSON.parse(JSON.stringify(this.test))
          store.save(val);
          this.searchCon = input;
          this.flag = true;
        }else{
          this.searchCon = '';
          this.con = [];
        }
        //console.log(_this.con)
      }
    },
  }
</script>
<style>
  .box1{
    width: 50px;
    line-height: 40px;
  }
  .box2{
    margin: 0 2%;
    width: 70% !important;
  }
  .box1,.box2{
    float: left;
  }
  .red{
    color: red;
  }
  .box3{
    margin-top: 50px;
  }
  .searchBar {
    margin-top: 1.3rem;
    width: 100%;
  }
  .top{
    width: 100%;
    height: 50px;
    position: fixed;
    z-index: 99999999;
    top:0px;
    padding-top: 10px;
    padding-left: 10px;
    background: #fff;
  }
  .sousuo{
    line-height: 40px;
  }
  .toutiaoIcon{
    display: inline-block;
    padding: 0 .05rem;
    font-size: 13px;
    text-align: center;
    width: 20%;
    line-height: 40px;
  }
  .searchInput{
    width: 60%;
  }

  .loading{
    margin-top: 1rem;
  }

  .searchNewsItem {
    width: 94%;
    display: block;
    position: relative;
    margin: 0 auto;
    padding-bottom: 0.15rem;
  }
  .title {
    font-size: 16px;
    font-weight: bold;
    color: #000;
    padding-top: 0.2rem;
    padding-bottom: 0.15rem;
  }
  .searchNewsItem img {
    width: 31.1%;
    margin-right: 0.21rem;
    height: 2.3rem;
  }
  .bottomInfo {
    font-size: 10px;
    margin-top: 0.15rem;
  }
  .writer {
    color: #000;
  }
  .comment_count {
    color: #000;
  }
  .datetime {
    float: right;
    color: #000;
  }
  .avIcon {
    display: inline-block;
    height: 0.4rem;
    width: 0.9rem;
    text-align: center;
    line-height: 0.4rem;
    border-radius: 4px;
    border: 1px solid #39f;
    font-size: 10px;
    margin-right: 0.1rem;
  }

  .el-popover {
    display: block !important;
    width: 100%;
    top:100px;
    margin-bottom: 50px;
  }
  .searchListItems{
    height: 30px;line-height: 30px;
    border-bottom: 1px solid #F1F1F1;
    display: block;
    position: relative;
    font-size: 16px;
  }
  .searchListItems span{
    width: 90%;
    text-align: left;
    padding-left: 10px;
    float:left;
  }
  .searchListItems>i{
    float: left;
    line-height: 30px;
  }
  i{
    padding: 0 .2rem;
    line-height: .9rem;
  }

  .clearHistory{
    font-size: 14px;
    height: .7rem;
    line-height: 1rem;
    text-align: center;
  }
  .noHistory{
    font-size: 14px;
  }
  /*删除对话框*/
  .el-input {
    width: 60% !important;
  }
  .el-message-box{
    width: 100% !important;
  }
  .el-message--success{
    padding-left: 20% !important;
    width: 100% !important;
  }
</style>
