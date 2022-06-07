const Serve = require("../server/index");
const Skeleton = require('../skeleton/index')
class VueSkeletonPlugin {
  constructor() {}
  apply(compiler) {
    compiler.hooks.done.tap("VueSkeletonPlugin", async () => {
      await this.serverStatrt();
      const skeleton = new Skeleton();
      await skeleton.initialize()
      skeleton.genHTML();
    //   skeleton.destroy();
    });
  }
  serverStatrt() {
    this.serve = new Serve();
    this.serve.listen();
  }
}
module.exports = VueSkeletonPlugin;
