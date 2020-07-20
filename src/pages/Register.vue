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
        <div class="confirmPwd">
          <i class="iconfont icon-mima"></i>
          <input type="password" name="confirmPwd" v-model="confirmPwd" placeholder="请再次确认密码" />
        </div>
        <button type="button" @click="goRegister">注册</button>
      </form>
      
      <h5 class="tipsJump" @click="goLogin">
        <span>返回登录</span>
      </h5>
    </div>
    <img class="loginBo" src="@/assets/images/loginBo.png">
  </div>
</template>

<script>
  export default {
    name: 'Register',
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
        password: '',
        // 确认密码
        confirmPwd: ''
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
      // 注册
      async goRegister() {
        if(this.username === '' || this.password === '' || this.confirmPwd === ''){
          return this.$message.error({
            message: '输入不能为空!',
            center: true,
            showClose: true,
            customClass: 'messageTips'
          })
        }else if(this.password !== this.confirmPwd) {
          return this.$message.error({
            message: '密码输入不一致!',
            center: true,
            showClose: true,
            customClass: 'messageTips'
          })
        }
        let { data } = await this.$axios.put('register', {
          username: this.username,
          password: this.password,
          confirmPwd: this.confirmPwd
        })
        // console.log(data)
        if(data.code === 200 ){
          this.$message.success({
            message: '注册成功!',
            center: true,
            showClose: true,
            customClass: 'messageTips'
          })
        }else if(data.code === 412){
          this.$message.warning({
            message: '该学号已存在',
            center: true,
            showClose: true,
            customClass: 'messageTips'
          })
        }else{
          this.$message.error({
            message: '注册失败',
            center: true,
            showClose: true,
            customClass: 'messageTips'
          })
        }
      },
      // 跳转到登录
      goLogin() {
        this.$router.push('/login')
      }
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
    margin-bottom: 0.2rem;
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

  .confirmPwd {
    margin-bottom: 0.5rem !important;
  }
</style>
