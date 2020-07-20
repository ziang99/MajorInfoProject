const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("styles", resolve("src/assets/styles"))
  },
  //解决项目打包后页面空白
  runtimeCompiler: true,
  //输出的根路径  默认是/ 如果你的网站是app.com/vue 这更改此配置项
  publicPath: "./",
  // devServer: {
  //   // port: 8080 //自定义端口号
  //   // open: true //运行项目后自动打开浏览器
  // }
}
