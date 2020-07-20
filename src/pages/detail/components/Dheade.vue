<template>
  <div class="DheadeBox">
    <div class="goBack">
      <i class="iconfont icon-arrowLeft" @click="goBack"></i>
      <span>{{list}}</span>
    </div>
    <div>
      <i class="iconfont icon-fenxiang" @click="showShare = true"></i>
    </div>
    
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
      @select="onSelect"
    />
    
  </div>
</template>

<script>
  export default {
    name: 'Detail',
    props: ['list'],
    data() {
      return {
        showShare: false,
        options: [
          { name: '微信', icon: 'wechat' },
          { name: '微博', icon: 'weibo' },
          { name: '复制链接', icon: 'link' },
          { name: '分享海报', icon: 'poster' }
        ]
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      },
      onSelect(option) {
        this.$toast(option.name);
        this.showShare = false;
      }
    }
  }
</script>

<style scoped>
  .DheadeBox{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    background-color: #fff;
    border-bottom: #eee solid 1px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0.2rem ;
    box-sizing: border-box;
    font-size: 0.3rem;
    color: #000;
    font-weight: bold;
  }
  .goBack i {
    font-size: 0.4rem;
  }
  .goBack span {
    margin-left: 0.2rem;
  }
  .goBack{
    display: flex;
    align-items: center;
  }
  .icon-fenxiang{
    font-size: 0.35rem;
  }
</style>
