import Vue from "vue";
import axios from 'axios'

// 配置每次请求的基础路径
// axios.defaults.baseURL = 'http://39.97.191.34/host/'
axios.defaults.baseURL = 'http://192.168.0.102:3000/'

// 请求拦截器
axios.interceptors.request.use(config => {
  // console.log(config)
  // 将本地存储中的 token 值存储在请求头中
  config.headers.token = window.sessionStorage.getItem('token')
  return config;
}, err => {
  console.log(err);
})

// 响应拦截器
axios.interceptors.response.use(config => {
  // console.log(config)
  return config;
})

// 将axios挂载到vue的原型对象上
Vue.prototype.$axios = axios
