const Koa = require('koa')
const http = require('http');
class Server {
    constructor() {
        this.port = 3000
    }
    listen() {
        const app = new Koa();
        this.httpServer = http.createServer(app)
        this.httpServer.listen(this.port, () => {
            console.log('服务器正常启动');
        });
    }
    close() {
        this.httpServer.close(()=>{
            console.log(`${this.port}端口服务器已经关闭了`);
        })
    }
}
module.exports = Server