<template>
  <div class="Dlist">
    <div class="majorInfo" v-if="list.pdata">
      <img :src="this.baseURL + list.pdata.news_logo">
      <p>{{list.pdata.news_introduce}}</p>
    </div>
    
    <div class="listInfo" v-for="item in list.data" :key="item.id">
      <div class="listTitle"><span>{{item.title}}</span></div>
      <p class="listContent">{{item.content}}</p>
      <img :src="baseurl + item.img">
    </div>
  </div>
</template>

<script>
  export default{
    name: 'Dlist',
    props: {
      list: Object
    },
    data() {
      return {
        baseurl: ''
      }
    },
    mounted() {
      this.baseurl = this.baseURL
    }
  }
</script>

<style scoped>
  .Dlist{
    margin-top: 1rem;
    margin-bottom: 1.1rem;
  }
  
  .majorInfo{
  }
  .majorInfo img{
    width: 100%;
    height: 3.5rem;
    margin-bottom: 0.3rem;
  }
  
  .listTitle{
    color: #0fd3ff;
    border-left: #0fd3ff solid 4px;
    margin: 0.4rem 0;
    padding-left: 0.2rem;
  }
  p{
    color: #999;
    line-height: 0.4rem;
  }
  .listInfo img{
    width: 100%;
    height: 2.5rem;
    margin: 0.2rem 0;
  }
</style>
