const Koa = require('koa')
const Static = require('koa-static')
const http = require('http');
const path = require('path')
const fs = require('fs')
class Server {
    constructor() {
        this.port = 3000
    }
    listen() {
        const app = new Koa();
        app.use(Static(path.join(__dirname,'../dist')));
        // app.use('/preview.html', async (req, res) => {
        //     fs.createReadStream(path.resolve(__dirname, '..', 'dist/index.html')).pipe(res)
        //   })
        app.use( async ( ctx ) => {
            ctx.response.body = fs.createReadStream(path.resolve(__dirname, '..', 'dist/index.html'))
          })
        // this.httpServer = http.createServer(app)
        // this.httpServer.listen(this.port, () => {
        //     console.log('服务器正常启动');
        // });
        app.listen(this.port, () => {
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