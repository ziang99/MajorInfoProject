<template>
  <div class="swiper" v-if="reRender">
    <swiper :options="swiperOption" v-if="list.length" ref="bannerSwiper">
      <swiper-slide v-for="item in list" :key="item.id">
        <img class="swiper-img" :src="baseurl + item.news_logo" @click="goDetail(item.id)">
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
  export default {
    props: {
      list: Array
    },
    data() {
      return {
        baseurl: '',
        swiperOption: {
          loop: 'true', //循环
          autoplay: {
            delay: 2000,
            disableOnInteraction: false
          },
          spaceBetween: '2%'
        },
        reRender: false
      }
    },
    activated() {
      this.baseurl = this.baseURL
      //处理从其他页面切换回来轮播图不滚动问题
      this.reRender = false;
      setTimeout(() => {
          this.reRender = true;
      }, 10)
    },
    methods: {
      goDetail(id) {
        this.$router.push({ path: "/detail", query: { id: id } })
      }
    }
  }
</script>

<style scoped>
  .swiper {
    margin-top: 1.2rem;
  }

  .swiper-img {
    width: 100%;
    height: 3rem;
    border-radius: 0.2rem;
  }
</style>
