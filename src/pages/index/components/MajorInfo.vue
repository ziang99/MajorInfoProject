<template>
  <div>
    <div class="title">
      <span class="titleName">专业资讯</span>
      <span class="titleMore">更多</span>
    </div>
    <div 
      class="content" 
      v-for="item in list" :key="item.id" 
      @click="goDetail(item.id)"
      >
      <img :src="baseurl + item.news_logo">
      <span class="contentTitle">{{item.news_name}}</span>
      <span class="contentTips">{{item.news_introduce}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MajorInfo',
    props:{
      list: Array
    },
    data() {
      return {
        baseurl: ''
      }
    },
    methods: {
      goDetail(id) {
        this.$router.push({ path: "/detail", query: { id: id } })
      }
    },
    mounted() {
      this.baseurl = this.baseURL
    }
  }
</script>

<style scoped>
  .title{
    display: flex;
    justify-content: space-between;
    padding: 0.2rem 0 0;
    margin-top: 0.1rem;
  }
  .titleName{
    font-size: 0.3rem;
    color: #000;
    font-weight: bold;
  }
  .titleMore{
    color: #2c60ee;
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
