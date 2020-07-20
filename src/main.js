import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//解决300ms点击事件延迟问题
import fastClick from "fastclick";
fastClick.attach(document.body);

//引入解决1像素边框问题和移动端基本公共样式的css
import "styles/reset.css";
import "styles/border.css";

// 引入iconfont图标
import "styles/iconfont.css"

// 引入 elementui
import "./utils/element.js";

// 引入 vant
import "./utils/vant.js";

// 引入 axios 配置文件
import "./utils/request.js";

// 引入全局swiper组件
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper)

// 配置全局图片基准路径
// Vue.prototype.baseURL = "http://39.97.191.34"
Vue.prototype.baseURL = "http://192.168.0.102:3000"


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
