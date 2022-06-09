const { resolve } = require("path");
const Serve = require("../server/index");
const Skeleton = require('../skeleton/index')
const fs = require('fs')
class VueSkeletonPlugin {
  constructor() {}
  apply(compiler) {
    compiler.hooks.done.tap("VueSkeletonPlugin", async ({compilation}) => {
      await this.serverStatrt();
      const skeleton = new Skeleton();
      await skeleton.initialize()
      let htmlContent = await skeleton.genHTML(compilation);
      fs.writeFile(resolve(__dirname,'../dist/index.html'),htmlContent,function(err){
        console.log(err);
    })
      skeleton.destroy();
    });
  }
  serverStatrt() {
    this.serve = new Serve();
    this.serve.listen();
  }
}
module.exports = VueSkeletonPlugin;
