<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "app"
}
</script>

<style>
  /* 解决双击图片报错的问题 */
  * { 
  	touch-action: pan-y; 
  }
</style>
