<template>
  <div class="Collect">
    <!-- 返回 -->
    <div class="goback">
      <i class="iconfont icon-arrowLeft" @click="goBack"></i>
      <span>我的收藏</span>
    </div>
    
    <van-swipe-cell 
      @click="goDetail(item.pid, $event)"
      @close="closeCollect"
      @open="openCollect"
      :before-close="beforeClose" 
      :name="item.pid" 
      right-width="100" 
      v-for="item in collectList" :key="item.id"
      >
      <div class="collectList">
        <van-image class="loading" lazy-load :src="baseurl + item.img">
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
          <template v-slot:error>加载失败</template>
        </van-image>
        <div class="content">
          <div>{{item.title}}</div>
          <p>{{item.content}}</p>
        </div>
      </div>
      <template #right>
        <van-button square type="danger" text="取消收藏" />
      </template>
    </van-swipe-cell>  
    
    
    <van-empty
      v-show="empty"
      class="custom-image"
      image="https://img.yzcdn.cn/vant/custom-empty-image.png"
      description="快去收藏几个吧!"
    />
  </div>
</template>

<script>
  export default {
    name: 'Collect',
    data() {
      return {
        collectList: [],
        baseurl: '',
        empty: false,
        isGoDetail: true
      }
    },
    methods: {
      openCollect() {
        this.isGoDetail = false
      },
      closeCollect() {
        this.isGoDetail = true
      },
      goDetail(id,e) {
        if(e == 'cell'){
          if(this.isGoDetail){
            this.$router.push({ path: "/detail", query: { id: id } })
          }
        }
      },
      // 返回上一页
      goBack() {
        this.$router.go(-1)
      },
      // 获取收藏列表
      async getCollectInfo() {
        let userId = window.sessionStorage.getItem('userId')
        let { data } = await this.$axios.get('/collect', {
          params: { userid: userId }
        })
        // console.log(data)
        if(!data || data.desc.status !== 200){
          return this.$message.error({
            message: '获取收藏列表失败!',
            center: true,
            showClose: true,
            customClass: 'messageTips'
          })
        }else{
          this.collectList = data.data
        }
        // 如果数据为空没有收藏时，则进行提示
        if(data && data.desc.status == 200 && data.data.length == 0){
          this.empty = true
        }else{
          this.empty = false
        }
      },
      beforeClose({name, position, instance}) {
        if(position !== 'right'){
          instance.close();
        }else{
          // console.log(name)
          this.$dialog.confirm({
            message: '确认删除吗?',
          }).then( async () => {
            let userId = window.sessionStorage.getItem('userId')
            let { data } = await this.$axios.put('/detail/collect/cancel', {
              pid: name,
              userid: userId
            })
            console.log(data)
            if(!data || data.status !== 200){
              return this.$message.error({
                message: '取消收藏失败!',
                center: true,
                showClose: true,
                customClass: 'messageTips'
              })
            }else{
              this.getCollectInfo()
              this.$message.success({
                message: '您已取消该收藏!',
                center: true,
                showClose: true,
                customClass: 'messageTips'
              })
            } 
          }).catch(() => {
            return this.$message({
              message: '您已取消操作',
              center: true,
              showClose: true,
              customClass: 'messageTips'
            })
          })  
        }
      }
    },
    activated() {
      this.getCollectInfo()
      this.baseurl = this.baseURL
    }
  }
</script>

<style scoped>
  .Collect{
    padding: 0 0.2rem;
  }
  .goback {
    color: #000;
    font-weight: bold;
    font-size: 0.4rem;
    padding: 0.3rem 0;
    display: flex;
    align-items: center;
  }
  .goback span {
    font-size: 0.34rem;
    font-weight: bold;
    margin-left: 0.2rem;
  }
  .icon-arrowLeft {
    font-size: 0.4rem;
  }
  .van-swipe-cell{
    width: 100%;
    height: 2rem;
    background-color: #f9f9f9;
    margin-bottom: 0.2rem;
  }
  .collectList{
    width: 100%;
    height: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .collectList .loading{
    display: block;
    width: 36%;
    height: 2rem;
  }
  .content{
    width: 64%;
    height: 2rem;
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    padding: 0.4rem 0;
    box-sizing: border-box;
    margin-left: 0.2rem;
  }
  .content div{
    font-size: 0.3rem;
    color: #000;
    width: 90%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .content p{
    font-size: 0.26rem;
    width: 90%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .van-button{
    width: 100px;
    height: 2rem;
  }
  .van-empty{
    margin-top: 3rem;
  }
</style>

