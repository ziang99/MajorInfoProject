<template>
  <div class="headerTop">
    <el-row class="header">
      <el-col :span="20" class="searchBox">
        <i class="iconfont icon-sousuo"></i>
        <input type="text" placeholder="点击输入搜索内容" @click="goSearch">
      </el-col>
      <el-col :span="4" class="headBox">
        <div @click="goPersonal">
          <img v-if="userInfo.headimg !== ''" class="headImg" :src="this.baseURL + userInfo.headimg">
          <i v-else class="el-icon-picture-outline"></i>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'Header',
    data() {
      return {
        // 用户的基本信息
        userInfo: {}
      }
    },
    activated() {
      this.getUserInfo()
    },
    mounted() {
      this.getUserInfo()
    },
    methods: {
      async getUserInfo() {
        let userId = window.sessionStorage.getItem('userId')
        let { data } = await this.$axios.get(`userinfo/${userId}`)
        // console.log(data)
        if(data.desc.status !== 200){
          return this.$message.error({
            message: '用户数据请求失败!',
            center: true,
            showClose: true,
            customClass: 'messageTips'
          })
        }else{
          this.userInfo = data.data
        }
      },
      goSearch() {
        this.$router.push('/search')
      },
      goPersonal() {
        this.$router.push('/personal')
      },
    },
  }
</script>

<style scoped>
  .el-icon-picture-outline{
    font-size: 0.6rem;
    color: #999;
  }
  
  .headerTop{
    width: 100%;
    padding: 0 0.2rem;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    background-color: #fff;
    border-bottom: #eee solid 1px;
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

  .headBox {
    text-align: center;
  }

  .headBox div {
    margin-left: 0.2rem;
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
  
  .headImg{
    display: block;
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 50%;
    margin: 0 auto;
  }

</style>
