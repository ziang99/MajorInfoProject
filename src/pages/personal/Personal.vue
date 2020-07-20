<template>
  <div class="UserInfo">
    <UserInfo :userInfo="userInfo"></UserInfo>
    <FunList></FunList>
  </div>
</template>

<script>
  import UserInfo from './components/UserInfo.vue'
  import FunList from './components/FunList.vue'
  export default {
    name: 'Personal',
    data() {
      return {
        // 用户的基本信息
        userInfo: {}
      }
    },
    components: {
      UserInfo,
      FunList
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
      }
    },
    activated() {
      this.getUserInfo()
    }
  }
</script>

<style scoped>
  .UserInfo {
    padding: 0 0.2rem;
  }
</style>
