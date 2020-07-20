<template>
  <div class="Dlike">
    <div @click="toLike">
      <p class="goodNum">
        <i :class="isLikeFlag?'iconfont icon-dianzan like':'iconfont icon-dianzan'"></i>
        <span>{{likeNum}}</span>
      </p>
      <span>点赞</span>
    </div>
    
    <div @click="toCollect">
      <i :class="isCollectFlag?'iconfont icon-shoucang like':'iconfont icon-shoucang'"></i>
      <span>收藏</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Dlike',
    data() {
      return {
        // 是否点赞
        isLikeFlag: false,
        likeNum: '',
        // 是否收藏
        isCollectFlag: false
      }
    },
    methods: {
      // 当点击点赞时
      async toLike() {
        if(!this.isLikeFlag){
          let id = this.$route.query.id
          let newNum = this.likeNum + 1
          let { data } = await this.$axios.put(`/detail/like/add`, {
            addNum: newNum,
            pid: id
          })
          if(!data || data.status !== 200){
            return this.$message.error({
              message: '点赞失败!',
              center: true,
              showClose: true,
              customClass: 'messageTips'
            })
          }else{
            this.getLikeNum()
            this.$message.success({
              message: '点赞成功!',
              center: true,
              showClose: true,
              customClass: 'messageTips'
            })
          }
        }else{
          let id = this.$route.query.id
          let newNum = this.likeNum - 1
          let { data } = await this.$axios.put(`/detail/like/reduce`, {
            addNum: newNum,
            pid: id
          })
          if(!data || data.status !== 200){
            return this.$message.error({
              message: '取消点赞失败!',
              center: true,
              showClose: true,
              customClass: 'messageTips'
            })
          }else{
            this.getLikeNum()
            this.$message.success({
              message: '您已取消点赞!',
              center: true,
              showClose: true,
              customClass: 'messageTips'
            })
          } 
        }
      },
      // 获取点赞状态
      async getLikeNum() {
        let id = this.$route.query.id
        let { data } = await this.$axios.get(`/detail/like/${id}`)
        // console.log(data)
        if(!data || data.desc.status !== 200){
          return this.$message.error({
            message: '获取数据失败!',
            center: true,
            showClose: true,
            customClass: 'messageTips'
          })
        }else{
          this.likeNum = data.data.likenum
          if(data.data.islike == 0){
            this.isLikeFlag = false
          }else{
            this.isLikeFlag = true
          }
        } 
      },
      // 获取收藏状态
      async getCollect() {
        let id = this.$route.query.id
        let { data } = await this.$axios.get(`/detail/collect/${id}`)
        // console.log(data)
        if(!data || data.desc.status !== 200){
          return this.$message.error({
            message: '获取收藏数据失败!',
            center: true,
            showClose: true,
            customClass: 'messageTips'
          })
        }else{
          if(data.data.collect == 0){
            this.isCollectFlag = false
          }else{
            this.isCollectFlag = true
          }
        }
      },
      // 当点击收藏时
      async toCollect(){
        if(!this.isCollectFlag){
          let userId = window.sessionStorage.getItem('userId')
          let id = this.$route.query.id
          let { data } = await this.$axios.post('/detail/collect/add', {
            pid: id,
            userid: userId
          })
          // console.log(data)
          if(!data || data.status !== 200){
            return this.$message.error({
              message: '收藏失败!',
              center: true,
              showClose: true,
              customClass: 'messageTips'
            })
          }else{
            this.getCollect()
            this.$message.success({
              message: '收藏成功!',
              center: true,
              showClose: true,
              customClass: 'messageTips'
            })
          }
        }else{
          let userId = window.sessionStorage.getItem('userId')
          let id = this.$route.query.id
          let { data } = await this.$axios.put('/detail/collect/cancel', {
            pid: id,
            userid: userId
          })
          // console.log(data)
          if(!data || data.status !== 200){
            return this.$message.error({
              message: '取消收藏失败!',
              center: true,
              showClose: true,
              customClass: 'messageTips'
            })
          }else{
            this.getCollect()
            this.$message.success({
              message: '您已取消收藏!',
              center: true,
              showClose: true,
              customClass: 'messageTips'
            })
          }
        }
      }
    },
    activated() {
      this.getLikeNum()
      this.getCollect()
    }
  }
</script>

<style scoped>
  .like{
    color: red;
  }
  .Dlike{
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 999;
    background-color: #fff;
    border-top: #eee solid 1px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    
  }
  .Dlike div{
    display: flex;
    flex-flow: column;
    align-items: center;
    padding: 0.1rem 0 0.2rem 0;
    box-sizing: border-box;
  }
  .Dlike div i{
    font-size: 0.4rem;
    margin-bottom: 0.1rem;
  }
  .goodNum{
    margin-bottom: 0.1rem;
  }
</style>
