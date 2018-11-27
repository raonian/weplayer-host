import path from 'path';
import fs from 'fs';
import https from 'https';
import Koa from 'koa';
import enforceHttps from 'koa-sslify';
import route from 'koa-route';
// import statics from 'koa-static';
const app = new Koa();

const port = 443;

// console.log('static', path.join(__dirname, './src/static'));
// console.log('set port:' + process.env.PORT + '; ip:' + process.env.IP);

// const source = async () => await serve(path.join(__dirname, './src/static'));

// app.use(source);

async function main(ctx) {
    ctx.response.type = 'html';
    ctx.response.body = await fs.createReadStream('./src/index.html');
}
async function view(ctx) {
    ctx.response.type = 'html';

    // hsts
    // ctx.response.set('strict-transport-security', 'max-age=15552000; includeSubDomains');
    // if(!ctx.request.header.host.match(':')) {
    //     ctx.response.status = 307;
    //     ctx.response.set('location', 'https://192.168.96.122:8080/view');
    //     ctx.response.set('Non-Authoritative-Reason', 'HSTS');
    //     return;
    // }

    ctx.response.body = await fs.createReadStream('./src/view.html');
}
async function statics(ctx) {
    ctx.response.body = await fs.createReadStream(path.join(__dirname, ctx.url));
}

app.use(route.get('/', main));
app.use(route.get('/view', view));
app.use(route.get('/node_modules/*', statics));

// app.listen(port);
const options = {
    key: fs.readFileSync('./private.pem'),
    cert: fs.readFileSync('./file.crt')
};

const server = https.createServer(options, app.callback()).listen(port);
// app.listen(80); // test hsts

import ws from 'ws';
const WebSoket = ws.Server;

const wss = new WebSoket({server});
const room = {};

function sendAll(data) {
    wss.clients.forEach(function(client) {
        client.send(data);
    });
}
wss.on('connection', function connection(ws){ // 信令服务器，交换客户端之间的网络信息
    ws.on('message', function incoming(message) {
        const data = JSON.parse(message);
        if(data.type === 'offer') {
            room.offer = message;
            return;
        }
        sendAll(message);
    });
    if(room.offer) {
        ws.send(room.offer);
    }
    // ws.send(JSON.stringify({type: 'connected'}));
});
