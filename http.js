import path from 'path';
import fs from 'fs';
import https from 'https';
import Koa from 'koa';
import enforceHttps from 'koa-sslify';
import route from 'koa-route';
// import statics from 'koa-static';
const app = new Koa();

const port = 8080;

// console.log('static', path.join(__dirname, './src/static'));
// console.log('set port:' + process.env.PORT + '; ip:' + process.env.IP);

// const source = async () => await serve(path.join(__dirname, './src/static'));

// app.use(source);

async function main(ctx) {
    ctx.response.type = 'html';
    ctx.response.body = await fs.createReadStream('./src/index.html');
}
app.use(route.get('/', main));

// app.listen(port);
const options = {
    key: fs.readFileSync('./private.pem'),
    cert: fs.readFileSync('./file.crt')
};

const server = https.createServer(options, app.callback()).listen(port);


import ws from 'ws';
var WebSoket = ws.Server;

var wss = new WebSoket({server});
wss.on('connection', function connection(ws){
    ws.on('message', function incoming(message) {
        console.log(message);
    });
    ws.send('connection');
    // var rs = fs.createReadStream('./oceans.mp4');
    // var data = '';
    // rs.on('data', function(d) {
    //     ws.send(new Buffer(d));
    // });
    // rs.on('end', function(){
    //     ws.send('end');
    //     ws.close();
    // });

});
