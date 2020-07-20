<template>
  <div class="Detail">
    <Dheade :list="news_name"></Dheade>
    <Dlist :list="DlistInfo"></Dlist>
    <Dlike></Dlike>
  </div>
</template>

<script>
  import Dheade from './components/Dheade.vue'
  import Dlist from './components/Dlist.vue'
  import Dlike from './components/Dlike.vue'
  export default {
    name: 'Detail',
    components: {
      Dheade,
      Dlist,
      Dlike
    },
    data() {
      return {
        DlistInfo: {},
        news_name: ''
      }
    },
    methods: {
      async getDetailList() {
        let id = this.$route.query.id
        let { data } = await this.$axios.get(`/detail/${id}`)
        // console.log(data)
        if(data && data.desc.status !== 200){
          return this.$message.error({
            message: '获取数据失败!',
            center: true,
            showClose: true,
            customClass: 'messageTips'
          })
        }else{
          this.DlistInfo = data
          this.news_name = data.pdata.news_name
        } 
      }
    },
    activated() {
      this.getDetailList()
    }
  }
</script>

<style scoped>
  .Detail{
    padding: 0 0.2rem;
    box-sizing: border-box;
  }
</style>
