const { defineConfig } = require("@vue/cli-service");
const VueSkeletonPlugin = require('./plugin/vue-skeleton-plugin')
const {resolve} = require('path')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',
  chainWebpack: (webpackConfig) => {
    webpackConfig
      .plugin('vue-skeleton-plugin')
        .use(VueSkeletonPlugin, [{
          //我们要启动一个静态文件服务器，去显示dist目录里的页面。
          staticDir:resolve(__dirname,'dist'),
          // 启动的node端口
          port:3000,
          // puppeteer打开的node端口的链接，与port端口需要一致
          origin:'http://localhost:3000',
          button:{
              color:'#111'
          },
          image:{
            color:'#EFEFEF'
          },
          font: {
            color:'#EFEFEF'
          }
        }])
    webpackConfig.plugin('html').tap(config => {
      config[0].minify = {
        removeComments: false
      }
      return config;
    })
  }
});
