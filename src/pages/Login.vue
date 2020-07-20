<template>
  <div class="LoginPage" :style="{height:windowHeight + 'px'}">
    <div class="formBox" ref="formBox" :style="{paddingTop:topHeight}">
      <h2 class="title">云上河工-专业信息</h2>
      
      <form class="form">
        <div class="username">
          <i class="iconfont icon-shouji"></i>
          <input type="text" name="username" v-model="username" placeholder="请输入学号" />
        </div>
        <div class="password">
          <i class="iconfont icon-mima"></i>
          <input type="password" name="password" v-model="password" placeholder="请输入密码" />
        </div>
        <button type="button" @click="goLogin">登录</button>
      </form>
    
      <div class="tipsJump" @click="goRegister">
        <span>没有学号？</span>
        <span>注册一个~</span>
      </div>
      
    </div>
    <img class="loginBo" src="@/assets/images/loginBo.png">
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data() {
      return {
        // 整个可用窗口的高度
        windowHeight: "",
        // formBox盒子的高度
        formBoxHeight: "",
        // formBox盒子距离顶部的高度
        topHeight: "",
        // 用户名
        username: '',
        // 密码
        password: ''
      }
    },
    mounted() {
      this.adaptaHeight()
    },
    methods: {
      // 屏幕高度适配
      adaptaHeight() {
        this.windowHeight = window.innerHeight
        this.formBoxHeight = this.$refs.formBox.offsetHeight
        this.topHeight = (this.windowHeight - this.formBoxHeight) / 2 + "px"
      },
      // 登录
      async goLogin() {
        if(this.username === '' || this.password === ''){
          return this.$message.error({
            message: '学号或密码不能为空!',
            center: true,
            showClose: true,
            customClass: 'messageTips'
          })
        }
        let { data } = await this.$axios.post('login', {
          username: this.username,
          password: this.password
        })
        // console.log(data)
        if(data.desc.status == 200 ){
          this.$message.success({
            message: '登录成功!',
            center: true,
            showClose: true,
            customClass: 'messageTips'
          })
          // 将token值存放在 sessionStorage 中
          window.sessionStorage.setItem('token', data.data.token);
          // 将用户的id值存放在 sessionStorage 中
          window.sessionStorage.setItem('userId', data.data.id);
          // 跳转首页
          this.$router.push('/index')
        }else{
          this.$message.error({
            message: '学号或密码有误!',
            center: true,
            showClose: true,
            customClass: 'messageTips'
          })
        }
      },
      // 跳转到注册
      goRegister() {
        this.$router.push('/register')
      },
      
    },
  }
</script>

<style scoped>
  .LoginPage{
    background: url(../assets/images/loginBt.png) 0 0 no-repeat;
    background-size: 100% 32%;
  }

  .loginBt,
  .loginBo {
    display: block;
    width: 100%;
  }

  .loginBo {
    position: absolute;
    bottom: 0;
    left: 0;
  }

  .title {
    font-size: 0.5rem;
    text-align: center;
    color: #2ca1fe;
    margin: 1rem 0 0.6rem 0;
  }

  .form div {
    border-bottom: #e1e1e1 solid 1px;
    width: 70%;
    margin: 0 auto;
    margin-bottom: 0.4rem;
    padding: 0.2rem 0.1rem;
    display: flex;
    align-items: center;
  }

  .form div input {
    margin-left: 0.2rem;
  }

  .form div i {
    font-size: 0.4rem;
    color: #2da3fe;
  }

  input::-webkit-input-placeholder {
    color: #9c9c9c;
  }

  input:-moz-placeholder {
    color: #9c9c9c;
  }

  input::-moz-placeholder {
    color: #9c9c9c;
  }

  input:-ms-input-placeholder {
    color: #9c9c9c;
  }

  .form button {
    display: block;
    width: 80%;
    height: 0.8rem;
    margin: 0 auto;
    border-radius: 1rem;
    background-color: #2DA3FE;
    color: #fff;
    font-size: 0.38rem;
  }

  .tipsJump {
    width: 3rem;
    height: 0.4rem;
    line-height: 0.4rem;
    margin: 0 auto;
    text-align: center;
    margin-top: 0.6rem;
    color: #2da3fe;
  }

  .password {
    margin-bottom: 1rem !important;
  }
</style>
