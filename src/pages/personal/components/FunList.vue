<template>
  <!-- 功能列表 -->
  <ul class="funList">
    <!-- 收藏 -->
    <li @click="goCollect">
      <div>
        <i class="iconfont icon-shoucang"></i>
        <span>我的收藏</span>
      </div>
      <i class="iconfont icon-youjiantou"></i>
    </li>
    <!-- 历史记录 -->
    <li @click="goHistory">
      <div>
        <i class="iconfont icon-lishijilu"></i>
        <span>历史记录</span>
      </div>
      <i class="iconfont icon-youjiantou"></i>
    </li>
    <!-- 设置 -->
    <li @click="goSetup" class="setup">
      <div>
        <i class="iconfont icon-shezhi"></i>
        <span>设置</span>
      </div>
      <i class="iconfont icon-youjiantou"></i>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'FunList',
    methods: {
      goCollect() {
        this.$router.push('/collect')
      },
      goHistory() {
        this.$toast('暂未开放');
      },
      goSetup() {
        this.$toast('暂未开放');
      },
    },
  }
</script>

<style scoped>
  .funList {
    margin-top: 0.4rem;
  }

  .funList li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.2rem 0;
  }

  .funList li i {
    font-size: 0.4rem;
  }

  .funList li div {
    display: flex;
    align-items: center;
  }

  .funList li div span {
    margin-left: 0.3rem;
  }

  .funList li div i {
    margin-left: 0.1rem;
  }

  .icon-youjiantou {
    color: #999;
  }

  .icon-shoucang {
    color: orangered;
  }

  .icon-shezhi {
    color: #1de71d;
  }

  .setup {
    border-top: #f9f9f9 solid 0.2rem;
  }
</style>
