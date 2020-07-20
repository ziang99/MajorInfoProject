<template>
  <div>
    <!-- 返回 -->
    <div class="goback">
      <i class="iconfont icon-arrowLeft" @click="goBack"></i>
    </div>
    <!-- 头像及信息 -->
    <div class="headInfo" @click="goPersonalInfo">
      <!-- 头像 -->
      <div class="headeImgBox">
        
        <img v-if="userInfo.headimg !== ''" :src="this.baseURL + userInfo.headimg">
        <i v-else class="el-icon-picture-outline"></i>
        
      </div>
      <!-- 信息 -->
      <div class="infoBox">
        <span class="userName">{{userInfo.nickname}}</span>
        <span class="show">{{userInfo.showtext}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'UserInfo',
    props: {
      userInfo: Object
    },
    methods: {
      // 返回上一页
      goBack() {
        this.$router.go(-1)
      },
      // 点击头像，跳转个人信息页
      goPersonalInfo() {
        this.$router.push('/personInfo')
      }
    }
  }
</script>

<style scoped>
  .el-icon-picture-outline{
    font-size: 0.6rem;
    color: #999;
  }
  
  .icon-arrowLeft {
    font-size: 0.4rem;
  }

  .goback {
    color: #000;
    font-weight: bold;
    font-size: 0.4rem;
    padding: 0.3rem 0;
  }

  .headInfo {
    display: flex;
    align-items: center;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }

  .headeImgBox {
    padding: 0.2rem;
    box-sizing: border-box;
  }
  .headeImgBox img {
    display: block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.1);
  }

  .infoBox {
    display: flex;
    flex-flow: column;
    width: 4.3rem;
  }

  .userName {
    margin-bottom: 0.2rem;
    font-size: 0.34rem;
    font-weight: bold;
  }

  .show {
    width: 100%;
    font-size: 0.24rem;
    color: #999;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
