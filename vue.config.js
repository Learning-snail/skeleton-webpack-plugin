const { defineConfig } = require("@vue/cli-service");
const VueSkeletonPlugin = require('./plugin/vue-skeleton-plugin')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',
  chainWebpack: (webpackConfig) => {
    webpackConfig
      .plugin('vue-skeleton-plugin')
        .use(VueSkeletonPlugin)
    webpackConfig.optimization.minimizer('terser').tap(args => {
      return [...args, {
        terserOptions: {
          compress: {
            drop_console: false
          }
        }
      }]
    })
  }
});
