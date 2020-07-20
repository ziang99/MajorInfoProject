<template>
  <div class="Search">
    <!-- 顶部返回和搜索框 -->
    <div class="headerTop">
      <el-row class="header">
        <el-col :span="2">
          <i class="iconfont icon-arrowLeft" @click="goBack"></i>
        </el-col>
        <el-col :span="22" class="searchBox">
          <i class="iconfont icon-sousuo"></i>
          <input v-model="searchValue" type="text" placeholder="请输入资讯的标题" ref="username">
        </el-col>
      </el-row>
    </div>
    <!-- 搜索结果列表 -->
    <div v-show="!isResult">
      <div
        class="content" 
        v-for="(item, index) in searchResult" :key="index" 
        @click="goDetail(item.id)"
        >
        <img :src="baseurl + item.news_logo">
        <span class="contentTitle">{{item.news_name}}</span>
        <span class="contentTips">{{item.news_introduce}}</span>
      </div>
    </div>
    <!-- 无结果效果 -->
    <van-empty v-show="isResult" description="暂无结果哦~~" />
  </div>
</template>

<script>
  export default {
    name: 'Search',
    data() {
      return {
        searchValue: '',
        allInfo: [],
        searchResult: [],
        isResult: true,
        baseurl: ''
      }
    },
    watch: {
      searchValue(newValue) {
        // console.log(newValue)
        if(newValue !== ''){
          this.allInfo.forEach((item) => {
            if(item.news_name.indexOf(newValue) >= 0){
              if(this.searchResult.includes(item)){
                return;
              }else{
                this.searchResult.push(item)
                this.isResult = false
              }
            }
          })
        }else{
          this.searchResult = []
          this.isResult = true
        }
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      },
      goDetail(id) {
        this.$router.push({ path: "/detail", query: { id: id } })
      },
      // 获取所有的专业信息数据
      async getAllNews() {
        let { data } = await this.$axios.get('/search/allinfo')
        if(data.desc.status !== 200 || data.data.length == 0 || !data){
          return this.$message.error({
            message: '数据请求失败!',
            center: true,
            showClose: true,
            customClass: 'messageTips'
          })
        }else{
          this.allInfo = data.data
        }
      }
    },
    activated () {
      // 输入框自动获取焦点
      this.$refs.username.focus()
      this.getAllNews()
      this.baseurl = this.baseURL
    }
  }
</script>

<style scoped>
  .Search{
    padding: 0 0.2rem;
    box-sizing: border-box;
  }
  .headerTop{
    width: 100%;
    padding: 0 0.2rem;
    box-sizing: border-box;
  }
  .header {
    margin: 0.2rem 0;
    display: flex;
    align-items: center;
  }
  .searchBox {
    background-color: #f9f9f9;
    border-radius: 0.2rem;
    color: #999;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .searchBox i {
    font-size: 0.5rem;
    padding: 0 0.2rem;
  }
  .searchBox input {
    background-color: #f9f9f9;
    flex: 1;
    border-radius: 0.2rem;
    padding: 0.1rem 0;
    box-sizing: border-box;
  }
  input::-webkit-input-placeholder {
    color: #999;
  }
  
  input:-moz-placeholder {
    color: #999;
  }
  
  input::-moz-placeholder {
    color: #999;
  }
  
  input:-ms-input-placeholder {
    color: #999;
  }
  .icon-arrowLeft{
    font-size: 0.4rem;
    color: #000;
    font-weight: bold;
  }

  .tips{
    padding: 0.2rem 0;
    display: block;
    font-size: 0.22rem;
    color: #999;
  }
  .hotSearch,.recordSearch{
    padding: 0 0.2rem;
    box-sizing: border-box;
  }
  .tag{
    background-color: #f9f9f9;
    padding: 0.1rem 0.2rem;
    border-radius: 0.08rem;
    font-size: 0.25rem;
    margin-bottom: 0.1rem;
    margin-right: 0.1rem;
  }
  .hotListTag{
    display: flex;
    flex-flow: row wrap;
  }
  .tipsBox{
    display: flex;
    justify-content: space-between;
  }
  .clean{
    color: #2c60ee;
  }
  .records{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: #eee solid 1px;
    padding: 0.2rem 0;
  }
  .records i:first-child{
    margin-right: 0.2rem;
  }
  .records i:last-child{
    margin-left: 0.2rem;
  }
  .recordsContent{
    width: 90%;
    font-size: 0.25rem;
    line-height: 0.3rem;
  }
  
  .content{
    display: flex;
    flex-flow: column;
    margin-top: 0.2rem;
    margin-bottom: 0.4rem;
  }
  .content img {
    width: 100%;
    height: 3.5rem;
    border-radius: 0.1rem;
  }
  .contentTitle{
    color: #000;
    font-weight: bold;
    padding: 0.2rem 0 0.2rem 0.1rem;
  }
  .contentTips{
    color: #999;
    font-size: 0.25rem;
    padding-left: 0.1rem;
  }
</style>
