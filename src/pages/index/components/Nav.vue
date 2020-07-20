<template>
  <swiper class="swiperBox" :options="swiperOption">
    <swiper-slide v-for="item in list" :key="item.id">
      <el-dropdown trigger="click" @command="handleCommand">
        
        <span class="el-dropdown-link">
          <span>{{item.name}}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item 
            :command="{id: citem.id, name: citem.name, pid: citem.pid}" 
            v-for="citem in item.childrens" :key="citem.id"
            >
            {{citem.name}}
          </el-dropdown-item>
        </el-dropdown-menu>
        
      </el-dropdown>
    </swiper-slide>
  </swiper>
</template>

<script>
  export default {
    name: 'Nav',
    props:{
      list: Array
    },
    data() {
      return {
        swiperOption: {
          slidesPerView : 'auto'
        }
      }
    },
    methods: {
      async handleCommand(command) {
        // console.log(command)
        // 将点击的专业的id发送给父组件
        let id = command.id
        let { data } = await this.$axios.get(`/index/major/${id}`)
        if(data.desc.status !== 200){
          return this.$message.error({
            message: '专业数据请求失败!',
            center: true,
            showClose: true,
            customClass: 'messageTips'
          })
        }else{
          this.$emit("majorInfo", data.data)
        }
        // 将点击获得到的专业名称更改到学院上
        this.list.forEach((item) => {
          if(item.id == command.pid){
            item.name = command.name
          }
        })
      }
    }
  }
</script>

<style scoped>
  .el-dropdown-link{
    cursor: pointer;
    color: #333;
  }
  .el-icon-arrow-down{
    font-size: 12px;
  }
  .swiperBox{
    height: 0.8rem;
    padding-right: 0.2rem;
  }
  .swiper-slide{
    width: auto;
    line-height: 0.9rem;
    text-align: center;
    padding: 0 0.2rem;
  }
</style>
