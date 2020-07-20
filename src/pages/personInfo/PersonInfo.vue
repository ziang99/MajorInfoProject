<template>
  <div class="PersonInfo">
    <!-- 返回 -->
    <div class="goback">
      <i class="iconfont icon-arrowLeft" @click="goBack"></i>
      <span>个人信息</span>
    </div>
    <!-- 详细信息列表 -->
    <ul class="tetailList">
      <li>
        <span>头像</span>
        
        <img v-if="userInfo.headimg !== '--未填写--'" :src="this.baseURL + userInfo.headimg" class="headImg" @click="toInput">
        <i v-else class="jiahao" @click="toInput">+</i>
        <input @change="toUpload($event)" type="file" name="image" class="toUpload" ref="toUpload">
        
      </li>
      <li @click="openNickname">
        <span>昵称</span>
        <h3>{{userInfo.nickname}}</h3>
      </li>
      <li @click="openGender">
        <span>性别</span>
        <h3>{{userInfo.gender}}</h3>
      </li>
      <li @click="openPhone">
        <span>电话</span>
        <h3>{{userInfo.phone}}</h3>
      </li>
      <li @click="openShowtext">
        <span>个性签名</span>
        <h3 class="show">{{userInfo.showtext}}</h3>
      </li>
    </ul>

    <!-- 修改性别对话框 -->
    <el-dialog title="选择性别" :visible.sync="dialogTableVisible" width="80%" center custom-class="genderBox">
      <el-radio @change="changeGender" v-model="userInfo.gender" label="男" border size="mini">男</el-radio>
      <el-radio @change="changeGender" v-model="userInfo.gender" label="女" border size="mini">女</el-radio>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'PersonInfo',
    data() {
      return {
        // 用户的基本信息
        userInfo: {},
        // 修改性别对话框，默认关闭
        dialogTableVisible: false
      }
    },
    methods: {
      // 返回上一页
      goBack() {
        this.$router.go(-1)
      },
      // 获取用户信息
      async getUserInfo() {
        let userId = window.sessionStorage.getItem('userId')
        let {
          data
        } = await this.$axios.get(`userinfo/${userId}`)
        // console.log(data)
        if (data.desc.status !== 200) {
          return this.$message.error({
            message: '用户数据请求失败!',
            center: true,
            showClose: true,
            customClass: 'messageTips'
          })
        } else {
          this.userInfo = data.data
          for (let item in this.userInfo) {
            if(item !== 'id' && item !== 'pid'){
              if(this.userInfo[item] == ''){
                this.$set(this.userInfo, item, '--未填写--')
              }
            }
          }
          
        }
      },
      // 修改昵称
      async openNickname() {
        let res = await this.$prompt('限2-10个字符,支持中英文数字和下划线', '输入姓名', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          customClass: 'messageBox-prompt',
          center: true,
          inputValue: this.userInfo.nickname, //输入框的初始文本
          inputPattern: /^[a-zA-Z0-9_\u4e00-\u9fa5]{2,10}$/
        }).catch(err => err)
        // console.log(res)
        if (res == 'cancel') {
          return this.$message({
            type: 'info',
            message: '已取消操作',
            center: true,
            showClose: true,
            customClass: 'messageTips'
          })
        } else if (res.action == "confirm") {
          // 如果昵称的值未改动则提示提示用户
          if (res.value == this.userInfo.nickname) {
            return this.$message({
              type: 'info',
              message: '未进行修改变动',
              center: true,
              showClose: true,
              customClass: 'messageTips'
            })
          }
          let pid = this.userInfo.pid
          let {
            data
          } = await this.$axios.put(`userinfo/${pid}/nickname`, {
            nickname: res.value
          })
          // console.log(data)
          if (data.desc.status !== 200) {
            return this.$message.error({
              message: '昵称修改失败!',
              center: true,
              showClose: true,
              customClass: 'messageTips'
            })
          } else {
            this.getUserInfo()
            this.$message.success({
              message: '昵称修改成功!',
              center: true,
              showClose: true,
              customClass: 'messageTips'
            })
          }
        }
      },
      // 打开修改性别的对话框
      openGender() {
        this.dialogTableVisible = true
      },
      // 修改性别
      async changeGender(e) {
        let pid = this.userInfo.pid
        let {
          data
        } = await this.$axios.put(`userinfo/${pid}/gender`, {
          gender: e
        })
        if (data.desc.status !== 200) {
          return this.$message.error({
            message: '性别修改失败!',
            center: true,
            showClose: true,
            customClass: 'messageTips'
          })
        } else {
          this.dialogTableVisible = false
          this.getUserInfo()
          this.$message.success({
            message: '昵称修改成功!',
            center: true,
            showClose: true,
            customClass: 'messageTips'
          })
        }
      },
      // 修改电话
      async openPhone() {
        let res = await this.$prompt('请输入符合规范的手机号码', '输入电话', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          customClass: 'messageBox-prompt',
          center: true,
          inputValue: this.userInfo.phone, //输入框的初始文本
          inputPattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
        }).catch(err => err)
        // console.log(res)
        if (res == 'cancel') {
          return this.$message({
            type: 'info',
            message: '已取消操作',
            center: true,
            showClose: true,
            customClass: 'messageTips'
          })
        } else if (res.action == "confirm") {
          // 如果电话的值未改动则提示提示用户
          if (res.value == this.userInfo.phone) {
            return this.$message({
              type: 'info',
              message: '未进行修改变动',
              center: true,
              showClose: true,
              customClass: 'messageTips'
            })
          }
          let pid = this.userInfo.pid
          let {
            data
          } = await this.$axios.put(`userinfo/${pid}/phone`, {
            phone: res.value
          })
          // console.log(data)
          if (data.desc.status !== 200) {
            return this.$message.error({
              message: '电话修改失败!',
              center: true,
              showClose: true,
              customClass: 'messageTips'
            })
          } else {
            this.getUserInfo()
            this.$message.success({
              message: '电话修改成功!',
              center: true,
              showClose: true,
              customClass: 'messageTips'
            })
          }
        }
      },
      // 修改个性签名
      async openShowtext() {
        let res = await this.$prompt('限20个字符以内哦~~', '个性签名', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          customClass: 'messageBox-prompt',
          center: true,
          inputValue: this.userInfo.showtext, //输入框的初始文本
          inputPattern: /^[a-zA-Z0-9_\u4e00-\u9fa5]{0,20}$/
        }).catch(err => err)
        // console.log(res)
        if (res == 'cancel') {
          return this.$message({
            type: 'info',
            message: '已取消操作',
            center: true,
            showClose: true,
            customClass: 'messageTips'
          })
        } else if (res.action == "confirm") {
          // 如果个性签名的值未改动则提示提示用户
          if (res.value == null && this.userInfo.showtext == '') {
            return this.$message({
              type: 'info',
              message: '未进行修改变动',
              center: true,
              showClose: true,
              customClass: 'messageTips'
            })
          }
          // 如果昵称的值未改动则提示提示用户
          if (res.value == this.userInfo.showtext) {
            return this.$message({
              type: 'info',
              message: '未进行修改变动',
              center: true,
              showClose: true,
              customClass: 'messageTips'
            })
          }
          let pid = this.userInfo.pid
          let {
            data
          } = await this.$axios.put(`userinfo/${pid}/showtext`, {
            showtext: res.value
          })
          // console.log(data)
          if (data.desc.status !== 200) {
            return this.$message.error({
              message: '个性签名修改失败!',
              center: true,
              showClose: true,
              customClass: 'messageTips'
            })
          } else {
            this.getUserInfo()
            this.$message.success({
              message: '个性签名修改成功!',
              center: true,
              showClose: true,
              customClass: 'messageTips'
            })
          }
        }
      },

      // 打开上传图片
      toInput() {
        this.$refs.toUpload.click()
      },
      // 将图片提交给后台服务器
      async toUpload(e) {
        let file = e.target.files[0];  // 获取图片信息
        var formData = new FormData();  // 只能通过formData方式来传输
        formData.append('image', file);  // 第一个参数对应着input的name值
        let { data } = await this.$axios({
          method: 'post',
          url: `/upload/${this.userInfo.pid}`,
          data: formData
        })
        // console.log(data)
        if(data.status !== 200){
          return this.$message.error({
            message: '图片过大或类型有误!',
            center: true,
            showClose: true,
            customClass: 'messageTips'
          })
        }else{
          this.imageUrl = true
          this.userInfo.headimg = data.img
          this.$message.success({
            message: '头像设置成功!',
            center: true,
            showClose: true,
            customClass: 'messageTips'
          })
        }
      } 
    },
    activated() {
      this.getUserInfo()
    }
  }
</script>

<style scoped>
  /* 图片上传 */
  .headImg {
    width: 1rem !important;
    height: 1rem;
    display: block;
  }
  .jiahao{
    border: 1px dashed #999;
    border-radius: 50%;
    font-size: 0.5rem;
    color: #999;
    width: 0.8rem;
    height: 0.8rem;
    line-height: 0.8rem;
    text-align: center;
  }
  .toUpload{
    display: none;
  }

  /* ------------------------ */

  .PersonInfo {
    padding: 0 0.2rem;
    box-sizing: border-box;
  }

  .icon-arrowLeft {
    font-size: 0.4rem;
  }

  .goback {
    color: #000;
    font-weight: bold;
    font-size: 0.4rem;
    padding: 0.3rem 0;
    display: flex;
    align-items: center;
  }

  .goback span {
    font-size: 0.34rem;
    font-weight: bold;
    margin-left: 0.2rem;
  }

  .tetailList li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 1rem;
  }

  .tetailList li img {
    width: 0.9rem;
    border-radius: 50%;
  }

  .tetailList li span {
    font-size: 0.3rem;
    font-weight: bold;
    width: 25%;
  }

  .tetailList li h3 {
    color: #999;
    width: 75%;
    text-align: right;
  }

  .show {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
