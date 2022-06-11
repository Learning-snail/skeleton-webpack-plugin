const Koa = require("koa");
const Static = require("koa-static");
const { resolve } = require("path");
const fs = require("fs");
class Server {
  constructor(options) {
    this.options = options;
    this.port = this.options.port || 3000;
  }
  listen() {
    const app = new Koa();
    app.use(Static(this.options.staticDir || resolve(process.cwd(), "/dist")));
    app.use(async (ctx) => {
      ctx.response.body = fs.createReadStream(
        resolve(
          this.options.staticDir || process.cwd() + "/dist",
          "/index.html"
        )
      );
    });
    app.listen(this.port, () => {
      console.log("服务器正常启动");
    });
  }
  close() {
    this.httpServer.close(() => {
      console.log(`${this.port}端口服务器已经关闭了`);
    });
  }
}
module.exports = Server;
