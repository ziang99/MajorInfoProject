import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: '/login'
  },
  // 登录页
  {
    path: "/login",
    name: "Login",
    component: () => import("../pages/Login")
  },
  // 注册页
  {
    path: "/register",
    name: "Register",
    component: () => import("../pages/Register")
  },
  // 首页
  {
    path: "/index",
    name: "Index",
    component: () => import("../pages/index/Index")
  },
  // 列表详情页
  {
    path: "/detail",
    name: "Detail",
    component: () => import("../pages/detail/Detail")
  },
  // 搜索页
  {
    path: "/search",
    name: "Search",
    component: () => import("../pages/search/Search")
  },
  // 个人中心页
  {
    path: "/personal",
    name: "Personal",
    component: () => import("../pages/personal/Personal")
  },
  // 个人中心-详细信息
  {
    path: "/personInfo",
    name: "PersonInfo",
    component: () => import("../pages/personInfo/PersonInfo")
  },
  // 我的收藏
  {
    path: "/collect",
    name: "Collect",
    component: () => import("../pages/collect/Collect")
  }
];

const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes
});

// 挂载路由导航守卫（ 防跳墙功能 ）
router.beforeEach((to, from, next) => {
  // 如果要访问登录页面就直接放行
  if (to.path === '/login' || to.path === '/register') return next()
  // 否则获取 sessionStorage 中token值进行判断
  const token = window.sessionStorage.getItem('token')
  // 如果没有 token 值表示没有登录，就强制跳转到login页面
  if (!token) return next('/login')
  // 否则就是有 token 值，直接放行
  next()
})

export default router;
