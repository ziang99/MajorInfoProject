<template>
  <div class="Index" ref="IndexContainer">
    <LoadMore class="loadmore" :onLoadMore="onLoadMore" :enableLoadMore="enableLoadMore">
      <!-- 返回顶部 -->
      <el-backtop target=".loadmore" :bottom="20" :right="20">
          <i class="el-icon-caret-top"></i>
      </el-backtop>
      <div>
        <Header></Header>
        <Swiper :list="swiperList"></Swiper>
        <Nav :list="navList" @majorInfo="majorInfo"></Nav>
        <MajorInfo :list="isConcrete?concreteInfo:majorList"></MajorInfo>
      </div>
    </LoadMore>
  </div>
</template>

<script>
  import Header from './components/Header.vue'
  import Swiper from './components/Swiper.vue'
  import Nav from './components/Nav.vue'
  import MajorInfo from './components/MajorInfo.vue'
  import LoadMore from '../../component/LoadMore.vue'
  export default {
    name: "Index",
    components: {
      Header,
      Swiper,
      Nav,
      MajorInfo,
      LoadMore
    },
    data() {
      return {
        swiperList: [],
        navList: [],
        // 所有的专业信息
        majorList: [],
        page: 1,
        enableLoadMore: true,
        // 具体的专业信息
        concreteInfo: [],
        isConcrete: false
      }
    },
    mounted() {
      this.getBannerInfo()
      this.getNavInfo()
      this.getmajorInfo()
    },
    methods: {
      // 上拉加载更多
      onLoadMore(done) {
        setTimeout(()=>{
            if(!this.enableLoadMore) {
                return;
            }
            this.page = this.page + 1
            this.getmajorInfo();
            done();
        }, 2000)
      },
      // 获取轮播数据
      async getBannerInfo() {
        let { data } = await this.$axios.get('/index/banner')
        // console.log(data)
        if(data.desc.status !== 200){
          return this.$message.error({
            message: '轮播数据请求失败!',
            center: true,
            showClose: true,
            customClass: 'messageTips'
          })
        }else{
          this.swiperList = data.data
        }
      },
      // 获取nav导航数据
      async getNavInfo() {
        let { data: res } = await this.$axios.get('/index/nav')
        // console.log(res)
        if(res.desc.status !== 200){
          return this.$message.error({
            message: '导航数据请求失败!',
            center: true,
            showClose: true,
            customClass: 'messageTips'
          })
        }else{
          this.navList = res.data
        }
      },
      // 获取专业资讯列表数据
      async getmajorInfo() {
        if(this.concreteInfo.length <= 6 && this.concreteInfo.length !== 0){
          this.enableLoadMore = false
        }
        
        let { data: result } = await this.$axios.get('/index/major',{
          params: {
            page: this.page
          }
        })
        if(result.data.length == result.total){
          this.enableLoadMore = false
        }
        if(result.desc.status !== 200){
          return this.$message.error({
            message: '列表数据请求失败!',
            center: true,
            showClose: true,
            customClass: 'messageTips'
          })
        }else{
          this.majorList = result.data
        }
      },
      // 获取具体的专业信息
      majorInfo(e) {
        this.concreteInfo = e
        this.isConcrete = true
      },
    },
  }
</script>

<style scoped lang="scss">
  .Index{
    padding: 0 0.2rem;
    box-sizing: border-box;
    // 返回顶部
    height: 100vh;
    overflow: scroll;
  }
</style>
