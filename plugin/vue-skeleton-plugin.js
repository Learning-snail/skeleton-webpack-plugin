const { resolve } = require("path");
const Serve = require("../server/index");
const Skeleton = require('../skeleton/index')
const fs = require('fs')
class VueSkeletonPlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    // 在webpack将文件打包到dist后在执行操作
    compiler.hooks.done.tapAsync("VueSkeletonPlugin", async () => {
      // 启动一个node服务器，用于puppeteer可以打开一个无头浏览器
      await this.serverStatrt();
      // Skeleton里是对于开启无头浏览器后对dom元素进行操作
      const skeleton = new Skeleton(this.options);
      await skeleton.initialize()
      let htmlContent = await skeleton.genHTML();
      // 销毁无头浏览器
      skeleton.destroy();
      await fs.writeFile(resolve(__dirname,'../dist/index.html'),htmlContent,function() {
        // 重写完成后退出编译状态
        process.exit()
      })
    });
  }
  serverStatrt() {
    this.serve = new Serve(this.options);
    this.serve.listen();
  }
}
module.exports = VueSkeletonPlugin;
